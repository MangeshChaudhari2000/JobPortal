export const auth = (req, res, next) => {
    if (req.session.userEmail) {
        next();
    } else {
        res.render('home', { errorMessage: { status: false, message: "You are not authorised" } });
    }

}
