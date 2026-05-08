import React from "react";

interface EmptyStateProps {
  message: string;
  actionButton?: React.ReactNode;
  icon?: React.ReactNode;
}

//========== Empty State Component ===========
const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  actionButton,
  icon,
}) => {
  return (
    <div className="text-center py-12">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="text-gray-500 text-sm mb-6">{message}</p>
      {actionButton}
    </div>
  );
};

export default EmptyState;
