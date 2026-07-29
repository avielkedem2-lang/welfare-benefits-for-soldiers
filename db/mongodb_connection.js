import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB)

try {
    await client.connect()
    console.log("connection to mongodb success");
} catch (error) {
    console.log("connection to mongodb filed");
}

const db = client.db("soldiers-benefits")

export default db;