import ApplicantModel from "./applicants.model.js";

export default class JobsModel {
    constructor(_ID, _jobcategory, _jobdesignation, _joblocation, _companyname, _salary, _applyby, _skillsrequired, _numberofopenings, _jobposted, _applicants) {
        this.ID = _ID;
        this.jobcategory = _jobcategory;
        this.jobdesignation = _jobdesignation;
        this.joblocation = _joblocation;
        this.companyname = _companyname;
        this.salary =_salary;
        this.applyby = _applyby;
        this.skillsrequired = _skillsrequired;
        this.numberofopenings = _numberofopenings;
        this.jobposted = _jobposted;
        this.applicants = Array.isArray(_applicants) ? _applicants : [];
    }

    getJobList(req, res) {
        return jobArray;
    }

    getSingleJob(id) {
        return jobArray.find((data) => data.ID == id)
    }

    addAppInJobModel(jobId, AppIndex) {
        let isApplicantAdded = false;
        jobArray.forEach((data) => {
            if (data.ID == jobId) {
                console.log(data.ID);
                console.log(jobId);
                console.log(data);
                data.applicants.push(AppIndex)
                console.log(data);

                isApplicantAdded = true;
            }
        });
        console.log("I'm outside");
        return isApplicantAdded ? true : false;
    }

    getApplicantInfoByJobId(jobId1) {
        var jobInfo = jobArray.find(data => data.ID == jobId1);
        var appInfo = jobInfo.applicants;
        const applicantModel = new ApplicantModel();
        var appInfo2 = applicantModel.getApplicantInfo(appInfo);
        return appInfo2;
    }

    static addJobModel(inputJobDetails) {
        const { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings } = inputJobDetails;
        const newJobId = jobArray.length + 1;
        const newjobpostedDate = Date.now();


        const jobModelInstance = new JobsModel(newJobId, jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings, newjobpostedDate, 0);
        const isJobAdded = jobArray.push(jobModelInstance);
        if (isJobAdded) {
            return isJobAdded;
        } else {
            return 404;
        }
    }

    static updateJobModel(jobID, inputDetails) {
        var isJobUpdated = false;
        const ID = jobID;
        // console.log("inside updateJobModel" + inputDetails);
        const { jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings, jobposted } = inputDetails;
        var found = jobArray.find(data => {
            if (data.ID == ID) {
                data.jobcategory = jobcategory;
                data.jobdesignation = jobdesignation;
                data.joblocation = joblocation;
                data.companyname = companyname;
                data.salary = salary;
                data.applyby = applyby;
                data.skillsrequired = skillsrequired;
                data.numberofopenings = numberofopenings;
                data.jobposted = jobposted;

                isJobUpdated = true;
            }
        });
        return isJobUpdated ? true : false
    }

    deleteJob(JobId) {
        var index = jobArray.findIndex((data => data.ID == JobId))
        var deletedelemts = jobArray.splice(index, 1);
        if (deletedelemts) {
            return deletedelemts;
        }
    }
}


var jobArray = [
    new JobsModel('1', 'ITJob', 'SDE', 'PUNE,India', 'TCS', '20', '01/02/2024', 'react.js', '20', '01/02/2024', [1, 2]),
    new JobsModel('2', 'ITJob', 'Developer', 'Nashik,India', 'Infosys', '30', '01/02/2024', 'node.js', '20', '01/02/2024', [0]),
    new JobsModel('3', 'ITJob', 'Consultant', 'Mumbai,India', 'Accenture', '60', '01/02/2024', 'react.js', '20', '01/02/2024', [0]),
    new JobsModel('4', 'ITJob', 'Dancer', 'Jalgaon,India', 'InfoTech', '20', '01/02/2024','express.js', '20', '01/02/2024', [0]),
    new JobsModel('5', 'ITJob', 'Mechanic', 'Dhule,India', 'TechMahindra', '30', '01/02/2024', 'react.js', '20', '01/02/2024', [0]),
    new JobsModel('6', 'ITJob', 'Consultant', 'Parris,India', 'FAANG', '60', '01/02/2024', 'FrontEnd Developer', '20', '01/02/2024', [0]),
    new JobsModel('7', 'ITJob', 'AI', 'Thailand,India', 'TCS', '20', '01/02/2024', 'Full Stack Developer', '20', '01/02/2024', [0]),
]

var skillArray = ['React', 'Angular', 'NodeJS', 'ExpressJS', 'SQL', 'MongoDB']