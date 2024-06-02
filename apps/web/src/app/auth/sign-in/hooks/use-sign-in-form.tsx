import { useForm, zodResolver } from "@/ui-shared/components/form";
import { SignInBodySchema, signInBodySchema } from "@/web-shared/validation";

export const useSignInForm = () => {
  return useForm<SignInBodySchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInBodySchema),
  });
};
