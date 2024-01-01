import React, { Component } from "react";
import Card from './Card/Card';
import GenreCard from './GenreCard/GenreCard';

class ContentRow extends Component {

  constructor() {
    super();
    this.state = {
      categories:[],
      products: []
    }
  }

  componentDidMount() {
    setTimeout(async () => {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json()
      this.setState({ 
        products: data.data,
        categories:data.categories,
        countByCategory:data.countByCategory
      })

    }, 1000)
  }

  render() {
    const {products} = this.state;
    const lastProduct =products[products.length - 1];
    
    return (
      <div className="row">
        <Card title={"Last product in Data Base"}>

        {lastProduct && (
            <>
              <div className="text-center">
                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '40rem' }} src={lastProduct.img} alt="Imagen del producto" />
              </div>
              <p>{lastProduct.description}</p>
              <a className="btn btn-danger" target="_blank" rel="nofollow" href={lastProduct.detail}>View movie detail</a>
            </>
          )}
        </Card>

        <Card title={"Categories in Data Base"}>
          <div className="row">
          {this.state.products.length === 0 && <h3>Cargando...</h3>}
          {this.state.categories &&
          this.state.categories.map(category => (
          <GenreCard key={category} category={category} count={this.state.countByCategory[category]} />
          ))}
          </div>
        </Card>
      </div>
    )
  }

}

export default ContentRow;