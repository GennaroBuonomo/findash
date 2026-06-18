# 📊 FinDash - Personal Finance & Portfolio Dashboard

Una Single Page Application (SPA) sviluppata in React per il monitoraggio avanzato del portafoglio finanziario e il tracciamento delle spese.

Progettata per dimostrare come gestire set di dati complessi e visualizzazioni grafiche custom senza l'ausilio di librerie esterne, FinDash unisce logiche di business rigorose a un'interfaccia utente premium e ultra-reattiva.

## 🎯 Obiettivi del Progetto & Architettura

L'intera interfaccia è stata ingegnerizzata da zero in **puro CSS** (sfruttando Grid e Flexbox), garantendo un layout infrangibile, scalabile e un controllo visivo totale, bypassando i classici framework UI (come Bootstrap o Tailwind).

Le logiche di calcolo e i filtri di ricerca sono gestiti tramite metodi avanzati di JavaScript (`reduce`, `filter`, `map`), dimostrando una solida padronanza della gestione dello stato in React e delle performance dell'applicazione.

## 🚀 Funzionalità Principali

- **Real-time Data Processing:** Calcolo dinamico e istantaneo del saldo totale, totale entrate e totale uscite basato sulle transazioni attive.
- **Motore di Ricerca & Filtri:** Possibilità di filtrare le transazioni per categoria, tipologia (Entrata/Uscita) o ricerca testuale, con aggiornamento a cascata di tutte le statistiche della dashboard.
- **Data Visualization in CSS Puro:** Costruzione di grafici analitici (es. grafici a torta e barre di progresso del budget) generati dinamicamente calcolando le percentuali nello stato React e iniettandole in funzioni CSS come `conic-gradient()`. Zero dipendenze da Chart.js o simili.
- **UX Premium & Responsive Design:** Interfaccia modulare costruita con CSS Grid, ottimizzata per la leggibilità dei dati finanziari e completamente responsiva.

## 💻 Tech Stack

- **Frontend Library:** React (v18+) con Vite
- **Linguaggio:** JavaScript (ES6+)
- **Styling:** Custom CSS3 (CSS Grid, Flexbox, CSS Variables, Conic Gradients)
- **Data Management:** React State Hooks (`useState`, `useEffect`), Custom Hooks
