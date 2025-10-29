function TaskCard({ title, description, onDelete, onMoveLeft, onMoveRight }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {description && <p className="card-text">{description}</p>}

        <div className="d-flex justify-content-between">
          <div>
            {onMoveLeft && (
              <button className="btn btn-sm btn-outline-secondary me-1" onClick={onMoveLeft} title="Déplacer à gauche">
                <i className="bi bi-arrow-left"></i>
              </button>
            )}
            {onMoveRight && (
              <button className="btn btn-sm btn-outline-secondary" onClick={onMoveRight} title="Déplacer à droite">
                <i className="bi bi-arrow-right"></i>
              </button>
            )}
          </div>
          {onDelete && (
            <button className="btn btn-sm btn-outline-danger" onClick={onDelete} title="Supprimer la tâche">
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard
