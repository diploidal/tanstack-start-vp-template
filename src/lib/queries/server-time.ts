import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

const getServerTime = createServerFn({ method: "GET" }).handler(() => new Date().toISOString());

export function serverTimeQueryOptions() {
  return queryOptions({
    queryKey: ["server-time"],
    queryFn: () => getServerTime(),
  });
}
