import { API_ENDPOINTS } from '../utils/constants';
import { SeparationJob, AudioTrack, UploadResponse } from '../types';
import { UploadError, DownloadError } from '../utils/errors';

/**
 * Uploads an audio file to the server
 */
export async function uploadAudio(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('audio', file);

  const response = await fetch(API_ENDPOINTS.UPLOAD, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new UploadError('Failed to upload audio file');
  }

  const data: UploadResponse = await response.json();
  return data.id;
}

/**
 * Gets the current status of audio separation
 */
export async function getSeparationStatus(id: string): Promise<SeparationJob> {
  const response = await fetch(`${API_ENDPOINTS.STATUS}/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to get separation status');
  }

  return response.json();
}

/**
 * Downloads the separated audio tracks
 */
export async function downloadResults(id: string): Promise<AudioTrack> {
  try {
    const [vocalsResponse, instrumentalResponse] = await Promise.all([
      fetch(`${API_ENDPOINTS.DOWNLOAD}/${id}/vocals`),
      fetch(`${API_ENDPOINTS.DOWNLOAD}/${id}/instrumental`),
    ]);

    if (!vocalsResponse.ok || !instrumentalResponse.ok) {
      throw new DownloadError('Failed to download one or more tracks');
    }

    return {
      vocals: await vocalsResponse.blob(),
      instrumental: await instrumentalResponse.blob(),
    };
  } catch (error) {
    throw new DownloadError('Failed to download separated tracks');
  }
}