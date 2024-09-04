import { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { ArrowUpFromLine } from 'lucide-react';
import { NavLink } from '@/components/ui/nav-link';

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
  
    const chunkSize = 5 * 1024 * 1024; // 10MB chunk size
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedBytes = 0;
    setProgress(0);

    const updateProgressInterval = setInterval(() => {
      const totalProgress = (uploadedBytes / file.size) * 100;
      const increment = Math.min(0.1, 100 / totalChunks);
      setProgress((prevProgress) => Math.min(prevProgress + increment, totalProgress));
    }, 200);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
    
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('originalFilename', file.name);
      formData.append('chunkIndex', i.toString());
      formData.append('totalChunks', totalChunks.toString());
    
      try {
        const response = await axios.post('https://congenial-sniffle-7v955w444j4qhp5x9-3000.app.github.dev/upload-chunk', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            if (event.lengthComputable && event.total) {
              const chunkProgress = (event.loaded / event.total) * chunk.size;
              const totalProgress = ((uploadedBytes + chunkProgress) / file.size) * 100;
              setProgress(Math.round(totalProgress));
            }
          },
        });
      
        if (response.data.status === 'completed') {
          setDownloadLink(`https://congenial-sniffle-7v955w444j4qhp5x9-3000.app.github.dev${response.data.filePath}`);
        }
      
        uploadedBytes += chunk.size;
      } catch (error) {
        console.error('Upload error:', error);
      }
    }

    clearInterval(updateProgressInterval);
    setProgress(100);
  };  

  return (
    <div className="flex justify-center items-center h-screen/5">
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <CardTitle>files.vc</CardTitle>
          <CardDescription>files.vc is a sleek, fast and privacy-oriented file hosting service.</CardDescription>
          <Input onChange={handleFileChange} className="h-11 items-center" type="file" iconRight={
            <IconButton onClick={handleUpload}>
              <ArrowUpFromLine/>
            </IconButton>
          }/>
          {(progress > 0) && (
            <div className="w-full flex justify-center">
              <div className="w-full max-w-md flex flex-col text-center gap-3">
                <div className="bg-gray-300 h-2 rounded">
                  <div className="bg-blue-700 h-2 rounded" style={{ width: `${progress}%` }}></div>
                </div>
                {progress >= 100 ? (
                  <NavLink to={downloadLink} className="text-sm">
                    Download
                  </NavLink>
                ) : (
                  <div className="text-sm text-muted-foreground">
                   {Math.round(progress)}% Completed
                  </div>
                )}
              </div>
            </div>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}
