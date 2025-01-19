import React, { useState } from 'react';
import LandingView from './components/LandingView'; // Ensure this import is correct
import GoalSetupView from './components/GoalSetupView'; // Ensure this import is correct
import SprintSetupView from './components/SprintSetupView'; // Ensure this import is correct
import DashboardView from './components/DashboardView'; // Ensure this import is correct

// Main App Component
const GoalProgressApp = () => {
  const [currentView, setCurrentView] = useState('landing'); // Ensure this is set to 'landing'
  const [longTermGoal, setLongTermGoal] = useState(null);
  const [sprints, setSprints] = useState([]);
  const [currentSprint, setCurrentSprint] = useState(null);

  const handleGoalSet = (goal) => {
    setLongTermGoal(goal);
    setCurrentView('sprint-setup');
  };

  const handleSprintCreate = (sprintData) => {
    // Calculate start date
    let startDate;
    if (sprints.length === 0) {
      // First sprint starts today
      startDate = new Date();
    } else {
      // Next sprint starts the day after the last sprint ends
      const lastSprint = sprints[sprints.length - 1];
      startDate = new Date(lastSprint.endDate);
      startDate.setDate(startDate.getDate() + 1);
    }

    // Calculate end date (7 days from start)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Add 6 days to make it 7 days total

    const newSprint = {
      id: `sprint-${sprints.length + 1}`,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      tasks: sprintData.tasks.map(text => ({ text, completed: false })),
      progress: 0,
      completed: false
    };

    setSprints([...sprints, newSprint]);
    setCurrentSprint(newSprint);
    setCurrentView('dashboard');
  };

  const handleSprintUpdate = (updatedSprint) => {
    setSprints(sprints.map(sprint => 
      sprint.id === updatedSprint.id ? updatedSprint : sprint
    ));
  };

  const handleSprintClick = (sprint) => {
    setCurrentSprint(sprint);
    // Implement logic to view sprint details if needed
  };

  const handleStartNewSprint = () => {
    setCurrentView('sprint-setup');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView onStart={() => setCurrentView('goal-setup')} />;
      case 'goal-setup':
        return <GoalSetupView onGoalSet={handleGoalSet} />;
      case 'sprint-setup':
        return <SprintSetupView 
          onSprintCreate={handleSprintCreate}
          longTermGoal={longTermGoal}
        />;
      case 'dashboard':
        return <DashboardView 
          longTermGoal={longTermGoal}
          sprints={sprints}
          onSprintClick={handleSprintClick}
          onSprintUpdate={handleSprintUpdate}
          onStartNewSprint={handleStartNewSprint}
        />;
      default:
        return <LandingView onStart={() => setCurrentView('goal-setup')} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {renderView()}
    </div>
  );
};

export default GoalProgressApp;