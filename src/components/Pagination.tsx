"use client";
import { Pagination as AntdPagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MOBILE_MAX_WIDTH_PX = 600;

export default function Pagination({
  total,
  currentPage,
  className = "",
  visibleOnMobileOnly = false,
}: {
  total: number;
  currentPage: number;
  className?: string;
  visibleOnMobileOnly?: boolean;
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

  if (windowWidth > MOBILE_MAX_WIDTH_PX && visibleOnMobileOnly) return null;
  return (
    <AntdPagination
      current={currentPage}
      total={total}
      onChange={handlePageChange}
      showSizeChanger={false}
      className={className}
    />
  );
}
