"use client";

import { Button } from "@/ui-shared/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui-shared/components/dialog";
import { toast } from "@/ui-shared/components/toaster";
import { webContract } from "@/web-shared/api";
import { ClientInferResponses } from "@ts-rest/core";
import { FC, useState } from "react";

export type DeleteUserProps = {
  handleDeleteUser: () => Promise<ClientInferResponses<typeof webContract.users.delete>>;
};

export const DeleteUser: FC<DeleteUserProps> = ({ handleDeleteUser }) => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const deleteUser = async () => {
    const response = await handleDeleteUser();
    setIsDialogOpened(false);
    if (response.status === 200) {
      toast({
        description: `Deleted ${response.body.email} user`,
        title: "Success!",
      });
    } else {
      toast({
        description: response.body.message,
        title: "Error!",
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpened} open={isDialogOpened}>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>Are you sure want to delete this user?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <Button className="w-full max-w-44" onClick={deleteUser}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
