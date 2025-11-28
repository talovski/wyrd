import { type ResourceReturn, createResource } from "solid-js";

const cache = new Map<string, ResourceReturn<unknown>>();

export function createCachedResource<T>(path: string) {
  if (!cache.has(path)) {
    const fetcher = async (): Promise<unknown> => {
      const r = await fetch(path);

      if (!r.ok) throw new Error(`HTTP error! Status: ${r.status}`);
      return r.json();
    };
    cache.set(path, createResource(fetcher));
  }
  return cache.get(path) as ResourceReturn<T>;
}
