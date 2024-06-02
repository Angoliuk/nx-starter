// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToFormData<T extends Record<string, any>>(
  object: T,
  form?: FormData,
  namespace?: string,
): FormData {
  const formData = form || new FormData();

  for (const property in object) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      continue;
    }
    const formKey = namespace ? `${namespace}[${property}]` : property;

    // @ts-expect-error TODO: fix instanceof
    if (typeof object[property] === "object" && !(object[property] instanceof File)) {
      objectToFormData(object[property], formData, formKey);
    } else {
      formData.append(formKey, object[property]);
    }
  }

  return formData;
}
