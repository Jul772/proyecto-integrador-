document.addEventListener("keyup", (e) => {
    if (e.target.matches("#buscador")) {
        if (e.key === "Escape" || e.target.value.trim() === "") {
            e.target.value = "";
        }

        const artículos = document.querySelectorAll(".articulo");

        if (e.target.value.trim() === "") {
            artículos.forEach(element => {
                element.classList.remove("filtro");
            });
        } else {
            artículos.forEach(element => {
                element.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                    ? element.classList.remove("filtro")
                    : element.classList.add("filtro");
            });
        }
    }
});
