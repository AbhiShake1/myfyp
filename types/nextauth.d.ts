declare module "next-auth/jwt" {
  interface JWT {
    role?: "student" | "staff" | "admin" | null;
  }
}

export { }
