var btn = document.getElementById("recordar")
if (sessionStorage.getItem("autosave")) {
    btn.value = sessionStorage.getItem("autosave");
}

btn.addEventListener("change", function () {
    sessionStorage.setItem("autosave", btn.value);
});

function usuario(req,res){
    req.body.email
    if(btn){
        sessionStorage.setItem("email",remail)
        var email = sessionStorage.getItem("email")
    }
}
module.exports = usuario