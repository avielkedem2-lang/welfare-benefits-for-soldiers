import express from "express"
import dotenv from "dotenv/config"
import routerBenefits from "./routes/benefits_route.js"
import routerBudget from "./routes/budget_toute.js"



const app = express()
const PORT = process.env.PORT


app.use(express.json())
app.use("/soldiers", routerBenefits)
app.use("/budget", routerBudget)






app.listen(PORT, () => {
    console.log("The server running...");
})