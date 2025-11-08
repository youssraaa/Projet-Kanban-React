import { useEffect, useState } from 'react'
import Column from './Column'

const TASKS_URL = 'http://localhost:3001/tasks'

function Board() {

  const [tasks, setTasks] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')        
  const [statusFilter, setStatusFilter] = useState('all') 

  // Charger les tâches depuis le serveur (GET /tasks)
  async function loadTasks() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(TASKS_URL)
      if (!response.ok) {
        throw new Error('Erreur réseau lors du chargement des tâches')
      }

      const data = await response.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  // Supprimer une tâche (DELETE /tasks/:id)
  const handleDelete = async (id) => {
  try {
    const response = await fetch(`${TASKS_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la tâche')
    }

    // Si la suppression côté serveur a réussi, on met à jour l'état local
    setTasks(prev => prev.filter(t => t.id !== id))
  } catch (err) {
    console.error(err)
    alert('Erreur lors de la suppression de la tâche')
    }
  }

  // Déplacer une tâche
  const handleMove = (id, direction) => {
    setTasks(tasks.map(t => {
      if (t.id !== id) return t

      let newStatus = t.status

      // Vers la gauche
      if (direction === -1 && t.status === 'doing') newStatus = 'todo'
      if (direction === -1 && t.status === 'done') newStatus = 'doing'

      // Vers la droite
      if (direction === 1 && t.status === 'todo') newStatus = 'doing'
      if (direction === 1 && t.status === 'doing') newStatus = 'done'

     return {
       id: t.id,
       title: t.title,
       description: t.description,
       status: newStatus,
       createdAt: t.createdAt,
      }
    }))
  }
  
  // Filtrage par mot-clé + statut
  const filteredTasks = tasks.filter(t => {
    const keyword = searchTerm.toLowerCase()
    const titleMatch = t.title.toLowerCase().includes(keyword)
    const descMatch = (t.description || '').toLowerCase().includes(keyword)

    const statusMatch =
      statusFilter === 'all' ? true : t.status === statusFilter

    return (titleMatch || descMatch) && statusMatch
  })

  const todo = filteredTasks.filter(t => t.status === 'todo')
  const doing = filteredTasks.filter(t => t.status === 'doing')
  const done  = filteredTasks.filter(t => t.status === 'done')
  
  if (loading) {
  return <p className="m-3">Chargement des tâches...</p>
  }

  if (error) {
  return <p className="m-3 text-danger">Erreur : {error}</p>
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mt-2 mt-md-0">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="todo">À faire</option>
            <option value="doing">En cours</option>
            <option value="done">Terminé</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        <Column title="À faire" tasks={todo} onDeleteTask={handleDelete} onMoveTask={handleMove} />
        <Column title="En cours" tasks={doing} onDeleteTask={handleDelete} onMoveTask={handleMove} />
        <Column title="Terminé" tasks={done} onDeleteTask={handleDelete} onMoveTask={handleMove} />
      </div>
    </div>
  )
}
export default Board
