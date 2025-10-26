import { useParams } from 'react-router-dom'

function TaskDetail() {
  const { id } = useParams()

  return (
    <div>
      <h2>Détail de la tâche {id}</h2>
    </div>
  )
}

export default TaskDetail
