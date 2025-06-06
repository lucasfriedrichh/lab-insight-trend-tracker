
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTabItem } from '@/components/ui/tabs';
import { 
  Users, Settings, Shield, Database, 
  BarChart3, FileText, AlertTriangle, 
  CheckCircle, Clock, Trash2, Edit,
  Plus, Download, Upload
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  const users = [
    {
      id: '1',
      name: 'Dr. Ana Silva',
      email: 'ana@lab.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2 horas atrás',
      createdAt: '2023-01-15'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      email: 'carlos@lab.com',
      role: 'user',
      status: 'active',
      lastLogin: '1 dia atrás',
      createdAt: '2023-02-20'
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      email: 'maria@lab.com',
      role: 'analyst',
      status: 'inactive',
      lastLogin: '1 semana atrás',
      createdAt: '2023-03-10'
    }
  ];

  const systemLogs = [
    {
      id: '1',
      type: 'info',
      message: 'Sistema iniciado com sucesso',
      timestamp: '2024-01-15 08:00:00',
      user: 'Sistema'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Limite de controle excedido - Amostra XRF-001',
      timestamp: '2024-01-15 10:30:00',
      user: 'maria@lab.com'
    },
    {
      id: '3',
      type: 'error',
      message: 'Falha na conexão com banco de dados',
      timestamp: '2024-01-15 14:15:00',
      user: 'Sistema'
    },
    {
      id: '4',
      type: 'success',
      message: 'Backup realizado com sucesso',
      timestamp: '2024-01-15 18:00:00',
      user: 'Sistema'
    }
  ];

  const systemStats = [
    { label: 'Usuários Ativos', value: '12', change: '+2', color: 'text-blue-600' },
    { label: 'Análises do Mês', value: '1,247', change: '+15%', color: 'text-green-600' },
    { label: 'Alertas Pendentes', value: '3', change: '-5', color: 'text-amber-600' },
    { label: 'Uptime do Sistema', value: '99.9%', change: 'Estável', color: 'text-emerald-600' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'analyst':
        return 'bg-blue-100 text-blue-800';
      case 'user':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'info':
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Painel Administrativo</h1>
          <p className="text-slate-600 mt-2">Gestão completa do sistema ISO 17025</p>
        </div>
        <Shield size={48} className="text-primary opacity-20" />
      </div>

      {/* Estatísticas do sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTabItem value="users">
            <Users className="w-4 h-4 mr-2" />
            Usuários
          </TabsTabItem>
          <TabsTabItem value="system">
            <Settings className="w-4 h-4 mr-2" />
            Sistema
          </TabsTabItem>
          <TabsTabItem value="logs">
            <FileText className="w-4 h-4 mr-2" />
            Logs
          </TabsTabItem>
          <TabsTabItem value="backup">
            <Database className="w-4 h-4 mr-2" />
            Backup
          </TabsTabItem>
        </TabsList>

        {/* Gestão de usuários */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestão de Usuários</CardTitle>
                  <CardDescription>Controle de acesso e permissões</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-slate-600">{user.email}</p>
                        <p className="text-xs text-slate-500">Último acesso: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role === 'admin' ? 'Admin' : user.role === 'analyst' ? 'Analista' : 'Usuário'}
                      </Badge>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações do sistema */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Parâmetros básicos do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Modo de manutenção</span>
                  <Button variant="outline" size="sm">Desabilitado</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Backup automático</span>
                  <Button variant="outline" size="sm">Habilitado</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notificações por email</span>
                  <Button variant="outline" size="sm">Habilitado</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limites de Controle</CardTitle>
                <CardDescription>Configuração de alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Limite superior (%)</span>
                  <Button variant="outline" size="sm">+3σ</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Limite inferior (%)</span>
                  <Button variant="outline" size="sm">-3σ</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Alertas críticos</span>
                  <Button variant="outline" size="sm">Imediato</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Logs do sistema */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Logs do Sistema</CardTitle>
                  <CardDescription>Histórico de eventos e atividades</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <Button variant="outline">Limpar Logs</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {getLogIcon(log.type)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{log.message}</p>
                      <p className="text-xs text-slate-600">
                        {log.user} • {log.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup e restauração */}
        <TabsContent value="backup" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup</CardTitle>
                <CardDescription>Backup dos dados do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-lg">
                  <Database className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm text-slate-600 mb-4">Último backup: Hoje às 18:00</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Fazer Backup Agora
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Restauração</CardTitle>
                <CardDescription>Restaurar dados de backup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-lg">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-sm text-slate-600 mb-4">Selecione um arquivo de backup</p>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar Arquivo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
