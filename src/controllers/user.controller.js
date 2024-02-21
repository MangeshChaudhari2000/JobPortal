import UserModel from "../models/user.model.js"
import JobsModel from "../models/jobs.model.js";


export default class UserController {

    getHomePage(req, res) {
        res.render('home', {userEmail: req.session.userEmail, errorMessage: { status: null, message: "" } })
    }

    getLoginPage(req, res) {
        res.render('loginPage', { errorMessage: { status: null, message: "" } })
    }

    postLogin(req, res) {
        var isuserPresent = UserModel.checkUser(req.body);
        console.log("inside postlogin " + isuserPresent);
        if (isuserPresent) {
            req.session.userEmail = req.body.email;
            const jobsModel = new JobsModel();
            let jobList = jobsModel.getJobList();
            return res.render('jobsPage', { jobList: jobList, userEmail: req.session.userEmail, errorMessage: { status: true, message: "You have Logged in Successfully" } })
        }
        else {
            res.render('loginPage', { errorMessage: { status: false, message: "Check Credentials again" } })
        }
    }

    postLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.render('home', { errorMessage: { status: true, message: "You have successfully logged out" } })
            }
        })
    }

 
    getRegisterPage(req, res) {
        res.render('registerPage');
    }

    postRegister(req, res) {
        const isUserAdded = UserModel.userAdd(req.body);
        if (isUserAdded) {
            res.render('loginPage', { errorMessage: { status: true, message: "Register Successfully" } })
        } else {
            res.render('loginPage', { errorMessage: { status: false, message: "Not Register try again" } })
        }
    }
}