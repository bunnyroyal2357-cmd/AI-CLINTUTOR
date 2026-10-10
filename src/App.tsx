/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClinicalProvider, useClinical } from './context/ClinicalContext';
import { SafetyDisclaimerBanner } from './components/layout/SafetyDisclaimerBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CaseLibrary } from './components/cases/CaseLibrary';
import { InteractiveTutor } from './components/tutor/InteractiveTutor';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { ApprovedMaterialsView } from './components/materials/ApprovedMaterialsView';
import { EducatorHub } from './components/educator/EducatorHub';

const MainContent: React.FC = () => {
  const { activeTab } = useClinical();

  return (
    <main className="flex-1">
      {activeTab === 'landing' && <LandingPage />}
      {activeTab === 'cases' && <CaseLibrary />}
      {activeTab === 'tutor' && <InteractiveTutor />}
      {activeTab === 'dashboard' && <StudentDashboard />}
      {activeTab === 'materials' && <ApprovedMaterialsView />}
      {activeTab === 'educator' && <EducatorHub />}
    </main>
  );
};

export default function App() {
  return (
    <ClinicalProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-200 selection:text-sky-900">
        <SafetyDisclaimerBanner />
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </ClinicalProvider>
  );
}
