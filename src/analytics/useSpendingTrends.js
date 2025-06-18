import React from "react";
import { useSpendingTrends } from "../hooks/useSpendingTrends";
import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,Legend} from "recharts";

const SpendingTrendsChart = () => {
  const { data } = useSpendingTrends();

  return (
    <div className="bg-white shadow p-4 rounded-xl my-6">
      <h3 className="text-xl font-semibold mb-4">Spending Trends & Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            dot={false}
            name="Actual"
            isAnimationActive={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#82ca9d"
            strokeDasharray="5 5"
            data={data.filter((d) => d.isPrediction)}
            name="Predicted"
            dot={false}
            isAnimationActive={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendsChart;
