import express from "express"
import { createBenefit } from "../services/benefits_service.js"


const router = express.Router();

router.post("/:soldierId/benefits", async (req, res) => {
    try {
        const soldierId = req.params.soldierId
        const body = req.body
        const benefit = await createBenefit(+soldierId, body)
        res.status(201).json(benefit)
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})



export default router;
