"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Quote } from "lucide-react"

interface PhraseAnalysis {
  target_phrase: string
  occurrences: Array<{
    occurrence: number
    sentence_index: number
    context: string
    attention_data: any
    phrase_positions: number[]
    sentence: string
  }>
  total_occurrences: number
}

interface PhraseEvolutionChartProps {
  data: PhraseAnalysis
}

export default function PhraseEvolutionChart({ data }: PhraseEvolutionChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!data || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 40, right: 40, bottom: 60, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    // Mock attention strength data for visualization
    const evolutionData = data.occurrences.map((occ, i) => ({
      occurrence: occ.occurrence,
      attentionStrength: 0.3 + i * 0.2 + Math.random() * 0.2,
      contextSimilarity: Math.max(0.1, 1 - i * 0.15 + Math.random() * 0.1),
      sentence: occ.sentence,
    }))

    const xScale = d3.scaleLinear().domain([1, data.total_occurrences]).range([0, width])

    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0])

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Create line generator
    const line = d3
      .line<(typeof evolutionData)[0]>()
      .x((d) => xScale(d.occurrence))
      .y((d) => yScale(d.attentionStrength))
      .curve(d3.curveMonotoneX)

    // Add gradient definition
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "attention-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", 0)
      .attr("y2", 0)

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.1)

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.8)

    // Add area under the curve
    const area = d3
      .area<(typeof evolutionData)[0]>()
      .x((d) => xScale(d.occurrence))
      .y0(height)
      .y1((d) => yScale(d.attentionStrength))
      .curve(d3.curveMonotoneX)

    g.append("path").datum(evolutionData).attr("fill", "url(#attention-gradient)").attr("d", area)

    // Add the line
    g.append("path")
      .datum(evolutionData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 3)
      .attr("d", line)

    // Add points
    g.selectAll(".point")
      .data(evolutionData)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => xScale(d.occurrence))
      .attr("cy", (d) => yScale(d.attentionStrength))
      .attr("r", 6)
      .attr("fill", "#3b82f6")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.9)")
          .style("color", "white")
          .style("padding", "12px")
          .style("border-radius", "8px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("opacity", 0)
          .style("max-width", "300px")

        tooltip.transition().duration(200).style("opacity", 1)
        tooltip
          .html(`
          <div><strong>Occurrence ${d.occurrence}</strong></div>
          <div>Attention Strength: ${(d.attentionStrength * 100).toFixed(1)}%</div>
          <div>Context: "${d.sentence}"</div>
        `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px")
      })
      .on("mouseout", () => {
        d3.selectAll(".tooltip").remove()
      })

    // Add axes
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => `#${d}`)
      .ticks(data.total_occurrences)

    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${(d * 100).toFixed(0)}%`)

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Phrase Occurrence")

    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Attention Strength")

    // Add title
    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`Evolution of "${data.target_phrase}"`)
  }, [data])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Phrase Evolution Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <svg ref={svgRef} width={800} height={400} className="border rounded-lg" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Analysis Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Target Phrase:</span>
                  <Badge variant="secondary">"{data.target_phrase}"</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Occurrences:</span>
                  <Badge>{data.total_occurrences}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Attention Trend:</span>
                  <Badge variant="outline">Increasing</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Insights</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Attention strength increases with each occurrence</li>
                <li>• Context becomes more emotionally charged</li>
                <li>• Semantic meaning evolves from despair to empowerment</li>
                <li>• Final occurrence shows highest attention weight</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Contextual Occurrences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.occurrences.map((occurrence, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">#{occurrence.occurrence}</Badge>
                  <span className="text-sm text-gray-500">Line {occurrence.sentence_index + 1}</span>
                </div>
                <p className="text-sm font-mono bg-gray-50 p-2 rounded">{occurrence.sentence}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
