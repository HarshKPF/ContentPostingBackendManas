const db = require("../config/db");
const userController = {
    getUsersList: async(req, res) => {
        try {
            //Sample GET API
            const users = await db.query('SELECT id, first_name, last_name FROM users ORDER BY id ASC LIMIT 5');
            const message = "Data Retrieved Successfully";
                
            return res.status(200).send({//OK
                status: 200,
                message,
                data: users.rows
            });
        } catch (error) {
            // console.log(error,'error')//Testing
            return res.status(500).send({//Internal Error
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
    createNewUser: async(req, res) => {
        try {
            //Sample POST API
            //Get Payload from request body
            const {first_name, last_name} = req.body;
            // console.log(first_name, 'first_name')//Testing
            if(typeof first_name === "undefined" || typeof last_name === "undefined"){
                return res.status(400).send({//Bad Request
                    status: 400,
                    message: "User First & Last Name Required"
                });
            }
            
            await db.query(
                "INSERT INTO users (first_name, last_name) VALUES ($1, $2)",
                [first_name, last_name]
            );

            return res.status(200).send({//OK
                status: 200,
                message: "User Created Successfully",
                data: {
                    first_name,
                    last_name
                }
            });
        } catch (error) {
            return res.status(500).send({//Internal Error
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
    updateUserDetails: async(req, res) => {
        try {
            //Sample PUT API
            //Get Payload from request body
            const {id} = req.params;
            const {first_name, last_name} = req.body;
            await db.query(
                "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3",
                [first_name, last_name, id]
            );

            return res.status(200).send({//OK
                status: 200,
                message: "User Details Updated Successfully",
                data: {
                    first_name,
                    last_name
                }
            });
        } catch (error) {
            return res.status(500).send({//Internal Error
                status: 500,
                message: "Something Went Wrong"
            });
        }
    },
    deleteUser: async(req, res) => {
        try {
            //Sample DELETE API
            //Get Payload from request body
            const {id} = req.params;
            await db.query(
                "DELETE FROM users WHERE id = $1",
                [id]
            );

            return res.status(200).send({//OK
                status: 200,
                message: "User Details Deleted Successfully"
            });
        } catch (error) {
            return res.status(500).send({//Internal Error
                status: 500,
                message: "Something Went Wrong"
            });
        }
    }
}

module.exports = userController;