import TaskCard from './TaskCard'

function Column({ title, tasks = [] }) {
  return (
    <div className="col-md-4">
      <h4 className="text-center mb-3">{title}</h4>
      {tasks.map(t => (
        <TaskCard key={t.id} title={t.title} description={t.description} />
      ))}
    </div>
  )
}

export default Column
