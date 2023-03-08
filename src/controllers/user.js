const { users, profile } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
//router to create, findAll, findOne,update,&delete data

exports.addUsers = async (req, res) => {
  // code here
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    status: Joi.string().min(5).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  try {
    // console.log(data);

    // we hash password from request with salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const Data = {
      username: req.body.username,
      password: hashedPassword,
      status: req.body.status,
    };

    console.log(hashedPassword);
    const validate = await users.findOne({
      where: {
        username: req.body.username,
        status: req.body.status,
      },
    });
    console.log("val", validate, req.body.username);

    if (validate !== null) {
      res.status(404).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      const createdData = await users.create(Data);
      // we generate salt (random value) with 10 rounds

      res.send({
        status: "success",
        data: createdData,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.Login = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  try {
    // console.log(data);
    const userExist = await users.findOne({
      where: {
        username: req.body.username,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    console.log("user", userExist);
    // compare password between entered from client and from database
    console.log("passowrd", req.body.password);
    const isValid = await bcrypt.compare(req.body.password, userExist.password);
    // check if not valid then return response with status 400 (bad request)
    console.log(isValid);
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }

    // code here
    const dataToken = {
      id: userExist.id,
    };

    // const SECRET_KEY = 'sangatrahasia'
    // const token = jwt.sign(dataToken, SECRET_KEY)
    const token = jwt.sign(dataToken, process.env.TOKEN_KEY);
    console.log(token);

    res.status(200).send({
      status: "success...",
      data: {
        id: userExist.id,
        username: userExist.username,
        status: userExist.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  // code here
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const totalRows = await users.count({
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

    const user = await users.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            status: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },

      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idProfile"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // `SELECT name,email, status, id FROM`
    res.send({
      status: "success",
      data: user,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  // code here
  try {
    const { id } = req.params;
    const user = await users.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: profile,
          as: "profile",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idProfile"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    // `SELECT name,email, status, id FROM`
    res.send({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  // code here
  try {
    const id = req.params.id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newData = {
      username: req.body.username,
      password: hashedPassword,
      status: req.body.status,
    };

    await users.update(newData, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update successfull for user with id: ${id}`,
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await users.destroy({
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

exports.checkAuth = async (req, res) => {
  try {
    const { id } = req.user;
    console.log("ids", id);

    const dataUser = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success...",
      data: {
        user: {
          id: dataUser.id,
          username: dataUser.username,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
