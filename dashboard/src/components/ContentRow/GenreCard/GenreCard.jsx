function GenreCard({ category,count }) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                <h5 className="card-title">{category}</h5>
                <p className="card-text">Products: {count}</p>
                </div>
            </div>
        </div>
    )
}

export default GenreCard;