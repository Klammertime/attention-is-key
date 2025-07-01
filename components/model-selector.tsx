"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

const models = [
  {
    id: "bert-base-uncased",
    name: "BERT Base",
    description: "Bidirectional encoder, great for understanding context",
    type: "Encoder",
  },
  {
    id: "roberta-base",
    name: "RoBERTa Base",
    description: "Robustly optimized BERT, improved training",
    type: "Encoder",
  },
  {
    id: "gpt2",
    name: "GPT-2",
    description: "Generative model, left-to-right attention",
    type: "Decoder",
  },
  {
    id: "distilbert-base-uncased",
    name: "DistilBERT",
    description: "Smaller, faster version of BERT",
    type: "Encoder",
  },
]

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const selectedModelInfo = models.find((m) => m.id === selectedModel)

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium flex items-center gap-2 text-gray-700">Transformer Model</label>

      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="border-gray-200 text-gray-900">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id} className="text-gray-900 hover:bg-gray-50">
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-gray-500">{model.description}</div>
                </div>
                <Badge variant="outline" className="ml-2 border-gray-300 text-gray-600">
                  {model.type}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedModelInfo && (
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-[#F55AC2] text-white">
              {selectedModelInfo.type}
            </Badge>
            <span className="font-medium text-gray-900">{selectedModelInfo.name}</span>
          </div>
          <p>{selectedModelInfo.description}</p>
        </div>
      )}
    </div>
  )
}
