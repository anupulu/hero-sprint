import React from 'react';
import { ArrowRight, Target, Timer, CheckCircle } from 'lucide-react';
import Button from './Button';
import ProgressCircle from './ProgressCircle';

// Landing View Component
export default function LandingView({ onStart }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Start from <span className="text-purple-600">Perfection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Begin each week at 100% and maintain your perfect score by achieving your goals. 
            Don't let your progress slip away.
          </p>
          <Button 
            onClick={onStart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Target className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Set Your Goal</h3>
            <p className="text-gray-600">
              Start by defining your long-term goal. Break it down into achievable weekly sprints.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <Timer className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Weekly Sprints</h3>
            <p className="text-gray-600">
              Each sprint starts perfect. Complete your tasks to maintain your progress.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stay on Track</h3>
            <p className="text-gray-600">
              Focus on completing tasks early. Don't wait until the end of the sprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}