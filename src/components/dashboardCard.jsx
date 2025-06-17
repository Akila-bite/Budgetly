// src/components/DashboardCard.jsx
import React from "react";
import classNames from "classnames";
import "./DashboardCard.css"; // Optional for custom classes

const DashboardCard = ({
  title,
  children,
  size = "medium",
  customClass = "",
  onClick,
}) => {
  const sizeClasses = {
    small: "w-40 h-40",
    medium: "w-60 h-60",
    large: "w-80 h-80",
  };   // Defined default sizes that can be selected for each tile

  return (
    <div
      className={classNames(
        "dashboard-card rounded-xl p-4 cursor-pointer transition-transform hover:scale-105 shadow-md",
        sizeClasses[size],
        customClass
      )}
      onClick={onClick}
    >
      {title && <h2 className="dashboard-card-title mb-2">{title}</h2>} {/*  the name of the page the dashboard tile leads to */}
      <div className="dashboard-card-content">{children}</div>
    </div>
  );
};

export default DashboardCard;
