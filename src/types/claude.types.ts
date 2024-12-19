export interface ClaudeResponse {
  status: 'success' | 'error';
  message?: string;
  results?: {
    vocals: string;    // Base64 encoded audio data
    instrumental: string;  // Base64 encoded audio data
  };
}

export interface SeparationConfig {
  model: 'spleeter' | 'demucs';
  sampleRate?: number;
  stemCount?: 2 | 4 | 5;
  duration?: number;  // Max duration in seconds
}