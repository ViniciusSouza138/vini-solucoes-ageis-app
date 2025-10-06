
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { UserType } from '../types';
import ClientDashboard from './ClientDashboard';
import WorkerDashboard from './WorkerDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return user.type === UserType.Client ? <ClientDashboard /> : <WorkerDashboard />;
};

export default DashboardPage;
