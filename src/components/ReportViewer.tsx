
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Calendar, FlaskConical, Settings } from 'lucide-react';

interface Method {
  id: string;
  name: string;
  description: string;
}

interface Tool {
  id: string;
  name: string;
  type: string;
  data: any;
}

interface Assay {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  tools: Tool[];
  lastAnalysis: string;
}

interface ReportViewerProps {
  method: Method;
  assay: Assay;
  onBack: () => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ method, assay, onBack }) => {
  const handleExportPDF = () => {
    // Simular exportação para PDF
    const printContent = document.getElementById('report-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Relatório - ${assay.name}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                .section { margin-bottom: 30px; page-break-inside: avoid; }
                .section-title { background: #1e40af; color: white; padding: 8px; text-align: center; font-weight: bold; }
                .data-table { width: 100%; border-collapse: collapse; margin-top: 0; }
                .data-table th, .data-table td { border: 1px solid #333; padding: 8px; text-align: center; }
                .data-table th { background-color: #f8fafc; font-weight: bold; }
                .highlight { background-color: #dcfce7; }
                .critical { background-color: #fef3c7; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  // Simulando dados organizados por categorias como na referência
  const getToolSections = () => {
    const sections = [];

    assay.tools.forEach((tool, index) => {
      if (tool.type === 'Espectrometria') {
        sections.push({
          title: 'REPETIBILIDADE',
          color: 'bg-blue-600',
          data: [
            { parameter: 'Repetibilidade', unit: '(%)', value: '2.47', critical: '' },
            { parameter: 'Repetibilidade', unit: '(%)', value: '3.20', critical: '' },
            { parameter: 'Repetibilidade', unit: '(%)', value: '2.10', critical: '5' },
            { parameter: 'Repetibilidade', unit: '(%)', value: '1.00', critical: '', highlight: true },
            { parameter: 'Repetibilidade - MÉDIA', unit: '(%)', value: '2.49', critical: '' }
          ]
        });

        sections.push({
          title: 'PRECISÃO INTERNA',
          color: 'bg-blue-600',
          data: [
            { parameter: 'Precisão intermediária', unit: '(%)', value: '-0.17', critical: '2.36 - Teste t para 7 repetições' },
            { parameter: 'Precisão intermediária', unit: '(%)', value: '-0.15', critical: '' }
          ]
        });
      }

      if (tool.type === 'Medição de pH') {
        sections.push({
          title: 'AMOSTRA CEGA',
          color: 'bg-blue-600',
          data: [
            { parameter: 'Amostra cega', unit: '(%)', value: '2.77', critical: 'Valor crítico (CV) - Diferença entre a amostra de referência' },
            { parameter: 'Amostra cega', unit: '(%)', value: '0.70', critical: '' },
            { parameter: 'Amostra cega', unit: '(%)', value: '0.70', critical: '5' },
            { parameter: 'Amostra cega', unit: '(%)', value: '0.59', critical: '' },
            { parameter: 'Amostra cega - MÉDIA ANUAL', unit: '(%)', value: '1.19', critical: '' }
          ]
        });
      }
    });

    return sections;
  };

  const sections = getToolSections();

  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft size={16} />
          Voltar
        </Button>
        <Button onClick={handleExportPDF} className="gap-2">
          <Download size={16} />
          Exportar PDF
        </Button>
      </div>

      {/* Conteúdo do relatório */}
      <div id="report-content" className="space-y-6">
        {/* Cabeçalho do relatório */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="header">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-slate-800">Relatório de Análise</CardTitle>
                <CardDescription className="text-slate-600">
                  ISO 17025 - Laboratório de Qualidade
                </CardDescription>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 uppercase">Método</label>
                <p className="font-medium text-slate-800">{method.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 uppercase">Ensaio</label>
                <p className="font-medium text-slate-800">{assay.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 uppercase">Data</label>
                <p className="font-medium text-slate-800">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Informações do ensaio */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Detalhes do Ensaio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-500">Descrição</label>
                <p className="text-slate-800">{assay.description}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-500">Status</label>
                  <div className="mt-1">
                    <Badge variant={assay.status === 'active' ? 'default' : 'secondary'}>
                      {assay.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500">Última Análise</label>
                  <p className="text-slate-800">
                    {new Date(assay.lastAnalysis).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seções de dados organizadas */}
        {sections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="shadow-lg section">
            <div className={`${section.color} text-white text-center py-3 section-title rounded-t-lg`}>
              <h3 className="font-bold text-sm">{section.title}</h3>
            </div>
            <CardContent className="p-0">
              <Table className="data-table">
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-center font-bold text-slate-700 border-r border-slate-300">
                      Parâmetro
                    </TableHead>
                    <TableHead className="text-center font-bold text-slate-700 border-r border-slate-300">
                      Unidade (CV)
                    </TableHead>
                    <TableHead className="text-center font-bold text-slate-700 border-r border-slate-300">
                      Valor encontrado
                    </TableHead>
                    <TableHead className="text-center font-bold text-slate-700">
                      Valor crítico (CV)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-slate-50">
                      <TableCell className="text-center font-medium border-r border-slate-300">
                        {row.parameter}
                      </TableCell>
                      <TableCell className="text-center border-r border-slate-300">
                        {row.unit}
                      </TableCell>
                      <TableCell 
                        className={`text-center font-medium border-r border-slate-300 ${
                          row.highlight ? 'bg-green-100' : ''
                        }`}
                      >
                        {row.value}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {row.critical}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        {/* Ferramentas utilizadas */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Ferramentas Utilizadas
            </CardTitle>
            <CardDescription>
              Equipamentos e instrumentos utilizados na análise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assay.tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="border rounded-lg p-4 bg-slate-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{tool.name}</h4>
                    <p className="text-sm text-slate-600">{tool.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {Object.entries(tool.data).map(([key, value]) => (
                    <div key={key} className="bg-white p-2 rounded border">
                      <label className="text-xs text-slate-500 capitalize block">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </label>
                      <span className="font-medium text-slate-800">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Observações e assinatura */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Observações e Validação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-500">Observações</label>
              <p className="text-slate-800 mt-1">
                Análise realizada conforme procedimento padrão ISO 17025. 
                Todos os equipamentos calibrados e em condições normais de operação.
                Os valores apresentados estão dentro dos limites aceitáveis de repetibilidade e precisão.
              </p>
            </div>
            
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-slate-500">Responsável Técnico</p>
                  <p className="text-slate-800">Dr. João Silva - CRQ: 12345</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Data de emissão</p>
                  <p className="text-slate-800">{new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
