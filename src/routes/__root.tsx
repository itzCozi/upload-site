import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <main className={cn("flex min-h-[calc(100vh_-_56px)] flex-col transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900")}>
        <Navbar />
        <div className="flex flex-1 p-8 [&>*]:w-full">
          <Outlet />
        </div>
      </main>
      <footer className={cn("transition-[margin-left] duration-300 ease-in-out")}>
        <Footer />
      </footer>
    </>
  );
}
