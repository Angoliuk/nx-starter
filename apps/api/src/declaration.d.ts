import { TokenUser } from "./validation";

declare global {
  namespace Express {
    export type User = TokenUser;
  }
}
