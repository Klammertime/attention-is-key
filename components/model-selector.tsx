"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"

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
    <div className="space-y-3">
      <label className="text-sm font-medium flex items-center gap-2">
        <Brain className="h-4 w-4" />
        Transformer Model
      </label>

      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-gray-500">{model.description}</div>
                </div>
                <Badge variant="outline" className="ml-2">
                  {model.type}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedModelInfo && (
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">{selectedModelInfo.type}</Badge>
            <span className="font-medium">{selectedModelInfo.name}</span>
          </div>
          <p>{selectedModelInfo.description}</p>
        </div>
      )}
    </div>
  )
}
