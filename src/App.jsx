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

       {/* GRIGLIA DELLE STATISTICHE (Saldo, Entrate, Uscite) */}
    <section className="stats-container">
      <div className="stat-card balance">
        <h3>Saldo Totale</h3>
        <p className="amount">€ 0.00</p>
      </div>
      <div className="stat-card income">
            <h3>Entrate Mese</h3>
            <p className="amount">€ 0.00</p>
          </div>
          <div className="stat-card expense">
            <h3>Uscite Mese</h3>
            <p className="amount">€ 0.00</p>
          </div>
    </section>

       {/* GRIGLIA INFERIORE (Grafici e Tabella) */}
    <section className="data-container">
      <div className="chat-area">
        <h3>Analisi Spesa</h3>
        <div className="placeholder-box">Il grafico CSS andrà qui</div>
      </div>

      <div className="table-area">
        <h3>Ultime Transazioni</h3>
        <div className="placeholder-box">La tabella React andrà qui</div>
      </div>
      </section>    
   </div>
  )
}

export default App
