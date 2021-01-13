import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import React, { FC, useState } from "react";
import { ITodo } from "../models";

interface AddTodoFormProps {
  createTodo: (todo: ITodo) => void,
}

const AddTodoForm: FC<AddTodoFormProps> = ({ createTodo }) => {
  const [text, setText] = useState('');

  const handleClick = () => {
    createTodo({
      text,
      done: false,
    });
    setText('');
  }

  return (
    <>    
      <IonItem>
        <IonLabel position="floating">Nouvelle tâche</IonLabel>
        <IonInput
          onIonChange={(event) => setText(event.detail.value as string)}
          value={text}
        />
      </IonItem>

      <IonButton expand="block" onClick={handleClick}>Ajouter</IonButton>
    </>
  );
}

export default AddTodoForm;
