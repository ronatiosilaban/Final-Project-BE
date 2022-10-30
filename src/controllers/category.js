const { category } = require("../../models");
const { Op } = require("sequelize");

//router to create, findAll, findOne,update,&delete data
exports.addCategory = async (req, res) => {
  // code here
  try {
    const data = req.body;

    const validate = await category.findOne({
      where: {
        category: req.body.category,
      },
    });
    if (validate !== null) {
      res.status(400).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      const createdData = await category.create(data);

      res.send({
        status: "success",
        data: createdData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCategorys = async (req, res) => {
  // code here
  try {
    const search = req.query.search_query || "";
    const user = await category.findAll({
      where: {
        [Op.or]: [
          {
            category: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      order: [["id", "DESC"]],
    });

    // `SELECT name,email, status, id FROM`

    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await category.findAll({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  // code here
  try {
    const id = req.params.id;
    const newData = req.body;
    const validate = await category.findOne({
      where: {
        category: req.body.category,
      },
    });
    if (validate !== null) {
      res.status(400).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      await category.update(newData, {
        where: {
          id,
        },
      });

      res.send({
        status: "success",
        message: `Update successfull for user with id: ${id}`,
        data: newData,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await category.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id:${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
