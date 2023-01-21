import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFreelanceContext } from '../context/FreelanceContext';

export const Task = () => {

    const {tasks, onGetTasks, onDeteleTask} = useFreelanceContext();
    const navigate = useNavigate();

    useEffect(() => {
        onGetTasks();
    }, []);

    function renderTask() {
        if(tasks.length === 0) return <h1>erai</h1>
        return tasks.map(task => 
            <div key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
                <p>{task.createdAt}</p>
                <span>{task.done == 1 ? "completed" : "incompleted"}</span>
                <button onClick={() => onDeteleTask(task.id)}>
                    Delete
                </button>
                <button onClick={() => navigate(`/edit-task/${task.id}`)}>
                    Update
                </button>
            </div>
        )
    }

    return renderTask()
}
