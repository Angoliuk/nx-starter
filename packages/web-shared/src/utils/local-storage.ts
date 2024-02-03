export const localStorageUtil = <T>(key: string) => ({
  delete: () => localStorage.removeItem(key),
  get: () => {
    // TODO: use zod for validation of local storage
    const response = localStorage.getItem(key);
    if (!response) return null;
    try {
      return JSON.parse(response) as T;
    } catch (e) {
      return response;
    }
  },
  key,
  set: (value: T) => localStorage.setItem(key, JSON.stringify(value)),
});

// export const localStorageUtil = <T, K>(keyExtractor: (key: K) => string) => ({
//   del: (key: K) => localStorage.removeItem(keyExtractor(key)),
//   get: (key: K) => {
//     const response = localStorage.getItem(keyExtractor(key));
//     return response ? (JSON.parse(response) as T) : null;
//   },
//   keyExtractor,
//   set: (key: K, value: T) => localStorage.setItem(keyExtractor(key), JSON.stringify(value)),
// });

// //////////////

// // export const localStorageUtil = <T, K>(keyExtractor: (key: K) => string | string) => ({
// //   del: async (key: K) => localStorage.removeItem(keyExtractor(key)),
// //   get: async (key: K) => {
// //     const response = localStorage.getItem(keyExtractor(key));
// //     return response ? (JSON.parse(response) as T) : null;
// //   },
// //   key: keyExtractor,
// //   set: async (key: K, value: T) => localStorage.setItem(keyExtractor(key), JSON.stringify(value)),
// // });

// type A<T> = (keyExtractor: string) => {
//   del: (key: string) => void;
//   get: (key: string) => T | null;
//   key: string;
//   set: (key: string, value: T) => void;
// };

// type B<T, K> = (keyExtractor: (key: K) => string) => {
//   del: (key: K) => void;
//   get: (key: K) => T | null;
//   keyExtractor: (key: K) => string;
//   set: (key: K, value: T) => void;
// };

// export function localStorageUtil<T>(keyExtractor: string): A<T>;
// export function localStorageUtil<T, K>(keyExtractor: (key: K) => string): B<T, K> {
//   if (typeof keyExtractor === "string") {
//     return {
//       del: (key: string) => localStorage.removeItem(key),
//       get: (key: string) => {
//         const response = localStorage.getItem(key);
//         return response ? (JSON.parse(response) as T) : null;
//       },
//       keyExtractor,
//       set: (key: string, value: T) => localStorage.setItem(key, JSON.stringify(value)),
//     };
//   } else {
//     return {
//       del: (key: K) => localStorage.removeItem(keyExtractor(key)),
//       get: (key: K) => {
//         const response = localStorage.getItem(keyExtractor(key));
//         return response ? (JSON.parse(response) as T) : null;
//       },
//       keyExtractor,
//       set: (key: K, value: T) => localStorage.setItem(keyExtractor(key), JSON.stringify(value)),
//     };
//   }
// }
