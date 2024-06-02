"use client";
import { useRouter } from "next/navigation";
import { FC, memo } from "react";

export type LogoutButtonProps = { handleLogout: () => Promise<void> };

export const LogoutButton: FC<LogoutButtonProps> = memo(({ handleLogout }) => {
  const router = useRouter();

  const onLogoutClick = () => {
    handleLogout();
    router.push("/auth/sign-in");
  };

  return <button onClick={onLogoutClick}>logout</button>;
});
