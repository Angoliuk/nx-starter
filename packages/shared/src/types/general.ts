import { initContract } from "@ts-rest/core";

export type ObjectValues<T extends object> = T[keyof T];
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];

export type ContractInstance = ReturnType<typeof initContract>;
