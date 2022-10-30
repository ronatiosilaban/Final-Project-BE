const { logging } = require("../../models");
const { Op } = require("sequelize");

//router to create, findAll data
exports.getLog = async (req, res) => {
  const search = req.query.search_query || "";
  const result = await logging.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          method: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          url: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          statusCode: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          date: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },

    order: [["id", "DESC"]],
  });

  res.json({
    result: result,
  });
};
