const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500;
const { sequelize } = require("./config/dbConn");
const { authRoutes, userRoutes } = require("./routes");
const cookieParser = require("cookie-parser");
const { authVerify } = require("./middlewares");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use(authVerify);
app.use("/user", userRoutes);

app.all("*", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

const initApp = () => {
  try {
    sequelize.sync().then(() => {
      app.listen(PORT, (req, res) => {
        console.log(`server is listening on port ${PORT}`);
      });
    });
  } catch (Exception) {
    console.log("Error", Exception);
  }
};

initApp();
