

export default class UserModel {
    constructor(_userId, _name, _email, _password1) {
        this.userId = _userId;
        this.name = _name;
        this.email = _email;
        this.password1 = _password1;
    }

    static userAdd(userDetails) {
        const { name, email, password } = userDetails;
        const userModelInstance = new UserModel((userList.length + 1), name, email, password);
        const isadded = userList.push(userModelInstance);
        if (isadded) {
            return isadded;
        }

    }

    static checkUser(userCredenials) {
        const { email, password } = userCredenials;
        const isUserPresent = userList.find(data => data.email == email && data.password1 == password)
        if (isUserPresent) {
            return isUserPresent;
        }

    }

}

const userList = [
    new UserModel(1, 'Mangesh', 'mangesh@gmail.com', 'mmm'),
    new UserModel(2, 'Ramesh', 'Ramesh@gmail.com', 'rrr'),
    new UserModel(3, 'Suresh', 'Suresh@gmail.com', 'sss')
]