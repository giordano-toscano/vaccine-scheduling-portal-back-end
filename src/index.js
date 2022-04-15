// essa API está consumindo localhost na porta 3000
import express from "express";
import UserRouter from "./router/UserRouter.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(UserRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
