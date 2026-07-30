import express from "express"
import { createBudget } from "../services/budget_service.js"


const router = express.Router()



router.post("/", async (req, res) => {
    try {
        const body = req.body
        const budget = await createBudget(body)
        res.status(201).json(budget)
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})












export default router;