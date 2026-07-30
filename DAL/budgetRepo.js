import budgetDal from "./budget_dal.js"



export const budgetRepo = {
    create: (...args) => budgetDal.insertBudget(...args),
    getAll: (...args) => budgetDal.selectAllBudget(...args)
}