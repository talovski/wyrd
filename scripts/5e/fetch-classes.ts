import { DND5E_API_URL, saveToDisk } from "../fetch";

async function fetchClasses() {
  const response = await fetch(`${DND5E_API_URL}/api/2014/classes`);
  const { results } = await response.json();

  const data = Promise.all(
    results.map(async (cls: { url: string }) => {
      const classData = await fetch(`${DND5E_API_URL}${cls.url}`).then((r) =>
        r.json(),
      );
      const levels = await fetch(
        `${DND5E_API_URL}${classData.class_levels}`,
      ).then((r) => r.json());
      return { ...classData, levels };
    }),
  );

  await saveToDisk("5e", "classes", await data);
}

fetchClasses();
