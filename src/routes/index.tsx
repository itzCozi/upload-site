import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpFromLine  } from 'lucide-react';

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <CardTitle>files.vc</CardTitle>
          <CardDescription>files.vc is a sleek, fast and privacy-oriented file hosting service.</CardDescription>
          <Input type="file"/>
        </CardHeader>
        <CardFooter>
          <div className="w-full flex justify-center">
            <Button className="px-6 flex flex-row gap-2">
              Upload
              <ArrowUpFromLine/>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
