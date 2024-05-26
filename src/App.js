import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import TopBar from './components/topBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
      <AppRoutes />
    </div>
  </Router>
  );
}

export default App;
