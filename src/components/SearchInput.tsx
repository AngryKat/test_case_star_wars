"use client";
import { ChangeEvent } from "react";
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
    // delete value for page param so we can get results only by the search term
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
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
