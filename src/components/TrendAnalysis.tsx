
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Download } from 'lucide-react';

const TrendAnalysis = () => {
  // Dados simulados para análise de tendências
  const performanceData = [
    { month: 'Jan', precision: 2.1, recovery: 98.5, conformity: 95.2 },
    { month: 'Fev', precision: 2.3, recovery: 98.1, conformity: 94.8 },
    { month: 'Mar', precision: 1.9, recovery: 99.2, conformity: 96.5 },
    { month: 'Abr', precision: 2.0, recovery: 98.8, conformity: 96.1 },
    { month: 'Mai', precision: 1.8, recovery: 99.0, conformity: 97.2 },
    { month: 'Jun', precision: 1.7, recovery: 98.9, conformity: 97.8 }
  ];

  const methodComparison = [
    { method: 'Método A001', precision: 1.8, recovery: 98.9, samples: 156 },
    { method: 'Método A002', precision: 2.1, recovery: 97.8, samples: 89 },
    { method: 'Método B001', precision: 1.5, recovery: 99.2, samples: 203 },
    { method: 'Método B002', precision: 2.4, recovery: 98.1, samples: 67 }
  ];

  const trends = [
    {
      parameter: 'Precisão Intermediária',
      trend: 'improving',
      change: '-15.2%',
      description: 'Melhoria consistente nos últimos 6 meses'
    },
    {
      parameter: 'Taxa de Recuperação',
      trend: 'stable',
      change: '+0.4%',
      description: 'Mantendo-se dentro dos limites aceitáveis'
    },
    {
      parameter: 'Conformidade Geral',
      trend: 'improving',
      change: '+2.6%',
      description: 'Evolução positiva na conformidade dos processos'
    },
    {
      parameter: 'Causas Especiais',
      trend: 'worsening',
      change: '+12.5%',
      description: 'Aumento na detecção de variações especiais'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'worsening':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <Badge className="bg-green-100 text-green-800">Melhorando</Badge>;
      case 'worsening':
        return <Badge className="bg-red-100 text-red-800">Piorando</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Estável</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Análise de Tendências
        </h2>
        <div className="flex items-center gap-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Resumo de Tendências */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trends.map((trend, index) => (
          <Card key={index} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-700">
                  {trend.parameter}
                </CardTitle>
                {getTrendIcon(trend.trend)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-slate-800">
                {trend.change}
              </div>
              
              <div className="flex justify-between items-center">
                {getTrendBadge(trend.trend)}
              </div>
              
              <p className="text-xs text-slate-600">
                {trend.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Performance ao Longo do Tempo */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Performance Temporal dos Indicadores
          </CardTitle>
          <CardDescription>
            Evolução dos principais indicadores de qualidade ao longo dos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              
              <Line 
                type="monotone" 
                dataKey="precision" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                name="Precisão (%CV)"
              />
              <Line 
                type="monotone" 
                dataKey="recovery" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                name="Recuperação (%)"
              />
              <Line 
                type="monotone" 
                dataKey="conformity" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                name="Conformidade (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparação entre Métodos */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Comparação de Performance entre Métodos
          </CardTitle>
          <CardDescription>
            Análise comparativa dos diferentes métodos analíticos implementados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methodComparison.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{method.method}</h4>
                  <p className="text-sm text-slate-600">
                    {method.samples} amostras analisadas
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Precisão</div>
                    <div className="font-medium">{method.precision}%</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Recuperação</div>
                    <div className="font-medium">{method.recovery}%</div>
                  </div>
                  
                  <Badge 
                    variant={method.precision < 2.0 && method.recovery > 98.0 ? "default" : "outline"}
                    className={method.precision < 2.0 && method.recovery > 98.0 ? "bg-green-100 text-green-800" : ""}
                  >
                    {method.precision < 2.0 && method.recovery > 98.0 ? "Excelente" : "Adequado"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Barras - Distribuição de Não Conformidades */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Distribuição de Não Conformidades por Categoria</CardTitle>
          <CardDescription>
            Análise das principais causas de não conformidades identificadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { category: 'Equipamentos', count: 12, percentage: 35.3 },
              { category: 'Materiais', count: 8, percentage: 23.5 },
              { category: 'Pessoal', count: 6, percentage: 17.6 },
              { category: 'Ambiente', count: 5, percentage: 14.7 },
              { category: 'Métodos', count: 3, percentage: 8.8 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
