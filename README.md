# Vocal Separator

A modern web application for separating vocals from instrumentals in audio tracks using AI.

## Features

- 🎵 Support for MP3 and WAV audio files
- 🎤 High-quality vocal separation using AI
- 📊 Real-time progress tracking
- ⬇️ Easy download of separated tracks
- 🎨 Modern, responsive UI
- 🚀 Fast processing

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Custom hooks for separation logic

### Backend
- Go for API endpoints
- Claude AI for audio processing
- WebSocket for real-time progress updates

## Getting Started

### Prerequisites
- Node.js 18 or higher
- Go 1.20 or higher
- Python 3.8 or higher (for Claude execution)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vocal-separator.git
cd vocal-separator
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Upload Audio
```http
POST /api/upload
```
Uploads an audio file for processing.

### Check Status
```http
GET /api/status/:id
```
Retrieves the current status of audio processing.

### Download Results
```http
GET /api/download/:id/:type
```
Downloads the separated audio tracks.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.