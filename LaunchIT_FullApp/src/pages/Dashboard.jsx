
import React from 'react';
import OnboardingForm from '../components/OnboardingForm';
import CourseBuilder from '../components/CourseBuilder';
import BrandBuilder from '../components/BrandBuilder';
import LaunchEngine from '../components/LaunchEngine';

function Dashboard() {
  return (
    <div className="p-6">
      <OnboardingForm />
      <CourseBuilder />
      <BrandBuilder />
      <LaunchEngine />
    </div>
  );
}
export default Dashboard;
