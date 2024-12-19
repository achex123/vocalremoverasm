import { API_ENDPOINTS } from '../utils/constants';
import { ClaudeResponse, SeparationConfig } from '../types';

/**
 * Service for interacting with Claude AI for audio separation
 */
export async function initializeClaudeSession(config: SeparationConfig): Promise<string> {
  const response = await fetch(`${API_ENDPOINTS.CLAUDE}/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error('Failed to initialize Claude session');
  }

  const data = await response.json();
  return data.sessionId;
}

export async function processSeparation(
  sessionId: string, 
  audioData: ArrayBuffer
): Promise<ClaudeResponse> {
  const response = await fetch(`${API_ENDPOINTS.CLAUDE}/process/${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: audioData,
  });

  if (!response.ok) {
    throw new Error('Failed to process audio with Claude');
  }

  return response.json();
}