import express from "express";
import { configureExpress } from "./infrastructure/configs/express.config";
import { routes } from "./presentation/routes/routes";

const app = express();
const port = process.env.PORT || 3000;

configureExpress(app);

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
