const baseUrl = process.env.API_BASE_URL || "";

export async function getPeople(page: number, searchTerm: string) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (searchTerm) {
    params.set("search", searchTerm);
  } else {
    params.delete("search");
  }
  const res = await fetch(`${baseUrl}/people?${params.toString()}`);
  if (!res.ok) {
    console.error("Error while fetching people");
    return { error: { message: "Some error occurred" } };
  }
  return res.json();
}

export async function getPersonById(id: string) {
  const res = await fetch(`${baseUrl}/people/${id}`);
  if (!res.ok) {
    console.error("Error while fetching person with id ", id);
    return { error: { message: "Some error occurred" } };
  }
  return res.json();
}

export async function getFilmById(id: number) {
  const res = await fetch(`${baseUrl}/films/${id}`);
  if (!res.ok) {
    console.error("Could not fetch film with id ", id);
    return { error: { message: "Some error occurred" } };
  }
  return res.json();
}

export async function getStarshipById(id: number) {
  const res = await fetch(`${baseUrl}/starships/${id}`);
  if (!res.ok) {
    console.error("Could not fetch starship with id ", id);
    return { error: { message: "Some error occurred" } };
  }
  return res.json();
}
