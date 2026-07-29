import client  from "../db/supabase_connection.js";


export async function insertBudget(body) {
    return await client.from("budget")
}