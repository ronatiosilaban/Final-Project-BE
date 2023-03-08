const { logging } = require("../../models");
const { Op } = require("sequelize");

//router to create, findAll data
exports.getLog = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search_query || "";
  const offset = limit * page;

  const totalRows = await logging.count({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
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
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });

  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};
