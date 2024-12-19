interface SeparationResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  vocalsUrl?: string;
  instrumentalUrl?: string;
  error?: string;
}

export async function uploadAudio(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('audio', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload audio file');
  }

  const { id } = await response.json();
  return id;
}

export async function getSeparationStatus(id: string): Promise<SeparationResponse> {
  const response = await fetch(`/api/status/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to get separation status');
  }

  return response.json();
}

export async function downloadResults(id: string): Promise<{ vocals: Blob; instrumental: Blob }> {
  const [vocalsResponse, instrumentalResponse] = await Promise.all([
    fetch(`/api/download/${id}/vocals`),
    fetch(`/api/download/${id}/instrumental`),
  ]);

  if (!vocalsResponse.ok || !instrumentalResponse.ok) {
    throw new Error('Failed to download results');
  }

  return {
    vocals: await vocalsResponse.blob(),
    instrumental: await instrumentalResponse.blob(),
  };
}