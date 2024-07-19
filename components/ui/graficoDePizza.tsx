'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { listPixInByCompany, TransacaoIn } from '@/api/listarPixIn';
import { listPixOutByCompany, TransacaoOut } from '@/api/listarPixOut';

const currentYear = new Date().getFullYear();

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PieChartExample = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(`${currentYear}-01-01`));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(`${currentYear}-12-31`));
  const [data, setData] = useState<{ name: string; value: number; fill: string }[]>([]);

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

      const pixInCount = pixInResponse.items.length;
      const pixOutCount = pixOutResponse.items.length;

      setData([
        { name: 'PIX IN', value: pixInCount, fill: '#11CE8A' },
        { name: 'PIX OUT', value: pixOutCount, fill: '#FD0000' }
      ]);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartExample;
