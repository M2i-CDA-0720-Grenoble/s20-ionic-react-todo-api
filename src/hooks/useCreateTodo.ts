import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";
import { ITodo } from "../models";
import RequestState from "../request-state";

interface ICreateTodoHook {
  createTodo: (todo: ITodo) => void,
  requestState: RequestState,
}

const useCreateTodo = (): ICreateTodoHook => {
  // Récupère l'URL de base de l'API parmi les variables d'environnement
  const { REACT_APP_API_BASEURL: API_BASEURL } = process.env;
  // Récupère les actions permettant de modifier les données partagées par le contexte
  const { actions } = useContext(DataContext);
  // Retient l'état d'avancement actuel de la reqûete
  const [requestState, setRequestState] = useState(RequestState.Idle);

  // Crée une fonction permettant de créer une nouvelle tâche sur le serveur
  // (cette fonction attend que la requête ait répondu avant d'ajouter la nouvelle tâche
  // à la liste des tâches affichées par la composant afin de s'assurer que la liste
  // des tâches est parfaitement synchronisée avec l'état des données sur le serveur)
  const createTodo = (todo: ITodo) => {
    setRequestState(RequestState.Pending)

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
    .then( (json: ITodo) => {
      setRequestState(RequestState.Success)
      actions?.addTodo(json);
    });
  }

  return {
    createTodo,
    requestState,
  };
}

export default useCreateTodo;
