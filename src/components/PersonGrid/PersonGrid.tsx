import Link from "next/link";
import { Person } from "@/utils/types";
import { PersonGridCard } from "@/components/PersonGridCard/PersonGridCard";
import styles from "./PersonGrid.module.scss";

export function PersonGrid({ items }: { items: Person[] }) {
  return (
    <div className={styles.grid}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`people/${item.id}`}>
              <PersonGridCard person={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
