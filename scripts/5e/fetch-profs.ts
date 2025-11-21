import { batch, DND5E_API_URL, saveToDisk } from "../script-utils";

async function fetchProficiencies() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/proficiencies`).then((r) => r.json());

  const urls = indices.results.map((index: { url: string }) => DND5E_API_URL + index.url);
  const data = await batch(urls);

  saveToDisk("5e", "proficiencies", data);
}

fetchProficiencies();
