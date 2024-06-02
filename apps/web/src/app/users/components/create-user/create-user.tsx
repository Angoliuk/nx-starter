"use client";

import { Button } from "@/ui-shared/components/button";
import { FormInput } from "@/ui-shared/components/input";
import { toast } from "@/ui-shared/components/toaster";
import { webContract } from "@/web-shared/api";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC } from "react";

import { useCreateUserForm } from "./hooks";

export type CreateUserProps = {
  handleCreateUser: (
    data: ClientInferRequest<typeof webContract.users.create>["body"],
  ) => Promise<ClientInferResponses<typeof webContract.users.create>>;
};

export const CreateUser: FC<CreateUserProps> = ({ handleCreateUser }) => {
  const { control, handleSubmit, reset } = useCreateUserForm();

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleCreateUser(data);

    if (response.status === 200) {
      toast({
        description: `Created ${response.body.email} user`,
        title: "Success!",
      });
    } else {
      toast({
        description: response.body.message,
        title: "Error!",
      });
    }

    reset();
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <FormInput control={control} label="Email" name="email" />
      <FormInput containerClassName="mt-4" control={control} label="Password" name="password" />
      <div className="mt-4 flex items-center">
        <Button className="m-auto w-full max-w-44" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};
