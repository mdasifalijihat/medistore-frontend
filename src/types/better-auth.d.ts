import "better-auth";

declare module "better-auth" {
  interface User {
    role: "CUSTOMER" | "SELLER" | "ADMIN";
    status: "ACTIVE" | "BLOCKED";
  }
}
