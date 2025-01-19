import React from 'react';
import { Compass } from 'lucide-react';

const SprintProgressIndicator = ({ sprint }) => {
  const getStatus = () => {
    if (sprint.completed) return { message: "Success!", color: "text-green-600" };
    
    const completedTasks = sprint.tasks.filter(task => task.completed).length;
    if (completedTasks === sprint.tasks.length) return { message: "Ready to Complete!", color: "text-purple-600" };
    if (completedTasks > 0) return { message: "On Track", color: "text-blue-600" };
    return { message: "Just Started", color: "text-gray-600" };
  };

  const { message, color } = getStatus();

  return (
    <div className="flex items-center gap-2">
      <Compass className={`w-8 h-8 ${color}`} />
      <span className={`font-semibold ${color}`}>{message}</span>
    </div>
  );
};

export default SprintProgressIndicator;