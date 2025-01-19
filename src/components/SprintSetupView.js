import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import Input from './Input';
import Button from './Button';
import { List, Plus } from 'lucide-react';

const SprintSetupView = ({ onSprintCreate, longTermGoal }) => {
  const [tasks, setTasks] = useState(['']);
  const MAX_TASKS = 10;

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    if (tasks.length < MAX_TASKS) {
      setTasks([...tasks, '']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nonEmptyTasks = tasks.filter(task => task.trim() !== '');
    if (nonEmptyTasks.length > 0) {
      onSprintCreate({ tasks: nonEmptyTasks });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 w-full">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
          <List className="mr-2" />
          Define Sprint Tasks
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index}>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Task {index + 1}
                </label>
                <Input
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder="Enter task description"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            ))}
          </div>

          {tasks.length < MAX_TASKS && (
            <Button
              type="button"
              onClick={handleAddTask}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </Button>
          )}

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Create Sprint
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SprintSetupView;