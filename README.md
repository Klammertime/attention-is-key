# Attention is Key

*A powerful tool for visualizing how Large Language Models interpret and attend to different words in song lyrics as context evolves throughout the song.*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/audreys-projects-1f0650f0/v0-attention-is-key)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/iZ6wz7dFBLd)

## 🎯 Project Overview

Attention is Key demonstrates how transformer models (like BERT, RoBERTa, GPT-2) interpret and attend to different words in song lyrics, revealing how the same phrase can have dramatically different attention patterns based on its context in the song. Perfect for understanding how AI models process narrative and emotional evolution in text.

**Where musical keys meet transformer attention keys, revealing the key insights in how AI understands evolving narratives in music.**

## 🚀 Features

- ✨ **Real attention scores** from transformer models (BERT, RoBERTa, GPT-2)
- 🎨 **Beautiful, interactive visualizations** using D3.js
- 🤖 **Multiple model support** for comparing attention patterns
- 📸 **Export visualizations** as high-resolution SVG images
- 📊 **Phrase evolution analysis** across different occurrences
- 🎵 **Coming in v2**: Real-time visualization synced with audio playback

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Visualizations**: D3.js for interactive charts and heatmaps
- **Backend**: Python with transformers library (PyTorch)
- **AI Models**: BERT, RoBERTa, GPT-2, DistilBERT
- **Deployment**: Vercel

## 📋 Requirements

### Frontend
- Node.js 18+ 
- npm or yarn

### Backend (for real attention extraction)
- Python 3.8+
- CUDA-capable GPU (optional, for faster processing)

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-username/attention-is-key.git
cd attention-is-key
\`\`\`

### 2. Install Frontend Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. Set Up Python Backend (Optional)

For real attention extraction, set up the Python environment:

\`\`\`bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install torch transformers numpy
\`\`\`

### 5. Run the Attention Extractor

\`\`\`bash
python scripts/attention_extractor.py
\`\`\`

## 🎵 How to Use

1. **Navigate to the app** at [http://localhost:3000](http://localhost:3000)

2. **Choose your analysis type**:
   - **Overview**: Learn about the project features
   - **Input & Analysis**: Upload lyrics and configure settings
   - **Attention Patterns**: View attention heatmaps
   - **Phrase Evolution**: Track how phrases evolve

3. **Input your lyrics**:
   - Paste song lyrics in the text area
   - Or click "Load Sample Lyrics" to try the demo

4. **Configure analysis**:
   - Enter a target phrase (e.g., "I walk alone")
   - Select a transformer model (BERT, RoBERTa, GPT-2)

5. **Analyze**:
   - Click "Analyze Attention" to process the lyrics
   - Explore the interactive visualizations

6. **Export results**:
   - Download attention heatmaps as SVG files
   - Compare attention patterns across different models

## 📊 Understanding the Visualizations

### Attention Heatmap
- **Rows**: Source tokens (what's paying attention)
- **Columns**: Target tokens (what's being attended to)
- **Colors**: Attention strength (brighter = stronger attention)
- **Layers**: Switch between different transformer layers

### Phrase Evolution Chart
- **X-axis**: Occurrence number of the target phrase
- **Y-axis**: Attention strength percentage
- **Line**: Shows how attention to the phrase changes over time
- **Points**: Hover for context and detailed information

## 🔧 Project Structure

\`\`\`
attention-is-key/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── attention-heatmap.tsx
│   ├── phrase-evolution-chart.tsx
│   └── model-selector.tsx
├── scripts/              # Python backend scripts
│   └── attention_extractor.py
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── public/               # Static assets
\`\`\`

## 🎨 Customization

### Adding New Models
1. Update the model list in `components/model-selector.tsx`
2. Ensure the model is supported by the transformers library
3. Test with the Python backend script

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update component styles in the respective files
- Global styles are in `app/globals.css`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev) for rapid prototyping
- Powered by [Hugging Face Transformers](https://huggingface.co/transformers/)
- Visualizations created with [D3.js](https://d3js.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/attention-is-key/issues) page
2. Create a new issue with detailed information
3. For urgent matters, contact [your-email@example.com](mailto:your-email@example.com)

---

**Live Demo**: [https://v0-attention-is-key.vercel.app/](https://v0-attention-is-key.vercel.app/)

**Continue building**: [https://v0.dev/chat/projects/iZ6wz7dFBLd](https://v0.dev/chat/projects/iZ6wz7dFBLd)
