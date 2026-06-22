import { useState } from 'react';
import { mockTransactions } from './data';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Alimentari',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date
    };
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false);
    setFormData({ description: '', amount: '', type: 'expense', category: 'Alimentari', date: new Date().toISOString().split('T')[0] });
  };

  // --- ELIMINA TRANSAZIONE ---
  const handleDeleteTransaction = (idToRemove) => {
    // Filtriamo l'array tenendo solo gli elementi che NON hanno quell'ID
    const updatedTransactions = transactions.filter(t => t.id !== idToRemove);
    setTransactions(updatedTransactions);
  };
  // ------------------------------------------

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const colors = ['#ee5d50', '#f39c12', '#3498db', '#9b59b6', '#1abc9c', '#e74c3c'];
  const chartData = Object.keys(expensesByCategory).map((category, index) => ({
    category,
    amount: expensesByCategory[category],
    color: colors[index % colors.length]
  }));

  let accumulatedPercentage = 0;
  const gradientStops = chartData.map(item => {
    const percentage = (item.amount / totalExpense) * 100;
    const start = accumulatedPercentage;
    accumulatedPercentage += percentage;
    return `${item.color} ${start}% ${accumulatedPercentage}%`;
  });
  
  const conicGradientString = gradientStops.length > 0 
    ? `conic-gradient(${gradientStops.join(', ')})`
    : 'none';

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
          <div className="header-actions">
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>
              + Nuova Transazione
            </button>
            <div className="user-profile">Gennaro B.</div>
          </div>
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
            {totalExpense > 0 ? (
              <div className="chart-wrapper">
                <div className="pie-chart" style={{ background: conicGradientString }}></div>
                <ul className="chart-legend">
                  {chartData.map(item => (
                    <li key={item.category}>
                      <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                      <span className="legend-text">{item.category}</span>
                      <span className="legend-value">{((item.amount / totalExpense) * 100).toFixed(0)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="placeholder-box">Nessuna uscita da analizzare.</div>
            )}
          </div>
          
          <div className="table-area">
            <div className="table-header-flex">
              <h3>Ultime Transazioni</h3>
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
                    <th></th> {/* Cella vuota per la colonna della X */}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => (
                      <tr key={t.id}>
                        <td>{new Date(t.date).toLocaleDateString('it-IT')}</td>
                        <td>{t.description}</td>
                        <td><span className="badge">{t.category}</span></td>
                        <td className={`amount-cell ${t.type}`}>
                          {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount)}
                        </td>
                        {/* Nuova cella con il pulsante X */}
                        <td className="action-cell">
                          <button 
                            className="delete-btn" 
                            onClick={() => handleDeleteTransaction(t.id)}
                            title="Elimina"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>Nessuna transazione trovata</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Aggiungi Transazione</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="transaction-form">
              <div className="form-group">
                <label>Descrizione</label>
                <input 
                  type="text" 
                  required 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Es. Spesa Conad"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Importo (€)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0.01" 
                    required 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Data</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="expense">Uscita</option>
                    <option value="income">Entrata</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Alimentari">Alimentari</option>
                    <option value="Lavoro">Lavoro</option>
                    <option value="Svago">Svago</option>
                    <option value="Trasporti">Trasporti</option>
                    <option value="Utenze">Utenze</option>
                    <option value="Extra">Extra</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-submit">Salva Transazione</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;