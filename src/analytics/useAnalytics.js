//  all analytics hooks and components in one file
// improves organization and simplifies imports elsewhere

export { default as useBudgetAnalytics } from "./useBudgetAnalytics"; // Income, expenses, savings, balance, etc.
export { default as useGoalAnalytics } from "./useGoalAnalytics";     // Savings goal progress tracking
export { default as useTransactionAnalytics } from "./useTransactionAnalytics"; // Category + weekly/monthly summaries
export { default as useSpendingTrends } from "./useSpendingTrends"; // Visual chart component
