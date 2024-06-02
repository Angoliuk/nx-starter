import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { api } from "../../../utils/api";
import { LogoutButton } from "./logout-button";

export default async function Index() {
  const currentUser = await api.auth.me();

  const logout = async () => {
    "use server";
    await api.auth.logout();
  };

  if (currentUser.status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
          <p>Session not found</p>
          <LogoutButton handleLogout={logout} />
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Profile</p>
        <p>{currentUser.body.id}</p>
        <p>{currentUser.body.email}</p>
        <LogoutButton handleLogout={logout} />
      </Card>
    </PageWrapper>
  );
}
