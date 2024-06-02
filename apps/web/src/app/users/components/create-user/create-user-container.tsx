import { webContract } from "@/web-shared/api";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { CreateUser } from "./create-user";

export const CreateUserContainer: FC = () => {
  const handleCreateUser = async (
    data: ClientInferRequest<typeof webContract.users.create>["body"],
  ) => {
    "use server";
    const response = await api.users.create({ body: data });
    revalidatePath(webContract.users.get.path);
    return response;
  };

  return <CreateUser handleCreateUser={handleCreateUser} />;
};
