import RowMovies from '../components/RowMovies/RowMovies';
import ContentRow from '../components/ContentRow/ContentRow';


function Index() {
    return (

        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
            </div>

            {/* <!-- Content Row Movies--> */}
            <RowMovies />
            {/* <!-- End movies in Data Base --> */}

            {/* <!-- Content Row Last Movie in Data Base --> */}
            <ContentRow />

    </div>



    )
}

export default Index;