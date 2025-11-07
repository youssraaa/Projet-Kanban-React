import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Board from '../components/Board'

function Home() {

  const location = useLocation()
  const navigate = useNavigate()
  const incomingTask = location.state?.newTask
  
  useEffect(() => {
    if (incomingTask) {
      navigate('.', { replace: true, state: null })
    }
  }, [incomingTask, navigate])

  return (
    <div>
      <h2 className="mb-4">Tableau Kanban</h2>
      <Board incomingTask={incomingTask} />
    </div>
  )
}

export default Home
