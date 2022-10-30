const { amount, listbarang } = require("../../models");

//router to create, findAll, findOne,update,&delete data
exports.addQty = async (req, res) => {
  // code here
  try {
    const data = {
      qty: req.body.qty,
      idQty: req.body.idQty,
    };

    const createQty = await amount.create(data);
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
    res.send({
      status: "success",
      data: qtyData,
    });

    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateQty = async (req, res) => {
  // code here
  try {
    const id = req.params.id;
    const newData = req.body;

    const data = await amount.update(newData, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update successfull for user with id: ${id}`,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
