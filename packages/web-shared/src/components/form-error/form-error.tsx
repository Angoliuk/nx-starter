import { tw } from "@/tailwind";
import { FC } from "react";

export type FormErrorType = false | null | string;

export type FormErrorProps = {
  className?: string;
  errorText?: FormErrorType;
};

export const FormError: FC<FormErrorProps> = ({ className, errorText }) => (
  <p className={tw("text-red-1000 text-regular-caption", className)}>{errorText || " "}</p>
);
