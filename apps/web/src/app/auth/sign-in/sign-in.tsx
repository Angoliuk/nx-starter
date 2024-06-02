"use client";

import { Button } from "@/ui-shared/components/button";
import { FormInput } from "@/ui-shared/components/input";
import { toast } from "@/ui-shared/components/toaster";
import { webContract } from "@/web-shared/api";
import { Label } from "@radix-ui/react-label";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { useSignInForm } from "./hooks/use-sign-in-form";

export type SignInProps = {
  handleSignIn: (
    props: ClientInferRequest<typeof webContract.auth.signIn>["body"],
  ) => Promise<ClientInferResponses<typeof webContract.auth.signIn>>;
};

export const SignIn: FC<SignInProps> = ({ handleSignIn }) => {
  const router = useRouter();

  const { control, handleSubmit } = useSignInForm();

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleSignIn(data);

    if (response.status === 200) {
      router.push("/users");
    } else {
      toast({
        description: response.body.message,
        title: "Error!",
      });
    }
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <FormInput control={control} label="Email" name="email" />
      <FormInput
        containerClassName="mt-4"
        control={control}
        label="Password"
        name="password"
        type="password"
      />
      <div className="mt-4 flex flex-col items-center gap-4">
        <Button className="w-full max-w-44" type="submit">
          Login
        </Button>
        <Link href={"/auth/sign-up"}>
          <Label>Register</Label>
        </Link>
      </div>
    </form>
  );
};
