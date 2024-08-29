import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Card>

    </Card>
  )
}
