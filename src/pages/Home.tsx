import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import { ITodo } from '../models';
import './Home.css';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(
    () => {
      fetch('http://localhost:3000/todos')
      .then( response => response.json() )
      .then( (json: ITodo[]) => setTodos(json) );
    },
    []
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <TodoList todos={todos} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
