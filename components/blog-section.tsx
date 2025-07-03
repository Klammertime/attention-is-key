"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  tags: string[]
  category: "tutorial" | "research" | "case-study" | "technical" | "update"
}

const blogPosts: BlogPost[] = [
  {
    id: "understanding-transformer-attention",
    title: "Understanding Transformer Attention: The Key to AI's Language Understanding",
    excerpt:
      "Dive deep into how transformer models like BERT and GPT use attention mechanisms to understand context and meaning in text.",
    content: `
# Understanding Transformer Attention: The Key to AI's Language Understanding

Transformer attention is one of the most revolutionary concepts in modern AI. But what exactly is it, and why is it so powerful for understanding language?

## What is Attention?

In the context of neural networks, attention is a mechanism that allows the model to focus on different parts of the input when making predictions. Think of it like how you might focus on different words in a sentence to understand its meaning.

## The Attention Matrix

When we visualize attention in our app, we're looking at an **attention matrix**. Each cell in this matrix represents how much one word "attends to" or "focuses on" another word.

### Key Concepts:

- **Query**: The word that's "asking" for information
- **Key**: The word being "asked" about  
- **Value**: The actual information being passed
- **Attention Weight**: How much focus is placed on each word

## Why This Matters for Lyrics

Song lyrics are particularly interesting for attention analysis because:

1. **Repetition**: Phrases repeat with different emotional contexts
2. **Narrative Arc**: The story evolves throughout the song
3. **Emotional Progression**: Feelings change from verse to verse
4. **Semantic Shifts**: Same words can mean different things

## Try It Yourself

Load up some lyrics in our app and watch how attention patterns change. You'll be amazed at what the AI is actually "thinking" about!

*Next week: We'll explore how different transformer models (BERT vs GPT-2) show different attention patterns on the same lyrics.*
    `,
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["attention", "transformers", "basics"],
    category: "tutorial",
  },
  {
    id: "bohemian-rhapsody-analysis",
    title: "Case Study: How AI Interprets 'Bohemian Rhapsody'",
    excerpt:
      "A fascinating deep-dive into how transformer models understand Queen's masterpiece, revealing surprising insights about narrative structure.",
    content: `
# Case Study: How AI Interprets 'Bohemian Rhapsody'

Queen's "Bohemian Rhapsody" is a masterpiece of musical storytelling. But how does an AI model understand its complex narrative structure?

## The Three Acts

When we analyze the lyrics with BERT, we see distinct attention patterns for each section:

### Act I: "Mama, just killed a man"
- High attention between "mama" and emotional words
- Strong connections to confession-related terms
- Past tense verbs get significant focus

### Act II: The Opera Section
- Attention becomes more scattered and chaotic
- Character names (Scaramouche, Figaro) create their own attention clusters
- Musical terms show unique patterns

### Act III: "Nothing really matters"
- Philosophical words gain prominence
- Attention shifts to existential themes
- Resolution patterns emerge

## Key Findings

1. **Narrative Coherence**: Despite the song's complexity, BERT maintains thematic connections across sections
2. **Emotional Progression**: Attention weights reflect the emotional journey from guilt to acceptance
3. **Character Development**: The AI tracks the protagonist's psychological state through attention patterns

## The "Galileo" Phenomenon

One of the most interesting discoveries was how the repeated "Galileo" creates a unique attention signature - the AI recognizes it as both a name and a cry for help.

*Want to see this analysis in action? Try loading Bohemian Rhapsody lyrics into our app!*
    `,
    author: "Prof. Michael Rodriguez",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["case-study", "queen", "narrative"],
    category: "case-study",
  },
  {
    id: "bert-vs-gpt2-attention",
    title: "BERT vs GPT-2: How Different Models See the Same Lyrics",
    excerpt:
      "Comparing attention patterns between encoder and decoder models reveals fascinating differences in how AI processes language.",
    content: `
# BERT vs GPT-2: How Different Models See the Same Lyrics

Not all transformer models are created equal. BERT and GPT-2 represent two different approaches to language understanding, and their attention patterns tell very different stories.

## Architecture Differences

### BERT (Bidirectional Encoder)
- Sees the entire text at once
- Can attend to future words
- Optimized for understanding context

### GPT-2 (Autoregressive Decoder)  
- Processes text left-to-right
- Cannot see future words
- Optimized for text generation

## Attention Pattern Differences

When analyzing the same lyrics, we observe:

### BERT Patterns:
- **Symmetric attention**: Words attend to each other bidirectionally
- **Long-range dependencies**: Can connect distant related concepts
- **Thematic clustering**: Groups semantically related words

### GPT-2 Patterns:
- **Triangular attention**: Only attends to previous words
- **Recency bias**: Stronger attention to recent words
- **Predictive focus**: Attends to words that help predict the next token

## Practical Implications

These differences mean:
- **BERT** is better for understanding overall meaning and themes
- **GPT-2** shows how lyrics build meaning progressively
- **Both** offer unique insights into lyrical structure

## Example: "Yesterday" by The Beatles

In our analysis of this classic song:
- BERT immediately connects "yesterday" with "troubles" across the entire song
- GPT-2 shows how the meaning of "yesterday" evolves as the song progresses

*Try comparing both models in our app to see these differences yourself!*
    `,
    author: "Dr. Sarah Chen",
    date: "2024-01-08",
    readTime: "10 min read",
    tags: ["bert", "gpt-2", "comparison", "technical"],
    category: "technical",
  },
  {
    id: "getting-started-guide",
    title: "Getting Started: Your First Attention Analysis",
    excerpt:
      "A step-by-step guide to using Attention is Key for analyzing your favorite songs and understanding what the AI is really thinking.",
    content: `
# Getting Started: Your First Attention Analysis

Welcome to Attention is Key! This guide will walk you through your first analysis and help you understand what you're seeing.

## Step 1: Choose Your Lyrics

Start with something simple but meaningful. We recommend:
- Songs with repeated phrases (great for evolution analysis)
- Clear narrative structure
- Emotional progression

**Pro tip**: Our sample lyrics are perfect for learning!

## Step 2: Select Your Model

### For Beginners:
- **BERT**: Best overall choice, shows clear patterns
- **DistilBERT**: Faster processing, similar results

### For Advanced Users:
- **RoBERTa**: More nuanced attention patterns
- **GPT-2**: Unique left-to-right perspective

## Step 3: Set Your Target Phrase

Choose a phrase that appears multiple times in your lyrics. This could be:
- The chorus hook
- A repeated emotional statement
- A key thematic element

## Step 4: Interpret the Results

### Attention Heatmap:
- **Dark colors**: Low attention
- **Bright colors**: High attention
- **Patterns**: Look for clusters and connections

### Phrase Evolution:
- **Rising trend**: Phrase gains importance
- **Falling trend**: Phrase loses significance
- **Peaks**: Moments of highest emotional impact

## Common Patterns to Look For

1. **Self-attention**: Words attending to themselves
2. **Syntactic patterns**: Attention following grammar rules
3. **Semantic clustering**: Related concepts grouping together
4. **Emotional peaks**: High attention during emotional moments

## Your First Analysis Checklist

- [ ] Load lyrics (sample or your own)
- [ ] Choose BERT as your model
- [ ] Set a target phrase
- [ ] Run the analysis
- [ ] Explore different layers
- [ ] Compare attention patterns
- [ ] Export your favorite visualizations

*Ready to dive deeper? Check out our case studies for advanced techniques!*
    `,
    author: "The Attention is Key Team",
    date: "2024-01-12",
    readTime: "6 min read",
    tags: ["tutorial", "beginner", "guide"],
    category: "tutorial",
  },
  {
    id: "attention-layers-explained",
    title: "Attention Layers: Why Layer 6 Might Be More Interesting Than Layer 12",
    excerpt:
      "Different layers in transformer models capture different types of linguistic information. Here's what each layer is actually doing.",
    content: `
# Attention Layers: Why Layer 6 Might Be More Interesting Than Layer 12

One of the most common questions we get is: "Which attention layer should I look at?" The answer might surprise you.

## The Layer Hierarchy

Transformer models process information through multiple layers, each capturing different aspects of language:

### Early Layers (1-3):
- **Syntactic patterns**: Grammar and sentence structure
- **Local dependencies**: Adjacent word relationships
- **Basic linguistic features**: Parts of speech, punctuation

### Middle Layers (4-8):
- **Semantic relationships**: Meaning and concepts
- **Thematic connections**: Related ideas across the text
- **Emotional patterns**: Sentiment and mood

### Late Layers (9-12):
- **Task-specific features**: Depends on model training
- **Abstract representations**: High-level concepts
- **Sometimes less interpretable**: Over-processed information

## The "Sweet Spot" Phenomenon

Research shows that **layers 6-8** often contain the most interpretable attention patterns for semantic analysis. This is where you'll find:

- Clear thematic clustering
- Meaningful long-range dependencies  
- Intuitive attention patterns

## Layer-by-Layer Analysis Tips

### For Lyrical Analysis:
- **Layer 1-2**: Check for basic grammar patterns
- **Layer 6-7**: Look for thematic and emotional patterns
- **Layer 11-12**: Observe abstract conceptual relationships

### Red Flags:
- **Too scattered**: Layer might be over-processing
- **Too focused**: Layer might be under-processing
- **Random patterns**: Layer might not be relevant for your text

## Practical Example

In our analysis of "Hotel California":
- **Layer 2**: Focuses on "hotel" and "California" as proper nouns
- **Layer 6**: Connects themes of entrapment and luxury
- **Layer 11**: Shows abstract concepts but less clear patterns

## Pro Tips

1. **Start with layer 6**: Usually the most interpretable
2. **Compare adjacent layers**: Look for pattern evolution
3. **Don't ignore early layers**: Sometimes simpler is better
4. **Trust your intuition**: If it looks meaningful, it probably is

*Next week: We'll explore how attention patterns change with different music genres!*
    `,
    author: "Dr. Lisa Park",
    date: "2024-01-05",
    readTime: "9 min read",
    tags: ["layers", "technical", "interpretation"],
    category: "technical",
  },
  {
    id: "app-update-v2",
    title: "Coming Soon: Real-Time Audio Sync and New Visualizations",
    excerpt:
      "Exciting updates coming to Attention is Key, including synchronized audio playback and advanced visualization options.",
    content: `
# Coming Soon: Real-Time Audio Sync and New Visualizations

We're excited to share what's coming next for Attention is Key! Based on your feedback, we're working on some amazing new features.

## 🎵 Real-Time Audio Sync

The most requested feature is finally coming! Soon you'll be able to:

- **Upload audio files** alongside lyrics
- **Watch attention patterns** change in real-time as the song plays
- **Sync visualizations** with the actual music
- **Export synchronized videos** of your analysis

### Technical Preview:
We're using Web Audio API to create frame-perfect synchronization between the audio and attention visualizations. Early tests show incredible insights into how musical timing affects attention patterns.

## 📊 New Visualization Types

### 1. Attention Flow Diagrams
- Sankey-style diagrams showing attention flow
- Perfect for understanding information pathways
- Interactive exploration of attention chains

### 2. 3D Attention Landscapes
- Height-mapped attention surfaces
- Rotate and explore from any angle
- Identify attention "peaks" and "valleys"

### 3. Comparative Analysis
- Side-by-side model comparisons
- Difference heatmaps
- Statistical significance testing

## 🔧 Technical Improvements

### Performance Enhancements:
- **50% faster** processing with optimized backend
- **WebGL acceleration** for smoother visualizations
- **Progressive loading** for large texts

### New Model Support:
- **T5**: Text-to-text transformer
- **ELECTRA**: More efficient pre-training
- **Custom models**: Upload your own fine-tuned models

## 🎯 User Experience Updates

### Improved Interface:
- **Dark mode** support
- **Mobile-responsive** design
- **Keyboard shortcuts** for power users
- **Accessibility** improvements

### Educational Features:
- **Interactive tutorials** built into the app
- **Guided analysis** for beginners
- **Advanced tips** for researchers

## 📅 Release Timeline

- **Phase 1** (February 2024): Audio sync beta
- **Phase 2** (March 2024): New visualizations
- **Phase 3** (April 2024): Performance improvements
- **Phase 4** (May 2024): Full v2.0 release

## 🧪 Beta Testing

Want early access? We're looking for beta testers! Email us at beta@attentioniskey.com with:
- Your use case (research, education, curiosity)
- Favorite songs to analyze
- Technical background

## 💝 Thank You

These updates are driven by your amazing feedback and suggestions. Keep them coming!

*Stay tuned for more updates, and thank you for making Attention is Key a success!*
    `,
    author: "The Attention is Key Team",
    date: "2024-01-20",
    readTime: "5 min read",
    tags: ["update", "features", "roadmap"],
    category: "update",
  },
]

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "tutorial", "research", "case-study", "technical", "update"]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      tutorial: "bg-blue-100 text-blue-800",
      research: "bg-purple-100 text-purple-800",
      "case-study": "bg-green-100 text-green-800",
      technical: "bg-orange-100 text-orange-800",
      update: "bg-pink-100 text-pink-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (selectedPost) {
    return (
      <div className="space-y-6">
        <Button
          onClick={() => setSelectedPost(null)}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
        >
          ← Back to Blog
        </Button>

        <Card className="bg-white shadow-lg">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className={getCategoryColor(selectedPost.category)}>
                {selectedPost.category.replace("-", " ")}
              </Badge>
              <span className="text-sm text-gray-500">{selectedPost.date}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{selectedPost.readTime}</span>
            </div>
            <CardTitle className="text-3xl text-[#201A39]">{selectedPost.title}</CardTitle>
            <p className="text-gray-600 text-lg">{selectedPost.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>By {selectedPost.author}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-gray-300 text-gray-600">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">{selectedPost.content}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Blog Header */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl text-white text-center">The Attention Blog</CardTitle>
          <p className="text-white/80 text-center text-lg">
            Deep dives into transformer attention, tutorials, case studies, and the latest research
          </p>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search posts, tags, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-[#F55AC2] text-white hover:bg-[#E04A9F]"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  {category === "all" ? "All" : category.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(post.category)}>{post.category.replace("-", " ")}</Badge>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <CardTitle className="text-xl text-[#201A39] line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-300 text-gray-600 text-xs">
                    #{tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="border-gray-300 text-gray-600 text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-500">
                  <div>{post.author}</div>
                  <div>{post.date}</div>
                </div>
                <Button
                  onClick={() => setSelectedPost(post)}
                  size="sm"
                  className="bg-[#F55AC2] text-white hover:bg-[#E04A9F]"
                >
                  Read More →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="bg-white shadow-lg">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">No posts found matching your search.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              variant="outline"
              className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-[#F55AC2] to-[#201A39] text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Stay Updated</CardTitle>
          <p className="text-center text-white/80">
            Get the latest posts about transformer attention and AI research delivered to your inbox
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-white text-[#201A39] hover:bg-white/90">Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
