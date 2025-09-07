# 🦇 Dracula.wtf - Bloodsucker Detector

A production-ready web application that analyzes text to detect "vampire-like" behavior patterns with humor and satire. Get your Vampire Scale score, receive a witty Dracula-style roast, and share your results with a beautiful card image.

## 🌟 Features

- **Text Analysis**: Deterministic scoring algorithm that analyzes text for various "vampiric" traits
- **Multiple Modes**: Specialized analysis for Startup, Dating, Politics, and Everyday contexts
- **AI-Powered Roasts**: Optional integration with Claude or OpenAI for personalized Dracula-voice roasts
- **Shareable Cards**: Beautiful OG images and downloadable PNGs for social sharing
- **Privacy-First**: No data persistence by default, optional opt-in for leaderboard
- **Dark Gothic Theme**: Immersive Dracula aesthetic with accessible contrast

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- (Optional) Anthropic or OpenAI API key for AI roasts

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/dracula-wtf.git
cd dracula-wtf
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Download required fonts:
   - Download [Playfair Display Bold](https://fonts.google.com/specimen/Playfair+Display) 
   - Download [Inter Regular](https://fonts.google.com/specimen/Inter)
   - Place the .ttf files in \`/public/fonts/\`

4. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

5. (Optional) Add your API keys to \`.env\`:
\`\`\`env
AI_PROVIDER=anthropic  # or openai, or fallback
ANTHROPIC_API_KEY=your-key-here
OPENAI_API_KEY=your-key-here
BASE_URL=http://localhost:3000
\`\`\`

### Development

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 Scoring Rubric

The vampire scoring algorithm analyzes text across 6 dimensions:

| Metric | Weight | Description |
|--------|--------|-------------|
| **Buzzword Density** | 20% | Corporate jargon and trendy terms |
| **Ego Inflation** | 15% | Self-aggrandizing language |
| **Resource Extraction** | 20% | Calls-to-action and demands |
| **Manipulative Tactics** | 20% | Fear-based and guilt-trip language |
| **Vagueness** | 15% | Weasel words without specifics |
| **Dark Tone** | 10% | Aggressive or hostile language |

Scores map to buckets:
- 0-20: Pure Soul 
- 21-40: Slight Fang
- 41-60: Opportunistic
- 61-80: Thirsty
- 81-100: Ancient Vampire

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Generation**: @vercel/og (Satori)
- **Deployment**: Optimized for Vercel
- **AI Integration**: Anthropic Claude / OpenAI (optional)

## 📁 Project Structure

\`\`\`
dracula-wtf/
├── app/
│   ├── api/
│   │   ├── analyze/        # Text analysis endpoint
│   │   └── card.png/       # PNG generation
│   ├── og/                 # OG image generation
│   ├── r/[id]/             # Result permalinks
│   └── page.tsx            # Main analyzer page
├── components/             # React components
├── lib/                    # Core logic
│   ├── rubric.ts          # Scoring algorithm
│   ├── llm.ts             # AI integration
│   └── share.ts           # Share functionality
└── public/
    └── fonts/             # Font files (user-provided)
\`\`\`

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

The \`vercel.json\` configuration is already optimized for edge functions and image generation.

### Other Platforms

The app can be deployed to any platform supporting Next.js. Ensure:
- Node.js 18+ runtime
- Environment variables are set
- Fonts are included in deployment

## 🧪 Testing

Run tests:

\`\`\`bash
npm test           # Unit tests
npm run test:e2e   # End-to-end tests
\`\`\`

## 🔒 Privacy & Safety

- **No Default Storage**: Text is processed in memory only
- **Opt-in Leaderboard**: Users explicitly consent to public display
- **Content Guidelines**: PG-13 humor, no harassment, punch-up only
- **Rate Limiting**: 10 requests per minute per IP

## 📝 API Reference

### POST /api/analyze

Analyzes text for vampiric traits.

**Request:**
\`\`\`json
{
  "text": "string (10-5000 chars)",
  "mode": "startup|dating|politics|everyday"
}
\`\`\`

**Response:**
\`\`\`json
{
  "overall_vampire_score": 0-100,
  "bucket": "Pure Soul|Slight Fang|...",
  "scores": { ... },
  "evidence": ["quotes"],
  "roast": "Dracula's roast",
  "share": {
    "resultId": "abc123",
    "cardPngUrl": "...",
    "permalink": "..."
  }
}
\`\`\`

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## 📜 License

MIT License - feel free to use this code for your own projects!

## 🙏 Acknowledgments

- Font families by Google Fonts
- Inspired by classic vampire lore and modern satire
- Built with love and a sense of humor

---

**Remember**: No actual vampires were harmed in the making of this application. 🦇