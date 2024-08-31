import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { LockKeyholeOpen, LockKeyholeIcon, CloudUpload, Eye, EyeOff } from 'lucide-react';

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isLocked, setIsLocked] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);


  return (
    <Card>
      <CardHeader className="flex flex-col gap-1">
        <CardTitle>Upaste</CardTitle>
        <CardDescription>Upaste is a simple and sleek pastebin service brought to you by the developers of sudo-flix and bookracy.</CardDescription>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Paste title"
          />
          <Textarea />
        </div>
        <div>
          <IconButton onClick={() => setIsLocked(!isLocked)}>
            {isLocked ? <LockKeyholeOpen className="icon-transition" /> : <LockKeyholeIcon className="icon-transition" />}
          </IconButton>
          <IconButton onClick={() => setIsPrivate(!isPrivate)}>
            {isPrivate ? <Eye className="icon-transition" /> : <EyeOff className="icon-transition" />}
          </IconButton>
        </div>
      </CardHeader>
      <CardFooter>
        <div className="z-20 h-[56px] w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-full items-center justify-center gap-2">
            <Button className="px-6">
              Upload
            </Button>
            <div className="flex-1" />

            <Input placeholder="Editing password"/>
            <Input placeholder="Custom URL"/>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
