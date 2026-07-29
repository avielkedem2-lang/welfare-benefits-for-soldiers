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





export async function createBenefit(soldierId, body) {
    body.soldierId = soldierId
    if (!bodyVal.safeParse(body)) throw createError(400, "bad request")
    const checkId = await welfareRecord.findBenefit(soldierId)
    if (checkId) throw createBenefit(409, "The benefit already exists")
    return welfareRecord.insertBenefit(body)
}


