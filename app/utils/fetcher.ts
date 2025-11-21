export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const r = await fetch(url, options);

  if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);

  return r.json();
}
