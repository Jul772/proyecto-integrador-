document.addEventListener("keyup",(e)=>{
    if(e.target.matches("#buscador")){
        if(e.key === "Escape")e.target.value = ""
        document.querySelectorAll(".articulo").forEach(element => {
            element.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?element.classList.remove("filtro")
            :element.classList.add("filtro")
        })
    }
})