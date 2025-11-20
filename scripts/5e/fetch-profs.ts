import { DND5E_API_URL, fetchInBatches, saveToDisk } from "../fetch-utils";

async function fetchProficiencies() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/proficiencies`).then(
    (response) => response.json(),
  );

  const urls = indices.results.map(
    (index: { url: string }) => DND5E_API_URL + index.url,
  );
  const data = fetchInBatches(urls);

  saveToDisk("5e", "proficiencies", await data);
}

fetchProficiencies();
