import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./database/mongodb";

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(`
=========================================
🚀 PulseOS Backend Started Successfully
🌍 Environment : ${env.NODE_ENV}
📡 Server      : http://localhost:${env.PORT}
=========================================
`);
  });
};

startServer();