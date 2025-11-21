export const DND5E_API_URL = "https://www.dnd5eapi.co";
export const OPEN_DND_API_URL = "https://api.open5e.com/";

export const fetchInBatches = async <T>(urls: string[]): Promise<T[]> => {
  const results: T[] = [];

  const batchSize = 10;
  const delay = 100;

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`Fetching batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(urls.length / batchSize)}...`);

    const res = await Promise.all(
      batch.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText} for ${url}`);
          }
          return await response.json();
        } catch (error) {
          console.error(`Failed to fetch ${url}:`, error);
          throw error;
        }
      }),
    );

    results.push(...res);

    if (i + batchSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return results;
};

export const saveToDisk = async (api: "5e" | "open-dnd", category: string, data: any) => {
  try {
    await Bun.write(`public/data/${api}/${category}.json`, JSON.stringify(data, null, 2));
    console.log(`${category}: ${data.length} fetched`);
  } catch (error) {
    console.error("error:", error);
    process.exit(1);
  }
};
