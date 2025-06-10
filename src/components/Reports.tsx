
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, User, FlaskConical } from 'lucide-react';
import { ReportViewer } from './ReportViewer';

interface Method {
  id: string;
  name: string;
  description: string;
  assays: Assay[];
}

interface Assay {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  tools: Tool[];
  lastAnalysis: string;
}

interface Tool {
  id: string;
  name: string;
  type: string;
  data: any;
}

const Reports = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedAssay, setSelectedAssay] = useState<string>('');
  const [showReport, setShowReport] = useState(false);

  // Dados de exemplo
  const methods: Method[] = [
    {
      id: 'metodo-1',
      name: 'Análise Química Quantitativa',
      description: 'Métodos para determinação quantitativa de elementos',
      assays: [
        {
          id: 'ensaio-1',
          name: 'Determinação de Metais Pesados',
          description: 'Análise de Pb, Cd, Hg em amostras',
          status: 'active',
          lastAnalysis: '2024-06-08',
          tools: [
            {
              id: 'tool-1',
              name: 'Espectrômetro ICP-MS',
              type: 'Espectrometria',
              data: {
                precision: '±0.1%',
                accuracy: '98.5%',
                detectionLimit: '0.01 mg/L',
                linearity: 'R² > 0.999'
              }
            },
            {
              id: 'tool-2',
              name: 'Balança Analítica',
              type: 'Pesagem',
              data: {
                precision: '±0.0001g',
                capacity: '220g',
                calibration: 'Diária',
                uncertainty: '±0.0002g'
              }
            }
          ]
        },
        {
          id: 'ensaio-2',
          name: 'Análise de pH e Condutividade',
          description: 'Medição de pH e condutividade elétrica',
          status: 'active',
          lastAnalysis: '2024-06-09',
          tools: [
            {
              id: 'tool-3',
              name: 'pHmetro Digital',
              type: 'Medição de pH',
              data: {
                range: '0-14 pH',
                precision: '±0.01 pH',
                temperature: '0-100°C',
                calibration: 'Buffer 4.01, 7.00, 10.01'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'metodo-2',
      name: 'Análise Microbiológica',
      description: 'Métodos para análise de contaminação microbiológica',
      assays: [
        {
          id: 'ensaio-3',
          name: 'Contagem de Coliformes',
          description: 'Determinação de coliformes totais e fecais',
          status: 'active',
          lastAnalysis: '2024-06-07',
          tools: [
            {
              id: 'tool-4',
              name: 'Incubadora Bacteriológica',
              type: 'Incubação',
              data: {
                temperature: '35±2°C',
                uniformity: '±0.5°C',
                capacity: '150L',
                timer: '0-999h'
              }
            }
          ]
        }
      ]
    }
  ];

  const selectedMethodData = methods.find(m => m.id === selectedMethod);
  const selectedAssayData = selectedMethodData?.assays.find(a => a.id === selectedAssay);

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Relatórios de Análise</h2>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar size={16} />
          {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>

      {!showReport ? (
        <div className="space-y-6">
          {/* Seleção de Método */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-primary" />
                Selecionar Método
              </CardTitle>
              <CardDescription>
                Escolha o método de análise para visualizar os ensaios disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um método..." />
                </SelectTrigger>
                <SelectContent>
                  {methods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{method.name}</span>
                        <span className="text-xs text-muted-foreground">{method.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Lista de Ensaios */}
          {selectedMethodData && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Ensaios Disponíveis</CardTitle>
                <CardDescription>
                  Método selecionado: {selectedMethodData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedMethodData.assays.map((assay) => (
                    <div 
                      key={assay.id}
                      className="border rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedAssay(assay.id);
                        setShowReport(true);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800">{assay.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={assay.status === 'active' ? 'default' : 'secondary'}>
                            {assay.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <FileText size={16} />
                            Ver Relatório
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{assay.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>Última análise: {new Date(assay.lastAnalysis).toLocaleDateString('pt-BR')}</span>
                        <span>Ferramentas: {assay.tools.length}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <ReportViewer 
          method={selectedMethodData!}
          assay={selectedAssayData!}
          onBack={() => setShowReport(false)}
        />
      )}
    </div>
  );
};

export default Reports;
