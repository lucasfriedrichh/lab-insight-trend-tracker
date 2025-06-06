
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTabItem } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, Bell, Shield, Palette, 
  Key, Mail, Phone, MapPin,
  Save, Eye, EyeOff
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UserSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    department: '',
    position: ''
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    systemUpdates: true,
    qualityAlerts: true,
    maintenanceReminders: false,
    weeklyReports: true
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleNotificationsSave = () => {
    toast({
      title: "Preferências salvas",
      description: "Suas configurações de notificação foram atualizadas.",
    });
  };

  const handlePasswordChange = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    });
    
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>
          <p className="text-slate-600">Gerencie suas preferências e informações pessoais</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTabItem value="profile">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTabItem>
          <TabsTabItem value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTabItem>
          <TabsTabItem value="security">
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </TabsTabItem>
          <TabsTabItem value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Aparência
          </TabsTabItem>
        </TabsList>

        {/* Configurações de perfil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Mantenha suas informações atualizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="+55 (11) 99999-9999"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    placeholder="Ex: Laboratório de Análises"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                    placeholder="Ex: Analista Sênior"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  placeholder="Endereço completo"
                />
              </div>
              
              <Button onClick={handleProfileSave} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <Label>Alertas por Email</Label>
                    </div>
                    <p className="text-sm text-slate-600">
                      Receber notificações importantes por email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, emailAlerts: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-primary" />
                      <Label>Atualizações do Sistema</Label>
                    </div>
                    <p className="text-sm text-slate-600">
                      Notificações sobre atualizações e manutenção
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, systemUpdates: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <Label>Alertas de Qualidade</Label>
                    </div>
                    <p className="text-sm text-slate-600">
                      Avisos sobre limites de controle excedidos
                    </p>
                  </div>
                  <Switch
                    checked={notifications.qualityAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, qualityAlerts: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-primary" />
                      <Label>Lembretes de Manutenção</Label>
                    </div>
                    <p className="text-sm text-slate-600">
                      Notificações de calibração e manutenção
                    </p>
                  </div>
                  <Switch
                    checked={notifications.maintenanceReminders}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, maintenanceReminders: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <Label>Relatórios Semanais</Label>
                    </div>
                    <p className="text-sm text-slate-600">
                      Resumo semanal das atividades
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, weeklyReports: checked})
                    }
                  />
                </div>
              </div>
              
              <Button onClick={handleNotificationsSave} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de segurança */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Mantenha sua conta segura alterando sua senha
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={security.currentPassword}
                      onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                      placeholder="Digite sua senha atual"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={security.newPassword}
                    onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                    placeholder="Digite sua nova senha"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                    placeholder="Confirme sua nova senha"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Dicas de Segurança:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use pelo menos 8 caracteres</li>
                  <li>• Inclua letras maiúsculas e minúsculas</li>
                  <li>• Adicione números e símbolos</li>
                  <li>• Evite informações pessoais</li>
                </ul>
              </div>
              
              <Button onClick={handlePasswordChange} className="w-full md:w-auto">
                <Key className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de aparência */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalização</CardTitle>
              <CardDescription>
                Customize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Tema de Cores</Label>
                  <p className="text-sm text-slate-600 mb-4">Selecione o tema de sua preferência</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border-2 border-primary rounded-lg cursor-pointer">
                      <div className="w-full h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">Azul Claro (Atual)</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
                      <div className="w-full h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">Verde</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
                      <div className="w-full h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">Roxo</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Modo Escuro</Label>
                    <p className="text-sm text-slate-600">
                      Ativar tema escuro para reduzir o cansaço visual
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Animações</Label>
                    <p className="text-sm text-slate-600">
                      Ativar animações na interface
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button className="w-full md:w-auto">
                <Palette className="w-4 h-4 mr-2" />
                Aplicar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
