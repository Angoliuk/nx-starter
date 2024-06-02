import { useForm, zodResolver } from "@/ui-shared/components/form";
import { CreateUserBodySchema, createUserBodySchema } from "@/web-shared/validation";

export const useCreateUserForm = () => {
  return useForm<CreateUserBodySchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(createUserBodySchema),
  });
};
