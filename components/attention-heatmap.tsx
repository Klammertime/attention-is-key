"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AttentionData {
  model_name: string
  tokens: string[]
  attention_layers: Array<{
    layer: number
    attention_matrix: number[][]
    tokens: string[]
  }>
  text: string
}

interface AttentionHeatmapProps {
  data: AttentionData
}

export default function AttentionHeatmap({ data }: AttentionHeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedLayer, setSelectedLayer] = useState(0)

  useEffect(() => {
    if (!data || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 80, right: 80, bottom: 80, left: 80 }
    const width = 600 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom

    const layerData = data.attention_layers[selectedLayer]
    const matrix = layerData.attention_matrix
    const tokens = layerData.tokens

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(tokens.map((_, i) => i.toString()))
      .range([0, width])
      .padding(0.05)

    const yScale = d3
      .scaleBand()
      .domain(tokens.map((_, i) => i.toString()))
      .range([0, height])
      .padding(0.05)

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateRgb("#F55AC2", "#201A39"))
      .domain([0, d3.max(matrix.flat()) || 1])

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Create heatmap cells
    const rows = g
      .selectAll(".row")
      .data(matrix)
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", (_, i) => `translate(0,${yScale(i.toString())})`)

    rows
      .selectAll(".cell")
      .data((d, i) => d.map((value, j) => ({ value, i, j })))
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", (d) => xScale(d.j.toString()) || 0)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", (d) => colorScale(d.value))
      .style("stroke", "white")
      .style("stroke-width", 1)
      .on("mouseover", (event, d) => {
        // Tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "white")
          .style("color", "#201A39")
          .style("padding", "12px")
          .style("border-radius", "8px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)")
          .style("border", "1px solid #e5e7eb")

        tooltip.transition().duration(200).style("opacity", 1)
        tooltip
          .html(`
          <div><strong>From:</strong> ${tokens[d.i]}</div>
          <div><strong>To:</strong> ${tokens[d.j]}</div>
          <div><strong>Attention:</strong> ${d.value.toFixed(3)}</div>
        `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
      })
      .on("mouseout", () => {
        d3.selectAll(".tooltip").remove()
      })

    // Add x-axis labels
    g.selectAll(".x-label")
      .data(tokens)
      .enter()
      .append("text")
      .attr("class", "x-label")
      .attr("x", (_, i) => (xScale(i.toString()) || 0) + xScale.bandwidth() / 2)
      .attr("y", height + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#374151")
      .text((d) => (d.length > 8 ? d.substring(0, 8) + "..." : d))
      .attr(
        "transform",
        (_, i) => `rotate(-45, ${(xScale(i.toString()) || 0) + xScale.bandwidth() / 2}, ${height + 20})`,
      )

    // Add y-axis labels
    g.selectAll(".y-label")
      .data(tokens)
      .enter()
      .append("text")
      .attr("class", "y-label")
      .attr("x", -10)
      .attr("y", (_, i) => (yScale(i.toString()) || 0) + yScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .style("font-size", "10px")
      .style("fill", "#374151")
      .text((d) => (d.length > 8 ? d.substring(0, 8) + "..." : d))

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("fill", "#201A39")
      .text(`Attention Layer ${selectedLayer + 1} - ${data.model_name}`)
  }, [data, selectedLayer])

  const exportVisualization = () => {
    if (!svgRef.current) return

    const svgElement = svgRef.current
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `attention-layer-${selectedLayer + 1}.svg`
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#201A39] text-xl">Attention Heatmap</CardTitle>
          <Button
            onClick={exportVisualization}
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            Export SVG
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">Layer:</span>
          {data.attention_layers.map((_, index) => (
            <Button
              key={index}
              variant={selectedLayer === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedLayer(index)}
              className={
                selectedLayer === index
                  ? "bg-[#F55AC2] text-white hover:bg-[#E04A9F]"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <div className="flex justify-center">
          <svg ref={svgRef} width={760} height={760} className="border border-gray-200 rounded-lg bg-gray-50" />
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>How to read:</strong> Each cell shows how much attention token on the left pays to token on the top.
            Brighter colors indicate stronger attention.
          </p>
          <p>
            <strong>Model:</strong> {data.model_name} | <strong>Layer:</strong> {selectedLayer + 1} of{" "}
            {data.attention_layers.length}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
