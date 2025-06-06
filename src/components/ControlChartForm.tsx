import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  dataPoints: z.string().min(1, {
    message: "Adicione ao menos um valor",
  }),
})

interface ControlChartFormProps {
  onChartDataUpdate: (data: { name: string; value: number }[]) => void;
}

const ControlChartForm: React.FC<ControlChartFormProps> = ({ onChartDataUpdate }) => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      dataPoints: "",
    },
  })

  function onSubmit(data: z.infer<typeof schema>) {
    const values = data.dataPoints.split(',').map((value, index) => ({
      name: `Amostra ${index + 1}`,
      value: parseFloat(value.trim()),
    }));

    setChartData(values);
    onChartDataUpdate(values);
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      <Card className="w-full md:w-1/3">
        <CardHeader>
          <CardTitle>Dados da Carta de Controle</CardTitle>
          <CardDescription>Insira os valores para gerar a carta de controle.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="dataPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valores (separados por vírgula)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2.1, 2.2, 1.9, 2.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Gerar Carta de Controle</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full md:w-2/3">
        <CardHeader>
          <CardTitle>Carta de Controle</CardTitle>
          <CardDescription>Gráfico de controle estatístico.</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart width={730} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />

              <ReferenceLine 
                y={3.0} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                label={{ value: "LSC (+3σ)", position: "insideTopRight" }}
              />
              <ReferenceLine 
                y={-3.0} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                label={{ value: "LIC (-3σ)", position: "insideBottomRight" }}
              />
              <ReferenceLine 
                y={0} 
                stroke="#6b7280" 
                label={{ value: "Média", position: "insideTopRight" }}
              />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlChartForm;
