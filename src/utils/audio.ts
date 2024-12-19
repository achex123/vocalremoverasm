/**
 * Utility functions for audio file handling
 */

export const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

/**
 * Validates an audio file
 * @param file File to validate
 * @returns Object containing validation result and error message if any
 */
export function validateAudioFile(file: File): { isValid: boolean; error?: string } {
  if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload an MP3 or WAV file.',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size is 50MB.',
    };
  }

  return { isValid: true };
}

/**
 * Formats file size in bytes to human readable format
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}