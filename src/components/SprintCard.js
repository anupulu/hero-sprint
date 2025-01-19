import React, { useState, useEffect } from 'react';
import { Square, CheckSquare, Calendar, Edit, CheckCircle } from 'lucide-react';
import DashboardProgressCircle from './DashboardProgressCircle';
import ConfirmationModal from './ConfirmationModal';
import SprintProgressIndicator from './SprintProgressIndicator';

const SprintCard = ({ sprint, onClick, onUpdateSprint }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTasks, setEditedTasks] = useState(sprint.tasks);
  const [showCompletionPrompt, setShowCompletionPrompt] = useState(false);
  const sprintNumber = parseInt(sprint.id.split('-')[1]);

  const calculateProgress = () => {
    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const daysLeft = (endDate - now) / (1000 * 60 * 60 * 24);
    
    // Time-based reduction (50% of progress calculation)
    const timeProgress = Math.min(100, Math.max(0, (daysLeft / totalDays) * 50));
    
    // Task-based addition (50% of progress calculation)
    const completedTasks = sprint.tasks.filter(task => task.completed).length;
    const taskProgress = (completedTasks / sprint.tasks.length) * 50;
    
    // Return rounded total progress
    return Math.round(timeProgress + taskProgress);
  };

  const getProgressColor = (progress) => {
    if (progress >= 70) return 'text-green-600 border-green-500';
    if (progress >= 40) return 'text-yellow-600 border-yellow-500';
    return 'text-red-600 border-red-500';
  };

  const progress = calculateProgress();
  const progressColor = getProgressColor(progress);
  const completedTasksCount = sprint.tasks.filter(task => task.completed).length;
  const totalTasksCount = sprint.tasks.length;

  const handleTaskToggle = (taskIndex) => {
    const updatedTasks = editedTasks.map((task, idx) => ({
      ...task,
      completed: idx === taskIndex ? !task.completed : task.completed
    }));
    
    setEditedTasks(updatedTasks);
    
    // Check if all tasks are completed
    const allCompleted = updatedTasks.every(task => task.completed);
    if (allCompleted && !sprint.completed) {
      setShowCompletionPrompt(true);
    }
  };

  const handleSave = () => {
    const progress = Math.round((editedTasks.filter(t => t.completed).length / editedTasks.length) * 100);
    onUpdateSprint({
      ...sprint,
      tasks: editedTasks,
      progress
    });
    setIsEditing(false);
  };

  const handleSprintComplete = () => {
    if (!onUpdateSprint) return;
    
    onUpdateSprint({
      ...sprint,
      tasks: editedTasks,
      progress: 100,
      completed: true,
      completedAt: new Date().toISOString()
    });
    setShowCompletionPrompt(false);
    setIsEditing(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${sprint.completed ? 'border-2 border-purple-500' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Sprint {sprintNumber}</h3>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Edit className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {new Date(sprint.startDate).toLocaleDateString()} - 
              {new Date(sprint.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-2 flex items-center text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>{completedTasksCount} of {totalTasksCount} tasks completed</span>
          </div>
        </div>
        <SprintProgressIndicator sprint={sprint} />
      </div>
      
      <div className="mt-4 space-y-2">
        {sprint.tasks.map((task, index) => (
          <div 
            key={index} 
            className="flex items-center text-gray-700 cursor-pointer"
            onClick={() => handleTaskToggle(index)}
          >
            {task.completed ? (
              <CheckSquare className="w-4 h-4 mr-2 text-purple-600" />
            ) : (
              <Square className="w-4 h-4 mr-2 text-gray-400" />
            )}
            <span className={task.completed ? 'line-through text-gray-400' : ''}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

      {showCompletionPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <p className="text-lg mb-4">You completed all tasks! Would you like to mark this sprint as completed?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCompletionPrompt(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Not Yet
              </button>
              <button
                onClick={handleSprintComplete}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h4 className="text-lg font-semibold mb-4">Edit Sprint {sprint.id}</h4>
            <div className="space-y-2">
              {editedTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskToggle(index)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintCard;