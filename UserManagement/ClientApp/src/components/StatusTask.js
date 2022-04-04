import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { retrieveStatusTasks } from '../store/Actions/TaskActions'

const StatusTask = () => {
    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(retrieveStatusTasks(id));
    }, []);
    return (
        <div>
            <h1>Task Status</h1>
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

export default StatusTask;
