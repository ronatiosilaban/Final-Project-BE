const { flow, listbarang, amount } = require("../../models");

//router to create, findAll, findOne,update,&delete data

exports.addFlow = async (req, res) => {
  // code here
  try {
    const data = {
      nameRecipients: req.body.nameRecipients,
      status: req.body.status,
      amount: req.body.amount,
      date: req.body.date,
      idList: req.body.idList,
    };

    const dataQty = await amount.findOne({
      where: {
        idQty: req.body.idList,
      },
    });
    if (req.body.status == "IN") {
      const data = {
        nameRecipients: req.body.nameRecipients,
        status: req.body.status,
        amount: req.body.amount,
        date: req.body.date,
        idList: req.body.idList,
      };

      const dataQty = await amount.findOne({
        where: {
          idQty: data.idList,
        },
      });
      const count = parseInt(data.amount);
      const newData = {
        qty: dataQty.qty + count,
      };
      const total = 2 + data.amount;
      console.log("mewData", newData, total);
      const createdData = await flow.create(data);

      let productData = await flow.findOne({
        where: {
          id: createdData.id,
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
      const update = await amount.update(newData, {
        where: {
          idQty: req.body.idList,
        },
      });
      const qty = await amount.findOne({
        where: {
          idQty: createdData.idList,
        },
      });

      productData = JSON.parse(JSON.stringify(productData));
      res.send({
        status: "success",
        data: {
          productData,
          qty,
        },
      });

      console.log("success IN", update);
    } else if (req.body.status == "OUT") {
      const data = {
        nameRecipients: req.body.nameRecipients,
        status: req.body.status,
        amount: req.body.amount,
        date: req.body.date,
        idList: req.body.idList,
      };

      const dataQty = await amount.findOne({
        where: {
          idQty: data.idList,
        },
      });
      const newData = {
        qty: dataQty.qty - data.amount,
      };
      s;
      if (newData.qty <= -1) {
        res.status(400).send({
          message: "data can't be minus",
        });
      } else {
        const createdData = await flow.create(data);

        let productData = await flow.findOne({
          where: {
            id: createdData.id,
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
        const update = await amount.update(newData, {
          where: {
            idQty: createdData.idList,
          },
        });
        console.log("success OUT", update);

        const qty = await amount.findOne({
          where: {
            idQty: createdData.idList,
          },
        });

        productData = JSON.parse(JSON.stringify(productData));
        res.send({
          status: "success",
          data: {
            productData,
            qty,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFlows = async (req, res) => {
  // code here
  try {
    const user = await flow.findAll();

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

exports.getFlow = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await flow.findAll({
      where: {
        idList: id,
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

exports.getFlowsOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await flow.findOne({
      where: {
        id: id,
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

exports.updateFlow = async (req, res) => {
  // code here
  try {
    const id = req.params.id;

    let data = await flow.findOne({
      where: {
        id: id,
      },
    });
    console.log("idLusr", data);
    let Amount = await amount.findOne({
      where: {
        idQty: data.idList,
      },
    });
    if (req.body.status == "IN") {
      const newData = {
        nameRecipients: req.body.nameRecipients,
        status: req.body.status,
        amount: data.amount,
        date: req.body.date,
        idList: req.body.idList,
      };
      const count = parseInt(req.body.amount);

      const dataAmount = {
        qty: Amount.qty - data.amount + count,
      };
      console.log("newDate", dataAmount, count);
      const UpdateAmount = await amount.update(dataAmount, {
        where: {
          idQty: data.idList,
        },
      });

      console.log("IN", data.idList);
      const update = await flow.update(newData, {
        where: {
          id,
        },
      });
      let Amounts = await amount.findOne({
        where: {
          idQty: data.idList,
        },
      });

      res.send({
        status: "success",
        message: `Update successfull for user with id: ${id}`,
        data: data,
        UpdateAmount,
        Amounts,
      });
    } else if (req.body.status == "OUT") {
      const newData = {
        nameRecipients: req.body.nameRecipients,
        status: req.body.status,
        amount: data.amount - data.amount + req.body.amount,
        date: req.body.date,
        idList: req.body.idList,
      };
      const dataAmount = {
        qty: Amount.qty + data.amount - newData.amount,
      };
      console.log("amount", dataAmount);
      if (dataAmount.qty <= 0) {
        res.status(400).send({
          message: "data cannot be reduced",
        });
        console.log("amjing");
      } else {
        const UpdateAmount = await amount.update(dataAmount, {
          where: {
            idQty: data.idList,
          },
        });

        const update = await flow.update(newData, {
          where: {
            id,
          },
        });
        let Amounts = await amount.findOne({
          where: {
            idQty: data.idList,
          },
        });

        res.send({
          status: "success",
          message: `Update successfull for user with id: ${id}`,
          update: update,
          data: data,
          UpdateAmount,
          Amounts,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteFlow = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await flow.destroy({
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
