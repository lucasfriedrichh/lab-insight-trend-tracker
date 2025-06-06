
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FlaskConical, BarChart3, TrendingUp, Shield, 
  Clock, CheckCircle, AlertTriangle, Users,
  Calendar, FileText, Settings
} from 'lucide-react';
import QualityMetrics from './QualityMetrics';

const HomePage = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Nova Análise',
      description: 'Registrar nova amostra',
      icon: FlaskConical,
      color: 'bg-blue-500',
      action: () => console.log('Nova análise')
    },
    {
      title: 'Cartas de Controle',
      description: 'Visualizar gráficos',
      icon: BarChart3,
      color: 'bg-green-500',
      action: () => console.log('Cartas de controle')
    },
    {
      title: 'Relatórios',
      description: 'Gerar relatórios',
      icon: FileText,
      color: 'bg-purple-500',
      action: () => console.log('Relatórios')
    },
    {
      title: 'Configurações',
      description: 'Ajustar sistema',
      icon: Settings,
      color: 'bg-orange-500',
      action: () => console.log('Configurações')
    }
  ];

  const recentActivities = [
    {
      action: 'MRC-001 analisado',
      time: '2 horas atrás',
      status: 'success',
      user: 'Maria Oliveira'
    },
    {
      action: 'Carta de controle atualizada',
      time: '4 horas atrás',
      status: 'info',
      user: 'Carlos Santos'
    },
    {
      action: 'Limite de controle excedido',
      time: '6 horas atrás',
      status: 'warning',
      user: 'Sistema'
    },
    {
      action: 'Novo usuário registrado',
      time: '1 dia atrás',
      status: 'success',
      user: 'Dr. Ana Silva'
    }
  ];

  const upcomingTasks = [
    {
      task: 'Calibração do equipamento XRF',
      due: 'Amanhã',
      priority: 'high'
    },
    {
      task: 'Análise de MRC trimestral',
      due: 'Em 3 dias',
      priority: 'medium'
    },
    {
      task: 'Revisão de procedimentos',
      due: 'Em 1 semana',
      priority: 'low'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'info':
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-amber-500 bg-amber-50';
      case 'low':
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header de boas-vindas */}
      <div className="bg-gradient-card rounded-xl p-6 text-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Bem-vindo, {user?.name}!
            </h1>
            <p className="text-lg opacity-80 mt-2">
              Sistema de Garantia da Validade dos Resultados - ISO 17025
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Nível: {user?.role === 'admin' ? 'Administrador' : user?.role === 'analyst' ? 'Analista' : 'Usuário'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
          <FlaskConical size={80} className="opacity-20" />
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                  <action.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-slate-600">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Métricas de qualidade */}
      <QualityMetrics />

      {/* Dashboard em duas colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-slate-600">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver todas as atividades
            </Button>
          </CardContent>
        </Card>

        {/* Tarefas pendentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>
              Próximas atividades programadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                <p className="font-medium text-sm">{task.task}</p>
                <p className="text-xs text-slate-600 mt-1">
                  Prazo: {task.due}
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Ver agenda completa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
