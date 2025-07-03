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

    // Updated color scale to match the plasma/inferno-inspired reference image palette
    // From very dark purple/black through magentas, reds, oranges to light peach
    const customColorInterpolator = (t: number) => {
      const colors = [
        "#0d0887", // Very dark purple (almost black)
        "#2d0594", // Dark purple
        "#4c02a1", // Purple
        "#6a00a8", // Purple-magenta
        "#8b0aa5", // Magenta
        "#a91e9d", // Bright magenta
        "#c53a8c", // Magenta-red
        "#dd5470", // Red-pink
        "#f0744f", // Orange-red
        "#fb9b06", // Orange
        "#f7c932", // Yellow-orange
        "#fcffa4", // Light cream/peach
      ]

      const scaledT = t * (colors.length - 1)
      const index = Math.floor(scaledT)
      const fraction = scaledT - index

      if (index >= colors.length - 1) return colors[colors.length - 1]

      return d3.interpolateRgb(colors[index], colors[index + 1])(fraction)
    }

    const enhancedColorScale = d3
      .scaleSequential()
      .interpolator(customColorInterpolator)
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
      .style("fill", (d) => enhancedColorScale(d.value))
      .style("stroke", "#333")
      .style("stroke-width", 0.3)
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

    // Add color legend
    const legendWidth = 200
    const legendHeight = 20
    const legendX = width - legendWidth
    const legendY = -50

    // Create gradient for legend
    const legendGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%")

    // Add color stops to match our plasma/inferno-inspired color scale
    const legendStops = [
      { offset: "0%", color: "#0d0887" },
      { offset: "9%", color: "#2d0594" },
      { offset: "18%", color: "#4c02a1" },
      { offset: "27%", color: "#6a00a8" },
      { offset: "36%", color: "#8b0aa5" },
      { offset: "45%", color: "#a91e9d" },
      { offset: "54%", color: "#c53a8c" },
      { offset: "63%", color: "#dd5470" },
      { offset: "72%", color: "#f0744f" },
      { offset: "81%", color: "#fb9b06" },
      { offset: "90%", color: "#f7c932" },
      { offset: "100%", color: "#fcffa4" },
    ]

    legendStops.forEach((stop) => {
      legendGradient.append("stop").attr("offset", stop.offset).attr("stop-color", stop.color)
    })

    // Add legend rectangle
    g.append("rect")
      .attr("x", legendX)
      .attr("y", legendY)
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#legend-gradient)")
      .style("stroke", "#666")
      .style("stroke-width", 1)

    // Add legend labels
    g.append("text")
      .attr("x", legendX)
      .attr("y", legendY - 5)
      .style("font-size", "12px")
      .style("fill", "#374151")
      .text("Low")

    g.append("text")
      .attr("x", legendX + legendWidth)
      .attr("y", legendY - 5)
      .attr("text-anchor", "end")
      .style("font-size", "12px")
      .style("fill", "#374151")
      .text("High")

    g.append("text")
      .attr("x", legendX + legendWidth / 2)
      .attr("y", legendY - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#374151")
      .text("Attention Strength")

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
                  ? "bg-[#0d0887] text-white hover:bg-[#2d0594]"
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
            Very dark purple indicates low attention, light cream indicates high attention.
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
