import { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowUpFromLine } from 'lucide-react';

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const chunkSize = 10 * 1024 * 1024; // 10MB chunk size
    const totalChunks = Math.ceil(file.size / chunkSize);
    let completedChunks = 0;

    setProgress(0);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('originalFilename', file.name);
      formData.append('chunkIndex', i);
      formData.append('totalChunks', totalChunks);

      try {
        const response = await axios.post('https://cloud.files.vc/upload-chunk', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            if (event.lengthComputable) {
              // update progress based on overall completion
              const percentCompleted = Math.round(((completedChunks + (i + 1) / totalChunks) * 100) / totalChunks);
              setProgress(percentCompleted);
            }
          },
        });

        if (response.data.status === 'completed') {
          setDownloadLink(`https://cloud.files.vc${response.data.filePath}`);
        }

        completedChunks++;
      } catch (error) {
        console.error('Upload error:', error);
        // Optionally handle upload errors here
      }
    }
  };

  return (
    <div className="lg:max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <CardTitle>files.vc</CardTitle>
          <CardDescription>files.vc is a sleek, fast, and privacy-oriented file hosting service.</CardDescription>
          <Input 
            type="file" 
            onChange={handleFileChange} 
            iconRight={
              <IconButton onClick={handleUpload}>
                <ArrowUpFromLine />
              </IconButton>
            } 
          />
        </CardHeader>
        <CardFooter>
          <div className="w-full flex justify-center">
            <Button className="px-6 flex flex-row gap-2" onClick={handleUpload} disabled={!file}>
              Upload
              <ArrowUpFromLine />
            </Button>
          </div>
        </CardFooter>
        {(progress > 0) && (
          <div className="w-full flex justify-center mt-4">
            <div className="w-full max-w-md">
              <div className="bg-gray-200 h-2 rounded">
                <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-center mt-1 text-sm text-gray-700">{Math.round(progress)}% Completed</div>
            </div>
          </div>
        )}
        {downloadLink && (
          <div className="mt-4 text-center">
            <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Download your file here
            </a>
          </div>
        )}
      </Card>
    </div>
  );
}
