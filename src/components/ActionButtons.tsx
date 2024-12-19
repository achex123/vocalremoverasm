import React from 'react';
import { Mic, Download, Loader2 } from 'lucide-react';

interface ActionButtonsProps {
  onSeparate: () => Promise<void>;
  onDownload: () => Promise<void>;
  isProcessing: boolean;
  hasFile: boolean;
}

export function ActionButtons({ onSeparate, onDownload, isProcessing, hasFile }: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onSeparate}
        disabled={!hasFile || isProcessing}
        className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            Separate Vocals
          </>
        )}
      </button>
      
      <button
        onClick={onDownload}
        disabled={!hasFile || isProcessing}
        className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg font-medium hover:bg-purple-50 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download Results
      </button>
    </div>
  );
}