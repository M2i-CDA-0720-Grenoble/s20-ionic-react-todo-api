import React, { FC, useEffect, useState } from "react";
import DataContext, { DataContextValue } from "../contexts/DataContext";
import { ITodo } from "../models";


// Crée des constantes permettant de qualifier les différentes étapes de la récupération de données
export const FETCH_PENDING = 1;
export const FETCH_SUCCESFUL = 2;
export const FETCH_FAILED = 3;


const DataContainer: FC = ({ children }) => {
  
  const { REACT_APP_API_BASEURL: API_BASEURL } = process.env;

  // Retient l'état actuel de la liste de tâches
  const [todos, setTodos] = useState<ITodo[]>([]);
  // Retient l'étape actuelle de la récupération de données
  const [fetchState, setFetchState] = useState(0);

  // Déclenche une action uniquement au moment où le composant est monté dans le DOM
  useEffect(
    () => {
      // Déclare que la récupération de données est en cours
      setFetchState(FETCH_PENDING);

      // Envoie une requête au serveur permettant de récupérer la liste des tâches
      fetch(`${API_BASEURL}/todos`)
      .then(
        response => {
          // Si la requête a produit une erreur
          if (!response.ok) {
            // Renvoie une erreur pour passer dans la clause "catch"
            throw new Error('Error while fetching todos.');
          }
          // Sinon, récupère les données JSON de la réponse
          return response.json();
        }
      )
      .then( (json: ITodo[]) => {
        // Stocke la liste de tâches récupérée du serveur
        setTodos(json);
        // Déclare que la récupération de données a réussi
        setFetchState(FETCH_SUCCESFUL)
      })
      // En cas d'erreur, déclare que la récupération de données a échoué
      .catch( error => setFetchState(FETCH_FAILED) );
    },
    []
  );
  
  // Crée une fonction permettant de rajouter une nouvelle tâche dans la liste
  // (ceci affecte uniquement la liste présente dans le composant et PAS
  // les données présentes sur le serveur!)
  const addTodo = (todo: ITodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  // Crée une fonction permettant d'enlever une tâche de la liste
  // (ceci affecte uniquement la liste présente dans le composant et PAS
  // les données présentes sur le serveur!)
  const removeTodo = (id: number) => {
    // Remplace la liste de tâches par...
    setTodos(
      // ...une version filtrée de la liste actuelle...
      todos.filter(
        // ...dans laquelle on garde uniquement les tâches dont l'ID est différent de l'ID fourni
        todo => todo.id !== id
      )
    );
  }

  // Crée une fonction permettant de créer une nouvelle tâche sur le serveur
  // (cette fonction attend que la requête ait répondu avant d'ajoute la nouvelle tâche
  // à la liste des tâches affichées par la composant afin de s'assurer que la liste
  // des tâches est parfaitement synchronisée avec l'état des données sur le serveur)
  const createTodo = (todo: ITodo) => {
    // Envoie une requête...
    fetch(`${API_BASEURL}/todos`, {
      // ...en méthode POST...
      method: 'POST',
      // ...contenant des donneés en JSON...
      headers: {
        'Content-Type': 'application/json'
      },
      // ...avec l'objet à créer converti en chaîne de caractères
      body: JSON.stringify(todo),
    })
    .then( response => response.json() )
    // Si la requête s'est bien passée, ajoute le nouvel objet dans la liste des tâches du composant
    .then( (json: ITodo) => addTodo(json) );
  }

  const contextValue: DataContextValue = {
    todos,
    fetchState,
    actions: {
      addTodo,
      removeTodo,
      createTodo,
    }
  };


  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContainer;
