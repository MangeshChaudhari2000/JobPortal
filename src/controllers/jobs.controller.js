import JobsModel from "../models/jobs.model.js";
import ApplicantModel from "../models/applicants.model.js";
export default class JobSController {



    getJobsPage(req, res) {
        const jobsModel = new JobsModel();
        let jobList = jobsModel.getJobList();
        res.render('jobsPage', { jobList: jobList, userEmail: req.session.userEmail, errorMessage: { status: null, message: "" } })
    }

    getDetailedJobsPage(req, res) {
        // console.log(req.params.ID);
        const jobId = req.params.ID;
        const jobsModel = new JobsModel();
        let jobInfo = jobsModel.getSingleJob(jobId);
        res.render('DetailedjobPage', { jobInfo: jobInfo, userEmail: req.session.userEmail, errorMessage: { status: null, message: "" } })
    }

    getApplyPage(req, res) {
        console.log("into getApplyPage");
        var jobID = req.params.ID;
        console.log("in getApplyPage JOBID is" + jobID);
        res.render('applicationForm', { jobID: jobID, userEmail: req.session.userEmail })
    }

    PostApplyPage(req, res) {
        const jobID = req.params.ID;
        console.log("in PostApplyPage job ID is" + jobID);
        const { name, email, contact } = req.body;
        const filename = 'resume/' + req.file.filename;

        const applicantModel = new ApplicantModel();
        const jobsModel = new JobsModel();

        var indexInAppModel = applicantModel.addAppInAppModel(name, email, contact, filename);

        if (indexInAppModel) {
            var isApplAddedInJob = jobsModel.addAppInJobModel(jobID, indexInAppModel)
            // console.log(jobsModel.getSingleJob(isApplAddedInJob));
            // console.log(isApplAddedInJob);
            if (isApplAddedInJob == true) {
                let jobInfo = jobsModel.getSingleJob(jobID);
                res.render('DetailedjobPage', { jobInfo: jobInfo, userEmail: req.session.userEmail, errorMessage: { status: true, message: "You have applied Successfully" } })
            } else {
                res.render('DetailedjobPage', { jobInfo: jobInfo, userEmail: req.session.userEmail, errorMessage: { status: false, message: "Error Please fill data correcly" } })
            }
        }
    }

    getApplicantInfo(req, res) {
        var jobId = req.params.ID;
        var applicantModel = new ApplicantModel();
        const jobsModel = new JobsModel();
        var appInfo = jobsModel.getApplicantInfoByJobId(jobId);
        res.render('applicantInfo', { appInfo: appInfo, userEmail: req.session.userEmail })
    }

    CreateJobPage(req, res) {
        res.render('createNewJob', { userEmail: req.session.userEmail })
    }

    AddJob(req, res) {
        var isJobAdded = JobsModel.addJobModel(req.body);
        if (isJobAdded) {
            const jobsModel = new JobsModel();
            let jobList = jobsModel.getJobList();
            res.render('jobsPage', { jobList: jobList, userEmail: req.session.userEmail, errorMessage: { status: true, message: "New Job added Successfully Successfully" } })
        } else {
            res.render('jobsPage', { jobList: jobList, userEmail: req.session.userEmail, errorMessage: { status: false, message: "Opps! Job Not added" } })
        }
    }
    getupdateJobPage(req, res) {
        const jobId = req.params.ID;
        const jobsModel = new JobsModel();
        let jobInfo = jobsModel.getSingleJob(jobId);
        res.render('updateJobPage', { jobInfo: jobInfo, userEmail: req.session.userEmail, errorMessage: { status: null, message: "" } })
    }
    updateJobDetails(req, res) {
        const jobsModel = new JobsModel();
        var isJobUpdated = JobsModel.updateJobModel(req.params.ID, req.body);
        console.log("inside updateJobDetails");
        let jobInfo = jobsModel.getSingleJob(req.params.ID);
        if (isJobUpdated == true) {
            res.render('DetailedjobPage', { jobInfo: jobInfo, userEmail: req.session.userEmail, errorMessage: { status: true, message: "You have Updated Job Details Successfully" } })
        } else {
            res.render('DetailedjobPage', { jobInfo: jobInfo, userEmail: req.session.userEmail, errorMessage: { status: false, message: "Error with updating job details" } })

        }
    }

    deleteJob(req, res) {
        const jobsModel = new JobsModel();
        let requestdelete = jobsModel.deleteJob(req.params.ID);

        let jobList = jobsModel.getJobList();
        if (requestdelete) {
            res.render('jobsPage', { jobList: jobList, userEmail: req.session.userEmail, errorMessage: { status: true, message: "You have deleted  Successfully" } })
        }else{
            res.render('jobsPage', { jobList: jobList, userEmail: req.session.userEmail, errorMessage: { status: false, message: "Opps! Issue with delete" } })

        }
    }

}