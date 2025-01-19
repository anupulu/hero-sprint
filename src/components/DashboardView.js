import React from 'react';
import { theme } from '../styles/theme';
import SprintCard from './SprintCard';
import { Plus, Clock } from 'lucide-react';
import Button from './Button';

const DashboardView = ({ longTermGoal, sprints, onSprintClick, onSprintUpdate, onStartNewSprint }) => {
  const latestSprint = sprints[sprints.length - 1];
  
  const canStartNewSprint = () => {
    if (!latestSprint) return true; // First sprint can start anytime
    
    const now = new Date();
    const sprintEndDate = new Date(latestSprint.endDate);
    
    return latestSprint.completed && now >= sprintEndDate;
  };

  const getNextSprintMessage = () => {
    if (!latestSprint) return null;
    if (!latestSprint.completed) return "Complete current sprint before starting a new one";
    
    const endDate = new Date(latestSprint.endDate);
    if (endDate > new Date()) {
      return `Next sprint can be started after ${endDate.toLocaleDateString()}`;
    }
    return null;
  };

  return (
    <div className={theme.container}>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center">
            <h2 className={theme.heading}>
              Your Goal: <span className={theme.accent}>{longTermGoal?.title}</span>
            </h2>
            
            <div className="text-right">
              {canStartNewSprint() ? (
                <Button
                  onClick={onStartNewSprint}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Start Sprint {sprints.length + 1}
                </Button>
              ) : (
                <div className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{getNextSprintMessage()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sprints.map(sprint => (
            <SprintCard 
              key={sprint.id}
              sprint={sprint}
              onClick={onSprintClick}
              onUpdateSprint={onSprintUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;