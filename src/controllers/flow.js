const { Flow ,listBarang} = require('../../models')



exports.addFlow = async (req, res) => {
    // code here
    try {
        const data = req.body
        const createdData = await Flow.create(data)

        let productData = await Flow.findOne({
            where: {
                id: createdData.id,
            },
            include: [
                {
                    model: listBarang,
                    as: 'listBarang',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
        productData = JSON.parse(JSON.stringify(productData));
        res.send({
            status: "success",
            data: {
                productData,
               image: "http://localhost:5000/uploads/" + productData.listBarang.image
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

exports.getFlows = async (req, res) => {
    // code here
    try {
        const user = await Flow.findAll()

        // `SELECT name,email, status, id FROM`
        res.send({
            status: "success",
            data: {
                user
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

exports.getFlow = async (req, res) => {
    try {
        const { id } = req.params

        const data = await Flow.findAll({
            where: {
                id
            }})

        res.send({
            status: 'success',
            data: {
                user: data
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


exports.updateFlow = async (req, res) => {
    // code here
    try {
        const id = req.params.id
        const newData = req.body

        await Flow.update(newData, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update successfull for user with id: ${id}`,
            data: newData
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteFlow = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await Flow.destroy({
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
