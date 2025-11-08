import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Kanban</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Tableau</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new">Nouvelle tâche</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
