import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <CardTitle>About Us</CardTitle>
          <CardDescription>
            <p>
              files.vc is a sleek, fast and privacy-oriented file hosting service born out of necessity. We believe that privacy is a fundamental human right and that users should have control over their data. We are committed to providing a service that is fast, reliable and secure.
              <br />
              <br />
              <p className="italic">
                "I prefer dangerous freedom over peaceful slavery"
              </p>
            </p>
          </CardDescription>
          <p className="text-muted-foreground mt-5 text-xs">
            #FuckTheFeds #WeWillEndure #Freedom #EndCensorship #PeaceLoveSoftware #ManMadeMachine
          </p>
        </CardHeader>
      </Card>
    </div>
  )
}
