import { useState, useEffect } from 'react';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import RemoteWidget from './components/RemoteWidget';

const records_arr = [{name: "프네롯", week: 10, culv: 110000, flag: 1000}];
  for (let i = 1; i < 100; i++)
      records_arr.push(records_arr[0]);

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isCapturing, setIsCapturing] = useState(true);
  const [records, setRecords] = useState(records_arr);

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
      
      <MainDashboard records={records} setRecords={setRecords} />
      {isCapturing && <RemoteWidget records={records} setRecords={setRecords} />}
    </div>
  );
}

export default App;