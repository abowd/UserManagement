import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveAllUser, deleteUser, blockUser, unBlockUser } from '../../store/Actions/userActios'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useHistory } from 'react-router-dom';
const UsersList = () => {
   const history = useHistory();
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveAllUser());
    }, []);
    const deletedUser = (id) => {
        confirmAlert({
          title: 'Delete User',
          message: 'Are you sure to Delete User.',
          buttons: [
            {
              label: 'Delete',
              onClick: () => dispatch(deleteUser(id))
            },
            {
              label: 'Cancel',
              onClick: () => close()
            }
          ]
        });
      }
      const blockedUser = (id) => {
        confirmAlert({
          title: 'Block User',
          message: 'Are you sure to Block this User.',
          buttons: [
            {
              label: 'Block',
              onClick: () => dispatch(blockUser(id))
            },
            {
              label: 'Cancel',
              onClick: () => close()
            }
          ]
        });
      }
      const unBlockedUser = (id) => {
        confirmAlert({
          title: 'Active User',
          message: 'Are you sure to active this User.',
          buttons: [
            {
              label: 'UnBlock',
              onClick: () => dispatch(unBlockUser(id))
            },
            {
              label: 'Cancel',
              onClick: () => close()
            }
          ]
        });
      }
        return (
               <div class="container table-responsive py-5"> 
                <h2>Users</h2>
                 <table class="table table-bordered table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Active</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users?.map((row, index) => (
                        <tr>
                            <td scope="row" value="{row.id}">{index +1}</td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.userName}</td>
                            <td>{row.email}</td>
                            <td>{row.isActive ? 'Active' : 'Suspended'}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => { deletedUser(row.id) }}>Delete</button> {' '}
                                <Link to={`/editUser/${row.id}`} className="btn btn-primary"> Edit</Link> {' '}
                                {row.isActive == true ?
                                    <button className="btn btn-primary" onClick={() => { blockedUser(row.id) }}>Block</button>
                                    : <button className="btn btn-success" onClick={() => { unBlockedUser(row.id) }} >Blocked</button>}
                               
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
};

export default UsersList;
