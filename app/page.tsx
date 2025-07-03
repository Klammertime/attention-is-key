"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AttentionHeatmap from "@/components/attention-heatmap"
import PhraseEvolutionChart from "@/components/phrase-evolution-chart"
import ModelSelector from "@/components/model-selector"
import BlogSection from "@/components/blog-section"

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

// CSS.gg Reset Icon Component
const ResetIcon = ({ className }: { className?: string }) => (
  <div className={`inline-block ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.56079 10.6418L6.35394 3.94971L8.25402 4.44382L7.22111 7.12L7.28696 7.1088C10.9121 6.5259 14.6235 8.1018 16.7094 11.2543C18.7954 14.4069 18.8581 18.4906 16.8699 21.7L15.1301 20.7C16.6419 18.2594 16.5956 15.0906 15.0406 12.6957C13.4856 10.3009 10.7144 9.0741 7.97889 9.4912L7.91304 9.5024L8.94595 12.1786L7.04587 12.6727L4.56079 10.6418Z"
        fill="currentColor"
      />
    </svg>
  </div>
)

export default function AttentionIsKey() {
  const [lyrics, setLyrics] = useState("")
  const [targetPhrase, setTargetPhrase] = useState("")
  const [selectedModel, setSelectedModel] = useState("bert-base-uncased")
  const [attentionData, setAttentionData] = useState<AttentionData | null>(null)
  const [phraseAnalysis, setPhraseAnalysis] = useState<PhraseAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [analysisComplete, setAnalysisComplete] = useState(false)

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
    setAnalysisComplete(false)

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

      // Set analysis complete
      setAnalysisComplete(true)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setAnalysisComplete(false)
    setAttentionData(null)
    setPhraseAnalysis(null)
    setLyrics("")
    setTargetPhrase("")
    setActiveTab("input")
  }

  const loadSample = () => {
    setLyrics(sampleLyrics)
    setTargetPhrase("I walk alone")
  }

  const navigateToResults = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F55AC2] via-purple-500 to-[#201A39]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">Attention is Key</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          </div>
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
            Visualize how Large Language Models interpret and attend to different words in song lyrics as context
            evolves throughout the song. Where musical keys meet transformer attention keys.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-[#201A39] text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="input"
              className="data-[state=active]:bg-white data-[state=active]:text-[#201A39] text-white"
            >
              Input & Analysis
            </TabsTrigger>
            <TabsTrigger
              value="attention"
              className="data-[state=active]:bg-white data-[state=active]:text-[#201A39] text-white"
            >
              Attention Patterns
            </TabsTrigger>
            <TabsTrigger
              value="evolution"
              className="data-[state=active]:bg-white data-[state=active]:text-[#201A39] text-white"
            >
              Phrase Evolution
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="data-[state=active]:bg-white data-[state=active]:text-[#201A39] text-white"
            >
              Blog
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#201A39] text-xl">Attention Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    See how transformer models attend to different words in your lyrics, revealing the AI's
                    understanding of semantic relationships.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#201A39] text-xl">Multiple Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Compare attention patterns across BERT, RoBERTa, and GPT-2 to understand how different architectures
                    interpret the same lyrics.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#201A39] text-xl">Narrative Evolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Track how repeated phrases gain different semantic meaning based on their narrative context
                    throughout the song.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#201A39] text-2xl">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-[#F55AC2] text-white">
                      Real attention scores from transformer models
                    </Badge>
                    <Badge variant="secondary" className="bg-[#F55AC2] text-white">
                      Beautiful, interactive D3.js visualizations
                    </Badge>
                    <Badge variant="secondary" className="bg-[#F55AC2] text-white">
                      Support for BERT, RoBERTa, GPT-2
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="bg-[#F55AC2] text-white">
                      Export high-resolution images
                    </Badge>
                    <Badge variant="secondary" className="bg-[#F55AC2] text-white">
                      Compare attention across phrase occurrences
                    </Badge>
                    <Badge variant="outline" className="border-gray-300 text-gray-600">
                      Coming v2: Real-time audio sync
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="input" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#201A39] text-xl">Song Lyrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your song lyrics here..."
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    className="min-h-[300px] font-mono text-sm border-gray-200 text-gray-900"
                  />
                  <Button
                    onClick={loadSample}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Load Sample Lyrics
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#201A39] text-xl">Analysis Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">Target Phrase (Optional)</label>
                    <Input
                      placeholder="e.g., 'I walk alone'"
                      value={targetPhrase}
                      onChange={(e) => setTargetPhrase(e.target.value)}
                      className="border-gray-200 text-gray-900"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Analyze how attention to this phrase evolves throughout the song
                    </p>
                  </div>

                  <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />

                  <div className="space-y-3">
                    <Button
                      onClick={handleAnalyze}
                      disabled={!lyrics.trim() || isLoading}
                      className="w-full bg-[#F55AC2] text-white hover:bg-[#E04A9F]"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Attention"
                      )}
                    </Button>

                    {analysisComplete && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-800 font-medium">Analysis Complete!</span>
                          </div>
                          <Button
                            onClick={handleReset}
                            size="sm"
                            variant="ghost"
                            className="text-green-700 hover:text-green-800 hover:bg-green-100 p-1"
                          >
                            <ResetIcon className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-green-700 text-sm">
                          Your attention analysis is ready. Click below to explore the results:
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            onClick={() => navigateToResults("attention")}
                            size="sm"
                            className="bg-[#F55AC2] text-white hover:bg-[#E04A9F]"
                          >
                            View Attention Patterns →
                          </Button>
                          {targetPhrase && (
                            <Button
                              onClick={() => navigateToResults("evolution")}
                              size="sm"
                              variant="outline"
                              className="border-[#F55AC2] text-[#F55AC2] hover:bg-[#F55AC2] hover:text-white"
                            >
                              View Phrase Evolution →
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attention" className="space-y-8">
            {attentionData ? (
              <AttentionHeatmap data={attentionData} />
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">🧠</div>
                  <p className="text-gray-600 text-lg">Run an analysis to see attention patterns</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="evolution" className="space-y-8">
            {phraseAnalysis ? (
              <PhraseEvolutionChart data={phraseAnalysis} />
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">🎵</div>
                  <p className="text-gray-600 text-lg">
                    Specify a target phrase and run analysis to see phrase evolution
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="blog" className="space-y-8">
            <BlogSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
