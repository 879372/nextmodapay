'use client'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
        name: 'JAN',
        PIX_OUT: 1598,
        PIX_IN: 3800,
        MAQUININHA: 2500,
  },
  {
    name: 'FEV',
    PIX_OUT: 2390,
    PIX_IN: 5986,
    MAQUININHA: 2500,
  },
  {
    name: 'MAR',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 1023,
  },
  {
    name: 'ABR',
    PIX_OUT: 2390,
    PIX_IN: 2597,
    MAQUININHA: 2500,
  },
  {
    name: 'MAI',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 2500,
  },
  {
    name: 'JUNHO',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 2500,
  },
  {
    name: 'JULHO',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 2500,
  },
  {
    name: 'ABR',
    PIX_OUT: 2390,
    PIX_IN: 2597,
    MAQUININHA: 2500,
  },
  {
    name: 'MAI',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 2500,
  },
  {
    name: 'JUNHO',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 2500,
  },
  {
    name: 'JULHO',
    PIX_OUT: 2390,
    PIX_IN: 3800,
    MAQUININHA: 2500,
  }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} hide /> {/* Removendo a descrição do eixo Y */}
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar dataKey="PIX_IN" fill="#c0c0c0" radius={[ 4, 4, 4, 0]} /> {/* Rosa pastel */}
          <Bar dataKey="PIX_OUT" fill="#5eb2af" radius={[4, 4, 4, 0]} /> {/* Azul claro */}
          <Bar dataKey="MAQUININHA" fill="#135c5f" radius={[4, 4, 4, 0]} /> {/* Verde claro */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
