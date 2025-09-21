import { Users } from "../generated/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<Users, "password">;
    }
  }
}

export {};