import React, { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SubjectsView from './pages/SubjectsView';
import TimeAnalysisView from './pages/TimeAnalysisView';

function App() {
  const [currentView, setCurrentView] = useState('overview');

  return (
    <DataProvider>
      <Layout currentView={currentView} onNavigate={setCurrentView}>
        {currentView === 'overview' && <Dashboard />}
        {currentView === 'subjects' && <SubjectsView />}
        {currentView === 'time' && <TimeAnalysisView />}
      </Layout>
    </DataProvider>
  );
}

export default App;
