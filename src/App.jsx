import { useState, useEffect } from 'react';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import RemoteWidget from './components/RemoteWidget';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-hidden">
      <Header isDark={isDark} setIsDark={setIsDark} />
      
      <MainDashboard />
      <RemoteWidget />
    </div>
  );
}

export default App;