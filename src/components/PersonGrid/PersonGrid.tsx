import { Person } from "@/utils/types";
import { PersonGridCard } from "@/components/PersonGridCard/PersonGridCard";
import styles from "./PersonGrid.module.scss";

export function PersonGrid({ items }: { items: Person[] }) {
  return (
    <div className={styles.grid} role="grid">
      {items.map((item) => (
        <PersonGridCard name={item.name} key={item.id} url={`people/${item.id}`} />
      ))}
    </div>
  );
}
