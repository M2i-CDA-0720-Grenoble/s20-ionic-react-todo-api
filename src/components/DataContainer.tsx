import React, { FC, useEffect, useState } from "react";
import DataContext, { DataContextValue } from "../contexts/DataContext";
import { ITodo } from "../models";
import RequestState from "../request-state";


// Ce composant est uniquement un conteneur de données, il se contente
// d'afficher ses enfants à l'intérieur d'un contexte, afin de pouvoir
// distribuer ses données partout dans l'application
const DataContainer: FC = ({ children }) => {
  // Récupère l'URL de base de l'API parmi les variables d'environnement
  const { REACT_APP_API_BASEURL: API_BASEURL } = process.env;

  // Retient l'état actuel de la liste de tâches
  const [todos, setTodos] = useState<ITodo[]>([]);
  // Retient l'étape actuelle de la récupération de données
  const [fetchState, setFetchState] = useState(RequestState.Idle);

  // Déclenche une action uniquement au moment où le composant est monté dans le DOM
  useEffect(
    () => {
      // Déclare que la récupération de données est en cours
      setFetchState(RequestState.Pending);

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
        setFetchState(RequestState.Success)
      })
      // En cas d'erreur, déclare que la récupération de données a échoué
      .catch( error => setFetchState(RequestState.Failed) );
    },
    [API_BASEURL]
  );

  // Crée une collection de fonctions permettant d'affecter la liste des tâches
  // qui s'affichera dans l'application (ce qui n'a AUCUNE influence sur les
  // données contenues dans le serveur!)
  // Crée une fonction permettant de rajouter une nouvelle tâche dans la liste
  const addTodo = (todo: ITodo) => {
    // Remplace la liste de tâches par une nouvelle liste contenant...
    setTodos([
      // ...tout le contenu actuel de la liste...
      ...todos,
      // ...ainsi que la nouvelle tâche
      todo
    ]);
  }

  // Crée une fonction permettant d'enlever une tâche de la liste
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

  // Compile tout le contenu à passer dans le reste de l'application par le biais du contexte
  const contextValue: DataContextValue = {
    todos,
    fetchState,
    actions: {
      addTodo,
      removeTodo,
    }
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContainer;
