const { Category } = require('../../models')



exports.addCategory = async (req, res) => {
    // code here
    try {
        const data = req.body

        // console.log(data);
        const createdData = await Category.create(data)

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

exports.getCategorys = async (req, res) => {
    // code here
    try {
        const user = await Category.findAll()

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

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params

        const data = await Category.findAll({
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


exports.updateCategory = async (req, res) => {
    // code here
    try {
        const id = req.params.id
        const newData = req.body

        await Category.update(newData, {
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

exports.deleteCategory = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await Category.destroy({
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
