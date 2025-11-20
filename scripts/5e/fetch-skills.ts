import { DND5E_API_URL, saveToDisk } from "../fetch-utils";

async function fetchSkills() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/skills`).then(
    (response) => response.json(),
  );

  const data = Promise.all(
    indices.results.map(async (skill: { url: string }) => {
      const skillData = await fetch(`${DND5E_API_URL}${skill.url}`).then((r) =>
        r.json(),
      );

      return skillData;
    }),
  );

  saveToDisk("5e", "skills", await data);
}

fetchSkills();
