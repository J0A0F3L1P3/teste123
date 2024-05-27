import React, { useState, useEffect } from 'react';
import NavBar from "../components/navBar";
import { auth } from '../auth.js';

function ListaDeTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(localUser => {
            setUser(localUser);
        });

        return () => unsubscribe();
    }, []);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, { text: novaTarefa, userId: user.uid }]);
            setNovaTarefa('');
            setMostrarFormulario(false);
        }
    };

    const removerTarefa = (index) => {
        const novaLista = [...tarefas];
        novaLista.splice(index, 1);
        setTarefas(novaLista);
    };

    return (
        <div className="lista-de-tarefas">
            <NavBar />
            <main>
                <h2>Suas atividades</h2>
                <ul>
                    {tarefas.filter(tarefa => tarefa.userId === user.uid).map((tarefa, index) => (
                        <li key={index} className="tarefa">
                            <p>{tarefa.text}</p>
                            <button className="remover-tarefa" onClick={() => removerTarefa(index)}>Clique para excluir?</button>
                        </li>
                    ))}
                </ul>
                {mostrarFormulario && (
                    <div className="adicionar-tarefa">
                        <input
                            type="text"
                            value={novaTarefa}
                            onChange={(e) => setNovaTarefa(e.target.value)}
                            placeholder="Digite uma nova tarefa"
                        />
                        <button onClick={adicionarTarefa}>Adicionar</button>
                    </div>
                )}
                {!mostrarFormulario && (
                    <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
                )}a
            </main>
        </div>
    );
}

export default ListaDeTarefas;