function Board() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h4 className="text-center">À faire</h4>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Apprendre React</h5>
              <p className="card-text">Découvrir les composants et les hooks.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <h4 className="text-center">En cours</h4>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Faire le projet Kanban</h5>
              <p className="card-text">Mettre en place les colonnes et le routage.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <h4 className="text-center">Terminé</h4>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Installer React</h5>
              <p className="card-text">Projet initialisé avec Vite.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
