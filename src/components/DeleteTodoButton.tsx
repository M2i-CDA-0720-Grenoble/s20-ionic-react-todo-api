import { IonButton, IonToast } from "@ionic/react";
import React, { FC, useContext, useState } from "react";
import DataContext from "../contexts/DataContext";

interface DeleteTodoButtonProps {
  id: number,
}

// Crée des constantes permettant de qualifier les différentes étapes de la suppression de la tâche
const DELETE_PENDING = 1;
const DELETE_SUCCESFUL = 2;
const DELETE_FAILED = 3;


const DeleteTodoButton: FC<DeleteTodoButtonProps> = ({ id }) => {
  const { actions } = useContext(DataContext);

  const [deleteState, setDeleteState] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteTodo = (id?: number) => {
    setDeleteState(DELETE_PENDING);

    fetch(`http://localhost:3000/todos/${id}`, {
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
      setDeleteState(DELETE_SUCCESFUL);
      actions.removeTodo(id)
    })
    .catch( error => {
      setErrorMessage(error.message);
      setDeleteState(DELETE_FAILED);
      console.error(error);
    })
  }

  return (
    <>
      <IonButton slot="end" color="danger" onClick={() => deleteTodo(id)}>
        Supprimer
      </IonButton>

      {
        deleteState === DELETE_FAILED &&
        <IonToast
          isOpen={true}
          message={errorMessage}
          duration={3000}
        />
      }
    </>
  );
}

export default DeleteTodoButton;
