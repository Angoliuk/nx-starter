"use client";

import { useCallback } from "react";
import {
  FieldPath,
  FieldValues,
  SetValueConfig,
  UseFormHandleSubmit,
  UseFormProps as UseOriginalFormProps,
  UseFormReturn as UseOriginalFormReturn,
  useForm as useOriginalForm,
} from "react-hook-form";

export type SetTouchedConfig = Omit<SetValueConfig, "shouldTouch">;

export type UseFormSetTouched<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
  options?: SetTouchedConfig,
) => void;

export interface UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = unknown>
  extends UseOriginalFormProps<TFieldValues, TContext> {
  // This is custom behaviour. `useForm` DOES NOT touch and validate forms on submit,
  // which is a super bad UX: user presses submit button and nothing happens,
  // instead of showing validation error.
  /**
   * By default fields are automatically touched and validated on submit. However you can disable
   * this behaviour by setting `shouldValidateOnSubmit` to false.
   *
   * @default true
   */
  shouldValidateOnSubmit?: boolean;
}

export interface UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = unknown>
  extends UseOriginalFormReturn<TFieldValues, TContext> {
  /**
   * This function allows you to dynamically touch a registered field and have the options to
   * validate and update the form state.
   */
  setTouched: UseFormSetTouched<TFieldValues>;
}

export function useForm<TFieldValues extends FieldValues = FieldValues, TContext = unknown>({
  mode = "onTouched",
  shouldValidateOnSubmit = true,
  ...props
}: UseFormProps<TFieldValues, TContext> = {}): UseFormReturn<TFieldValues, TContext> {
  // `useOriginalForm` always returns the same object reference, so it is safe
  //  to use it as a useCallback dependency
  const form = useOriginalForm<TFieldValues, TContext>({
    mode,
    ...props,
  });

  const setTouched = useCallback<UseFormSetTouched<TFieldValues>>(
    (name, options = {}) => {
      const value = form.getValues(name);
      form.setValue(name, value, {
        ...options,
        shouldTouch: true,
      });
    },
    [form],
  );

  const handleSubmit = useCallback<UseFormHandleSubmit<TFieldValues>>(
    (...args) =>
      (...eventArgs) => {
        if (shouldValidateOnSubmit) {
          for (const key of Object.keys(form.getValues())) {
            setTouched(key as FieldPath<TFieldValues>);
          }
        }

        return form.handleSubmit(...args)(...eventArgs);
      },
    [setTouched, shouldValidateOnSubmit, form],
  );

  return {
    ...form,
    handleSubmit,
    setTouched,
  };
}
