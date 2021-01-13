import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import React, { FC, useState } from "react";
import { useCreateTodo } from "../hooks";


const AddTodoForm: FC = () => {
  // Génère une fonction permettant de créer une nouvelle tâche
  const { createTodo } = useCreateTodo();
  // Retient l'état actuel du champ texte
  const [text, setText] = useState('');

  // Crée une fonction permettant d'ajouter une nouvelle tâche lorsqu'on clique sur le bouton
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
