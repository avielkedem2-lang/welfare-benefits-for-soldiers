import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv/config"


const client = createClient(
    process.env.API_URL,
    process.env.API_KEY
)

export default client;