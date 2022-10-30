const { suplier } = require("../../models");
const { Op } = require("sequelize");

exports.addSuplier = async (req, res) => {
  // code here
  try {
    const data = req.body;

    const validate = await suplier.findOne({
      where: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
    });
    if (validate !== null) {
      res.status(400).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      const createdData = await suplier.create(data);

      res.send({
        status: "success",
        data: createdData,
      });
    }
    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getSupliers = async (req, res) => {
  // code here
  try {
    const search = req.query.search_query || "";
    const user = await suplier.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            phone: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            address: {
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

exports.getSuplier = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await suplier.findAll({
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

exports.updateSuplier = async (req, res) => {
  // code here
  try {
    const id = req.params.id;
    const newData = req.body;

    const validate = await suplier.findOne({
      where: {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
    });
    if (validate !== null) {
      res.status(400).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      await suplier.update(newData, {
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

exports.deleteSuplier = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await suplier.destroy({
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
