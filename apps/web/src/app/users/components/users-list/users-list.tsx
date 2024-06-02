import { UserSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { UserCard } from "./users-card";

export type UsersListProps = {
  className?: string;
  listClassName?: string;
  usersList: UserSchema[];
};

export const UsersList: FC<UsersListProps> = async ({ className, listClassName, usersList }) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {usersList.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
