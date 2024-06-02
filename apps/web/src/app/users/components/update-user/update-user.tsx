"use client";

import { Button } from "@/ui-shared/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui-shared/components/dialog";
import { DefaultValues } from "@/ui-shared/components/form";
import { FormInput } from "@/ui-shared/components/input";
import { toast } from "@/ui-shared/components/toaster";
import { webContract } from "@/web-shared/api";
import { UpdateUserBodySchema } from "@/web-shared/validation";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";

import { useUpdateUserForm } from "./hooks";

export type UpdateUserProps = {
  defaultValues: DefaultValues<UpdateUserBodySchema>;
  handleUpdateUser: (
    data: ClientInferRequest<typeof webContract.users.update>["body"],
  ) => Promise<ClientInferResponses<typeof webContract.users.update>>;
};

export const UpdateUser: FC<UpdateUserProps> = ({ defaultValues, handleUpdateUser }) => {
  const { control, handleSubmit, reset } = useUpdateUserForm(defaultValues);

  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleUpdateUser(data);
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Updated ${response.body.email} user`,
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
    <Dialog onOpenChange={setIsDialogOpened} open={isDialogOpened}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
          </DialogHeader>
          <FormInput containerClassName="mt-4" control={control} label="Email" name="email" />
          <DialogFooter className="mt-3">
            <Button className="w-full max-w-44" type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
