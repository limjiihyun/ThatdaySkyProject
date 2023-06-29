import Express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import route from "@/routes";
import api from "@/api";
import db from "@/models";

const app = Express();
const PORT = 8000;

db.sequelize.sync();

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.use(Express.static("views"));

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use("/api", api);
app.use("/", route);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

export default (port: number) => {
  app.listen(port);
  return app;
};
