import { useState } from 'react';
import { mockTransactions } from './data';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  
  // --- NUOVI STATI PER I FILTRI ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', o 'expense'

  // Creiamo un nuovo array che contiene solo le transazioni che superano i nostri test
  const filteredTransactions = transactions.filter(t => {
    // Controllo Ricerca: il testo coincide con la descrizione o la categoria?
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     t.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Controllo Tipo: è tutto, o combacia con entrate/uscite?
    const matchesType = filterType === 'all' || t.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Ora calcoliamo i totali basandoci su 'filteredTransactions', non su 'transactions' totali!
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="dashboard-layout">
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

      <main className="main-content">
        <header className="top-header">
          <h1>Panoramica Portafoglio</h1>
          <div className="user-profile">Gennaro B.</div>
        </header>

        <section className="stats-container">
          <div className="stat-card balance">
            <h3>Saldo Mostrato</h3>
            <p className="amount">{formatMoney(balance)}</p>
          </div>
          <div className="stat-card income">
            <h3>Entrate</h3>
            <p className="amount">{formatMoney(totalIncome)}</p>
          </div>
          <div className="stat-card expense">
            <h3>Uscite</h3>
            <p className="amount">{formatMoney(totalExpense)}</p>
          </div>
        </section>

        <section className="data-container">
          <div className="chart-area">
            <h3>Analisi Spese</h3>
            <div className="placeholder-box">Il grafico CSS andrà qui</div>
          </div>
          
          <div className="table-area">
            <div className="table-header-flex">
              <h3>Ultime Transazioni</h3>
              
              {/* --- NUOVA BARRA DEI FILTRI --- */}
              <div className="filters">
                <input 
                  type="text" 
                  placeholder="Cerca transazione..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="type-select"
                >
                  <option value="all">Tutte</option>
                  <option value="income">Solo Entrate</option>
                  <option value="expense">Solo Uscite</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrizione</th>
                    <th>Categoria</th>
                    <th>Importo</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Usiamo l'array filtrato al posto di quello originale! */}
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => (
                      <tr key={t.id}>
                        <td>{new Date(t.date).toLocaleDateString('it-IT')}</td>
                        <td>{t.description}</td>
                        <td><span className="badge">{t.category}</span></td>
                        <td className={`amount-cell ${t.type}`}>
                          {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>Nessuna transazione trovata</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;