import { IonButton, IonToast } from "@ionic/react";
import React, { FC } from "react";
import { useDeleteTodo } from "../hooks";
import RequestState from "../request-state";

interface DeleteTodoButtonProps {
  id: number,
}

const DeleteTodoButton: FC<DeleteTodoButtonProps> = ({ id }) => {
  const { deleteTodo, requestState, errorMessage } = useDeleteTodo();

  return (
    <>
      <IonButton slot="end" color="danger" onClick={() => deleteTodo(id)}>
        Supprimer
      </IonButton>

      {
        requestState === RequestState.Failed &&
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
