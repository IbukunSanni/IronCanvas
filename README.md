# Iron Canvas

> A web platform where artists upload practice drawings, receive structured critiques, and track their progress.

*Evolution from DrawaboxCompanion to a full-featured practice tracking and feedback platform.*

## What is Iron Canvas?

Iron Canvas helps artists improve their fundamental drawing skills through community feedback and progress tracking. Upload your practice work, get constructive critiques from other artists, and see your growth over time.

**Core Loop**: Practice → Upload → Critique → Track

## Key Features

🎨 **Practice Upload** - Share your drawing exercises with exercise tags  
💬 **Structured Critiques** - Get feedback in three focused areas: what works, what to improve, next steps  
📊 **Progress Dashboard** - Track uploads, critiques given/received, and maintain streaks  
👍 **Props System** - Encourage others with simple +1 props  
🔐 **Simple Auth** - Quick signup with just username and email  

## For Artists

- **Upload your practice work** from fundamental exercises (boxes, ellipses, figure drawing)
- **Get specific feedback** from the community on areas to improve
- **Track your consistency** with upload streaks and progress metrics
- **Help others improve** by giving thoughtful critiques
- **Stay motivated** through community encouragement

## Perfect for:

- Art students working through structured curriculums like Drawabox
- Self-taught artists wanting feedback on fundamentals  
- Art communities looking for focused critique tools
- Anyone practicing deliberate skill development in drawing

## Development Status

🚧 **Currently in development** - MVP phase focusing on core upload and critique functionality

See [TODO.md](TODO.md) for detailed development roadmap and technical implementation plan.

## Getting Started (Developers)

```bash
# Clone the repository
git clone https://github.com/IbukunSanni/IronCanvas.git
cd IronCanvas

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
