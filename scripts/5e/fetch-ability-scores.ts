import { DND5E_API_URL, batch, saveToDisk } from "../script-utils";

async function fetchAbilityScores() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/ability-scores`).then((r) => r.json());

  const urls = indices.results.map((index: { url: string }) => DND5E_API_URL + index.url);
  const data = await batch(urls);

  saveToDisk("5e", "ability-scores", data);
}

fetchAbilityScores();
