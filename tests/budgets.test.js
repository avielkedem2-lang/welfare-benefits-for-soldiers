import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import { budgetRepo } from "../DAL/budgetRepo.js"
import { createBudget } from "../services/budget_service.js"
import {
    BUDGET_BODY,
    MOCK_BUDGET,
    MOCK_BUDGET_ID,
    mockCreateBudget
} from "./mocks/mockBudget.js"


describe("budgetService", () => {
    beforeEach(() => {
        mock.method(budgetRepo, "create", mockCreateBudget)

    })

    afterEach(() => {
        mock.restoreAll()
    })


    it("createBudget returns body with id", async () => {
        const budget = await createBudget(BUDGET_BODY)
        console.log(budget);
        assert.strictEqual(budget, MOCK_BUDGET)
    })
})