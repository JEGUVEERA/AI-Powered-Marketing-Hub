// components/charts.tsx
"use client"
import {
  LineChart as ReLineChart,
  Line,
  BarChart as ReBarChart,
  Bar,
  AreaChart as ReAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type ChartProps = {
  data: any[]
  dataKeys: string[]
  indexKey: string
}

export const LineChart = ({ data, dataKeys, indexKey }: ChartProps) => (
  <ResponsiveContainer width="100%" height={400}>
    <ReLineChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={indexKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, idx) => (
        <Line key={key} type="monotone" dataKey={key} stroke={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]} />
      ))}
    </ReLineChart>
  </ResponsiveContainer>
)

export const BarChart = ({ data, dataKeys, indexKey }: ChartProps) => (
  <ResponsiveContainer width="100%" height={400}>
    <ReBarChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={indexKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, idx) => (
        <Bar key={key} dataKey={key} fill={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]} />
      ))}
    </ReBarChart>
  </ResponsiveContainer>
)

export const AreaChart = ({ data, dataKeys, indexKey }: ChartProps) => (
  <ResponsiveContainer width="100%" height={400}>
    <ReAreaChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey={indexKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {dataKeys.map((key, idx) => (
        <Area
          key={key}
          type="monotone"
          dataKey={key}
          stroke={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]}
          fill={["#8884d8", "#82ca9d", "#ffc658"][idx % 3]}
        />
      ))}
    </ReAreaChart>
  </ResponsiveContainer>
)
