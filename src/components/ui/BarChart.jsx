/* eslint-disable no-unused-vars */
import React from 'react';

const BarChart = ({ data, title, dataKey, fillColor }) => {
  const maxValue = Math.max(...data.map(item => item.value));

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
          
          {/* Bars */}
          {data.map((item, index) => {
            const barWidth = 300 / data.length - 10;
            const x = 50 + index * (300 / data.length);
            const height = (item.value / maxValue) * 160;
            const y = 180 - height;
            
            return (
              <rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill={fillColor || "#3b82f6"}
                rx="4"
              />
            );
          })}
          
          {/* X-axis labels */}
          {data.map((item, index) => (
            <text
              key={index}
              x={50 + index * (300 / data.length) + (300 / data.length - 10) / 2}
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

export default BarChart;
