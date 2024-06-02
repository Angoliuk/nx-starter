import { useForm, zodResolver } from "@/ui-shared/components/form";
import { SignUpBodySchema, signUpBodySchema } from "@/web-shared/validation";

export const useSignUpForm = () => {
  return useForm<SignUpBodySchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signUpBodySchema),
  });
};
