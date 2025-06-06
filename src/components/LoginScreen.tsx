
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, FlaskConical, Shield, Users, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    if (!success) {
      toast({
        title: "Erro de autenticação",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
    }
  };

  const demoAccounts = [
    { email: 'admin@lab.com', role: 'Administrador', icon: Shield, color: 'text-red-600' },
    { email: 'user@lab.com', role: 'Usuário', icon: Users, color: 'text-blue-600' },
    { email: 'analyst@lab.com', role: 'Analista', icon: BarChart3, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Lado esquerdo - Informações do sistema */}
        <div className="text-white space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FlaskConical size={48} className="text-white" />
              <h1 className="text-4xl font-bold">ISO 17025</h1>
            </div>
            <h2 className="text-2xl font-semibold">Sistema de Garantia da Validade dos Resultados</h2>
            <p className="text-xl opacity-90">
              Plataforma integrada para gestão de qualidade laboratorial conforme ISO/IEC 17025:2017
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="w-8 h-8 mb-2" />
              <h3 className="font-semibold">Controle de Qualidade</h3>
              <p className="text-sm opacity-80">Monitoramento contínuo</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <BarChart3 className="w-8 h-8 mb-2" />
              <h3 className="font-semibold">Cartas de Controle</h3>
              <p className="text-sm opacity-80">Análise estatística</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="w-8 h-8 mb-2" />
              <h3 className="font-semibold">Gestão de Usuários</h3>
              <p className="text-sm opacity-80">Controle de acesso</p>
            </div>
          </div>
        </div>

        {/* Lado direito - Formulário de login */}
        <div className="space-y-6">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-slate-800">Acesso ao Sistema</CardTitle>
              <CardDescription className="text-slate-600">
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contas demo */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Contas Demo</CardTitle>
              <CardDescription>Use uma das contas abaixo (senha: demo123)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoAccounts.map((account, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/50 cursor-pointer hover:bg-white/70 transition-colors"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('demo123');
                  }}
                >
                  <div className="flex items-center gap-3">
                    <account.icon className={`w-5 h-5 ${account.color}`} />
                    <div>
                      <p className="font-medium">{account.email}</p>
                      <p className="text-sm text-slate-600">{account.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Usar</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
