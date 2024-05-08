import React from "react";
import { auth } from './auth';
import './Home.css'
import { Link } from "react-router-dom";

function HomeScreen(newUser) {

    const [user, setUser] = React.useState(newUser);

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
        <div>
            {user && (
                <header className="header">
                    <h2>Dados do Usuário:</h2>
                    <p>Nome: {user.displayName || 'Não fornecido'}</p>
                    <p>Email: {user.email}</p>
                    <p>ID do Usuário: {user.uid}</p>
                    <Link to={"/tasks"}><button className="button">Tarefas</button></Link>
                    <button className="button" onClick={handleLogout}>Sair</button>
                </header>
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
