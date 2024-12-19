/**
 * Custom error types for the application
 */

export class AudioProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AudioProcessingError';
  }
}

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UploadError';
  }
}

export class DownloadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DownloadError';
  }
}

/**
 * Handles API errors and returns user-friendly error messages
 * @param error Error object
 * @returns User-friendly error message
 */
export function handleApiError(error: unknown): string {
  if (error instanceof AudioProcessingError) {
    return 'Failed to process audio file. Please try again.';
  }
  
  if (error instanceof UploadError) {
    return 'Failed to upload file. Please try again.';
  }
  
  if (error instanceof DownloadError) {
    return 'Failed to download results. Please try again.';
  }
  
  return 'An unexpected error occurred. Please try again.';
}