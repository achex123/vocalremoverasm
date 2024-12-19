import React from 'react';
import { Music, Mic, Download } from 'lucide-react';

export function Features() {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <Music className="w-8 h-8 text-purple-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
        <p className="text-gray-600">Support for MP3 and WAV audio files</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md">
        <Mic className="w-8 h-8 text-purple-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
        <p className="text-gray-600">Advanced AI model for precise separation</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-md">
        <Download className="w-8 h-8 text-purple-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Easy Download</h3>
        <p className="text-gray-600">Download separated tracks instantly</p>
      </div>
    </div>
  );
}