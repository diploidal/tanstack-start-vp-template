import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { serverTimeQueryOptions } from "@/lib/queries/server-time";

export const Route = createFileRoute("/query-example")({
  loader: ({ context }) => context.queryClient.query(serverTimeQueryOptions()),
  component: QueryExample,
});

function QueryExample() {
  const { data, isFetching, refetch } = useSuspenseQuery(serverTimeQueryOptions());

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-4xl font-bold">TanStack Query example</h1>
      <p className="text-lg">
        Server time: <code>{data}</code>
      </p>
      <p>
        Fetched on the server during SSR and cached for 60s. Leave this page and come back within
        that time to get the cached value.
      </p>
      <Button onPress={() => refetch()} isDisabled={isFetching}>
        Refetch
      </Button>
    </div>
  );
}
