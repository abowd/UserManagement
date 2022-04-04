import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { retrieveUserGroupTasks } from '../store/Actions/TaskActions'

const UserGroupTask = () => {
    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();
    const { id  } = useParams();
    useEffect(() => {
        dispatch(retrieveUserGroupTasks(id));
    }, [dispatch, id]);
    return (
        <div>
            <h1>User Group Task</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">User Group</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((row, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{row.taskTitle}</td>
                            <td>{row.description}</td>
                            <td>{row.taskStatus.name}</td>
                            <td>{row.userGroup.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserGroupTask;
