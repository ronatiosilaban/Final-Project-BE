const { users } = require('../../models')
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.addUsers = async (req, res) => {
    // code here
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        status: Joi.string().min(5).required()
    });

    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });
    try {

        

        // console.log(data);
        const salt = await bcrypt.genSalt(10);
        // we hash password from request with salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const createdData = await users.create({
            username : req.body.username,
            password: hashedPassword,
            status : req.body.status
        })
         // we generate salt (random value) with 10 rounds

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

exports.Login = async(req,res)=>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });

    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error)
        return res.status(400).send({
            error: {
                message: error.details[0].message,
            },
        });
    try {


        

        // console.log(data);
        const userExist = await users.findOne({
            where: {
                username: req.body.username,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        // compare password between entered from client and from database
        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        // check if not valid then return response with status 400 (bad request)
        if (!isValid) {
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid",
            });
        }

        // code here
        const dataToken = {
            id: userExist.id
        }

        // const SECRET_KEY = 'sangatrahasia'
        // const token = jwt.sign(dataToken, SECRET_KEY)
        const token = jwt.sign(dataToken, "rahasiaaa")
        console.log(token);

        res.status(200).send({
            status: "success...",
            data: {
                id: userExist.id,
                username: userExist.username,
                status: userExist.status,
                token
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.getUsers = async (req, res) => {
    // code here
    try {
        const user = await users.findAll()

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


exports.updateUser = async (req, res) => {
    // code here
    try {
        const id = req.params.id
        const newData = req.body

        await users.update(newData, {
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

exports.deleteUser = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await users.destroy({
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
