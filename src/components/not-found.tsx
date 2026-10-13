import { LinkButton } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p>The requested page could not be found.</p>
      <LinkButton href="/">Go home</LinkButton>
    </div>
  );
}
