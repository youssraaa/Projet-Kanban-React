import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <header>
        <h1 style={{ margin: '16px' }}>Kanban</h1>
      </header>

      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
