import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFreelanceContext } from '../context/FreelanceContext';

export const NewTask = () => {

    const {onCreateTask, onGetTask, onUpdateTask} = useFreelanceContext();
    const [task, setTask] = useState({
        title: '',
        description: ''
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadTask = async () => {
            if(params.id) {
                const task = await onGetTask(params.id);
                setTask({
                    title: task.title,
                    description: task.description
                });
            }
        }
        loadTask();
    }, [])

    return (
        <Formik
            initialValues={task}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
                if(params.id) {
                    await onUpdateTask(params.id, values);
                    navigate('/tasks');
                } else {
                    await onCreateTask(values);
                }
                setTask({
                    title: "",
                    description: "",
                });
            }}
        >
        {({handleChange, handleSubmit, values, isSubmitting}) => (
            <Form onSubmit={handleSubmit}>
                <p>{params.id ? 'Editando' : 'Creando'}</p>
                <ul>
                    <li>
                        <label>Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Titulo" 
                            onChange={handleChange}
                            value={values.title}
                        />
                    </li>
                    <li>
                        <label>Description</label>
                        <textarea 
                            name="description" 
                            rows="3" 
                            placeholder="Descripcion" 
                            onChange={handleChange}
                            value={values.description}
                        ></textarea>
                    </li>
                    <li>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando tarea" : "Crear tarea"}
                        </button>
                    </li>
                </ul>
            </Form>
        )}
        </Formik>
    )
}
