export const DND5E_API_URL = "https://www.dnd5eapi.co";
export const OPEN_DND_API_URL = "https://api.open5e.com/";

export const batch = async <T>(urls: string[]): Promise<T[]> => {
  const data: T[] = [];

  const amount = 10;
  const delay = 100;

  for (let i = 0; i < urls.length; i += amount) {
    const slice = urls.slice(i, i + amount);
    console.log(`Fetching batch ${Math.floor(i / amount) + 1}/${Math.ceil(urls.length / amount)}...`);

    const res = await Promise.all(
      slice.map(async (url) => {
        try {
          const r = await fetch(url);
          if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText} for ${url}`);
          return await r.json();
        } catch (error) {
          console.error(`Failed to fetch ${url}:`, error);
          throw error;
        }
      }),
    );

    data.push(...res);

    if (i + amount < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return data;
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
