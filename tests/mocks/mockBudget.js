


export const BUDGET_BODY = {
    "unit": "8200",
    "benefitType": "giftCard",
    "month": "2020/03",
    "allocatedAmount": 10
}

export const MOCK_BUDGET_ID = 10


export const MOCK_BUDGET = {
    id: MOCK_BUDGET_ID,
    ...BUDGET_BODY,
}


export async function mockCreateBudget(body) {
    return { ...body }
}