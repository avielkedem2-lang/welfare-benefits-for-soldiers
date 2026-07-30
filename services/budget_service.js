import z from "zod"
import createError from "./createError.js"
import budgetDal from "../DAL/budget_dal.js"




const checkBody = z.object({
    unit: z.string(),
    benefitType: z.enum(["giftCard", "diningHall"]),
    month: z.string(),
    allocatedAmount: z.number()
})



const checkBodySpend = z.object({
    budgetId: z.number().min(0),
    amount: z.number().min(0),
    reason: z.string().optional()
})



const checkQuery = z.object({
    unit: z.string().optional(),
    benefitType: z.enum(["giftCard", "diningHall"]).optional(),
    month: z.string().optional(),
})


export async function createBudget(body) {
    if (checkBody.safeParse(body).success === false) throw createError(400, "bad request")
    console.log(body);

    const allBudget = (await budgetDal.selectAllBudget()).data
    console.log(allBudget);

    for (let b of allBudget) {
        if (b.allocatedAmount === body.allocatedAmount && b.unit === body.unit && b.month === body.month && b.benefitType === body.benefitType) {
            throw createError(409, "There is already budget")
        }
    }
    const budget = await budgetDal.insertBudget(body)
    if (budget.error) return console.log(budget.error);
    return { id: allBudget.length + 1, ...body }
}





export async function getSpendById(id) {
    if (isNaN(id)) throw createError(400, "Bad request")
    id = +id
    const checkId = await budgetDal.selectById(id)
    // console.log(checkId.data);
    if (checkId.length === 0) throw createError(404, "not found")

    const allBudgetSpend = await budgetDal.selectAllSpendBudget()
    const filterBudget = allBudgetSpend.data.filter((b) => { return b.budgetId === id })
    return filterBudget
}





export async function createBudgetSpend(id, body) {
    if (isNaN(id)) throw createError(400, "Bad request")
    id = +id
    body.budgetId = id
    if (checkBodySpend.safeParse(body).success === false) throw createError(400, "bad request")
    const allBudget = await getSpendById(id)
    const allAmount = allBudget.reduce((sum, b) => { return sum + b.amount }, 0)
    const budget = await budgetDal.selectById(id)
    if (allAmount + body.amount > budget[0].allocatedAmount) return { error: "There is not enough money", remainingAmount: budget[0].allocatedAmount - allAmount }
    await budgetDal.insertBudgetSpend(body)
    const allBudgetSpend = await budgetDal.selectAllSpendBudget()
    return { id: allBudgetSpend.data.length + 1, ...body }
}






export async function getAllByQuery(query) {
    if (checkQuery.safeParse(query).success === false) throw createError(400, "bad request")
    const listAllQuery = {}
    const allBudget = await budgetDal.selectAllBudget()
    if (query.unit) {
        const allUnits = allBudget.data.filter((b) => { return b.unit === query.unit})
        const len = allUnits.length
        for (let i = 0; i< len; i++){
            const allBudgetId = await getSpendById(allUnits[i].id)
            const spentAmount = allBudgetId.reduce((sum, b) => { return sum + b.amount }, 0)
            const remainingAmount = allUnits[i].allocatedAmount - spentAmount
            allUnits[i].spentAmount = spentAmount
            allUnits[i].remainingAmount = remainingAmount
            listAllQuery.allUnits = allUnits
        }
        
    }
    if (query.month){
        const allMonth = allBudget.data.filter((b) => { return b.month === query.month})
        const len = allMonth.length
        for (let i = 0; i< len; i++){
            const allBudgetId = await getSpendById(allMonth[i].id)
            const spentAmount = allBudgetId.reduce((sum, b) => { return sum + b.amount }, 0)
            const remainingAmount = allMonth[i].allocatedAmount - spentAmount
            allMonth[i].spentAmount = spentAmount
            allMonth[i].remainingAmount = remainingAmount
            listAllQuery.allMonth = allMonth
        }
    }
    
    if (query.benefitType) {
        const allBenefitType = allBudget.data.filter((b) => { return b.benefitType === query.benefitType})
        const len = allBenefitType.length
        for (let i = 0; i< len; i++){
            const allBudgetId = await getSpendById(allBenefitType[i].id)
            const spentAmount = allBudgetId.reduce((sum, b) => { return sum + b.amount }, 0)
            const remainingAmount = allBenefitType[i].allocatedAmount - spentAmount
            allBenefitType[i].spentAmount = spentAmount
            allBenefitType[i].remainingAmount = remainingAmount
            listAllQuery.allBenefitType = allBenefitType
        }
    }
    // console.log(listAllQuery);
    
    return listAllQuery

}





