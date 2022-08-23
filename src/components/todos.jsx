import Table from 'react-bootstrap/Table';
import ValidateLogin from "../services/validateLogin";

const Todos = () => {

    ValidateLogin()

    return(
        <section className="vh-100" style={{ backgroundColor: `#gray`, paddingTop: 100 }}>
            <i className="fa fa-sign-out signout" id="sign-out" title="log-out" ></i>
            <div className="container py-5" style={{ minHeight: 600 }}>
                <h4 className="mb-3 text-secondary justify-content-center">Todos List</h4>
                <Table>
                    <thead>
                        <tr>
                            <td> #</td>
                            <td> Task Name</td>
                            <td> Task Added Time</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Test Task</td>
                            <td>12-02-2022</td>
                            <td>No Actions</td>
                        </tr>
                    </tbody>
                </Table>
                {/*<DatePicker disablePreviousDays />*/}
                {/*<div>{pickedDates.firstPickedDate?.toString()}</div>*/}




            </div>
        </section>
    )
}
export default Todos;