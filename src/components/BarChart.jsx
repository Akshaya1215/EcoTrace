import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, title, dataKey }) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E27D60" stopOpacity={1} />
                <stop offset="100%" stopColor="#2D4F1E" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 74, 74, 0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(74, 74, 74, 0.2)' }}
            />
            <YAxis
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(74, 74, 74, 0.2)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F5E6CC',
                border: '1px solid rgba(74, 74, 74, 0.2)',
                borderRadius: '12px',
                color: '#4A4A4A'
              }}
            />
            <Bar
              dataKey={dataKey}
              fill="url(#colorBar)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
