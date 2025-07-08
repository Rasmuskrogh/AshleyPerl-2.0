"use client";

import dynamic from "next/dynamic";

const AdminAuth = dynamic(() => import("./AdminAuth"), {
  ssr: false,
});

export default function AdminWrapper() {
  return <AdminAuth />;
}
