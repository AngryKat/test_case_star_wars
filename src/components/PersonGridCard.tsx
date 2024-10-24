"use client";
import { Card } from "antd";
import { Person } from "@/utils/types";
import styles from "./PersonGridCard.module.scss";
import ChevronRightIcon from "../../public/icons/chevron-forward-circle-outline.svg";

interface Props {
  person: Person;
}
export function PersonGridCard({ person }: Props) {
  return (
    <Card className={[styles.card, styles.ripple].join(" ")}>
      <div className={styles.content}>
        <h2 className={styles.title}>{person.name}</h2>
        <ChevronRightIcon />
      </div>
    </Card>
  );
}
