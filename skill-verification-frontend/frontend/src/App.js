import React from 'react';
import { ContractProvider } from './contexts/ContractContext';
import ProjectSubmission from './components/ProjectSubmission';

function App() {
  return (
    <ContractProvider>
      <div className="App">
        <h1>Skill Verification Platform</h1>
        <ProjectSubmission />
      </div>
    </ContractProvider>
  );
}

export default App;