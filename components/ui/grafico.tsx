<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { listPixInByCompany, TransacaoIn } from '@/api/listarPixIn';
import { listPixOutByCompany, TransacaoOut } from '@/api/listarPixOut';
import { Minus } from 'lucide-react';

const currentYear = new Date().getFullYear();

const Example = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(`${currentYear}-01-01`));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(`${currentYear}-12-31`));
  const [pixInData, setPixInData] = useState<TransacaoIn['items']>([]);
  const [pixOutData, setPixOutData] = useState<TransacaoOut['items']>([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const formattedStartDate = startDate ? startDate.toISOString() : undefined;
      const formattedEndDate = endDate ? endDate.toISOString() : undefined;

      const token = localStorage.getItem('token') || '';

      const [pixInResponse, pixOutResponse] = await Promise.all([
        listPixInByCompany({ inicio: formattedStartDate, fim: formattedEndDate, status: 'CONCLUIDA', itensPorPagina: 600 }, token),
        listPixOutByCompany({ inicio: formattedStartDate, fim: formattedEndDate, status: 'executed', itensPorPagina: 600 }, token)
      ]);

      setPixInData(pixInResponse.items); // Atualizar estado com dados PIX_IN
      setPixOutData(pixOutResponse.items); // Atualizar estado com dados PIX_OUT

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const processDataForChart = () => {
    const pixInChartData: { name: string, PIX_IN: number, PIX_OUT: number }[] = [];

    pixInData.forEach(item => {
      const transactionDate = new Date(item.calendario.criacao);
      const month = transactionDate.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = transactionDate.getFullYear();
      const name = `${month}`;

      const PIX_IN = Number(item.valor.original.toFixed(2));

      let existingItem = pixInChartData.find(data => data.name === name);

      if (existingItem) {
        existingItem.PIX_IN += PIX_IN;
      } else {
        pixInChartData.push({
          name: name,
          PIX_IN: PIX_IN,
          PIX_OUT: 0
        });
      }
    });

    pixOutData.forEach(item => {
      const transactionDate = new Date(item.solicitacao);
      const month = transactionDate.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = transactionDate.getFullYear();
      const name = `${month}`;

      const PIX_OUT = Number(item.valor.original.toFixed(2));

      let existingItem = pixInChartData.find(data => data.name === name);

      if (existingItem) {
        existingItem.PIX_OUT += PIX_OUT;
      } else {
        pixInChartData.push({
          name: name,
          PIX_IN: 0,
          PIX_OUT: PIX_OUT
        });
      }
    });

    return consolidateChartDataByMonth(pixInChartData);
  };

  const consolidateChartDataByMonth = (data: { name: string, PIX_IN: number, PIX_OUT: number }[]) => {
    const consolidatedData: { name: string, PIX_IN: number, PIX_OUT: number }[] = [];

    data.forEach(item => {
      const existingItem = consolidatedData.find(d => d.name === item.name);

      if (existingItem) {
        existingItem.PIX_IN += item.PIX_IN;
        existingItem.PIX_OUT += item.PIX_OUT;
      } else {
        consolidatedData.push({
          name: item.name,
          PIX_IN: item.PIX_IN,
          PIX_OUT: item.PIX_OUT
        });
      }
    });

    return consolidatedData;
  };

  const chartData = processDataForChart();

  const formatNumber = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className='min-w-52'>
      <div className="flex mb-4 items-center gap-4 justify-between flex-wrap">
        <h1 className='font-semibold '>Grafico transações</h1>
        <div className='border flex rounded-lg items-center flex-wrap'>
          <div className="flex items-center gap-1 p-1 flex-wrap">
            <label className=" mb-1 text-xs font-semibold mt-1 flex-wrap">Início:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date || undefined)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="text-xs p-1 w-[100px]"
              calendarClassName="text-xs"
            />
          </div>
          <Minus className='text-xs'/>
          <div className="flex items-center gap-1 p-1">
            <label className="block mb-1 text-xs font-semibold mt-1">Fim:</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date || undefined)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="text-xs p-1 w-[100px]"
              calendarClassName="text-xs"
            />
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={chartData}
          style={{paddingTop:"30px"}}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} hide />
          <Tooltip cursor={{ fill: 'transparent' }} formatter={(value: number) => formatNumber(value)} />
          <Bar dataKey="PIX_IN" fill="#8884d8" barSize={15} radius={[10, 10, 0, 0]} />
          <Bar dataKey="PIX_OUT" fill="#82ca9d" barSize={15} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Example;
=======
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { listPixInByCompany, TransacaoIn } from '@/api/listarPixIn';
import { listPixOutByCompany, TransacaoOut } from '@/api/listarPixOut';
import { Minus } from 'lucide-react';

const currentYear = new Date().getFullYear();

const Example = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(`${currentYear}-01-01`));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(`${currentYear}-12-31`));
  const [pixInData, setPixInData] = useState<TransacaoIn[]>([]);
  const [pixOutData, setPixOutData] = useState<TransacaoOut[]>([]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const formattedStartDate = startDate ? startDate.toISOString() : undefined;
      const formattedEndDate = endDate ? endDate.toISOString() : undefined;

      const token = localStorage.getItem('token') || '';

      // Chamar ambas as APIs para buscar dados PIX_IN e PIX_OUT
      const [pixInResponse, pixOutResponse] = await Promise.all([
        listPixInByCompany({ inicio: formattedStartDate, fim: formattedEndDate, status: 'CONCLUIDA', itensPorPagina: 600 }, token),
        listPixOutByCompany({ inicio: formattedStartDate, fim: formattedEndDate, status: 'executed', itensPorPagina: 600 }, token)
      ]);

      setPixInData(pixInResponse); // Atualizar estado com dados PIX_IN
      setPixOutData(pixOutResponse); // Atualizar estado com dados PIX_OUT

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Processar dados para o gráfico
  const processDataForChart = () => {
    // Mapear dados de PIX_IN e inicializar o array de dados do gráfico
    const pixInChartData: { name: string, PIX_IN: number, PIX_OUT: number }[] = [];

    pixInData.forEach(item => {
      const transactionDate = new Date(item.calendario.criacao);
      const month = transactionDate.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = transactionDate.getFullYear();
      const name = `${month}`;
      
      // Formatar valor PIX_IN com duas casas decimais
      const PIX_IN = Number(item.valor.original.toFixed(2));

      // Verificar se já existe um item para este mês e ano
      let existingItem = pixInChartData.find(data => data.name === name);

      if (existingItem) {
        existingItem.PIX_IN += PIX_IN;
      } else {
        pixInChartData.push({
          name: name,
          PIX_IN: PIX_IN,
          PIX_OUT: 0
        });
      }
    });

    // Mapear dados de PIX_OUT
    pixOutData.forEach(item => {
      const transactionDate = new Date(item.solicitacao);
      const month = transactionDate.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = transactionDate.getFullYear();
      const name = `${month}`;
      
      // Formatar valor PIX_OUT com duas casas decimais
      const PIX_OUT = Number(item.valor.original.toFixed(2));

      // Verificar se já existe um item para este mês e ano
      let existingItem = pixInChartData.find(data => data.name === name);

      if (existingItem) {
        existingItem.PIX_OUT += PIX_OUT;
      } else {
        pixInChartData.push({
          name: name,
          PIX_IN: 0,
          PIX_OUT: PIX_OUT
        });
      }
    });

    // Consolidar os valores únicos por mês (somar PIX_OUT quando necessário)
    const consolidatedChartData = consolidateChartDataByMonth(pixInChartData);

    return consolidatedChartData;
  };

  // Função para consolidar os dados por mês
  const consolidateChartDataByMonth = (data: { name: string, PIX_IN: number, PIX_OUT: number }[]) => {
    const consolidatedData: { name: string, PIX_IN: number, PIX_OUT: number }[] = [];

    data.forEach(item => {
      const existingItem = consolidatedData.find(d => d.name === item.name);

      if (existingItem) {
        existingItem.PIX_IN += item.PIX_IN;
        existingItem.PIX_OUT += item.PIX_OUT;
      } else {
        consolidatedData.push({
          name: item.name,
          PIX_IN: item.PIX_IN,
          PIX_OUT: item.PIX_OUT
        });
      }
    });

    return consolidatedData;
  };

  // Obter dados formatados para o gráfico
  const chartData = processDataForChart();

  // Função auxiliar para formatar números com duas casas decimais
  const formatNumber = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className='min-w-52'>
      <div className="flex mb-4 items-center gap-4 justify-between flex-wrap">
        <h1 className='font-semibold '>Grafico transações</h1>
        <div className='border flex rounded-lg items-center flex-wrap'>
          <div className="flex items-center gap-1 p-1 flex-wrap">
            <label className=" mb-1 text-xs font-semibold mt-1 flex-wrap">Início:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date || undefined)} // Lidar com null usando undefined
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="text-xs p-1 w-[100px]"
              calendarClassName="text-xs"
            />
          </div>
          <Minus className='text-xs'/>
          <div className="flex items-center gap-1 p-1">
            <label className="block mb-1 text-xs font-semibold mt-1">Fim:</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date || undefined)} // Lidar com null usando undefined
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="text-xs p-1 w-[100px]"
              calendarClassName="text-xs"
            />
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={chartData}
          style={{paddingTop:"30px"}}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} hide />
          <Tooltip cursor={{ fill: 'transparent' }} formatter={(value: number) => formatNumber(value)} />
          <Bar dataKey="PIX_IN" fill="#11CE8A" radius={[4, 4, 4, 0]} />
          <Bar dataKey="PIX_OUT" fill="#FD0000" radius={[4, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
>>>>>>> c19ed366fb65f48d4532a2dba833eda2f63bcb5e
