const morgan = require("morgan");

const { logging, users } = require("../../models");

const stream = {
  write: async (message) => {
    const data = message.split(" ");

    const UserId = data[0].split("::").join("");

    try {
      const Id = data[6];
      const User = Id.split(":");
      const username = await users.findOne({
        where: {
          id: User[1],
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
  return req.user.id;
});

exports.morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] :response-time ::user ",
  { stream, skip }
);
