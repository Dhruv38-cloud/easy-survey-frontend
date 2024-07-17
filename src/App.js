import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateSurvey from './components/CreateSurvey';
import ProtectedRoute from './components/ProtectedRoute';
import EditSurvey from './components/EditSurvey';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <CreateSurvey />
            </ProtectedRoute>
          } 
        />
        <Route path="/edit-survey/:id"
        element={
          <ProtectedRoute>
            <EditSurvey />
          </ProtectedRoute>
        } />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;