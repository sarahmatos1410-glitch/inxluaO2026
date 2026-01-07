
import React, { useState, useEffect } from 'react';
import { User, UserRole, Student, DailyLog } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { DatabaseService } from './services/databaseService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // Inicializa dados e tenta sincronizar com a nuvem
  useEffect(() => {
    // 1. Carrega o que tiver no localStorage primeiro (mais rápido)
    const local = localStorage.getItem('inclu_logs');
    if (local) setLogs(JSON.parse(local));

    setStudents([
      { id: '1', name: 'João Silva', grade: '3º Ano A', needs: 'Autismo (TEA)' },
      { id: '2', name: 'Maria Oliveira', grade: '5º Ano B', needs: 'TDAH' },
      { id: '3', name: 'Lucas Santos', grade: '2º Ano C', needs: 'Deficiência Auditiva' },
    ]);

    // 2. Tenta buscar dados da nuvem se as chaves estiverem configuradas
    syncWithCloud();
  }, []);

  const syncWithCloud = async () => {
    const config = DatabaseService.getConfig();
    if (config) {
      setIsSyncing(true);
      const cloudLogs = await DatabaseService.fetchLogs();
      if (cloudLogs.length > 0) {
        setLogs(cloudLogs);
        localStorage.setItem('inclu_logs', JSON.stringify(cloudLogs));
        setIsOnline(true);
      }
      setIsSyncing(false);
    }
  };

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addLog = async (newLog: DailyLog) => {
    // Salva localmente primeiro
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('inclu_logs', JSON.stringify(updated));

    // Tenta salvar na nuvem
    const success = await DatabaseService.saveLog(newLog);
    if (success) {
      console.log("Log sincronizado com a nuvem.");
      setIsOnline(true);
    }
  };

  const deleteLog = async (logId: string) => {
    // Remove localmente
    const updated = logs.filter(l => l.id !== logId);
    setLogs(updated);
    localStorage.setItem('inclu_logs', JSON.stringify(updated));

    // Remove na nuvem
    await DatabaseService.deleteLog(logId);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        isOnline={isOnline} 
        isSyncing={isSyncing} 
        onRefresh={syncWithCloud}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard 
          user={user} 
          students={students} 
          logs={logs} 
          addLog={addLog}
          deleteLog={deleteLog}
        />
      </main>
    </div>
  );
};

export default App;
