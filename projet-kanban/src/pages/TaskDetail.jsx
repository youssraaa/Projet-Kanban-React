import { useLocation, useParams, Link } from 'react-router-dom'

function TaskDetail() {
  const { id } = useParams()
  const location = useLocation()
  const task = location.state?.task

  if (!task) {
    return (
      <div className="container text-center mt-5">
        <h2 className="mb-3">Détail de la tâche</h2>
        <p className="text-danger">
          Tâche introuvable (id : {id}). 
        </p>
        <Link to="/" className="btn-back">
          Retour au tableau
        </Link>
      </div>
    )
  }

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Détail de la tâche</h2>

        <div className={`task-detail-card status-${task.status}`}>
          <h3 className="card-title">{task.title}</h3>
          {task.description && (
          <p className="card-text">{task.description}</p>
          )}

          <p className="mb-1">
            <strong>Statut :</strong>{' '}
            {task.status === 'todo' && 'À faire'}
            {task.status === 'doing' && 'En cours'}
            {task.status === 'done' && 'Terminé'}
          </p>

          {task.createdAt && (
            <p className="mb-3">
              <strong>Créée le :</strong> {task.createdAt}
            </p>
          )}

          <Link to="/" className="btn btn-secondary">
            Retour au tableau
          </Link>
        </div>
      </div>
  )
}

export default TaskDetail
