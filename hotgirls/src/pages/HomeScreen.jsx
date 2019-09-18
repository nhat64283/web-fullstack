
import React from 'react';

const pageSize = 5;

class HomeScreen extends React.Component {
    state = {
        data: [],
        total: 0,
        currentPageNumber: 1,
        detailModelVisible: false,
        selectedPost:undefined,
    };

    componentWillMount() {
        this.getData(1);
    }

    getData = async pageNumber => {
        try {
            const result = await fetch(
                `http://localhost:3001/post/get/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            ).then((res) => {
                return res.json();
            });

            this.setState({
                total: result.data.total,
                data: result.data.data
            });
        } catch (error) {
            window.alert(error.message);
            console.log(error.message);
        }
    };

    handlePageChange = (newPageNumber) => {
        // call getData
        this.getData(newPageNumber);

        // setState currentPageNumber
        this.setState({
            currentPageNumber: newPageNumber,
        });
    };

    handlePrevClick = () => {
        if (this.state.currentPageNumber > 1) {
            // getData
            this.getData(this.state.currentPageNumber - 1);

            // setState
            this.setState({
                currentPageNumber: this.state.currentPageNumber - 1,
            });
        }
    };

    handleNextClick = () => {
        const maxPageNumber = Math.ceil(this.state.total / pageSize);
        if (this.state.currentPageNumber < maxPageNumber) {
            // getData
            this.getData(this.state.currentPageNumber + 1);

            // setState
            this.setState({
                currentPageNumber: this.state.currentPageNumber + 1,
            });
        }
    };
    handlePostClick = (selectedPost) => {
        this.setState({
            detailModelVisible:true,
            selectedPost:undefined,
        });
    }
    closeDetailModel = () => {
        this.setState({
            detailModelVisible:false,
        })
    }
    render() {
        const maxPageNumber = Math.ceil(this.state.total / pageSize);
        const paginations = [];
        for (let i = 0; i < maxPageNumber; i += 1) {
            paginations.push(i + 1);
        }

        return (
            <div>
                <div className="row">
                    {this.state.data.map(item => {
                        return (
                            <div className="col-4 mt-4" key={item._id}>
                                <div className="card">
                                    <div
                                        className="card-img-top"
                                        style={{
                                            backgroundImage: `url(http://localhost:3001${item.imageUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeate',
                                            height: '350px',
                                            width: 'auto'
                                        }}
                                    ></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.author.fullName}</h5>
                                        <p
                                            className="card-text"
                                            style={{
                                                height: '50px',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {item.content}
                                        </p>
                                        <a className="btn btn-primary" onClick={() => this.handlePostClick(item)}>
                                            Detail
										</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <nav aria-label="Page navigation example">
                    <ul
                        className="pagination"
                        style={{ float: 'right', marginTop: '30px', marginBottom: '30px' }}
                    >
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous" onClick={this.handlePrevClick}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {paginations.map((item) => {
                            const isActive = item === this.state.currentPageNumber;
                            let classNameValue = '';
                            if (isActive) {
                                classNameValue = 'page-item active';
                            } else {
                                classNameValue = 'page-item';
                            }
                            return (
                                <li className={classNameValue} key={item}>
                                    <a className="page-link" onClick={() => {
                                        this.handlePageChange(item);
                                    }}>
                                        {item}
                                    </a>
                                </li>
                            );
                        })}
                        <li className="page-item">
                            <a className="page-link" aria-label="Next" onClick={this.handleNextClick}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
</button>
{this.state.detailModelVisible ? (
    <div class="modal fade" id="exampleModal" onClick={this.closeDetailModel}>
        <div className="modal-dialog" role="document">
            <div className="modal-content" onClick={() => {}}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    ...
</div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick = {this.closeDetailModel}>Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>):null}

            </div>
        );
    }
}

export default HomeScreen;