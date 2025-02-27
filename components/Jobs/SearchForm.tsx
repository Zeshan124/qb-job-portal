// app/SearchForm.tsx
"use client";

import { Input } from "antd";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const { Search } = Input;

export default function SearchForm({
  initialSearch,
}: {
  initialSearch: string;
}) {
  const [searchText, setSearchText] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (value: string) => {
    startTransition(() => {
      router.push(`?page=1&pageSize=10&search=${value}`);
    });
  };

  return (
    <Search
      placeholder="Search jobs..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onSearch={handleSearch}
      allowClear
      style={{ maxWidth: "300px" }}
      loading={isPending}
    />
  );
}
