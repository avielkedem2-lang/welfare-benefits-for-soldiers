import welfareRecord from "../DAL/welfareRecord_dal.js"
import z from "zod"
import createError from "./createError.js"





const giftCardVal = z.object({
    cardProvider: z.string(),
    monthlyValue: z.number(),
    validMerchants: z.array()
})

const diningHallVal = z.object({
    baseId: z.number(),
    kosherLevel: z.string(),
    mealTimes: z.array()
})


const bodyVal = z.object({
    unit: z.string(),
    benefitType: z.enum(["giftCard", "diningHall"]),
    decisionReason: z.string(),
    budgetApproved: z.boolean(),
    soldierId: z.number(),
    startDate: z.string().optional(),
    details: z.object()
})



const bodyUpdateVal = z.object({
    soldierId: z.number(),
    benefitType: z.enum(["giftCard", "diningHall"]),
    details: z.object(),
    budgetApproved: z.boolean(),
    decisionDate: z.string().optional()
})



function createNewBody(body){
    return {
        soldierId: body.soldierId,
        unit: body.unit,
        currentBenefitType: body.benefitType,
        history: [{
            startDate: body.startDate || null,
            endDate: null,
            decisionReason: body.decisionReason,
            budgetApproved: body.budgetApproved,
            benefitType: body.benefitType,
            details: body.details
        }]
    }
}




function updateBody(newBody, oldBody){
    // console.log(oldBody.history[0]);
    
    oldBody.history[oldBody.history.length -1].endDate = newBody.decisionDate
    oldBody.currentBenefitType = newBody.benefitType
    oldBody.history.push({
            startDate: newBody.decisionDate,
            endDate: null,
            decisionReason: newBody.decisionReason,
            budgetApproved: newBody.budgetApproved,
            benefitType: newBody.benefitType,
            details: newBody.details
        })
    return oldBody
}



export async function createBenefit(soldierId, body) {
    if (isNaN(soldierId)) throw createError(400, "soldierId most to be number")
    soldierId = +soldierId
    body.soldierId = soldierId
    if (bodyVal.safeParse(body).success === false) throw createError(400, "bad request")
    if (body.benefitType == "giftCard") {
        if (giftCardVal.safeParse(body.details).success === false) throw createError(400, "bad request")
    }
    else if (body.benefitType == "diningHall"){
        if (diningHallVal.safeParse(body.details).success === false) throw createError(400, "bad request")
    }
    const checkId = await welfareRecord.findBenefit(soldierId)
    if (checkId) throw createError(409, "The benefit already exists")
    const newBody = createNewBody(body)
    console.log(newBody);
    return welfareRecord.insertBenefit(newBody)
}




export async function getBenefit(soldierId) {
    if (isNaN(soldierId)) throw createError(400, "bad request")
    const checkId = await welfareRecord.findBenefit(+soldierId)
    if (!checkId) throw createError(404, "not found")
    return checkId
}


export async function changeBenefit(soldierId, body) {
    if (isNaN(soldierId)) throw createError(400, "soldierId most to be number")
    soldierId = +soldierId
    body.soldierId = soldierId
    if (bodyUpdateVal.safeParse(body).success === false) throw createError(400, "bad request")
    if (body.benefitType == "giftCard") {
        if (giftCardVal.safeParse(body.details).success === false) throw createError(400, "bad request")
    }
    else if (body.benefitType == "diningHall"){
        if (diningHallVal.safeParse(body.details).success === false) throw createError(400, "bad request")
    }
    const oldBody = await welfareRecord.findBenefit(soldierId)
    if (!oldBody) throw createError(404, "Not found")
    const newBody = updateBody(body, oldBody)
    await welfareRecord.updateBenefit(soldierId, newBody)
    return {reverted: true, reason: "The benefit update successfully"}
}


