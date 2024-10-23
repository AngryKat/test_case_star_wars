import { Person } from "@/utils/types";
import { PersonGridCard } from "./PersonGridCard";
import styles from "./PersonGrid.module.scss";
import Link from "next/link";

export function PersonGrid({ items }: { items: Person[] }) {
  return (
    <div className={styles.grid}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`person/${item.id}`}>
              <PersonGridCard person={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
