import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import { ITodo } from '../models';
import './Home.css';


// Crée des constantes permettant de qualifier les différentes étapes de la récupération de données
const FETCH_PENDING = 1;
const FETCH_SUCCESFUL = 2;
const FETCH_FAILED = 3;


const Home: React.FC = () => {
  // Retient l'état actuel de la liste de tâches
  const [todos, setTodos] = useState<ITodo[]>([]);
  // Retient l'étape actuelle de la récupération de données
  const [fetchState, setFetchState] = useState(0);

  // Déclenche une action uniquement au moment où le composant est monté dans le DOM
  useEffect(
    () => {
      // Déclare que la récupération de données est en cours
      setFetchState(FETCH_PENDING);

      // Envoie une requête au serveur permettant de récupérer la liste des tâches
      fetch('http://localhost:3000/todos')
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
        setFetchState(FETCH_SUCCESFUL)
      })
      // En cas d'erreur, déclare que la récupération de données a échoué
      .catch( error => setFetchState(FETCH_FAILED) );
    },
    []
  );

  // Crée une fonction permettant de rajouter une nouvelle tâche dans la liste
  // (ceci affecte uniquement la liste présente dans le composant et PAS
  // les données présentes sur le serveur!)
  const addTodo = (todo: ITodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  // Crée une fonction permettant de créer une nouvelle tâche sur le serveur
  // (cette fonction attend que la requête ait répondu avant d'ajoute la nouvelle tâche
  // à la liste des tâches affichées par la composant afin de s'assurer que la liste
  // des tâches est parfaitement synchronisée avec l'état des données sur le serveur)
  const createTodo = (todo: ITodo) => {
    // Envoie une requête...
    fetch('http://localhost:3000/todos', {
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
    .then( (json: ITodo) => addTodo(json) );
  }

  // Crée une fonction permettant de déterminer l'affichage en fonction de l'état actuel
  // de la récupération des données
  const displayContent = () => {
    switch (fetchState) {
      // Si les données sont en cours de récupération, affiche un indicateur de chargement
      case FETCH_PENDING:
        return <IonSpinner />;
      
      // Si les données ont été récupérées avec succès, affiche la liste des tâches
      case FETCH_SUCCESFUL:
        return <TodoList todos={todos} />;

      // Si la récupération des données a échoué, affiche une alerte
      case FETCH_FAILED:
        return (
          <IonToast
            isOpen={true}
            message="Impossible de récupérer les tâches."
            duration={3000}
          />
        );

      // Dans tous les autrse cas, n'affiche rien
      // (ce code est présent uniquement comme garde-fou, il n'est pas censé être exécuté)
      default:
        return null;
    }
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

        {displayContent()}
        <AddTodoForm createTodo={createTodo} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
