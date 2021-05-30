const db = require('./db');

const register = (username, email, password) => {
    return db.user.findOne(
        {
            username: username
        }).then(user => {
            if (user) {
                return {
                    status: 401,
                    message: "user exists, please login"
                }
            } else {
                const newUser = new db.user({ username, email, password });
                newUser.save();
                return {
                    status: 200,
                    message: "user registered"
                }
            }
        })


}
let currentUser;
const login = (req, username, password) => {
    //  console.log("login called");
    return db.user.findOne(
        {
            username: username,
            password: password
        }).then(user => {
            if (user) {
                //currentUser = user.username;
                req.session.currentUser = user
                console.log(req.session)
                return {
                    status: 200,
                    message: "Login Successful"
                }
            } else {

                return {
                    status: 401,
                    message: "invalid user credentials"
                }
            }
        })
}

const goHome = (req) => {
    console.log("home route")
    return {
        status: true,
        message: 'Welcome ' + req.session.currentUser.username
    }

}


module.exports = { register, login, goHome };