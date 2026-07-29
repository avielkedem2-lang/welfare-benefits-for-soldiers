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


async function findBenefit(solderId) {
    try {
        return await coll.findOne({ solderId: solderId })
    } catch (error) {
        console.log(error);
    }
}



export default {
    insertBenefit,
    findBenefit
}
