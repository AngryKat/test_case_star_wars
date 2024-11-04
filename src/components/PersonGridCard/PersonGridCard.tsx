"use client";
import { Card } from "antd";
import styles from "./PersonGridCard.module.scss";
import ChevronRightIcon from "../../../public/icons/chevron-right-icon.svg";
import Link from "next/link";
import { useRef } from "react";

export interface PersonGridCardProps {
  name: string;
  url: string;
}
export function PersonGridCard({ name, url }: PersonGridCardProps) {
  const mainLinkRef = useRef<HTMLAnchorElement>(null);
  const handleCardClick = () => {
    const isTextSelected = window.getSelection()?.toString();
    if (isTextSelected || !mainLinkRef.current) return;
    mainLinkRef.current.click();
  };
  return (
    <Card
      onClick={handleCardClick}
      className={[styles.card, styles.ripple].join(" ")}
      role="gridcell"
    >
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link ref={mainLinkRef} href={url}>
            {name}
          </Link>
        </h2>
        <Link href={url}>
          <ChevronRightIcon />
        </Link>
      </div>
    </Card>
  );
}
