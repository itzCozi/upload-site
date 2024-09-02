import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

export const Route = createFileRoute("/contact")({
  component: About,
});

function About() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = (event.target as HTMLFormElement).subject.value;
    const body = (event.target as HTMLFormElement).body.value;
    window.location.href = `mailto:dev@files.vc?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Since we are a privacy-oriented service, we do not comply with data sensitive requests. If you need to contact us, please use the form below. We will get back to you as soon as possible (which is usually not timely).
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form 
            className="w-full flex flex-col gap-2 justify-center" 
            onSubmit={handleSubmit}
          >
            <Input name="subject" placeholder="Email Subject"/>
            <Textarea name="body" placeholder="Body"/>
            <Button type="submit" className="px-6 flex flex-row gap-2 lg:w-1/4 mx-auto mt-2">
              Send
              <Send />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}