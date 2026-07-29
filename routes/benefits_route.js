import express from "express"
import { changeBenefit, createBenefit, getBenefit } from "../services/benefits_service.js"


const router = express.Router();

router.post("/:soldierId/benefits", async (req, res) => {
    try {
        const soldierId = req.params.soldierId
        const body = req.body
        const benefit = await createBenefit(soldierId, body)
        res.status(201).json(benefit)
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})



router.get("/:soldierId/benefits", async (req, res) =>{
    try {
        const id = req.params.soldierId
        const benefit = await getBenefit(id)
        res.status(200).json(benefit)
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})



router.patch("/:soldierId/benefits", async (req, res) => {
    try {
        const soldierId = req.params.soldierId
        const body = req.body
        const benefit = await changeBenefit(+soldierId, body)
        res.status(200).json(benefit)
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})


export default router;
