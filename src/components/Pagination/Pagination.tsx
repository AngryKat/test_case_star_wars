"use client";
import React, { useEffect, useState } from "react";
import { Pagination as AntdPagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  total,
  currentPage,
  className = "",
}: {
  total: number;
  currentPage: number;
  className?: string;
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <AntdPagination
      data-testid={"pagination"}
      current={currentPage}
      total={total}
      onChange={handlePageChange}
      showSizeChanger={false}
      className={className}
    />
  );
}
