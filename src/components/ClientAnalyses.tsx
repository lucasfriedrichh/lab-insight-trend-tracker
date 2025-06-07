
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';

interface Analysis {
  id: number;
  description: string;
  status: 'Aberto' | 'Fechado';
  creationDate: string;
  finalDate: string;
}

const ClientAnalyses = () => {
  const { user } = useAuth();
  
  // Dados simulados das análises
  const [analyses] = useState<Analysis[]>([
    {
      id: 1,
      description: 'Teste 1',
      status: 'Aberto',
      creationDate: '27/04/2025',
      finalDate: '10/05/2025'
    },
    {
      id: 2,
      description: 'Teste 2',
      status: 'Aberto',
      creationDate: '27/04/2025',
      finalDate: '10/05/2025'
    },
    {
      id: 3,
      description: 'Teste 3',
      status: 'Fechado',
      creationDate: '27/04/2025',
      finalDate: '10/05/2025'
    },
    {
      id: 4,
      description: 'Teste 4',
      status: 'Aberto',
      creationDate: '27/04/2025',
      finalDate: '10/05/2025'
    },
    {
      id: 5,
      description: 'Teste 5',
      status: 'Fechado',
      creationDate: '27/04/2025',
      finalDate: '10/05/2025'
    }
  ]);

  const handleNewAnalysis = () => {
    console.log('Novo ensaio');
  };

  const handleEdit = (id: number) => {
    console.log('Editar análise:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Excluir análise:', id);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === 'Aberto' ? 'default' : 'secondary'}
        className={status === 'Aberto' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header da página */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Olá, {user?.name || 'Fulano Doe'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-1">
            Aqui estão seus métodos:
          </p>
        </div>
        
        <Button 
          onClick={handleNewAnalysis}
          className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          NOVO ENSAIO
        </Button>
      </div>

      {/* Tabela de análises - Mobile: Cards, Desktop: Table */}
      <div className="block sm:hidden space-y-4">
        {analyses.map((analysis) => (
          <Card key={analysis.id} className="shadow-lg border-0 bg-white">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-slate-800">ID: {analysis.id}</p>
                  <p className="text-slate-600">{analysis.description}</p>
                </div>
                {getStatusBadge(analysis.status)}
              </div>
              
              <div className="space-y-2 text-sm text-slate-600">
                <p><span className="font-medium">Criação:</span> {analysis.creationDate}</p>
                <p><span className="font-medium">Final:</span> {analysis.finalDate}</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(analysis.id)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(analysis.id)}
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabela para desktop */}
      <Card className="shadow-lg border-0 bg-white hidden sm:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-center font-semibold text-slate-700">ID</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">DESCRIÇÃO</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">STATUS</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700 hidden lg:table-cell">DATA DE CRIAÇÃO</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700 hidden lg:table-cell">DATA FINAL</TableHead>
                  <TableHead className="text-center font-semibold text-slate-700">AÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => (
                  <TableRow key={analysis.id} className="hover:bg-slate-50">
                    <TableCell className="text-center font-medium">{analysis.id}</TableCell>
                    <TableCell className="text-center">{analysis.description}</TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(analysis.status)}
                    </TableCell>
                    <TableCell className="text-center text-slate-600 hidden lg:table-cell">{analysis.creationDate}</TableCell>
                    <TableCell className="text-center text-slate-600 hidden lg:table-cell">{analysis.finalDate}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(analysis.id)}
                          className="h-8 w-8 p-0 hover:bg-blue-100"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(analysis.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs sm:text-sm text-slate-500 pt-6 sm:pt-8 border-t border-slate-200">
        <p>© 2025 LabMetrics. Todos os direitos reservados.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2">
          <a href="#" className="hover:text-primary">Sobre</a>
          <a href="#" className="hover:text-primary">Contato</a>
          <a href="#" className="hover:text-primary">Políticas de privacidade</a>
        </div>
      </div>
    </div>
  );
};

export default ClientAnalyses;
