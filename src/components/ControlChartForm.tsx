
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTabItem } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BarChart3, Plus, Calculator, TrendingUp } from 'lucide-react';

const ControlChartForm = () => {
  const [chartType, setChartType] = useState('means');
  const [sampleSize, setSampleSize] = useState('3');
  const [dataPoints, setDataPoints] = useState('');

  // Dados simulados para diferentes tipos de carta
  const chartData = {
    means: [
      { point: 1, value: 98.5, ucl: 101.2, lcl: 95.8, cl: 98.5 },
      { point: 2, value: 99.1, ucl: 101.2, lcl: 95.8, cl: 98.5 },
      { point: 3, value: 97.8, ucl: 101.2, lcl: 95.8, cl: 98.5 },
      { point: 4, value: 98.9, ucl: 101.2, lcl: 95.8, cl: 98.5 },
      { point: 5, value: 99.3, ucl: 101.2, lcl: 95.8, cl: 98.5 },
    ],
    range: [
      { point: 1, value: 1.2, ucl: 2.8, lcl: 0, cl: 1.3 },
      { point: 2, value: 1.5, ucl: 2.8, lcl: 0, cl: 1.3 },
      { point: 3, value: 0.9, ucl: 2.8, lcl: 0, cl: 1.3 },
      { point: 4, value: 1.1, ucl: 2.8, lcl: 0, cl: 1.3 },
      { point: 5, value: 1.7, ucl: 2.8, lcl: 0, cl: 1.3 },
    ],
    individual: [
      { point: 1, value: 98.5, ucl: 102.1, lcl: 94.9, cl: 98.5 },
      { point: 2, value: 99.1, ucl: 102.1, lcl: 94.9, cl: 98.5 },
      { point: 3, value: 97.8, ucl: 102.1, lcl: 94.9, cl: 98.5 },
      { point: 4, value: 98.9, ucl: 102.1, lcl: 94.9, cl: 98.5 },
      { point: 5, value: 99.3, ucl: 102.1, lcl: 94.9, cl: 98.5 },
    ]
  };

  const chartTypes = [
    { value: 'means', label: 'Carta de Médias (X̄)', description: 'Tendência central do processo' },
    { value: 'range', label: 'Carta de Amplitudes (R)', description: 'Variabilidade do processo' },
    { value: 'stddev', label: 'Carta de Desvio Padrão (S)', description: 'Dispersão dos dados' },
    { value: 'individual', label: 'Carta de Valores Individuais (X)', description: 'Valores únicos sem repetição' }
  ];

  const currentData = chartData[chartType as keyof typeof chartData] || chartData.means;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Cartas de Controle
        </h2>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Carta
        </Button>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTabItem value="create">Criar Carta</TabsTabItem>
          <TabsTabItem value="analysis">Análise</TabsTabItem>
          <TabsTabItem value="history">Histórico</TabsTabItem>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Configuração */}
            <Card className="lg:col-span-1 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Configuração da Carta</CardTitle>
                <CardDescription>
                  Defina os parâmetros para construção da carta de controle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Tipo de Carta</Label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chartTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div>{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material de Referência</Label>
                  <Select defaultValue="mrc001">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mrc001">MRC-001 - Padrão Glicose</SelectItem>
                      <SelectItem value="mrc002">MRC-002 - Padrão Proteína</SelectItem>
                      <SelectItem value="mrc003">MRC-003 - Padrão Lipídeo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sample-size">Tamanho da Amostra</Label>
                  <Select value={sampleSize} onValueChange={setSampleSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">n = 2</SelectItem>
                      <SelectItem value="3">n = 3</SelectItem>
                      <SelectItem value="4">n = 4</SelectItem>
                      <SelectItem value="5">n = 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-points">Dados (separados por vírgula)</Label>
                  <textarea
                    className="w-full p-2 border rounded-md resize-none"
                    rows={4}
                    placeholder="Ex: 98.1, 98.5, 98.9, 99.2, 98.7..."
                    value={dataPoints}
                    onChange={(e) => setDataPoints(e.target.value)}
                  />
                </div>

                <Button className="w-full flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Calcular Limites
                </Button>
              </CardContent>
            </Card>

            {/* Visualização da Carta */}
            <Card className="lg:col-span-2 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Carta de Controle - {chartTypes.find(t => t.value === chartType)?.label}</span>
                  <Badge variant="outline">Tempo Real</Badge>
                </CardTitle>
                <CardDescription>
                  Visualização dinâmica dos dados e limites de controle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="point" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }} 
                    />
                    
                    {/* Limites de Controle */}
                    <ReferenceLine 
                      y={currentData[0]?.ucl} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5" 
                      label={{ value: "LSC", position: "topRight" }}
                    />
                    <ReferenceLine 
                      y={currentData[0]?.lcl} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5" 
                      label={{ value: "LIC", position: "bottomRight" }}
                    />
                    <ReferenceLine 
                      y={currentData[0]?.cl} 
                      stroke="#22c55e" 
                      strokeDasharray="3 3" 
                      label={{ value: "LC", position: "topRight" }}
                    />
                    
                    {/* Dados */}
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Análise de Tendências - ISO 8258
              </CardTitle>
              <CardDescription>
                Critérios de decisão conforme norma ISO 8258 - Shewhart Control Charts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-700">Critérios Detectados</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                      <span className="text-sm">1 ponto fora dos limites de controle</span>
                      <Badge variant="destructive">Detectado</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="text-sm">9 pontos consecutivos na zona C</span>
                      <Badge variant="outline">Não detectado</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <span className="text-sm">6 pontos consecutivos crescentes/decrescentes</span>
                      <Badge variant="outline">Não detectado</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <span className="text-sm">2 de 3 pontos na zona A</span>
                      <Badge className="bg-amber-500">Atenção</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-700">Ações Recomendadas</h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="font-medium text-blue-800 mb-2">Investigação Imediata</h4>
                      <p className="text-sm text-blue-700">
                        Verificar equipamento, analista e condições ambientais do último ensaio.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <h4 className="font-medium text-green-800 mb-2">Documentação</h4>
                      <p className="text-sm text-green-700">
                        Registrar causa especial identificada e ações corretivas tomadas.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                      <h4 className="font-medium text-purple-800 mb-2">Melhoria Contínua</h4>
                      <p className="text-sm text-purple-700">
                        Analisar tendência para identificar oportunidades de melhoria do processo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Histórico de Cartas de Controle</CardTitle>
              <CardDescription>
                Cartas criadas e monitoradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: "Carta X̄-R - MRC-001", status: "Ativa", lastUpdate: "06/06/2024", alerts: 1 },
                  { id: 2, name: "Carta S - MRC-002", status: "Ativa", lastUpdate: "05/06/2024", alerts: 0 },
                  { id: 3, name: "Carta X - Padrão Interno", status: "Pausada", lastUpdate: "03/06/2024", alerts: 2 }
                ].map((chart) => (
                  <div key={chart.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{chart.name}</h4>
                      <p className="text-sm text-muted-foreground">Última atualização: {chart.lastUpdate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {chart.alerts > 0 && (
                        <Badge variant="destructive">{chart.alerts} alertas</Badge>
                      )}
                      <Badge variant={chart.status === 'Ativa' ? 'default' : 'secondary'}>
                        {chart.status}
                      </Badge>
                      <Button variant="outline" size="sm">Visualizar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ControlChartForm;
