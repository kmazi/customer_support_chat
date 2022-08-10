import React from "react";


const ViewUsers = (props) => {
    const mapResponse = props.users.map((val, index) => {
        return (
            <tr style={{ background: (index % 2) > 0 && '#c5d6fc' }} key={val.id}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.phone}</td>
                <td>{val.role.name}</td>
            </tr>
        );
    });
    return (
        <div>
            <table>
                <thead>
                    <tr style={{ textAlign: 'left', background: '#5e8fff' }}>
                        <th style={{width: '20%'}}>Id</th>
                        <th style={{width: '20%'}}>Name</th>
                        <th style={{width: '20%'}}>Phone</th>
                        <th style={{width: '20%'}}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    { mapResponse }
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;