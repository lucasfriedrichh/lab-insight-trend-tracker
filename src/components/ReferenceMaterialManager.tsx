
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTabItem } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Package, Plus, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ReferenceMaterialManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const referenceMaterials = [
    {
      id: 'MRC-001',
      name: 'Padrão Glicose',
      type: 'Certificado',
      certifiedValue: '100.0 ± 2.0 mg/dL',
      expiry: '2025-12-31',
      stock: 15,
      minStock: 5,
      lastUsed: '2024-06-05',
      status: 'active',
      usage: 75
    },
    {
      id: 'MRC-002', 
      name: 'Padrão Proteína Total',
      type: 'Certificado',
      certifiedValue: '7.2 ± 0.3 g/dL',
      expiry: '2024-08-15',
      stock: 3,
      minStock: 5,
      lastUsed: '2024-06-03',
      status: 'low_stock',
      usage: 45
    },
    {
      id: 'MR-003',
      name: 'Controle Interno Lipídeo',
      type: 'Interno',
      certifiedValue: '180 ± 15 mg/dL',
      expiry: '2024-07-20',
      stock: 8,
      minStock: 3,
      lastUsed: '2024-06-04',
      status: 'expiring',
      usage: 60
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'low_stock':
        return <Badge className="bg-amber-100 text-amber-800">Estoque Baixo</Badge>;
      case 'expiring':
        return <Badge className="bg-red-100 text-red-800">Próximo ao Vencimento</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'expiring':
        return <Clock className="w-4 h-4 text-red-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Materiais de Referência
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cadastrar Material de Referência</DialogTitle>
              <DialogDescription>
                Adicione um novo material de referência ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material-id">Código/ID</Label>
                <Input id="material-id" placeholder="Ex: MRC-004" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material-name">Nome</Label>
                <Input id="material-name" placeholder="Ex: Padrão Colesterol" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material-type">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certified">Material de Referência Certificado</SelectItem>
                    <SelectItem value="reference">Material de Referência</SelectItem>
                    <SelectItem value="internal">Controle Interno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certified-value">Valor Certificado</Label>
                <Input id="certified-value" placeholder="Ex: 200.0 ± 5.0 mg/dL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Data de Validade</Label>
                <Input id="expiry" type="date" />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Cadastrar Material
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTabItem value="inventory">Inventário</TabsTabItem>
          <TabsTabItem value="usage">Uso e Periodicidade</TabsTabItem>
          <TabsTabItem value="alerts">Alertas</TabsTabItem>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {referenceMaterials.map((material) => (
              <Card key={material.id} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{material.id}</CardTitle>
                    {getStatusIcon(material.status)}
                  </div>
                  <CardDescription className="font-medium">
                    {material.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Status:</span>
                      {getStatusBadge(material.status)}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Tipo:</span>
                      <span className="text-sm font-medium">{material.type}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Valor:</span>
                      <span className="text-sm font-medium">{material.certifiedValue}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Validade:</span>
                      <span className="text-sm font-medium">{material.expiry}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Estoque:</span>
                      <span className={material.stock <= material.minStock ? 'text-red-600 font-medium' : ''}>
                        {material.stock} unidades
                      </span>
                    </div>
                    <Progress 
                      value={(material.stock / (material.minStock * 3)) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-slate-500">
                      Mínimo: {material.minStock} unidades
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Último uso:</span>
                    <span>{material.lastUsed}</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    Registrar Uso
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Cronograma de Uso
              </CardTitle>
              <CardDescription>
                Periodicidade estabelecida para cada material de referência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referenceMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{material.id} - {material.name}</h4>
                      <p className="text-sm text-slate-600">
                        Uso programado: Semanal | Próximo uso: 07/06/2024
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">Uso: {material.usage}%</div>
                        <Progress value={material.usage} className="w-20 h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-red-50/70 backdrop-blur-sm border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Alertas Críticos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-100 border border-red-200 rounded-md">
                  <h4 className="font-medium text-red-800">MRC-002 - Estoque Baixo</h4>
                  <p className="text-sm text-red-700">
                    Apenas 3 unidades restantes. Estoque mínimo: 5 unidades.
                  </p>
                </div>
                <div className="p-3 bg-red-100 border border-red-200 rounded-md">
                  <h4 className="font-medium text-red-800">MR-003 - Próximo ao Vencimento</h4>
                  <p className="text-sm text-red-700">
                    Vence em 44 dias (20/07/2024). Planejar substituição.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-amber-50/70 backdrop-blur-sm border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-amber-100 border border-amber-200 rounded-md">
                  <h4 className="font-medium text-amber-800">Uso Programado</h4>
                  <p className="text-sm text-amber-700">
                    MRC-001 deve ser utilizado em 1 dia (07/06/2024).
                  </p>
                </div>
                <div className="p-3 bg-amber-100 border border-amber-200 rounded-md">
                  <h4 className="font-medium text-amber-800">Revisão de Periodicidade</h4>
                  <p className="text-sm text-amber-700">
                    Revisar periodicidade de uso do MR-003 baseado no histórico.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferenceMaterialManager;
