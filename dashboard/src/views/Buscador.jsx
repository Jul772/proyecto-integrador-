import Card from "../components/ContentRow/Card/Card";
import { useState, useEffect } from "react"
import Input from "../components/Input/Input";
import getProducts from '../services/productService.js'

function Buscador() {

    const [ products, setProduct ] = useState({})
    const [ loading, setLoading] = useState(false)

    async function getProduct(name) {
            setLoading(true)
            try {
                const result = await getProducts(name);
                setProduct(result.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
    }


    useEffect(() => {
        async function fetchData(){
            const results = await getProducts('');
            setProduct(results.data);
        }
        fetchData()
        }
    , []) 

        return (
            <>
                <Input handleSearch={getProduct} />
            {
            loading && <h1>Cargando...</h1>
            }
            {!loading && products && products.length>0 && (
                <div className="row">
                {products.map((singleProduct) => (
                <Card key={singleProduct.id} title={singleProduct.name}>
                    <div className="text-center">
                    {singleProduct.img && (
                        <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style={{ width: '40rem' }}
                        src={singleProduct.img}
                        alt="Img del producto"
                        />
                    )}
                    </div>
                    <p>{singleProduct.categories && singleProduct.categories[0]}</p>
                    <a
                    className="btn btn-danger"
                    target="_blank"
                    rel="nofollow"
                    href={singleProduct.detail}
                    >
                    Ver detalle del producto
                    </a>
                </Card>
                ))}
            </div>
        )}
            </>
            
        )
    
}

export default Buscador;