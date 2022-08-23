
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import {events} from "./tasks";

import LoginValidate from "../services/validateLogin";
import React, {useState} from "react";
import {get_tasks, add_tasks} from "../services/apisList";
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";


const TasksCalender =  () => {

    LoginValidate()

    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [event, setEvent] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [validated, setValidated] = useState(false);

    async function saveTask(){
        if(inputs.title?.length > 3 && inputs.start_time?.length > 3 && inputs.end_time?.length > 3 && inputs.description?.length > 3){
        const result = await add_tasks(inputs.title, inputs.start_time, inputs.end_time, inputs.description)
        if(result.data.status===201){
            toast.success("Task saved successfully")
            handleClose()
            let resp = await get_tasks(startDate, endDate)
            setEvent(await events(resp.data.body));
            console.log("data saved");
        }
        else {
            if(result.message) {
                toast.error(result.message)
                console.log("Error while saving task", result.message);
            }else {
                toast.error("Task not saved.")
            }
        }
        }
        else{
            toast.error("All Fields are required")
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
            <i className="fa fa-sign-out signout" id="sign-out" title="log-out" ></i>
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
                            <Form.Control type="input" placeholder="Title" name="title"  onChange={handleChange} autoFocus required />
                            <Form.Control.Feedback type="invalid">
                                Task title is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="startTime">
                            <Form.Control type="datetime-local" name="start_time" onChange={handleChange} placeholder="Task start time" required/>
                            <Form.Control.Feedback type="invalid">
                                start time is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="endTime">
                            <Form.Control type="datetime-local" placeholder="Task end time" onChange={handleChange} name="end_time" required/>
                            <Form.Control.Feedback type="invalid">
                                end time is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Control as="textarea" rows={3} placeholder="Task description" onChange={handleChange} name="description" required/>
                            <Form.Control.Feedback type="invalid">
                                Task description is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={saveTask} >Save Task</Button>
                </Modal.Footer>
            </Modal>

        </section>
    )
}

export default TasksCalender;