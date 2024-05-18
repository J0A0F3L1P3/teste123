import { useState, useEffect } from "react";
import { auth } from '../auth';
import { Link } from "react-router-dom";

function NavBar() {

    const [user, setUser] = useState();
    const [showUserInfo, setShowUserInfo] = useState(false);

    useEffect(() => {
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
        <div className="navBar">
            {showUserInfo && (
                <div className="backPerfil">
                    <div className="Perfil">
                        <header>
                            <h3>Perfil</h3>
                            <button onClick={() => setShowUserInfo(!showUserInfo)}>
                                <p>X</p>
                            </button>
                        </header>
                        <main>
                            <img src={user.photoURL || 'https://via.placeholder.com/120x120'} alt="Foto de perfil" />
                            <div>
                                <p>Nome: {user.displayName}</p>
                                <p>Email: {user.email}</p>
                                <p>ID: {user.uid}</p>
                                <button className="button" onClick={handleLogout}>Sair</button>
                            </div>
                        </main>
                    </div>
                </div>
            )}

            <header className="headerFixo">
                <Link to={"/home"} className="navTitle"><h1>FirebaseAuth</h1></Link>
                <button className="button" onClick={() => setShowUserInfo(!showUserInfo)}>
                    <img src={user?.photoURL || 'https://via.placeholder.com/120x120'} alt="Foto de perfil" />
                </button>
            </header>
        </div>
    );
}

export default NavBar;
