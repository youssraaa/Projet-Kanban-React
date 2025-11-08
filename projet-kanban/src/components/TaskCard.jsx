import { useNavigate } from 'react-router-dom'

function TaskCard({ id, title, description, status, createdAt, onDelete, onMoveLeft, onMoveRight }) {
  const navigate = useNavigate()

  return (
     <div className="card mb-3 kanban-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="card-title mb-0 text-center w-100">{title}</h5>
        </div>

        {description && <p className="card-text text-center">{description}</p>}

        {createdAt && (
          <p className="task-date text-center mb-3">
            Créée le {createdAt}
          </p>
        )}

        <div className="d-flex justify-content-between">
          <div>
            {onMoveLeft && (
              <button className="btn btn-move me-1" onClick={onMoveLeft} title="Déplacer à gauche">
                <i className="bi bi-arrow-left"></i>
              </button>
            )}
            {onMoveRight && (
              <button className="btn btn-move" onClick={onMoveRight} title="Déplacer à droite">
                <i className="bi bi-arrow-right"></i>
              </button>
            )}
            <button
              className="btn btn-view me-1"
              onClick={() => navigate(`/task/${id}`, {state: { task: { id, title, description, status, createdAt } },})}
              title="Voir le détail"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="btn btn-edit me-1"
              onClick={() => navigate(`/edit/${id}`, { state: { task: { id, title, description, status, createdAt } } })}
              title="Modifier la tâche"
            >
              <i className="bi bi-pencil-square"></i>
            </button>      
          </div>
          {onDelete && (
            <button className="btn btn-delete" onClick={onDelete} title="Supprimer la tâche">
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
