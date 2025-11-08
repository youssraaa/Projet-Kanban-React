import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>

      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
