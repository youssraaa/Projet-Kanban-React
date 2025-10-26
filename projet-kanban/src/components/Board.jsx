import Column from './Column'

function Board() {
  
  const tasks = [
    { id: 1, title: 'Apprendre React', description: 'Découvrir les composants et les hooks.', status: 'todo' },
    { id: 2, title: 'Faire le projet Kanban', description: 'Mettre en place les colonnes et le routage.', status: 'doing' },
    { id: 3, title: 'Installer React', description: 'Projet initialisé avec Vite.', status: 'done' },
  ]

  const todo = tasks.filter(t => t.status === 'todo')
  const doing = tasks.filter(t => t.status === 'doing')
  const done  = tasks.filter(t => t.status === 'done')

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <Column title="À faire" tasks={todo} />
        <Column title="En cours" tasks={doing} />
        <Column title="Terminé" tasks={done} />
      </div>
    </div>
  )
}
export default Board
