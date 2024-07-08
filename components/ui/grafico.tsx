import { Icon12Hours } from '@tabler/icons-react';
import { ArrowRight, Minus } from 'lucide-react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const currentYear = new Date().getFullYear();

const data = [
  { name: `JAN ${currentYear}`, PIX_OUT: 1598, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `FEV ${currentYear}`, PIX_OUT: 2390, PIX_IN: 5986, MAQUININHA: 2500 },
  { name: `MAR ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 1023 },
  { name: `ABR ${currentYear}`, PIX_OUT: 2390, PIX_IN: 2597, MAQUININHA: 2500 },
  { name: `MAI ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `JUN ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `JUL ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `AGO ${currentYear}`, PIX_OUT: 2390, PIX_IN: 2597, MAQUININHA: 2500 },
  { name: `SET ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `OUT ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `NOV ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 },
  { name: `DEZ ${currentYear}`, PIX_OUT: 2390, PIX_IN: 3800, MAQUININHA: 2500 }
];

const Example = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(`${currentYear}-01-01`));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(`${currentYear}-12-31`));

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
    }
  };

  const filteredData = data.filter(d => {
    const [month, year] = d.name.split(' ');
    const dataDate = new Date(`${year}-${month}-01`);
    return startDate && endDate && dataDate >= startDate && dataDate <= endDate;
  });

  return (
    <div>
      <div className="flex mb-4 items-center gap-4 justify-end">
        <div className='border flex rounded-lg items-center'>
        <div className="flex items-center gap-1  p-1  ">
          <label className="block mb-1 text-xs font-semibold mt-1 ">Início:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate as Date} // Type assertion
            endDate={endDate as Date} // Type assertion
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="text-xs p-1 w-[100px]"
            calendarClassName="text-xs"
          />
        </div>
        <Minus className='text-xs'/>
        <div className="flex items-center gap-1  p-1 ">
        <label className="block mb-1 text-xs font-semibold mt-1">Fim:</label>
        <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate as Date} // Type assertion
            endDate={endDate as Date} // Type assertion
            minDate={startDate as Date} // Type assertion
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="text-xs p-1 w-[100px]"
            calendarClassName="text-xs "
          />
        </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} hide />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Bar dataKey="PIX_IN" fill="#11CE8A" radius={[4, 4, 4, 0]} />
          <Bar dataKey="PIX_OUT" fill="#FD0000" radius={[4, 4, 4, 0]} />
          <Bar dataKey="MAQUININHA" fill="#919191" radius={[4, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
