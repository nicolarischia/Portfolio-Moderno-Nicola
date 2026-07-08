import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(
  (
    err: unknown,
    req: import("express").Request,
    res: import("express").Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: import("express").NextFunction,
  ) => {
    req.log?.error({ err });
    res.status(500).json({ error: "Si è verificato un errore imprevisto." });
  },
);

export default app;
