const { profile, users } = require("../../models");

//router to create, findAll, findOne,update,&delete data
exports.addProfile = async (req, res) => {
  // code here
  try {
    const data = {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      possition: req.body.possition,
      desc: req.body.desc,
      image: req.file.filename,
      idProfile: req.user.id,
    };

    // console.log(data);
    const createdData = await profile.create(data);

    let productData = await profile.findOne({
      where: {
        id: createdData.id,
      },
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idProfile"],
      },
    });
    productDatas = JSON.parse(JSON.stringify(productData));
    res.send({
      status: "success",
      data: {
        productDatas,
        image: "http://localhost:5000/uploads/" + productDatas.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const idProfile = req.user.id;
    const user = await profile.findOne({
      where: {
        idProfile: idProfile,
      },
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    // `SELECT name,email, status, id FROM`
    productData = JSON.parse(JSON.stringify(user));

    res.send({
      status: "success",
      data: productData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await profile.findAll({
      where: {
        id,
      },
    });

    productData = JSON.parse(JSON.stringify(data));
    newdata = productData[0];
    res.send({
      status: "success",
      data: {
        newdata,
        image: "http://localhost:5000/uploads/" + newdata.image,
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

exports.updateProfile = async (req, res) => {
  // code here
  try {
    const id = req.params.id;
    const data = {
      name: req.body.name,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      possition: req.body.possition,
      desc: req.body.desc,
      image: req.file.filename,
      idProfile: req.user.id,
    };

    await profile.update(data, {
      where: {
        id,
      },
    });

    productData = JSON.parse(JSON.stringify(data));

    res.send({
      status: "success",
      data: {
        productData,
        image: "http://localhost:5000/uploads/" + productData.image,
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

exports.deleteProfile = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await profile.destroy({
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
