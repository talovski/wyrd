import { DND5E_API_URL, batch, saveToDisk } from "../script-utils";

async function fetchFeatures() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/features`).then((r) => r.json());

  const urls = indices.results.map((index: { url: string }) => DND5E_API_URL + index.url);
  const data = await batch(urls);

  saveToDisk("5e", "features", data);
}

fetchFeatures();
