const homeController = {
    home: (req,res) => {
        res.render("home")
    },
    login: (req,res) => {
        res.render("login")
    }
}
module.exports = homeController