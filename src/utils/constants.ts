export const API_ENDPOINTS = {
  CLAUDE: '/api/claude',
  UPLOAD: '/api/upload',
  STATUS: '/api/status',
  DOWNLOAD: '/api/download',
} as const;

export const POLLING_INTERVAL = 1000; // 1 second

export const AUDIO_CONFIG = {
  MAX_DURATION: 600, // 10 minutes
  SAMPLE_RATE: 44100,
  FORMATS: {
    WAV: 'audio/wav',
    MP3: 'audio/mpeg',
  },
} as const;

export const CLAUDE_CONFIG = {
  MODEL: 'spleeter' as const,
  STEM_COUNT: 2 as const,
} as const;