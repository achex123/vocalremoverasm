import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function FileUpload({ onFileSelect, fileInputRef }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'audio/mpeg' || selectedFile.type === 'audio/wav')) {
      onFileSelect(selectedFile);
    } else {
      alert('Please select a valid audio file (.mp3 or .wav)');
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-8 text-center cursor-pointer hover:border-purple-400 transition-colors"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".mp3,.wav"
        className="hidden"
      />
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Drop your audio file here
      </h3>
      <p className="text-gray-500">
        or click to browse (MP3 or WAV)
      </p>
    </div>
  );
}