import client from "../db/supabase_connection.js";


async function insertBudget(body) {
    const res = await client.from("budget_allocation").insert(body).single()
    return res
}



async function selectAll() {
    return await client.from("budget_allocation").select()
}







export default {
    insertBudget,
    selectAll
}