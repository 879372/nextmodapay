import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { listPixInByCompany, TransacaoIn } from '@/api/listarPixIn';
import { listPixOutByCompany, TransacaoOut } from '@/api/listarPixOut';
import { ArrowDown, CreditCard, DollarSignIcon } from 'lucide-react';
import { Card } from './card';

const currentYear = new Date().getFullYear();

export default function Cabecalho() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(`${currentYear}-01-01`));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(`${currentYear}-12-31`));
  const [totalPixIn, setTotalPixIn] = useState<number>(0);
  const [totalPixOut, setTotalPixOut] = useState<number>(0);

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
        listPixInByCompany({ inicio: formattedStartDate, fim: formattedEndDate, status: 'CONCLUIDO' }, token),
        listPixOutByCompany({ inicio: formattedStartDate, fim: formattedEndDate, status: 'executed' }, token)
      ]);

      // Calcular total de PIX_IN
      let totalPixInAmount = 0;
      pixInResponse.items.forEach((item) => {
        totalPixInAmount += item.valor.original;
      });
      setTotalPixIn(totalPixInAmount);

      // Calcular total de PIX_OUT
      let totalPixOutAmount = 0;
      pixOutResponse.items.forEach((item) => {
        totalPixOutAmount += item.valor.original;
      });
      setTotalPixOut(totalPixOutAmount);
      
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 ml-6 mr-6">
      <div className="flex flex-col">
        <Card className="rounded-xl flex items-center gap-3 p-3">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
            <DollarSignIcon className="text-[#11CE8A]" />
          </div>
          <div className="flex flex-wrap">
            <div>
              <h3 className="text-sm font-semibold mr-5">Total Pix In</h3>
            </div>
            <div>
              <p className="text-sm text-[#11CE8A] font-bold">R$ {totalPixIn}</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-col">
        <Card className="rounded-xl flex items-center gap-3 p-3">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center flex-wrap">
            <ArrowDown className="text-[#FD0000]" />
          </div>
          <div className="flex flex-wrap">
            <div className="">
              <h3 className="text-sm font-semibold mr-5 flex-nowrap">Total Pix Out</h3>
            </div>
            <div>
              <p className="text-sm text-[#FD0000] font-bold">R$ {totalPixOut}</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-col">
        <Card className="rounded-xl flex items-center gap-3 p-3">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex justify-center items-center">
            <CreditCard className="text-[#3B82F6]" />
          </div>
          <div className="flex flex-wrap">
            <div>
              <h3 className="text-sm font-semibold mr-5">Total Maquininha</h3>
            </div>
            <div>
              <p className="text-sm text-[#3B82F6] font-bold">R$ 0</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
