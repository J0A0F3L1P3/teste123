import React from "react";
import { auth } from './auth';
import { Link } from "react-router-dom";
import NavBar from "./components/navBar";

function HomeScreen(newUser) {

    const [user, setUser] = React.useState(newUser);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="home">
            {user && (
                <div>
                    <NavBar />
                    <main>
                        <section>
                            <h2 className="welcome">Bem vindo,</h2>
                            <h2 className="welcome">{user.displayName}</h2>
                            <div className="Frames">
                                <div className="page-musicas">
                                    <h2>Música</h2>
                                    <Link to={"/music"}><button className="button">Ir para a página de música</button></Link>
                                </div>
                                <div className="page-tarefas">
                                    <h2>Tarefas</h2>
                                    <Link to={"/tasks"}><button className="button">Ir para a página de tarefas</button></Link>
                                </div>
                            </div>
                        </section>
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
