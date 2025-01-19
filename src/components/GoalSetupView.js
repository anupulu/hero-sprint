import React, { useState } from 'react';
import { theme } from '../styles/theme';
import Button from './Button';
import Input from './Input';
import { Target } from 'lucide-react';

const GoalSetupView = ({ onGoalSet }) => {
  const [goalData, setGoalData] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  return (
    <div className={theme.container}>
      <div className={theme.card}>
        <h2 className={theme.heading}>
          Set Your <span className={theme.accent}>Long-Term Goal</span>
        </h2>
        
        <form onSubmit={(e) => { e.preventDefault(); onGoalSet(goalData); }}>
          <div className="space-y-6">
            <div>
              <label className={theme.label}>Goal Title</label>
              <Input
                className={theme.input}
                value={goalData.title}
                onChange={(e) => setGoalData({...goalData, title: e.target.value})}
                placeholder="e.g., Learn React Development"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={theme.label}>Start Date</label>
                <Input
                  type="date"
                  className={theme.input}
                  value={goalData.startDate}
                  onChange={(e) => setGoalData({...goalData, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className={theme.label}>End Date</label>
                <Input
                  type="date"
                  className={theme.input}
                  value={goalData.endDate}
                  onChange={(e) => setGoalData({...goalData, endDate: e.target.value})}
                />
              </div>
            </div>

            <Button className={theme.button}>
              Continue to Sprint Setup
              <Target className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalSetupView;