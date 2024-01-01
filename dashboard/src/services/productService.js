export default async function getProducts(name) {
    try {
        const response = await fetch(`http://localhost:5000/api/products?name=${encodeURIComponent(name)}`)
        const data = await response.json()

        if (response.status != 200) throw new Error("Error al conectarse con la DB")

        return data

    } catch (error) {
        console.log(error)
    }
}
