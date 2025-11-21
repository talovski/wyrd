import { DND5E_API_URL, saveToDisk } from "../script-utils";

async function fetchClasses() {
  const indices = await fetch(`${DND5E_API_URL}/api/2014/classes`).then((r) => r.json());

  const data = Promise.all(
    indices.results.map(async (cls: { url: string }) => {
      const classData = await fetch(`${DND5E_API_URL}${cls.url}`).then((r) => r.json());
      const levels = await fetch(`${DND5E_API_URL}${classData.class_levels}`).then((r) => r.json());
      return { ...classData, levels };
    }),
  );

  await saveToDisk("5e", "classes", await data);
}

fetchClasses();
