"use client"
import React, { useState, useEffect, useMemo } from "react"
import Papa from "papaparse"
import { AreaChart, BarChart, LineChart } from "@/components/charts"
import { Button } from "@/components/ui/button"
import { sampleCSVData } from "@/lib/sampleCSV"

const cleanNumericData = (data: any[]) => {
  return data.map((row) => {
    const cleanedRow: any = {}
    for (const key in row) {
      let val = row[key]
      if (typeof val === "string") {
        const cleaned = val.replace(/,/g, "").match(/(\d+\.?\d*)/)
        cleanedRow[key] = cleaned ? parseFloat(cleaned[1]) : NaN
      } else {
        cleanedRow[key] = val
      }
    }
    return cleanedRow
  })
}

const parseCSV = (file: File | string, isSample = false, onParsed: (data: any[]) => void) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      let parsed = results.data.filter((row: any) =>
        Object.values(row).some((val) => val !== null && val !== "")
      )
      parsed = cleanNumericData(parsed)
      onParsed(parsed)
    },
  })
}

const DataVisualizer = () => {
  const [data, setData] = useState<any[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [indexColumn, setIndexColumn] = useState<string>("")
  const [chartType, setChartType] = useState<"line" | "bar" | "area" | "table">("line")

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    parseCSV(file, false, (parsed) => {
      setData(parsed)
      const keys = Object.keys(parsed[0] || {})
      setSelectedColumns(keys.filter((k) => k !== keys[0]))
      setIndexColumn(keys[0])
    })
  }

  const handleSampleData = () => {
    parseCSV(sampleCSVData, true, (parsed) => {
      setData(parsed)
      const keys = Object.keys(parsed[0] || {})
      setSelectedColumns(keys.filter((k) => k !== keys[0]))
      setIndexColumn(keys[0])
    })
  }

  const renderRecharts = () => {
    const chartProps = {
      data,
      dataKeys: selectedColumns,
      indexKey: indexColumn,
    }

    switch (chartType) {
      case "line":
        return <LineChart {...chartProps} />
      case "bar":
        return <BarChart {...chartProps} />
      case "area":
        return <AreaChart {...chartProps} />
      default:
        return null
    }
  }

  const renderTable = () => {
    if (!data || data.length === 0 || selectedColumns.length === 0) {
      return <div className="text-center p-4 text-gray-400">No data to display.</div>
    }

    return (
      <div className="overflow-auto max-h-[70vh] border rounded-lg shadow bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <th className="border px-3 py-2 font-semibold">{indexColumn}</th>
              {selectedColumns.map((col) => (
                <th key={col} className="border px-3 py-2 font-semibold">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 100).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-indigo-50 transition">
                <td className="border px-3 py-2">{safeValue(row[indexColumn])}</td>
                {selectedColumns.map((col) => (
                  <td key={col} className="border px-3 py-2">{safeValue(row[col])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 100 && (
          <div className="text-sm text-center p-2 text-gray-500">
            Showing first 100 rows...
          </div>
        )}
      </div>
    )
  }

  const safeValue = (val: any): string => {
    if (val === null || val === undefined || isNaN(val)) return "-"
    return val.toString()
  }

  const chartElement = useMemo(() => renderRecharts(), [data, selectedColumns, chartType])
  const tableElement = useMemo(() => renderTable(), [data, selectedColumns])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-white to-sky-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700">📊 AI Data Visualizer</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="p-2 rounded-md border-2 border-dashed border-indigo-400 bg-white hover:bg-indigo-50 transition"
        />
        <Button onClick={handleSampleData} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:brightness-110">
          Load Sample Data
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["line", "bar", "area", "table"].map((type) => (
          <Button
            key={type}
            onClick={() => setChartType(type as any)}
            className={`rounded-full px-4 py-2 font-semibold shadow ${
              chartType === type
                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {type.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="mt-4">
        {chartType === "table" ? tableElement : chartElement}
      </div>
    </div>
  )
}

export default DataVisualizer;
