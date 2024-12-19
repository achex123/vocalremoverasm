import React from 'react';
import { Music } from 'lucide-react';

interface FileInfoProps {
  file: File;
}

export function FileInfo({ file }: FileInfoProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
        <div className="flex items-center">
          <Music className="w-5 h-5 text-purple-600 mr-3" />
          <span className="text-gray-700">{file.name}</span>
        </div>
        <span className="text-sm text-gray-500">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
      </div>
    </div>
  );
}