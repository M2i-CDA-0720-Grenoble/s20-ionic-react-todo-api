// Crée un type particulier permettant de décrire l'état d'avancement
// d'une requête asynchrone
enum RequestState {
  // Pas encore envoyée
  Idle,
  // En attente de réponse
  Pending,
  // Répondu avec succès
  Success,
  // Répondu avec une erreur
  Failed,
}

export default RequestState;
