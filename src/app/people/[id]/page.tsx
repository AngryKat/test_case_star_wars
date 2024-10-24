import { PersonNodeFlow } from "@/components/PersonNodeFlow";
import { getFilmById, getPersonById, getStarshipById } from "@/utils/api";
import type { Film, Person, Starship } from "@/utils/types";
import { createEdge, createNode } from "@/utils/reactFlowhelperFunctions";

// what info to omit while rendering a card
const OMIT_STARSHIP_KEYS: Array<keyof Starship> = [
  "crew",
  "id",
  "passengers",
  "films",
  "url",
  "edited",
  "created",
  "pilots",
];
const OMIT_PERSON_KEYS: Array<keyof Person> = [
  "id",
  "url",
  "edited",
  "created",
  "films",
  "homeworld",
  "species",
  "vehicles",
  "starships",
];
const OMIT_FILM_KEYS: Array<keyof Film> = [
  "id",
  "url",
  "edited",
  "created",
  "planets",
  "starships",
  "species",
  "vehicles",
  "characters",
];

interface Props {
  params: { id: string };
}

export default async function PersonPage({ params }: Props) {
  const personData: Person = await getPersonById(params.id);
  const personFilmsData: Film[] = await Promise.all(
    personData.films.map((filmId) => getFilmById(filmId))
  );
  const personStarshipsData: Starship[] = await Promise.all(
    personData.starships.map((id) => getStarshipById(id))
  );
  const personToFilmEdges = personData.films.map((filmId) =>
    createEdge(personData.id, filmId)
  );

  const filmsToStarshipsEdges =
    personStarshipsData.length === 0 // avoid doing computations if the character does not pilot any starships
      ? []
      : personFilmsData.flatMap((film) => {
          return film.starships
            .filter((id) => personData.starships.includes(id)) // get only those starships, that belong to the character
            .map((starshipId) => createEdge(film.id, starshipId));
        });

  const filmNodes = personFilmsData.map((film, index) =>
    createNode<Film>(
      film.id,
      {
        data: {
          title: `Film: ${film.title}`,
          headerBgColor: "red",
          headerFontColor: "white",
          item: film,
          omitKeys: OMIT_FILM_KEYS,
        },
      },
      index,
      1
    )
  );

  const starshipsNodes = personStarshipsData.map((starship, index) =>
    createNode<Starship>(
      starship.id,
      {
        data: {
          title: `Starship: ${starship.name}`,
          headerBgColor: "blue",
          headerFontColor: "white",
          item: starship,
          omitKeys: OMIT_STARSHIP_KEYS,
        },
      },
      index,
      2
    )
  );

  const personNode = createNode<Person>(personData.id, {
    data: {
      title: personData.name,
      item: personData,
      headerBgColor: "black",
      headerFontColor: "white",
      omitKeys: OMIT_PERSON_KEYS,
    },
  });
  const edges = [...personToFilmEdges, ...filmsToStarshipsEdges];
  const nodes = [personNode, ...filmNodes, ...starshipsNodes];

  return (
    <div>
      <PersonNodeFlow initialEdges={edges} initialNodes={nodes} />
    </div>
  );
}
