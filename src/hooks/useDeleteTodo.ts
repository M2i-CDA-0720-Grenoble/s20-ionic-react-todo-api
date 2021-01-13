import { useContext, useState } from "react";
import DataContext from "../contexts/DataContext";
import RequestState from "../request-state";

interface IDeleteTodoHook {
  deleteTodo: (id: number) => void,
  requestState: RequestState,
  errorMessage: string,
}

// Crée un hook qui génère une fonction permettant de supprimer une tâche à faire
// (à la fois dans le serveur et dans les données de l'application)
const useDeleteTodo = (): IDeleteTodoHook => {
  // Récupère l'URL de base de l'API parmi les variables d'environnement
  const { REACT_APP_API_BASEURL: API_BASEURL } = process.env;
  // Récupère les actions permettant de modifier les données partagées par le contexte
  const { actions } = useContext(DataContext);
  // Retient l'état d'avancement actuel de la reqûete
  const [requestState, setRequestState] = useState(RequestState.Idle);
  const [errorMessage, setErrorMessage] = useState('');

  // Crée une fonction permettant de supprimer une tâche existante du le serveur
  // (cette fonction attend que la requête ait répondu avant d'enlever la nouvelle tâche
  // à la liste des tâches affichées par la composant afin de s'assurer que la liste
  // des tâches est parfaitement synchronisée avec l'état des données sur le serveur)
  const deleteTodo = (id: number) => {
    setRequestState(RequestState.Pending);

    fetch(`${API_BASEURL}/todos/${id}`, {
      method: 'DELETE',
    })
    .then( response => {
      if (!response.ok) {
        let errorMessage = 'Impossible de supprimer la tâche.';

        if (response.status === 404) {
          errorMessage = 'Tâche non trouvée.'
        }

        throw new Error(errorMessage);
      }

      return response.json();
    })
    .then( json => {
      setRequestState(RequestState.Success);
      actions?.removeTodo(id)
    })
    .catch( error => {
      setErrorMessage(error.message);
      setRequestState(RequestState.Failed);
      console.error(error);
    })
  }

  return {
    deleteTodo,
    requestState,
    errorMessage,
  };
}

export default useDeleteTodo;
