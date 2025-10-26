function TaskCard({ title, description }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {description && <p className="card-text">{description}</p>}
      </div>
    </div>
  )
}

export default TaskCard
