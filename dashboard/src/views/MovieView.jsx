import Card from "../components/ContentRow/Card/Card";
import react, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";

function ProductView() {
    const { id } = useParams()
    const [ product, setProduct ] = useState({})
    const [ loading, setLoading] = useState(true)

    useEffect(() => {
        async function getProduct() {
            
                const result = await fetch(`http://localhost:5000/api/products/${id}`)
                const data = await result.json();
                if(result.status == 200) {
                    setLoading(false)
                    setProduct(data)
                }
        }
        getProduct()
    }, []) 

        return (
            <>
            {
                loading && <h1>Cargando...</h1>

            }
            {
                !loading && <Card title={ product?.name }>
                <div className="text-center">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '40rem' }} src={product.img} alt=" Star Wars - Mandalorian " />
                </div>
                <p>{product.category[0]}</p>
                <a className="btn btn-danger" target="_blank" rel="nofollow" href={product.detail}>View movie detail</a>
                </Card>
            }
            </>
            
        )
    
}

export default ProductView;