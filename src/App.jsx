import './App.css'

function App() {
  
  return (
   <div className="dashboard-layout">

        {/* SIDEBAR LATERALE*/}
    
    <aside className="sidebar">
      <div className="logo">
        <h2>📊 FinDash</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="active">Dashboard</li>
          <li>Transazioni</li>
          <li>Impostazioni</li>
        </ul>
      </nav>
    </aside>

       {/* AREA PRINCIPALE */}
    <main className="main-content">
      <header className="top-header">
        <h1>Panoramica Portafoglio</h1>
        <div className="user-profile">Gennaro B.</div>
      </header>
    </main>
   </div>
  )
}

export default App
