const {profile, users} = require("../../models")


exports.addProfile = async (req, res) => {
    // code here
    try {
        const data = {
            possition: req.body.possition,
            desc: req.body.desc,
            image: req.file.filename,
            idProfile: req.body.idProfile,
        };

        // console.log(data);
        const createdData = await profile.create(data)

        let productData = await profile.findOne({
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
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idProfile'],
            },
        });
        productDatas = JSON.parse(JSON.stringify(productData));
        res.send({
            status: "success",
            data: {
                productDatas,
               image: "http://localhost:5000/uploads/" + productDatas.image
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

exports.getProfiles = async (req, res) => {
    // code here
    try {
        const user = await profile.findAll()

        // `SELECT name,email, status, id FROM`
        productData = JSON.parse(JSON.stringify(user));
        newdata = productData[0]
            res.send({
                status: "success",
                data: {
                    newdata,
                    image: "http://localhost:5000/uploads/" + newdata.image
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

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params

        const data = await profile.findAll({
            where: {
                id
            }})

            productData = JSON.parse(JSON.stringify(data));
       newdata = productData[0]
            res.send({
                status: "success",
                data: {
                    newdata,
                    image: "http://localhost:5000/uploads/" + newdata.image
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


exports.updateProfile = async (req, res) => {
    // code here
    try {
        const id = req.params.id
        const newData = req.body

        await profile.update(newData, {
            where: {
                id
            }
        })

        productData = JSON.parse(JSON.stringify(newData));
        newdata = productData[0]
            res.send({
                status: "success",
                data: {
                    newdata,
                    image: "http://localhost:5000/uploads/" + newdata.image
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

exports.deleteProfile = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await profile.destroy({
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
