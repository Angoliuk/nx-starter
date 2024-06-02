"use client";

import { Button } from "@/ui-shared/components/button";
import { FormInput } from "@/ui-shared/components/input";
import { useToast } from "@/ui-shared/components/toaster";
import { webContract } from "@/web-shared/api";
import { Label } from "@radix-ui/react-label";
import { ClientInferRequest, ClientInferResponses } from "@ts-rest/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { useSignUpForm } from "./hooks/use-sign-up-form";

export type SignUpProps = {
  handleSignUp: (
    props: ClientInferRequest<typeof webContract.auth.signUp>["body"],
  ) => Promise<ClientInferResponses<typeof webContract.auth.signUp>>;
};

export const SignUp: FC<SignUpProps> = ({ handleSignUp }) => {
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit } = useSignUpForm();

  const handleFormSubmit = handleSubmit(async data => {
    const response = await handleSignUp(data);

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
          Register
        </Button>
        <Link href="/auth/sign-in">
          <Label>Login</Label>
        </Link>
      </div>
    </form>
  );
};
