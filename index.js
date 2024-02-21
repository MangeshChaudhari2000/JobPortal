import express from 'express';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import JobSController from './src/controllers/jobs.controller.js';
import { upload } from './src/middlewares/fileUpload.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import session from 'express-session';
import  methodOverride  from 'method-override';

//Configuration
const server = express();
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), "src", "views"))

//session
server.use(session({
    secret: 'HipHopKing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

//Middlewares
server.use(ejsLayouts);
server.use(express.static('src/views'));
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }))
server.use(methodOverride('_method'))
//Class instance Initialisation
const userController = new UserController();
const jobsController = new JobSController();


//Routes
server.get('/', userController.getHomePage)
server.get('/jobs', jobsController.getJobsPage)
server.get('/jobs/:ID', jobsController.getDetailedJobsPage)
server.get('/createJob',auth, jobsController.CreateJobPage)
server.post('/createJob',auth, jobsController.AddJob)
server.get('/jobs/update/:ID',auth, jobsController.getupdateJobPage)
server.put('/jobs/update/:ID',auth, jobsController.updateJobDetails)
server.get('/jobs/delete/:ID',auth, jobsController.deleteJob)
//apllicant
server.get('/apply/:ID', jobsController.getApplyPage)
server.post('/apply/:ID', upload.single('resumePath'), jobsController.PostApplyPage)
server.get('/applicantPage/:ID',auth,jobsController.getApplicantInfo)
//authenticae
server.get('/login',userController.getLoginPage)
server.post('/login',userController.postLogin)
server.get('/logout',userController.postLogout)
server.get('/register',userController.getRegisterPage)
server.post('/register',userController.postRegister)




server.listen(3000, () => {
    console.log("server running at 3000");
})