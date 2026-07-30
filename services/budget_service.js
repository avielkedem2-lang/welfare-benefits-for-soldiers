import z from "zod"
import createError from "./createError.js"
import budgetDal from "../DAL/budget_dal.js"
import { error } from "node:console"



const checkBody = z.object({
    unit: z.string(),
    benefitType: z.enum(["giftCard", "diningHall"]),
    month: z.string(),
    allocatedAmount: z.number()
})



export async function createBudget(body) {
    if (checkBody.safeParse(body).success === false) throw createError(400, "bad request")
    console.log(body);

    const allBudget = (await budgetDal.selectAll()).data
    console.log(allBudget);

    for (let b of allBudget) {
        if (b.allocatedAmount === body.allocatedAmount && b.unit === body.unit && b.month === body.month && b.benefitType === body.benefitType) {
            throw createError(409, "There is already budget")
        }
    }
    const budget = await budgetDal.insertBudget(body)
    if (budget.error) return console.log(budget.error);
    return {id: allBudget.length + 1, ...body}
}