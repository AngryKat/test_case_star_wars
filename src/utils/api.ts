const baseUrl = process.env.API_BASE_URL || "";

export async function getPeople(page: number, searchTerm: string) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (searchTerm) {
    params.set("name__contains", searchTerm);
  } else {
    params.delete("name__contains");
  }
  const res = await fetch(`${baseUrl}/people?${params.toString()}`);
  return res.json();
}

export async function getPersonById(id: string) {
  const res = await fetch(`${baseUrl}/people/${id}`);
  return res.json();
}

export async function getFilmById(id: number) {
  const res = await fetch(`${baseUrl}/films/${id}`);
  return res.json();
}

export async function getStarshipById(id: number) {
  const res = await fetch(`${baseUrl}/starships/${id}`);
  return res.json();
}
