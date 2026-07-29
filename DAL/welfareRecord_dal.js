import db from "../db/mongodb_connection.js"


const coll = db.collection("welfareRecord")



async function insertBenefit(body) {
    try {
        const res = await coll.insertOne({ ...body })
        return {_id: res.insertedId, ...body}
    } catch (error) {
        console.log(error);
    }
}


async function findBenefit(soldierId) {
    try {
        console.log(soldierId);
        
        return await coll.findOne({ soldierId: soldierId })
    } catch (error) {
        console.log(error);
    }
}



export default {
    insertBenefit,
    findBenefit
}
