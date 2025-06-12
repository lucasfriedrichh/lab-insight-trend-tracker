
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  Download,
  Science,
  Settings
} from '@mui/icons-material';

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
                .section-title { background: #1976d2; color: white; padding: 8px; text-align: center; font-weight: bold; }
                .data-table { width: 100%; border-collapse: collapse; margin-top: 0; }
                .data-table th, .data-table td { border: 1px solid #333; padding: 8px; text-align: center; }
                .data-table th { background-color: #f5f5f5; font-weight: bold; }
                .highlight { background-color: #e8f5e8; }
                .critical { background-color: #fff3cd; }
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
          color: '#1976d2',
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
          color: '#1976d2',
          data: [
            { parameter: 'Precisão intermediária', unit: '(%)', value: '-0.17', critical: '2.36 - Teste t para 7 repetições' },
            { parameter: 'Precisão intermediária', unit: '(%)', value: '-0.15', critical: '' }
          ]
        });
      }

      if (tool.type === 'Medição de pH') {
        sections.push({
          title: 'AMOSTRA CEGA',
          color: '#1976d2',
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
    <Box sx={{ p: 3, spacing: 3 }}>
      {/* Header com navegação */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleExportPDF}
        >
          Exportar PDF
        </Button>
      </Box>

      {/* Conteúdo do relatório */}
      <Box id="report-content" sx={{ spacing: 3 }}>
        {/* Cabeçalho do relatório */}
        <Card 
          sx={{ 
            mb: 3,
            background: 'linear-gradient(45deg, #f5f5f5 30%, #e3f2fd 90%)',
            boxShadow: 3
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box 
                sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: 'primary.main', 
                  borderRadius: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Science sx={{ color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  Relatório de Análise
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ISO 17025 - Laboratório de Qualidade
                </Typography>
              </Box>
            </Box>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                  Método
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                  {method.name}
                </Typography>
              </div>
              <div>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                  Ensaio
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                  {assay.name}
                </Typography>
              </div>
              <div>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                  Data
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                  {new Date().toLocaleDateString('pt-BR')}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações do ensaio */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Settings color="primary" />
              <Typography variant="h6" component="h2">
                Detalhes do Ensaio
              </Typography>
            </Box>
            
            <Box sx={{ spacing: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                  Descrição
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {assay.description}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 6 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                    Status
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={assay.status === 'active' ? 'Ativo' : 'Inativo'}
                      color={assay.status === 'active' ? 'primary' : 'default'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                    Última Análise
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {new Date(assay.lastAnalysis).toLocaleDateString('pt-BR')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Seções de dados organizadas */}
        {sections.map((section, sectionIndex) => (
          <Paper key={sectionIndex} sx={{ mb: 3, overflow: 'hidden', boxShadow: 2 }}>
            <Box
              sx={{
                bgcolor: section.color,
                color: 'white',
                textAlign: 'center',
                py: 1.5
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {section.title}
              </Typography>
            </Box>
            
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #e0e0e0' }}>
                    Parâmetro
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #e0e0e0' }}>
                    Unidade (CV)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #e0e0e0' }}>
                    Valor encontrado
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Valor crítico (CV)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {section.data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}>
                    <TableCell 
                      align="center" 
                      sx={{ fontWeight: 'medium', borderRight: '1px solid #e0e0e0' }}
                    >
                      {row.parameter}
                    </TableCell>
                    <TableCell align="center" sx={{ borderRight: '1px solid #e0e0e0' }}>
                      {row.unit}
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ 
                        fontWeight: 'medium', 
                        borderRight: '1px solid #e0e0e0',
                        bgcolor: row.highlight ? '#e8f5e8' : 'inherit'
                      }}
                    >
                      {row.value}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {row.critical}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ))}

        {/* Ferramentas utilizadas */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Settings color="primary" />
              <Typography variant="h6" component="h2">
                Ferramentas Utilizadas
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Equipamentos e instrumentos utilizados na análise
            </Typography>
            
            <Box sx={{ spacing: 2 }}>
              {assay.tools.map((tool, toolIndex) => (
                <Paper key={toolIndex} sx={{ p: 2, mb: 2, bgcolor: '#f9f9f9', border: '1px solid #e0e0e0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'primary.light', 
                        borderRadius: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <Settings fontSize="small" color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'semibold' }}>
                        {tool.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tool.type}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(tool.data).map(([key, value]) => (
                      <div key={key}>
                        <Paper sx={{ p: 1.5, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
                          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textTransform: 'capitalize' }}>
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {String(value)}
                          </Typography>
                        </Paper>
                      </div>
                    ))}
                  </div>
                </Paper>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Observações e assinatura */}
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              Observações e Validação
            </Typography>
            
            <Box sx={{ spacing: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 1 }}>
                  Observações
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Análise realizada conforme procedimento padrão ISO 17025. 
                  Todos os equipamentos calibrados e em condições normais de operação.
                  Os valores apresentados estão dentro dos limites aceitáveis de repetibilidade e precisão.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                    Responsável Técnico
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Dr. João Silva - CRQ: 12345
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    Data de emissão
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {new Date().toLocaleDateString('pt-BR')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
