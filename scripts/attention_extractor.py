import torch
from transformers import AutoTokenizer, AutoModel, BertTokenizer, BertModel
import numpy as np
import json
from typing import Dict, List, Tuple, Optional

class AttentionExtractor:
    def __init__(self, model_name: str = "bert-base-uncased"):
        """Initialize the attention extractor with a specified transformer model."""
        self.model_name = model_name
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name, output_attentions=True)
        self.model.eval()
        
    def extract_attention(self, text: str) -> Dict:
        """Extract attention scores from the transformer model."""
        # Tokenize the input text
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        tokens = self.tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
        
        # Get model outputs with attention
        with torch.no_grad():
            outputs = self.model(**inputs)
            attentions = outputs.attentions
        
        # Process attention scores
        # Shape: (num_layers, batch_size, num_heads, seq_len, seq_len)
        attention_data = []
        
        for layer_idx, layer_attention in enumerate(attentions):
            layer_attention = layer_attention.squeeze(0)  # Remove batch dimension
            
            # Average across attention heads
            avg_attention = layer_attention.mean(dim=0)
            
            attention_data.append({
                "layer": layer_idx,
                "attention_matrix": avg_attention.numpy().tolist(),
                "tokens": tokens
            })
        
        return {
            "model_name": self.model_name,
            "tokens": tokens,
            "attention_layers": attention_data,
            "text": text
        }
    
    def analyze_phrase_evolution(self, lyrics: str, target_phrase: str) -> Dict:
        """Analyze how attention to a specific phrase changes throughout the song."""
        sentences = lyrics.split('\n')
        phrase_occurrences = []
        
        for i, sentence in enumerate(sentences):
            if target_phrase.lower() in sentence.lower():
                # Extract attention for this sentence with context
                context_start = max(0, i - 2)
                context_end = min(len(sentences), i + 3)
                context = ' '.join(sentences[context_start:context_end])
                
                attention_data = self.extract_attention(context)
                
                # Find phrase position in tokens
                phrase_tokens = self.tokenizer.tokenize(target_phrase.lower())
                phrase_positions = self._find_phrase_positions(attention_data["tokens"], phrase_tokens)
                
                phrase_occurrences.append({
                    "occurrence": len(phrase_occurrences) + 1,
                    "sentence_index": i,
                    "context": context,
                    "attention_data": attention_data,
                    "phrase_positions": phrase_positions,
                    "sentence": sentence
                })
        
        return {
            "target_phrase": target_phrase,
            "occurrences": phrase_occurrences,
            "total_occurrences": len(phrase_occurrences)
        }
    
    def _find_phrase_positions(self, tokens: List[str], phrase_tokens: List[str]) -> List[int]:
        """Find positions of phrase tokens in the token list."""
        positions = []
        for i in range(len(tokens) - len(phrase_tokens) + 1):
            if tokens[i:i+len(phrase_tokens)] == phrase_tokens:
                positions.extend(range(i, i + len(phrase_tokens)))
        return positions

# Example usage and testing
if __name__ == "__main__":
    extractor = AttentionExtractor()
    
    # Sample lyrics for testing
    sample_lyrics = """
    I walk alone down this empty street
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
    This is who I'm meant to be
    """
    
    # Analyze phrase evolution
    results = extractor.analyze_phrase_evolution(sample_lyrics, "I walk alone")
    
    print(f"Found {results['total_occurrences']} occurrences of '{results['target_phrase']}'")
    for occurrence in results['occurrences']:
        print(f"Occurrence {occurrence['occurrence']}: {occurrence['sentence']}")
