import { useRef } from "react"

function Input({handleSearch = () => {}}) {
    const inputRef = useRef()

    const search = () => {
        let title = inputRef.current.value

        handleSearch(title)
    }
    

    return(
        <div>
            <label  className="mr-2" htmlFor="buscador">Introducir nombre del producto: </label>
            <input type="text" id="buscador" onBlur={ search } ref={inputRef}/>
        </div>
    )
}

export default Input;