import express from "express"
import { createBudget, createBudgetSpend , getSpendById} from "../services/budget_service.js"


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





router.get("/:id/transactions", async (req, res) => {
    try {
        const id = req.params.id
        const budget = await getSpendById(id)
        return res.status(200).json(budget)
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})





router.post("/:id/spend", async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id
        const budget = await createBudgetSpend(id, body)
        if (budget.error) {
            return res.status(200).json(budget)
        }else {
            res.status(201).json(budget)
        }
    } catch (err) {
        console.log(err); //זה בדיקה בשבילי
        if (err.status) {
            res.status(err.status).json(err.message)
        }
    }
})












export default router;