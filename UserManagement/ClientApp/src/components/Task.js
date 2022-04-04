import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveTasks, CompleteUserTask } from '../store/Actions/TaskActions'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { useHistory } from 'react-router-dom';
const Task = () => {
    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(retrieveTasks());
    }, []);
    const submit = (id) => {
        confirmAlert({
          title: 'Complete Task',
          message: 'Are you sure to complete your task',
          buttons: [
            {
              label: 'Complete',
              onClick: () => dispatch(CompleteUserTask(id))
            },
            {
              label: 'Cancel',
              onClick: () => close()
            }
          ]
        });
      }
        return (
            <div>
                <h1>Tasks</h1>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">User Group</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tasks.map((row, index) => (
                        <tr>
                            <th scope="row" value="{row.id}">{index +1}</th>
                            <td>{row.taskTitle}</td>
                            <td>{row.description}</td>
                            <td>{row.taskStatus.name}</td>
                            <td>{row.userGroup.name}</td>
                            <td>
                                <Link  className="btn btn-primary" to={`/moveTask/${row.userGroupId}`}>Move Task</Link> {' '}
                                <Link className="btn btn-primary" to={`/userGroup-task/${row.userGroupId}`}>User Group</Link> {' '}
                                <Link to={`/status-task/${row.taskStatusId}`} className="btn btn-primary" >Task Status</Link> {' '}
                                {row.taskStatusId == 2 ?
                                    <button className="btn btn-primary" onClick={() => { submit(row.id) }}>Complete Task</button>
                                    : <button className="btn btn-success">Completed</button>}
                                
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
};

export default Task;
