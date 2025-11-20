import { DND5E_API_URL, saveToDisk } from "../fetch-utils";

async function fetchRaces() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/races`).then(
    (response) => response.json(),
  );

  const data = Promise.all(
    indices.results.map(async (race: { url: string }) => {
      const raceData = await fetch(`${DND5E_API_URL}${race.url}`).then((r) =>
        r.json(),
      );

      const traits = await Promise.all(
        raceData.traits.map(
          async (trait: { url: string }) =>
            await fetch(`${DND5E_API_URL}${trait.url}`).then((r) => r.json()),
        ),
      );

      return { ...raceData, traits };
    }),
  );

  saveToDisk("5e", "races", await data);
}

fetchRaces();
