import React, { Component } from "react";


/** 
 * table component to render the complete address with pagination
*/

class TableComponent extends Component {

    pagination(target, e, i = null) {
        e.preventDefault();
        if (this.props.pagination) {
            this.props.pagination(target, e, i = null);
        }
    }

    keyPress(e) {
        if (this.props.keyPress) {
            this.props.keyPress(e);
        }
    }

    render() {
        let { tableData,
            current_page,
            loading,
            isPagination
        } = this.props.tableComponentObj;

        let table_row;
        if (tableData && tableData.length > 0) {
            table_row = tableData.map((address, index) => {
                return <tr key={index}>
                    <td>{address.id}</td>
                    <td>{address.street_name}</td>
                    <td>{address.pin_code}</td>
                    <td>{address.lat}</td>
                    <td>{address.long}</td>
                </tr>;

            });
        } else {
            table_row = null
        }

        return (
            <div className="width-50per page-wrapper">
                <div className="row page-titles">

                    <div className="col-md-5 align-self-center">
                        <h3 className="text-themecolor">Address</h3>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="card card-default">
                                <div className="card-body collapse show">
                                    <div className="d-flex no-block">
                                        <div className="ml-auto" style={{ 'display': 'inherit' }}>
                                            <input type="text" name={"search"} placeholder="Search on coloumn pincode"
                                                onKeyUp={(e) => { this.keyPress(e) }} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        {!loading ?
                                            <div>
                                                <table className="table product-overview">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Street Name</th>
                                                            <th>Pincode</th>
                                                            <th>Lattitude</th>
                                                            <th>Longitude</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {table_row}

                                                    </tbody>
                                                </table>
                                                {isPagination ?
                                                    <div className="dataTables_paginate paging_simple_numbers" id="example23_paginate">
                                                        <ul className="pagination justify-content-end">
                                                            <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.pagination('pre', e)}>Previous</a></li>
                                                            <li>Current Page : {current_page}</li>
                                                            <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.pagination('next', e)}>Next</a></li>
                                                        </ul>
                                                    </div>
                                                    : null}

                                            </div>
                                            :
                                            <div className='sweet-loading' style={{ 'textAlign': 'center' }}>
                                                Loading.....
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }

}

export default TableComponent;