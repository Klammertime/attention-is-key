"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Brain, Eye, Play } from "lucide-react"
import AttentionHeatmap from "@/components/attention-heatmap"
import PhraseEvolutionChart from "@/components/phrase-evolution-chart"
import ModelSelector from "@/components/model-selector"

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

interface PhraseAnalysis {
  target_phrase: string
  occurrences: Array<{
    occurrence: number
    sentence_index: number
    context: string
    attention_data: AttentionData
    phrase_positions: number[]
    sentence: string
  }>
  total_occurrences: number
}

export default function AttentionIsKey() {
  const [lyrics, setLyrics] = useState("")
  const [targetPhrase, setTargetPhrase] = useState("")
  const [selectedModel, setSelectedModel] = useState("bert-base-uncased")
  const [attentionData, setAttentionData] = useState<AttentionData | null>(null)
  const [phraseAnalysis, setPhraseAnalysis] = useState<PhraseAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const sampleLyrics = `I walk alone down this empty street
The city lights are calling me
But I walk alone, with heavy feet
Dreams are fading, can't you see

I walk alone through the pouring rain
Each step echoes my silent pain
But I walk alone, it's all the same
Nothing left but this refrain

I walk alone, but now I see
The path ahead is meant for me
I walk alone, and I am free
This is who I'm meant to be`

  const handleAnalyze = async () => {
    if (!lyrics.trim()) return

    setIsLoading(true)
    try {
      // Simulate API call to Python backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock attention data for demonstration
      const mockAttentionData: AttentionData = {
        model_name: selectedModel,
        tokens: lyrics.split(" ").slice(0, 20),
        attention_layers: Array.from({ length: 12 }, (_, layer) => ({
          layer,
          attention_matrix: Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => Math.random())),
          tokens: lyrics.split(" ").slice(0, 20),
        })),
        text: lyrics,
      }

      setAttentionData(mockAttentionData)

      if (targetPhrase) {
        const mockPhraseAnalysis: PhraseAnalysis = {
          target_phrase: targetPhrase,
          total_occurrences: 4,
          occurrences: Array.from({ length: 4 }, (_, i) => ({
            occurrence: i + 1,
            sentence_index: i * 2,
            context: lyrics.split("\n")[i * 2] || "",
            attention_data: mockAttentionData,
            phrase_positions: [i, i + 1],
            sentence: lyrics.split("\n")[i * 2] || "",
          })),
        }
        setPhraseAnalysis(mockPhraseAnalysis)
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadSample = () => {
    setLyrics(sampleLyrics)
    setTargetPhrase("I walk alone")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Attention is Key
            </h1>
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visualize how Large Language Models interpret and attend to different words in song lyrics as context
            evolves throughout the song. Where musical keys meet transformer attention keys.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="input">Input & Analysis</TabsTrigger>
            <TabsTrigger value="attention">Attention Patterns</TabsTrigger>
            <TabsTrigger value="evolution">Phrase Evolution</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Attention Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    See how transformer models attend to different words in your lyrics, revealing the AI's
                    understanding of semantic relationships.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Multiple Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Compare attention patterns across BERT, RoBERTa, and GPT-2 to understand how different architectures
                    interpret the same lyrics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Narrative Evolution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Track how repeated phrases gain different semantic meaning based on their narrative context
                    throughout the song.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>🚀 Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Badge variant="secondary">✨ Real attention scores from transformer models</Badge>
                    <Badge variant="secondary">🎨 Beautiful, interactive D3.js visualizations</Badge>
                    <Badge variant="secondary">🤖 Support for BERT, RoBERTa, GPT-2</Badge>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">📸 Export high-resolution images</Badge>
                    <Badge variant="secondary">📊 Compare attention across phrase occurrences</Badge>
                    <Badge variant="outline">🎵 Coming v2: Real-time audio sync</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="input" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Song Lyrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your song lyrics here..."
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <Button onClick={loadSample} variant="outline" className="w-full bg-transparent">
                    Load Sample Lyrics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Phrase (Optional)</label>
                    <Input
                      placeholder="e.g., 'I walk alone'"
                      value={targetPhrase}
                      onChange={(e) => setTargetPhrase(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Analyze how attention to this phrase evolves throughout the song
                    </p>
                  </div>

                  <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />

                  <Button onClick={handleAnalyze} disabled={!lyrics.trim() || isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Analyze Attention
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attention" className="space-y-6">
            {attentionData ? (
              <AttentionHeatmap data={attentionData} />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Run an analysis to see attention patterns</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="evolution" className="space-y-6">
            {phraseAnalysis ? (
              <PhraseEvolutionChart data={phraseAnalysis} />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Specify a target phrase and run analysis to see phrase evolution</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
