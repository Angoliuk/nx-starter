import { UserIdSchema } from "@/shared/types";
import { DefaultValues } from "@/ui-shared/components/form";
import { webContract } from "@/web-shared/api";
import { UpdateUserBodySchema } from "@/web-shared/validation";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { UpdateUser } from "./update-user";

export type UpdateUserContainerProps = {
  defaultValues: DefaultValues<UpdateUserBodySchema>;
  userId: UserIdSchema;
};

export const UpdateUserContainer: FC<UpdateUserContainerProps> = async ({
  defaultValues,
  userId,
}) => {
  const handleUpdateUser = async (
    data: ClientInferRequest<typeof webContract.users.update>["body"],
  ) => {
    "use server";
    const response = await api.users.update({ body: data, params: { userId } });
    revalidatePath(webContract.users.get.path);
    return response;
  };

  return <UpdateUser defaultValues={defaultValues} handleUpdateUser={handleUpdateUser} />;
};
