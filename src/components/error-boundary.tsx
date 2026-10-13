import { useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

export function ErrorBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p>{message}</p>
      <button type="button" className="underline" onClick={() => router.invalidate()}>
        Try again
      </button>
    </div>
  );
}
