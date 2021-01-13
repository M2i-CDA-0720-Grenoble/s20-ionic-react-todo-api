import { IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useContext } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import DataContext from '../contexts/DataContext';
import RequestState from '../request-state';
import './Home.css';


const Home: React.FC = () => {
  const { todos, fetchState } = useContext(DataContext);

  // Crée une fonction permettant de déterminer l'affichage en fonction de l'état actuel
  // de la récupération des données
  const displayContent = () => {
    switch (fetchState) {
      // Si les données sont en cours de récupération, affiche un indicateur de chargement
      case RequestState.Pending:
        return <IonSpinner />;
      
      // Si les données ont été récupérées avec succès, affiche la liste des tâches
      case RequestState.Success:
        return <TodoList todos={todos} />;

      // Si la récupération des données a échoué, affiche une alerte
      case RequestState.Failed:
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
        <AddTodoForm />

      </IonContent>
    </IonPage>
  );
};

export default Home;
