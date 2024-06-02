import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { ListPagination } from "../../components/list-pagination";
import { api } from "../../utils/api";
import { loggedOutProtection } from "../../utils/auth-protection";
import { CreateUserContainer } from "./components/create-user";
import { UsersList } from "./components/users-list/users-list";

export type UsersPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function UsersPage({ searchParams }: UsersPageProps) {
  await loggedOutProtection();

  const { body: usersResponse, status } = await api.users.get({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
          <p className="text-headlineS mb-4 text-center">Users</p>
          <p className="text-headlineS mb-4 text-center">Users not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Users</p>
        <CreateUserContainer />
        <UsersList className="mt-4" usersList={usersResponse.items} />
        <ListPagination pagination={usersResponse.pagination} />
      </Card>
    </PageWrapper>
  );
}
