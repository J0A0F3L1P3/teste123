import React from "react";
import { auth } from './auth';
import './Home.css'
import { Link } from "react-router-dom";

function HomeScreen(newUser) {

    const [user, setUser] = React.useState(newUser);
    const [showUserInfo, setShowUserInfo] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (err) {
            console.error("Erro ao fazer logout:", err);
        }
    };

    return (
        <div className="home">
            {user && (
                <div>
                    <header className="header">
                        <button className="button" onClick={() => setShowUserInfo(!showUserInfo)}>
                            Nome: {user.displayName || 'Não fornecido'}
                        </button>
                        {showUserInfo && (
                            <div className="backUserInfo">
                                <div className="userInfo">
                                    <p>Email: {user.displayName}</p>
                                    <p>Email: {user.email}</p>
                                    <p>ID: {user.uid}</p>
                                    <button className="button Xbut" onClick={() => setShowUserInfo(!showUserInfo)}>
                                        X
                                    </button>
                                </div>
                            </div>
                        )}
                        <button className="button" onClick={handleLogout}>Sair</button>
                    </header>

                    <main>
                        <div className="mainFrame">
                            <h2 className="welcome">Bem vindo,</h2>
                            <h2 className="welcome">{user.displayName}</h2>
                            <div className="divMainFrame">
                                <div className="pages-musicas">
                                    <h2>Música</h2>
                                    <Link to={"/music"}><button className="button">Ir para a página de música</button></Link>
                                </div>
                                <div className="pages-tarefas">
                                    <h2>Tarefas</h2>
                                    <Link to={"/tasks"}><button className="button">Ir para a página de tarefas</button></Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
            {!user && (
                <div>
                    <h2>Você não está logado.</h2>
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
