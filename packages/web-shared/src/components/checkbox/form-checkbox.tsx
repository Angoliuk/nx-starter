import { ReactElement } from "react";

import { Control, FieldPathByValue, FieldValues, PathValue, useController } from "../form";
import { Checkbox, CheckboxProps } from "./checkbox";

export type FormCheckboxProps<
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, boolean | number | string>,
> = Omit<CheckboxProps, "defaultValue" | "onBlur" | "onChange" | "value"> & {
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, TPath>;
  name: TPath;
} & { containerClassName?: string };

export const FormCheckbox = <
  TFieldValues extends FieldValues,
  TPath extends FieldPathByValue<TFieldValues, boolean | number | string>,
>({
  containerClassName,
  control,
  defaultValue,
  name,
  ...props
}: FormCheckboxProps<TFieldValues, TPath>): ReactElement | null => {
  const { field, fieldState } = useController({
    control,
    defaultValue,
    name,
  });

  return (
    <Checkbox
      {...props}
      {...field}
      checked={field.value}
      error={fieldState.isTouched && (fieldState.error?.message ?? fieldState.error?.type)}
      onCheckedChange={field.onChange}
    />
  );
};
