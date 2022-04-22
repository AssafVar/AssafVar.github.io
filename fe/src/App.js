import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/gamepage' element={<ProtectedRoute><GamePage/></ProtectedRoute>} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
