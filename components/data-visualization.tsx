"use client"
import React, { useState, useEffect, useMemo } from "react"
import Papa from "papaparse"
import { AreaChart, BarChart, LineChart } from "@/components/charts"
import { Button } from "@/components/ui/button"
import { sampleCSVData } from "@/lib/sampleCSV"

const DataVisualizer = () => {
  const [data, setData] = useState<any[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [indexColumn, setIndexColumn] = useState<string>("")
  const [chartType, setChartType] = useState<"line" | "bar" | "area" | "table">("line")

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = results.data.filter(
          (row: any) => Object.values(row).some((val) => val !== null && val !== "")
        )
        setData(cleaned)
        const keys = Object.keys(cleaned[0] || {})
        setSelectedColumns(keys.slice(1))
        setIndexColumn(keys[0])
      },
    })
  }

  const handleSampleData = () => {
    Papa.parse(sampleCSVData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = results.data.filter(
          (row: any) => Object.values(row).some((val) => val !== null && val !== "")
        )
        setData(cleaned)
        const keys = Object.keys(cleaned[0] || {})
        setSelectedColumns(keys.slice(1))
        setIndexColumn(keys[0])
      },
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
      return <div className="text-center p-4">No data to display.</div>
    }

    return (
      <div className="overflow-auto max-h-[70vh] border rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">{indexColumn}</th>
              {selectedColumns.map((col) => (
                <th key={col} className="border px-2 py-1">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 100).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border px-2 py-1">{row[indexColumn]}</td>
                {selectedColumns.map((col) => (
                  <td key={col} className="border px-2 py-1">{row[col]}</td>
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

  const chartElement = useMemo(() => renderRecharts(), [data, selectedColumns, chartType])
  const tableElement = useMemo(() => renderTable(), [data, selectedColumns])

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="border p-2 rounded"
        />
        <Button onClick={handleSampleData} className="bg-blue-500 text-white">
          Load Sample Data
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["line", "bar", "area", "table"].map((type) => (
          <Button
            key={type}
            onClick={() => setChartType(type as any)}
            className={chartType === type ? "bg-green-500 text-white" : ""}
          >
            {type.toUpperCase()}
          </Button>
        ))}
      </div>

      <div>{chartType === "table" ? tableElement : chartElement}</div>
    </div>
  )
}

export default DataVisualizer
