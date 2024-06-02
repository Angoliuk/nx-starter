import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";
import { UpdateUserBodySchema, updateUserBodySchema } from "@/web-shared/validation";

export const useUpdateUserForm = (defaultValues: DefaultValues<UpdateUserBodySchema>) => {
  return useForm<UpdateUserBodySchema>({
    defaultValues,
    resolver: zodResolver(updateUserBodySchema),
  });
};
