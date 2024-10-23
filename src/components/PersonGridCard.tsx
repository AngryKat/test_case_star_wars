import { Card } from "antd";
import { Person } from "@/utils/types";
import styles from "./PersonGridCard.module.scss";

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
  return (
    <Card
      title={<h2 className={styles.title}>{person.name}</h2>}
      className={styles.card}
      bordered={false}
      actions={[<p key="details">Details</p>]}
    >
      <div>
        <b>Birth year:</b> {person.birth_year}
      </div>
      <div>
        <b>Gender:</b> {person.gender}
      </div>
      <div>
        <b>Height:</b> {parseValueWithMeasureUnit(person.height, "height")}
      </div>
      <div>
        <b>Mass:</b> {parseValueWithMeasureUnit(person.mass, "mass")}
      </div>
      <div>
        <b>Hair color: </b>
        {person.hair_color}
      </div>
      <div>
        <b>Skin color:</b> {person.skin_color}
      </div>
      <div>
        <b>Eye color:</b> {person.eye_color}
      </div>
    </Card>
  );
}
