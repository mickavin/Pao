"use client"

import type * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart as RechartsLineChart,
} from "recharts"
import { cn } from "@/lib/utils"
import { useAccessibility } from "@/components/theme-provider"

interface AreaChartProps {
  className?: string
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  startEndOnly?: boolean
  showGradient?: boolean
  autoMinValue?: boolean
  minValue?: number
  maxValue?: number
  customTooltip?: React.FC<any>
}

export function AreaChart({
  className,
  data,
  index,
  categories,
  colors,
  valueFormatter = (value) => value.toString(),
  showXAxis = true,
  showYAxis = true,
  showLegend = false,
  showGridLines = true,
  startEndOnly = false,
  showGradient = false,
  autoMinValue = false,
  minValue = 0,
  maxValue,
  customTooltip,
}: AreaChartProps) {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  // Adjust font size based on accessibility preferences
  const fontSize = simplifiedLayout ? 14 : 12

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />}
        {showXAxis && <XAxis dataKey={index} tick={{ fontSize }} />}
        {showYAxis && (
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fontSize }}
            domain={[autoMinValue ? "auto" : minValue, maxValue || "auto"]}
          />
        )}
        {customTooltip ? <Tooltip content={customTooltip} /> : <Tooltip formatter={valueFormatter} />}
        {showLegend && <Legend wrapperStyle={{ fontSize }} />}
        {categories.map((category, i) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`hsl(var(--${colors[i]}))` || colors[i]}
            fill={`hsl(var(--${colors[i]}))` || colors[i]}
            strokeWidth={2}
            dot={startEndOnly ? { r: 3 } : false}
            activeDot={{ r: 5 }}
            fillOpacity={0.3}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

interface BarChartProps {
  className?: string
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  startEndOnly?: boolean
  minValue?: number
  maxValue?: number
}

export function BarChart({
  className,
  data,
  index,
  categories,
  colors,
  valueFormatter = (value) => value.toString(),
  showXAxis = true,
  showYAxis = true,
  showLegend = false,
  showGridLines = true,
  startEndOnly = false,
  minValue = 0,
  maxValue,
}: BarChartProps) {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  // Adjust font size based on accessibility preferences
  const fontSize = simplifiedLayout ? 14 : 12

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />}
        {showXAxis && <XAxis dataKey={index} tick={{ fontSize }} />}
        {showYAxis && (
          <YAxis tickFormatter={valueFormatter} tick={{ fontSize }} domain={[minValue, maxValue || "auto"]} />
        )}
        <Tooltip formatter={valueFormatter} />
        {showLegend && <Legend wrapperStyle={{ fontSize }} />}
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={`hsl(var(--${colors[i]}))` || colors[i]} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

interface LineChartProps {
  className?: string
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  startEndOnly?: boolean
  minValue?: number
  maxValue?: number
  connectNulls?: boolean
}

export const LineChart = ({
  className,
  data,
  index,
  categories,
  colors,
  valueFormatter = (value) => value.toString(),
  showXAxis = true,
  showYAxis = true,
  showLegend = false,
  showGridLines = true,
  startEndOnly = false,
  minValue = 0,
  maxValue,
  connectNulls = false,
}: LineChartProps) => {
  const { preferences } = useAccessibility()
  const { simplifiedLayout } = preferences

  // Adjust font size based on accessibility preferences
  const fontSize = simplifiedLayout ? 14 : 12

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />}
        {showXAxis && <XAxis dataKey={index} tick={{ fontSize }} />}
        {showYAxis && (
          <YAxis tickFormatter={valueFormatter} tick={{ fontSize }} domain={[minValue, maxValue || "auto"]} />
        )}
        <Tooltip formatter={valueFormatter} />
        {showLegend && <Legend wrapperStyle={{ fontSize }} />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={`hsl(var(--${colors[i]}))` || colors[i]}
            strokeWidth={simplifiedLayout ? 3 : 2}
            dot={startEndOnly ? { r: 3 } : { r: 2 }}
            activeDot={{ r: simplifiedLayout ? 6 : 5 }}
            connectNulls={connectNulls}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export const Title = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h3 className={cn("text-sm font-medium", className)}>{children}</h3>
}
