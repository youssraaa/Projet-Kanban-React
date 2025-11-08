import { useEffect, useRef, useState } from 'react'
import Column from './Column'

const initialTasks  = [
    { id: 1, title: 'Apprendre React', description: 'Découvrir les composants et les hooks.', status: 'todo', createdAt: '20/02/2025', },
    { id: 2, title: 'Faire le projet Kanban', description: 'Mettre en place les colonnes et le routage.', status: 'doing', createdAt: '22/10/2025', },
    { id: 3, title: 'Installer React', description: 'Projet initialisé avec Vite.', status: 'done', createdAt: '28/10/2025', },
  ]

function Board({ newTask, updatedTask }) {
  
  const [tasks, setTasks] = useState(initialTasks) 
  const [searchTerm, setSearchTerm] = useState('')        
  const [statusFilter, setStatusFilter] = useState('all') 
  const lastHandledId = useRef(null) 

  // Ajouter une tâche
  useEffect(() => {
    if (newTask  && newTask .id !== lastHandledId.current) {
      setTasks(prev => 
        prev.concat({
          id: newTask.id,
          title: newTask .title,
          description: newTask .description,
          status: newTask .status || 'todo',
          createdAt: newTask.createdAt,
        })
      )
      lastHandledId.current = newTask .id
    }
  }, [newTask])

  // Modifier une tâche
 useEffect(() => {
  if (updatedTask) {
    setTasks(prev => {
      let found = false

      const updatedList = prev.map(t => {
        if (t.id !== updatedTask.id) return t

        found = true
        return {
          id: t.id,
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
          createdAt: t.createdAt, 
        }
      })

      // Si la tâche n'existe pas encore (ex : créée puis modifiée aussitôt), on l'ajoute à la liste
      if (!found) {
        const now = new Date()
        return updatedList.concat({
          id: updatedTask.id,
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
          createdAt: now.toLocaleDateString('fr-FR'),
        })
      }

      return updatedList
    })
  }
}, [updatedTask])

  // Supprimer une tâche
  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
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
