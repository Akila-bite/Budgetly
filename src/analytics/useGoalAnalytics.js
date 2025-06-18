// hooks/useGoalAnalytics.js
import { useMemo } from "react";

// Custom hook to analyze savings goals and compute useful metrics
const useGoalAnalytics = (goals) => {
  // 1. Filter only goals where the goal type is "saving"
  const savingGoals = useMemo(
    () => goals.filter((g) => g.goalType === "saving"),
    [goals]
  );

  // 2. Create detailed insights for each saving goal
  const goalInsights = useMemo(
    () =>
      savingGoals.map((goal) => {
        const {
          targetAmount = 0, // total amount needed for the goal
          currentAmount = 0, // amount saved so far
          title,
        } = goal;

        // Calculate how far along the user is (in %)
        const progressPercent = Math.min(
          (currentAmount / targetAmount) * 100,
          100
        );

        // Calculate how much more is needed to reach the goal
        const amountRemaining = targetAmount - currentAmount;

        // Check if the goal is completed
        const isCompleted = currentAmount >= targetAmount;

        // Return the computed values along with the original goal data
        return {
          ...goal,
          title,
          progressPercent,
          amountRemaining,
          isCompleted,
        };
      }),
    [savingGoals]
  );

  // 3. Compute aggregate stats across all savings goals
  const totals = useMemo(() => {
    // Total amount saved across all savings goals
    const totalSaved = savingGoals.reduce(
      (sum, g) => sum + (g.currentAmount || 0),
      0
    );

    // Total combined target amount for all savings goals
    const totalTarget = savingGoals.reduce(
      (sum, g) => sum + Number(g.targetAmount || 0),
      0
    );

    // Total amount remaining (all goals combined)
    const totalRemaining = totalTarget - totalSaved;

    // Calculate overall average progress (for all saving goals)
    const averageProgress = totalTarget
      ? (totalSaved / totalTarget) * 100
      : 0;

    return {
      totalSaved,
      totalTarget,
      totalRemaining,
      averageProgress,
    };
  }, [savingGoals]);

  // 4. Return all computed insights and totals
  return {
    goalInsights, // List of enriched goal objects
    totals,       // Aggregated stats across all savings goals
  };
};

export default useGoalAnalytics;
