import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from './Room';

function App() {
  const [signedUp, setSignUp] = useState(false);
  const [loggedIn, setLogin] = useState(false);

  return (
    <div className="App container text-center mt-5">
      {loggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/room/:userId" element={<Room />} />
          </Routes>
        </Router>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-8 col-12 mb-3">
            <Signup setSignUp={setSignUp} />
          </div>
          <div className="col-md-6 col-sm-8 col-12">
            <Login setLogin={setLogin} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
