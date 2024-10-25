"use client";
import React, { ChangeEvent } from "react";
import { Input } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./SearchInput.module.scss";

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    } else {
      params.delete("searchTerm");
    }
    replace(
      `${pathname}${params.toString().length ? "?" + params.toString() : ""}`
    );
  };

  return (
    <Input
      placeholder="Search your hero"
      onChange={handleSearch}
      defaultValue={searchParams.get("searchTerm")?.toString()}
      className={styles.searchInput}
      allowClear
    />
  );
}
