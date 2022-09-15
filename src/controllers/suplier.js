const { suplier } = require('../../models')



exports.addSuplier = async (req, res) => {
    // code here
    try {
        const data = req.body

        // console.log(data);
        const createdData = await suplier.create(data)

        res.send({
            status: "success",
            data: createdData
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getSupliers = async (req, res) => {
    // code here
    try {
        const user = await suplier.findAll()

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

exports.getSuplier= async (req, res) => {
    try {
        const { id } = req.params

        const data = await suplier.findAll({
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


exports.updateSuplier = async (req, res) => {
    // code here
    try {
        const id = req.params.id
        const newData = req.body

        await suplier.update(newData, {
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

exports.deleteSuplier = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await suplier.destroy({
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