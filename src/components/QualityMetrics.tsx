
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const QualityMetrics = () => {
  const metrics = [
    {
      title: "Precisão Intermediária",
      value: "2.1%",
      target: "< 3.0%",
      status: "good",
      trend: "up",
      description: "CV% médio dos últimos 30 dias"
    },
    {
      title: "Recuperação Média",
      value: "98.5%",
      target: "95-105%",
      status: "good",
      trend: "stable",
      description: "MRC utilizados no período"
    },
    {
      title: "Repetibilidade",
      value: "1.8%",
      target: "< 2.5%",
      status: "good",
      trend: "down",
      description: "CV% em duplicata"
    },
    {
      title: "Erro Normalizado",
      value: "0.3",
      target: "< 1.0",
      status: "good",
      trend: "down",
      description: "Média dos MRCs analisados"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">Métricas de Qualidade</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className={`shadow-lg border-0 ${getStatusColor(metric.status)} backdrop-blur-sm`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-700">
                  {metric.title}
                </CardTitle>
                {getTrendIcon(metric.trend)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-slate-800">
                {metric.value}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Meta: {metric.target}</span>
                  <Badge variant="outline" className="text-xs">
                    {metric.status === 'good' ? 'Conforme' : 'Atenção'}
                  </Badge>
                </div>
                
                <Progress 
                  value={metric.status === 'good' ? 85 : 45} 
                  className="h-2"
                />
              </div>
              
              <p className="text-xs text-slate-600 mt-2">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QualityMetrics;
