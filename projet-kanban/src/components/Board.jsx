import { useEffect, useRef, useState } from 'react'
import Column from './Column'

const initialTasks  = [
    { id: 1, title: 'Apprendre React', description: 'Découvrir les composants et les hooks.', status: 'todo' },
    { id: 2, title: 'Faire le projet Kanban', description: 'Mettre en place les colonnes et le routage.', status: 'doing' },
    { id: 3, title: 'Installer React', description: 'Projet initialisé avec Vite.', status: 'done' },
  ]

function Board({ newTask, updatedTask }) {
  
  const [tasks, setTasks] = useState(initialTasks) 
  const lastHandledId = useRef(null) 

  // Ajouter une tâche
  useEffect(() => {
    if (newTask  && newTask .id !== lastHandledId.current) {
      setTasks(prev => {
        const nextId = prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1
        const t = {
          id: nextId,
          title: newTask .title,
          description: newTask .description,
          status: newTask .status || 'todo',
        }
        return prev.concat(t)
      })
      lastHandledId.current = newTask .id
    }
  }, [newTask])

  // Modifier une tâche
 useEffect(() => {
    if (updatedTask) {
      setTasks(prev =>
        prev.map(t => {
          if (t.id !== updatedTask.id) return t
          return {
            id: t.id,
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
          }
        })
      )
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
       status: newStatus
      }
    }))
  }

  const todo = tasks.filter(t => t.status === 'todo')
  const doing = tasks.filter(t => t.status === 'doing')
  const done  = tasks.filter(t => t.status === 'done')

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <Column title="À faire" tasks={todo} onDeleteTask={handleDelete} onMoveTask={handleMove} />
        <Column title="En cours" tasks={doing} onDeleteTask={handleDelete} onMoveTask={handleMove} />
        <Column title="Terminé" tasks={done} onDeleteTask={handleDelete} onMoveTask={handleMove} />
      </div>
    </div>
  )
}
export default Board
