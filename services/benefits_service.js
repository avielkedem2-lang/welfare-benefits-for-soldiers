import welfareRecord from "../DAL/welfareRecord_dal.js"
import z from "zod"
import createError from "./createError.js"





const bodyVal = z.object({
    unit: z.string(),
    benefitType: z.enum(["giftCard", "diningHall"]),
    decisionReason: z.string(),
    budgetApproved: z.boolean(),
    soldierId: z.number(),
    startDate: z.string().optional(),
    details: z.object()
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



export async function createBenefit(soldierId, body) {
    body.soldierId = soldierId
    if (bodyVal.safeParse(body).success === false) throw createError(400, "bad request")
    const checkId = await welfareRecord.findBenefit(soldierId)
    if (checkId) throw createError(409, "The benefit already exists")
    const newBody = createNewBody(body)
    console.log(newBody);
    return welfareRecord.insertBenefit(newBody)
}


