"use client";

import { Control, FieldPathByValue, FieldValues, PathValue, useController } from "../form";
import { ToggleGroup, ToggleGroupProps } from "./toggle-group";

export type FormToggleGroupProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<
    TFieldValues,
    boolean | null | number | string | string[] | undefined
  >,
> = {
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, TPath>;
  name: TPath;
} & Omit<ToggleGroupProps, "defaultValue" | "onBlur" | "onChange" | "value">;

export const FormToggleGroup = <
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<
    TFieldValues,
    boolean | null | number | string | string[] | undefined
  >,
>({
  children,
  control,
  defaultValue,
  name,
  ...props
}: FormToggleGroupProps<TFieldValues, TPath>) => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <ToggleGroup
      {...props}
      defaultValue={field.value}
      error={fieldState.isTouched && (fieldState.error?.message ?? fieldState.error?.type)}
      onValueChange={field.onChange}
    >
      {children}
    </ToggleGroup>
  );
};
