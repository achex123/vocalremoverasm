import React, { useRef, useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { FileInfo } from './components/FileInfo';
import { ProgressBar } from './components/ProgressBar';
import { ActionButtons } from './components/ActionButtons';
import { Features } from './components/Features';
import { ErrorMessage } from './components/ErrorMessage';
import { useSeparation } from './hooks/useSeparation';

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    isProcessing, 
    progress, 
    error, 
    clearError,
    startSeparation, 
    downloadSeparatedTracks 
  } = useSeparation();

  const handleSeparate = async () => {
    if (!file) return;
    await startSeparation(file);
  };

  const handleDownload = async () => {
    await downloadSeparatedTracks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Header />
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
              <ErrorMessage 
                message={error} 
                onClose={clearError}
              />
            )}
            
            <FileUpload 
              onFileSelect={setFile}
              fileInputRef={fileInputRef}
            />
            
            {file && <FileInfo file={file} />}
            
            {isProcessing && <ProgressBar progress={progress} />}
            
            <ActionButtons
              onSeparate={handleSeparate}
              onDownload={handleDownload}
              isProcessing={isProcessing}
              hasFile={!!file}
            />
          </div>

          <Features />
        </div>
      </div>
    </div>
  );
}