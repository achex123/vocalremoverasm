import { useState, useCallback } from 'react';
import { uploadAudio, getSeparationStatus, downloadResults } from '../services/separation.service';
import { initializeClaudeSession, processSeparation } from '../services/claude.service';
import { convertAudioToFormat, base64ToBlob } from '../utils/audio-processing';
import { AudioProcessingError, handleApiError } from '../utils/errors';
import { POLLING_INTERVAL } from '../utils/constants';
import { SeparationJob, SeparationConfig } from '../types';

export function useSeparation() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const startSeparation = async (file: File) => {
    try {
      setIsProcessing(true);
      setProgress(0);
      clearError();

      // Initialize Claude session
      const config: SeparationConfig = {
        model: 'spleeter',
        sampleRate: 44100,
        stemCount: 2,
      };
      
      const sessionId = await initializeClaudeSession(config);
      
      // Convert audio to WAV format
      const audioData = await convertAudioToFormat(file, 'wav');
      
      // Process the audio with Claude
      const result = await processSeparation(sessionId, audioData);
      
      if (result.status === 'error') {
        throw new AudioProcessingError(result.message || 'Separation process failed');
      }
      
      // Convert base64 results to blobs
      if (result.results) {
        const vocalsBlob = base64ToBlob(result.results.vocals, 'audio/wav');
        const instrumentalBlob = base64ToBlob(result.results.instrumental, 'audio/wav');
        
        // Create download links
        const vocalsUrl = URL.createObjectURL(vocalsBlob);
        const instrumentalUrl = URL.createObjectURL(instrumentalBlob);
        
        // Trigger downloads
        const vocalsLink = document.createElement('a');
        vocalsLink.href = vocalsUrl;
        vocalsLink.download = 'vocals.wav';
        vocalsLink.click();
        
        const instrumentalLink = document.createElement('a');
        instrumentalLink.href = instrumentalUrl;
        instrumentalLink.download = 'instrumental.wav';
        instrumentalLink.click();
        
        // Cleanup
        URL.revokeObjectURL(vocalsUrl);
        URL.revokeObjectURL(instrumentalUrl);
      }
      
      setIsProcessing(false);
      setProgress(100);

    } catch (error) {
      setIsProcessing(false);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      console.error('Separation failed:', { error, message: errorMessage });
    }
  };

  return {
    isProcessing,
    progress,
    error,
    clearError,
    startSeparation,
  };
}