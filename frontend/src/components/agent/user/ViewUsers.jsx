import React from "react";


const ViewUsers = (props) => {
    const mapResponse = props.users.map((val) => {
        return (
            <tr key={val.id}>
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
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
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