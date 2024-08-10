const jwtSecret: string = process.env.JWT_SECRET ?? "secret";
const PORT = process.env.PORT ?? 2024;
export { jwtSecret, PORT }