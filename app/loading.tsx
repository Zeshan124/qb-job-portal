import { Spin } from "antd";

// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center mt-10">
      <Spin size="large" />
    </div>
  );
}
