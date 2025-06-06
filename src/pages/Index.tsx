
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTabItem } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Activity, BarChart3, Users, Calendar } from 'lucide-react';
import ControlChartForm from '@/components/ControlChartForm';
import QualityMetrics from '@/components/QualityMetrics';
import ReferenceMaterialManager from '@/components/ReferenceMaterialManager';
import TrendAnalysis from '@/components/TrendAnalysis';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dados simulados para demonstração
  const controlData = [
    { day: 1, value: 98.5, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
    { day: 2, value: 99.1, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
    { day: 3, value: 97.8, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
    { day: 4, value: 98.9, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
    { day: 5, value: 99.3, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
    { day: 6, value: 101.5, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
    { day: 7, value: 98.1, ucl: 101.2, lcl: 95.8, centerLine: 98.5 },
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Ponto fora do limite superior detectado na Carta de Médias - Método A001',
      timestamp: '2024-06-06 14:30'
    },
    {
      id: 2,
      type: 'info',
      message: '9 pontos consecutivos na zona C - Verificar tendência',
      timestamp: '2024-06-06 13:15'
    }
  ];

  const handleChartDataUpdate = (data: any) => {
    console.log('Chart data updated:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Sistema de Garantia da Validade dos Resultados
          </h1>
          <p className="text-slate-600 text-lg">
            Conforme ISO/IEC 17025:2017 - Gestão Integrada de Qualidade Laboratorial
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-1/2">
            <TabsTabItem value="dashboard">Dashboard</TabsTabItem>
            <TabsTabItem value="control-charts">Cartas de Controle</TabsTabItem>
            <TabsTabItem value="materials">Materiais de Ref.</TabsTabItem>
            <TabsTabItem value="analysis">Análises</TabsTabItem>
            <TabsTabItem value="trends">Tendências</TabsTabItem>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Alertas */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Alertas Ativos
              </h2>
              {alerts.map((alert) => (
                <Alert key={alert.id} className={alert.type === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="flex justify-between items-center">
                    <span>{alert.message}</span>
                    <Badge variant="outline">{alert.timestamp}</Badge>
                  </AlertDescription>
                </Alert>
              ))}
            </div>

            {/* Métricas Principais */}
            <QualityMetrics />

            {/* Carta de Controle Principal */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Carta de Controle - Tendência Central (Última Semana)
                </CardTitle>
                <CardDescription>
                  Material de Referência MRC-001 - Método de Análise A001
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={controlData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    
                    {/* Limites de Controle */}
                    <ReferenceLine y={101.2} stroke="#ef4444" strokeDasharray="5 5" label="LSC" />
                    <ReferenceLine y={95.8} stroke="#ef4444" strokeDasharray="5 5" label="LIC" />
                    <ReferenceLine y={98.5} stroke="#22c55e" strokeDasharray="3 3" label="LC" />
                    
                    {/* Dados */}
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      name="Valores Medidos"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status dos Processos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processos Monitorados</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">
                    +2 novos este mês
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conformidade Geral</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">96.8%</div>
                  <p className="text-xs text-muted-foreground">
                    +1.2% vs mês anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Causas Especiais</CardTitle>
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <p className="text-xs text-muted-foreground">
                    Requer ação corretiva
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cartas de Controle Tab */}
          <TabsContent value="control-charts">
            <ControlChartForm onChartDataUpdate={handleChartDataUpdate} />
          </TabsContent>

          {/* Materiais de Referência Tab */}
          <TabsContent value="materials">
            <ReferenceMaterialManager />
          </TabsContent>

          {/* Análises Tab */}
          <TabsContent value="analysis">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Análises Estatísticas</CardTitle>
                <CardDescription>
                  Ferramentas de análise para avaliação da qualidade dos resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2">
                    <BarChart3 className="w-6 h-6" />
                    Teste de Normalidade
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Activity className="w-6 h-6" />
                    Teste t
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <TrendingUp className="w-6 h-6" />
                    ANOVA
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <CheckCircle className="w-6 h-6" />
                    Coeficiente de Variação
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Users className="w-6 h-6" />
                    Erro Normalizado
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline">
                    <Calendar className="w-6 h-6" />
                    Recuperação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tendências Tab */}
          <TabsContent value="trends">
            <TrendAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
