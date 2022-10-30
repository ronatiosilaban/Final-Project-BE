const morgan = require("morgan");
// import jwt from "jsonwebtoken";
// import Log from "../models/LogModel.js";
const { logging, users } = require("../../models");

const stream = {
  write: async (message) => {
    const data = message.split(" ", 6);

    const UserId = data[0].split("::").join("");

    try {
      const username = await users.findOne({
        where: {
          id: UserId,
        },
      });

      const date = new Date();
      const response = await logging.create({
        username: username.username,
        method: data[1],
        url: data[2],
        statusCode: data[3],
        userId: UserId,
        error: data[5],
        date: date.toLocaleString(),
      });
      console.log("res", response);
    } catch (error) {
      console.log(error.message);
    }
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

morgan.token("user", (req) => {
  //   try {
  //   } catch (error) {}
  const idUser = req.user?.id;

  console.log("aaaaa", idUser);
  return idUser;
});

exports.morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] :response-time :user ",
  { stream, skip }
);

// module.exports = { morganMiddleware };
