import TaskCard from './TaskCard'

function Column({ title, tasks = [], onDeleteTask, onMoveTask }) {
  return (
    <div className="col-md-4">
      <h4 className="text-center mb-3">{title}</h4>

      {tasks.map((t) => {

        let moveLeft = null
        let moveRight = null

        if (t.status !== 'todo') {
          moveLeft = () => onMoveTask(t.id, -1)
        }

        if (t.status !== 'done') {
          moveRight = () => onMoveTask(t.id, 1)
        }

        return (
          <TaskCard
            id={t.id}
            title={t.title}
            description={t.description}
            status={t.status}
            createdAt={t.createdAt} 
            onDelete={() => onDeleteTask(t.id)}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
          />
        )
      })}
    </div>
  )
}

export default Column
