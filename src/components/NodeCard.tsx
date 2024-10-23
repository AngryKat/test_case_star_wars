"use client";
import { Card, Button } from "antd";
import { CSSProperties, Fragment, useMemo, useState } from "react";
import styles from "./NodeCard.module.scss";
import { Handle, NodeProps, Position } from "@xyflow/react";

export type NodeCardProps<T> = {
  data: {
    title: string;
    headerBgColor?: string;
    headerFontColor?: string;
    item: T;
    omitKeys?: Array<keyof T>;
  };
};

export function NodeCard<T extends Record<string, string | number>>({
  data,
}: NodeCardProps<T>) {
  const { title, headerBgColor, headerFontColor, item, omitKeys } = data;
  const [toggled, setToggled] = useState(false);
  const renderEntries = useMemo(() => {
    return Object.entries(item)
      .filter(([key]) => !(omitKeys ?? []).includes(key as keyof T))
      .map(([key, value]) => (
        <div className={styles.dataEntry}>
          <b>{key.split("_").join(" ")}:</b> {value}
        </div>
      ));
  }, [item]);

  return (
    <Card
      title={<h2 className={styles.title}>{title}</h2>}
      className={styles.card}
      bordered={false}
      onClick={() => setToggled((prev) => !prev)}
      style={
        {
          "--header-bg-color": headerBgColor,
          "--header-font-color": headerFontColor,
        } as CSSProperties
      }
    >
      {toggled && renderEntries}
      <Button block>{toggled ? "Hide" : "Show"}</Button>
    </Card>
  );
}