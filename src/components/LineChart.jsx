import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data, title, dataKey }) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2D4F1E" stopOpacity={1} />
                <stop offset="100%" stopColor="#E27D60" stopOpacity={1} />
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
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="url(#colorValue)"
              strokeWidth={3}
              dot={{ fill: "#F5E6CC", stroke: "#E27D60", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8, fill: "#E27D60", stroke: "#fff", strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0px 4px 8px rgba(226, 125, 96, 0.4))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomLineChart;
