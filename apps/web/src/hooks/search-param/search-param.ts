"use client";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSearchParam = ({ key }: { key: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleParamChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value ?? "");

    router.push((pathname + "?" + params.toString()) as Route);
  };

  return { handleParamChange };
};
