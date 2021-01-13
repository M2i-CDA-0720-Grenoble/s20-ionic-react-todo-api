import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import AddTodoForm from '../components/AddTodoForm';
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
  );

  const addTodo = (todo: ITodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  const createTodo = (todo: ITodo) => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
    })
    .then( response => response.json() )
    .then( (json: ITodo) => addTodo(json) );
  }

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
        <AddTodoForm createTodo={createTodo} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
