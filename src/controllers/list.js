const { listBarang, users,Category,suplier } = require('../../models');




exports.addLists = async (req, res) => {
    // code here
    try {
        const data = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.file.filename,
            idUser: req.body.idUser,
            idCategory: req.body.idCategory,
            idSuplier: req.body.idSuplier,
        };

        // console.log(data);
        const createdData = await listBarang.create(data)

        let productData = await listBarang.findOne({
            where: {
                id: createdData.id,
            },
            include: [
                {
                    model: users,
                    as: 'users',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
                {
                    model: suplier,
                    as: 'suplier',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });
        productData = JSON.parse(JSON.stringify(productData));
        res.send({
            status: "success",
            data: {
                productData,
               image: "http://localhost:5000/uploads/" + productData.image
            }
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getLists = async (req, res) => {
    // code here
    try {
        const user = await listBarang.findAll()

        // `SELECT name,email, status, id FROM`
        productData = JSON.parse(JSON.stringify(user));
        res.send({
            status: "success",
            data: {
                productData,
               image: "http://localhost:5000/uploads/" + productData.image
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }

}

exports.getlistsOne = async (req, res) => {
    try {
        const { id } = req.params

        const data = await listBarang.findAll({
            where: {
                id
            }})

            productData = JSON.parse(JSON.stringify(data));
            res.send({
                status: "success",
                data: {
                    productData,
                   image: "http://localhost:5000/uploads/" + productData.image
                }
            })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.updateLists = async (req, res) => {
    // code here
    try {
        const id = req.params.id
        const newData = req.body

        await listBarang.update(newData, {
            where: {
                id
            }
        })

        productData = JSON.parse(JSON.stringify(newData));
        res.send({
            status: "success",
            data: {
                productData,
               image: "http://localhost:5000/uploads/" + productData.image
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteLists = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await listBarang.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete user id:${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
