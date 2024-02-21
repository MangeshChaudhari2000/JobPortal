export default class ApplicantModel {
    constructor(_applicantid, _name, _email, _contact, _resumePath) {
        this.applicantid = _applicantid;
        this.name = _name;
        this.email = _email;
        this.contact = _contact;
        this.resumePath = _resumePath;
    }
    addAppInAppModel(name1, email1, contact1, resumePath1) {
        let newApplicant = new ApplicantModel((applicantList.length + 1), name1, email1, email1, contact1, resumePath1)
        var isAdded = applicantList.push(newApplicant);
        console.log("inside addAppAppModel" + isAdded);
        if (isAdded) {
            return isAdded;
        }
        console.log("Applicant not added in addAppAppModel");
    }

    getApplicantInfo(applicantIdReceived) {
        console.log("inside getApplicantInfo:" + applicantIdReceived);
        var appList = new Array();
        var tempAppInfo = applicantIdReceived.forEach(element => {
            if (applicantList.forEach(data => {
                if (data.applicantid == element) {
                    const x = new ApplicantModel(data.applicantid,data.name,data.email,data.contact,data.resumePath);
                    appList.push(x)
                }
            })) {}
        }
        )
        return appList;

    };

}


const applicantList = [
    new ApplicantModel(1, 'Mangesh', 'mangesh@gmail.com', 9999999999, 'D:\codingninjas\backend\project\miniProject\public\resume1'),
    new ApplicantModel(2, 'Ramesh', 'Ramesh@gmail.com', 7777777777, 'D:\codingninjas\backend\project\miniProject\public\resume2'),
    new ApplicantModel(3, 'Suresh', 'Suresh@gmail.com', 3333333333, 'resume3')
]