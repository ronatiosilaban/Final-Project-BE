const { listbarang, users, category, suplier } = require("../../models");

//router to get all data list, category & suplier

exports.Alldata = async (req, res) => {
  try {
    const List = await listbarang.findAll();
    const Category = await category.findAll();
    const Suplier = await suplier.findAll();

    ListData = JSON.parse(JSON.stringify(List));
    listCategory = JSON.parse(JSON.stringify(Category));
    listSuplier = JSON.parse(JSON.stringify(Suplier));

    res.send({
      message: "success",
      data: {
        ListData: ListData,
        listCategory: listCategory,
        listSuplier: listSuplier,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "failed",
    });
  }
};
