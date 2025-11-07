import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Board from '../components/Board'

function Home() {

  const location = useLocation()
  const navigate = useNavigate()
  
  // Tâche créée depuis /new
  const newTask = location.state?.newTask || null

  // Tâche modifiée depuis /edit/:id
  const updatedTask = location.state?.updatedTask || null
  
  useEffect(() => {
    if (newTask || updatedTask) {
      navigate('.', { replace: true, state: null })
    }
  }, [newTask, updatedTask, navigate])

  return (
    <div>
      <h2 className="mb-4">Tableau Kanban</h2>
      <Board newTask={newTask} updatedTask={updatedTask} />
    </div>
  )
}

export default Home
