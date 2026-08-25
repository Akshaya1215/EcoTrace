/* eslint-disable no-unused-vars */
import React from 'react';

const LineChart = ({ data, title, dataKey, strokeColor }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;

  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="chart-container">
        <svg width="100%" height="200" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="40"
              y1={20 + i * 40}
              x2="380"
              y2={20 + i * 40}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke={strokeColor || "#22c55e"}
            strokeWidth="2"
            points={data.map((item, index) => {
              const x = 40 + (index * 340 / (data.length - 1));
              const y = 180 - ((item.value - minValue) / range) * 160;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = 40 + (index * 340 / (data.length - 1));
            const y = 180 - ((item.value - minValue) / range) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={strokeColor || "#22c55e"}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* X-axis labels */}
          {data.map((item, index) => (
            <text
              key={index}
              x={40 + (index * 340 / (data.length - 1))}
              y="195"
              textAnchor="middle"
              fontSize="12"
              fill="#64748b"
            >
              {item.name}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;
