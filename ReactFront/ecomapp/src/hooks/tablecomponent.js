import React from 'react';

const TableComponent = (props) => {

    const deleterow = (idx) => {
        props.deleterow(idx);
    }

    const editrow = (data) => {
        props.editrow(data);
    };

    if (props.dataSource === undefined || props.dataSource.length === 0) {
        return (
            <div className="container">No Recrds to show</div>
        );
    } else {
        return (
            <div className="container">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                Object.keys(props.dataSource[0]).map((col, idx) => (
                                    <th key={idx}>{col}</th>
                                ))

                            }
                            < th > Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.dataSource.map((rows, index) => (
                                <tr key={index}>

                                    {
                                        Object.keys(props.dataSource[0]).map((col, idx) => (
                                            <th >
                                                <div>
                                                    {rows[col]}
                                                </div>
                                            </th>
                                        ))
                                    }
                                    <button className="btn btn-danger btn-sm" onClick={() => { deleterow(props.dataSource[index].productId) }}>Delete</button>
                                    <br />
                                    <button className="btn btn-primary btn-sm" onClick={() => { editrow(props.dataSource[index]) }}>Edit</button>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >

        );
    }
};

export default TableComponent;