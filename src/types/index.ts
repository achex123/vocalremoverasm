/**
 * Common types used across the application
 */

export interface SeparationJob {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

export interface AudioTrack {
  vocals: Blob;
  instrumental: Blob;
}

export interface UploadResponse {
  id: string;
}

export interface ApiError {
  message: string;
  code: string;
}

export type FileType = 'audio/mpeg' | 'audio/wav';