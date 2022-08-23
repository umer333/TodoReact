
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import {events} from "./tasks";

import LoginValidate from "../services/validateLogin";
import React, {useRef, useState} from "react";
import {get_tasks, add_tasks, get_task, delete_task, update_task} from "../services/apisList";
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";


const TasksCalender =  () => {

    LoginValidate()

    const title_ref = useRef(null);
    const start_time_ref = useRef(null);
    const end_time_ref = useRef(null)
    const description_ref = useRef(null)

    const navigate=useNavigate()

    const [currentId, setCurrentID] = useState(false)
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [showButtons, setShowButton ] = useState(false);
     const [event, setEvent] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async (props) => {
        setShow(true);
        setValidated(false);
        if (props?.event){
            const task = await get_task(props?.event.id)
            setShowButton(true)

            let body = task.data.body
            title_ref.current.value = body.title
            description_ref.current.value = body.description
            end_time_ref.current.value = body.end_time
            start_time_ref.current.value = body.start_time
            setCurrentID(body.id)
            setInputs(body)
        }
        else {
            setShowButton(false)
        }
    }

    function logout(){
        localStorage.removeItem('token')
        navigate('/login')
    }

    async function saveTask(){

        if(inputs.title?.length > 1 && inputs.start_time?.length > 1 && inputs.end_time?.length > 1 ){
            handleClose()
        const result = await add_tasks(inputs.title, inputs.start_time, inputs.end_time, inputs.description)
        if(result.data.status===201){
            toast.success("Task saved successfully")


            let resp = await get_tasks(startDate, endDate)
            setEvent(await events(resp.data.body));
            setValidated(false);
        }
        else {
            if(result.message) {
                toast.error(result.message)
            }else {
                toast.error("Task not saved.")
            }
        }
        }
        else{
            setValidated(true)
            toast.dismiss();
            toast.error("All Fields are required")

        }

    }

    async function updateTask(){
        const update_response = await update_task(currentId, inputs.title, inputs.start_time, inputs.end_time, inputs.description)
        if(update_response.data.status===200){
            toast.dismiss()
            toast("Data updated successfully")

            let resp = await get_tasks(startDate, endDate)
            setEvent(await events(resp.data.body));
            setValidated(false);
            handleClose();

        }
        else {
            handleClose();
            toast.error("Error in updating task")
        }

    }

    async function deleteTask(){
        handleClose();
        const deleted_task = await delete_task(currentId)
        if(deleted_task.data.status === 202){
            toast.dismiss()
            toast.warning('Task deleted successfully')
            setValidated(false);
            let resp = await get_tasks(startDate, endDate)
            setEvent(await events(resp.data.body));

        }
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
    }
     async function handleMonthChange(payload) {

         setStartDate(payload.startStr)
         setEndDate(payload.endStr)
         let resp = await get_tasks(payload.startStr, payload.endStr)
         console.log("ss",resp.data.body)
         setEvent(await events(resp.data.body));
    }

    return(
        <section className="vh-100" style={{ backgroundColor: `#gray`, paddingTop: 100 }}>
            <i className="fa fa-sign-out signout" id="sign-out" title="log-out" onClick={logout}></i>
            <div className="container py-5 justify-content-center" style={{ minHeight: 600 }}>
                <FullCalendar
                    defaultView="dayGridMonth"
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    events={event}
                    headerToolbar={{
                        left: "prev,next,today",
                        center: "title",
                        right: "add"
                    }}
                    customButtons={{
                      add: {
                        text: 'Add new task',
                        click: () => handleShow()
                      }
                    }}
                    eventClick={handleShow}
                    displayEventEnd={true}
                    datesSet={handleMonthChange}
                />
                <ToastContainer />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="taskTitle">
                            <Form.Control type="input" placeholder="Title" name="title"  onChange={handleChange} ref={title_ref} autoFocus required />
                            <Form.Control.Feedback type="invalid">
                                Task title is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="startTime">
                            <Form.Control type="datetime-local" name="start_time" onChange={handleChange} ref={start_time_ref} placeholder="Task start time" required/>
                            <Form.Control.Feedback type="invalid">
                                start time is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="endTime">
                            <Form.Control type="datetime-local" placeholder="Task end time" onChange={handleChange} ref={end_time_ref} name="end_time" required/>
                            <Form.Control.Feedback type="invalid">
                                end time is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Control as="textarea" rows={3} placeholder="Task description" onChange={handleChange} ref={description_ref} name="description" />
                            <Form.Control.Feedback type="invalid">
                                Task description is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    { !showButtons && <Button variant="primary" onClick={saveTask}>Save Task</Button>
                    }
                    {   showButtons && <Button variant="danger" onClick={deleteTask}>Delete</Button> }
                    {   showButtons && <Button variant="primary" onClick={updateTask}>Update</Button> }


                </Modal.Footer>
            </Modal>

        </section>
    )
}

export default TasksCalender;