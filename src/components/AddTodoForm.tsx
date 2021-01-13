import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import React, { FC, useContext, useState } from "react";
import DataContext from "../contexts/DataContext";

const AddTodoForm: FC = () => {
  const { actions } = useContext(DataContext);

  const [text, setText] = useState('');

  const handleClick = () => {
    actions.createTodo({
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
