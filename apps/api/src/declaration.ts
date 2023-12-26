import { TokenUser } from "./validation";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends TokenUser {}
  }
}
