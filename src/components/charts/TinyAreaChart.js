import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const TinyAreaChart = ({ data }) => {
  const data2 = [
    {
      name: 'Page A', uv: 4000 * Math.random(), pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000 * Math.random(), pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000 * Math.random(), pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780 * Math.random(), pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890 * Math.random(), pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390 * Math.random(), pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490 * Math.random(), pv: 4300, amt: 2100,
    },
  ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data2}>
                <Area dataKey="uv" stroke="#512DA8" fill="#512DA8" />
            </AreaChart>
        </ResponsiveContainer>
    )
  }

export default TinyAreaChart;
