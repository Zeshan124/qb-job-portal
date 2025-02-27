// app/JobsPagination.tsx
"use client";

import { Pagination } from "antd";
import { useRouter } from "next/navigation";

interface JobsPaginationProps {
  current: number;
  pageSize: number;
  total: number;
  searchText: string;
}

export default function JobsPagination({
  current,
  pageSize,
  total,
  searchText,
}: JobsPaginationProps) {
  const router = useRouter();

  const handleChange = (page: number, pageSize: number) => {
    router.push(`?page=${page}&pageSize=${pageSize}&search=${searchText}`);
  };

  return (
    <div className="flex justify-center mt-10">
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={handleChange}
        itemRender={(page, type, originalElement) => {
          if (type === "page") {
            return (
              <button
                onClick={() => handleChange(page, pageSize)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {page}
              </button>
            );
          }
          if (type === "prev" || type === "next") {
            return (
              <button
                onClick={() => handleChange(page, pageSize)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {originalElement}
              </button>
            );
          }
          return originalElement;
        }}
      />
    </div>
  );
}
