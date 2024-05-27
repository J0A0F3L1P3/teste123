import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import HomeScreen from './pages/Home.jsx';
import ListaDeTarefas from './pages/ListaDeTarefas.jsx';
import { auth } from './auth.js';
import './App.scss'

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(localUser => {
            setUser(localUser);
        });

        return () => unsubscribe();
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={user ? <HomeScreen /> : <Login />} />
                <Route path='/home' element={user ? <HomeScreen /> : <Navigate to="/" />} />
                <Route path='/tasks' element={user ? <ListaDeTarefas />  : <Navigate to="/" />} />
                
                <Route path='*' element={
                    <div>
                        <h1>Erro 404:</h1>
                        <h1>Página "{window.location.pathname}" não encontrada</h1>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
