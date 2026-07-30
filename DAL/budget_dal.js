import client from "../db/supabase_connection.js";


async function insertBudget(body) {
    const res = await client.from("budget_allocation").insert(body).single()
    return res
}



async function selectAllBudget() {
    return await client.from("budget_allocation").select()
}


async function selectById(id) {
    const res = await client.from("budget_allocation").select().eq("id", id)
    // console.log(res);
    return res.data
    
}


async function insertBudgetSpend(body) {
    body.createdAt = new Date()
    return await client.from("spend_transaction").insert(body)
}


async function selectAllSpendBudget() {
    return await client.from("spend_transaction").select()
}




export default {
    insertBudget,
    selectAllBudget,
    selectAllSpendBudget,
    insertBudgetSpend,
    selectById
}