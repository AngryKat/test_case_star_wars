import { Card } from "antd";
import { Person } from "@/utils/types";
import styles from "./PersonGridCard.module.scss";

// what info to omit while rendering a card
const OMIT_KEYS: Array<keyof Person> = [
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

// instead of showing just a number denote what units are used for person's mass and hight
const MEASURE_UNITS = {
  height: "cm",
  mass: "kg",
} as const;

// Measure units are shown only if value is numeric.
function parseValueWithMeasureUnit(
  value: string,
  unitName: keyof typeof MEASURE_UNITS
) {
  if (isNaN(+value)) {
    return value;
  }
  return `${value}${MEASURE_UNITS[unitName]}`;
}

interface Props {
  person: Person;
}
export function PersonGridCard({ person }: Props) {
  const renderEntries = Object.entries(person)
    .filter(([key]) => !OMIT_KEYS.includes(key as keyof Person))
    .map(([key, value]) => (
      <div key={key} className={styles.dataEntry}>
        <b>{key.split("_").join(" ")}:</b>{" "}
        {Object.keys(MEASURE_UNITS).includes(key)
          ? parseValueWithMeasureUnit(value, key as keyof typeof MEASURE_UNITS)
          : value}
      </div>
    ));
  return (
    <Card
      title={<h2 className={styles.title}>{person.name}</h2>}
      className={styles.card}
      bordered={false}
      actions={[<p key="details">Details</p>]}
    >
      {renderEntries}
    </Card>
  );
}
