import { DND5E_API_URL, fetchInBatches, saveToDisk } from "../fetch-utils";

async function fetchFeatures() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/features`).then(
    (response) => response.json(),
  );

  const urls = indices.results.map(
    (index: { url: string }) => DND5E_API_URL + index.url,
  );
  const data = fetchInBatches(urls);

  saveToDisk("5e", "features", await data);
}

fetchFeatures();
