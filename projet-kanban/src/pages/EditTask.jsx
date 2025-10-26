import { useParams } from 'react-router-dom'

function EditTask() {
  const { id } = useParams()

  return (
    <div>
      <h2>Modifier la tâche {id}</h2>
    </div>
  )
}

export default EditTask
