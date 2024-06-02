import { UserSchema } from "@/shared/types";
import { Card, CardFooter, CardHeader } from "@/ui-shared/components/card";
import { FC } from "react";

import { DeleteUserContainer } from "../delete-user";
import { UpdateUserContainer } from "../update-user";

export type UserCardProps = { user: UserSchema };

export const UserCard: FC<UserCardProps> = async ({ user }) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <p>{user.email}</p>
        <p>{user.createdAt.toDateString()}</p>
      </CardHeader>
      <CardFooter className="gap-4">
        <DeleteUserContainer userId={user.id} />
        <UpdateUserContainer defaultValues={user} userId={user.id} />
      </CardFooter>
    </Card>
  );
};
