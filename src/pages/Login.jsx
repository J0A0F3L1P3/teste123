import React, { useState } from 'react';
import { auth } from '../auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('login');

    const handleAuth = async () => {
        try {
            if (mode === 'login') {
                await auth.signInWithEmailAndPassword(email, password);
            } else {
                if (password !== confirmPassword) {
                    setError("As senhas não coincidem.");
                    return;
                }

                await auth.createUserWithEmailAndPassword(email, password);
                await auth.currentUser.updateProfile({
                    displayName: username
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='login'>
            <div className="container">
                {mode === 'login' ? (
                    <div>
                        <div className='title-login'>
                            <h1>Firebase Authentication</h1>
                        </div>
                        <div className='form'>
                            <h2>Login</h2>
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="link-button" onClick={() => setMode('signup')}>Não tem conta? Cadastrar</button>
                            <div className='btnGroup'>
                                <button className="button" onClick={handleAuth}>Login</button>
                                <button className="google-button" onClick={handleGoogleLogin}>Google</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='title-cads'>
                            <h1>Firebase Authentication</h1>
                        </div>
                        <div className='form'>
                            <h2>Cadastro</h2>
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="input"
                                type="text"
                                placeholder="Nome de Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className="input"
                                type="password"
                                placeholder="Confirmar Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button className="link-button" onClick={() => setMode('login')}>Já tem conta? Faça login</button>
                            <div className='btnGroup'>
                                <button className="button" onClick={handleAuth}>Cadastrar</button>
                                <button className="google-button" onClick={handleGoogleLogin}>Google</button>
                            </div>
                        </div>
                    </div>
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default LoginScreen;
