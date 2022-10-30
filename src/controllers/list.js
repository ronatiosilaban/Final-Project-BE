const {
  listbarang,
  users,
  category,
  suplier,
  amount,
} = require("../../models");
const { Op } = require("sequelize");

//router to create, findAll, findOne,update,&delete data
exports.addLists = async (req, res) => {
  // code here
  try {
    const data = {
      name: req.body.name,
      desc: req.body.desc,
      image: req.file.filename,
      idUser: req.user.id,
      idCategory: req.body.idCategory,
      idSuplier: req.body.idSuplier,
    };

    // console.log(data);
    const validate = await listbarang.findOne({
      where: {
        name: req.body.name,
        idCategory: req.body.idCategory,
        idSuplier: req.body.idSuplier,
      },
    });

    console.log("val", data);

    if (validate !== null) {
      res.status(404).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      const createdData = await listbarang.create(data);

      let productData = await listbarang.findOne({
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
          {
            model: category,
            as: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: suplier,
            as: "suplier",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
      });

      const Data = {
        qty: req.body.qty,
        idQty: createdData.id,
      };

      const createQty = await amount.create(Data);
      let qtyData = await amount.findOne({
        where: {
          id: createQty.id,
        },
        include: [
          {
            model: listbarang,
            as: "listbarang",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      qtyData = JSON.parse(JSON.stringify(qtyData));
      productDatas = JSON.parse(JSON.stringify(productData));
      const dataBaru = [productDatas];
      res.send({
        status: "success",
        data: {
          dataBaru,
          image: "http://localhost:5000/uploads/" + productDatas.image,
          qtyData,
        },
      });
    }
  } catch (error) {
    res.status(400).send({
      statusCode: res.statusCode,
      status: "failed",
      message: "server error",
    });
    // console.log("data", data);
    console.log("err0r", error);
  }
};

exports.getLists = async (req, res) => {
  // code here
  try {
    const search = req.query.search_query || "";
    const user = await listbarang.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            desc: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: suplier,
          as: "suplier",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    const Data = await amount.findAll();
    // `SELECT name,email, status, id FROM`
    productData = JSON.parse(JSON.stringify(user));

    QtyData = JSON.parse(JSON.stringify(Data));

    res.send({
      status: "success",
      data: {
        productData,
        QtyData,
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

exports.getLength = async (req, res) => {
  // code here
  try {
    const user = await listbarang.findAll();
    const categori = await category.findAll();
    const suplie = await suplier.findAll();
    const User = await users.findAll();

    // `SELECT name,email, status, id FROM`
    productData = JSON.parse(JSON.stringify(user));
    productCategory = JSON.parse(JSON.stringify(categori));
    productSuplier = JSON.parse(JSON.stringify(suplie));
    productUser = JSON.parse(JSON.stringify(User));

    res.send({
      status: "success",
      data: {
        productData: productData.length,
        productCategory: productCategory.length,
        productSuplier: productSuplier.length,
        productUser: productUser.length,
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

exports.getlistsOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await listbarang.findAll({
      where: {
        id,
      },
    });
    const Data = await amount.findAll({
      where: {
        idQty: id,
      },
    });

    productData = JSON.parse(JSON.stringify(data));
    QtyData = JSON.parse(JSON.stringify(Data));
    newdata = productData[0];
    res.send({
      status: "success",
      data: {
        newdata,
        QtyData,
        // image: "http://localhost:5000/uploads/" + newdata.image,
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

exports.getlistsOnes = async (req, res) => {
  try {
    const { name } = req.params;

    const data = await listbarang.findAll({
      where: {
        name: name,
      },
    });

    productData = JSON.parse(JSON.stringify(data));
    res.send({
      status: "success",
      data: {
        productData,
        // image: "http://localhost:5000/uploads/" + newdata.image
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

exports.updateLists = async (req, res) => {
  // code here
  try {
    const id = req.params.id;

    const data = {
      name: req.body.name,
      desc: req.body.desc,
      image: req.file.filename,
      idUser: req.user.id,
      idCategory: req.body.idCategory,
      idSuplier: req.body.idSuplier,
    };

    const Data = {
      qty: req.body.qty,
    };

    const validate = await listbarang.findOne({
      where: {
        name: req.body.name,
        idCategory: req.body.idCategory,
        idSuplier: req.body.idSuplier,
      },
    });
    console.log("vall", validate);
    if (validate !== null) {
      res.status(404).send({
        // statusCode: 400,
        status: "error",
        message: "data already exists",
      });
    } else {
      const newData = await listbarang.update(data, {
        where: {
          id,
        },
      });

      const qty = await amount.update(Data, {
        where: {
          idQty: id,
        },
      });
      console.log(id);
      productData = JSON.parse(JSON.stringify(newData));
      productQty = JSON.parse(JSON.stringify(qty));

      res.send({
        status: "success",
        data: {
          productData,
          image: "http://localhost:5000/uploads/" + productData?.image,
          productQty,
        },
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

exports.deleteLists = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await listbarang.destroy({
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
