import React, { Component, Fragment } from 'react';
import Container from '../../../shared/container/container'
import Select, { components } from 'react-select'
import Axios from 'axios';
import {
    SEARCH_BY_ID_USER_REQUEST,
    SEARCH_USER_REQUEST, BASE_PROCEDURES_URL,
} from '../../../shared/rest_end_points';
import { connect } from "react-redux";
import { notify, set_active_page, load_todays_appointments, clear_todays_appointments } from '../../../actions';
import { Link, withRouter } from 'react-router-dom';
import './todays_patient.css';
import { BASE_URL } from '../../../shared/router_constants';
import moment from 'moment';
import ProcedureModal from './procedures/procedure_modal';
import InvoiceModal from './invoice/invoice';
import TodaysPatientRow from './todays_patient_row';
import UserPreviewModal from '../../../shared/modals/userpreviewmodal';
import Loading from '../../../shared/customs/loading/loading';
import NewAppointmentModal from './appointment/new_appointment_modal';
import { Popup } from "semantic-ui-react";
import { PATIENT_VISIT_STATUSES } from '../../../shared/constant_data';
import DateTimePicker from 'react-datetime';


class Todayspatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            filtered_data: null,

            doctors: [],
            patients: [],

            new_appointment_modal_visibility: false,
            procedure_visibility: false,
            prev_procedure_list: [],
            user_preview_modal_visibility: false,
            new_patient_modal_visibility: false,
            invoice_modal_visibility: false,

            user_modal_props: null,
            invoice_data: null,
            appointment_invoice_id: '',
            procedure_appointment_id: null,
            search_doctor: { value: '' },
            search_patient: { value: '' },
            search_status: { value: '' },
            search_date: { value: moment(new Date()).format('ll') }
        }
    }

    componentDidMount() {
        const routes = [<Link to={BASE_URL} className="breadcrumb-item">
            <i className="icon-user mr-2"></i>
            Reception
        </Link>, <span className="breadcrumb-item active">Today's Patient</span>]
        this.props.set_active_page(routes)
        if (localStorage.getItem('Gh65$p3a008#2C')) {
            this.setState({ search_date: { value: localStorage.getItem('Gh65$p3a008#2C') } }, () => this.props.load_todays_appointments(this.state.search_date.value))
        } else {
            this.props.load_todays_appointments(this.state.search_date.value)
            localStorage.setItem('Gh65$p3a008#2C', this.state.search_date.value)
        }

    }

    async request(_data, _url, _method = "post") {
        try {
            if (_method === 'post') {
                return await Axios.post(_url, _data)
            }
            else if (_method === 'get') {
                return await Axios.get(_url)
            }
        }
        catch (err) {
            this.props.notify('error', '', 'Server is not responding! Please try again later')
            return null
        }
    }

    async render_users(string, role) {

        const query = `${SEARCH_USER_REQUEST}?search=${string}&role=${role}`
        const res_users = await this.request({}, query, 'get')
        let temp_users = []
        if (res_users.data['status']) {
            for (var i = 0; i < res_users.data.payload['count']; ++i) {
                const t_user = res_users.data.payload['users'][i]
                temp_users.push({
                    id: `${role.toLowerCase()}_selection`,
                    reference: t_user._id,
                    label: `${t_user.first_name} ${t_user.last_name} | ${t_user.phone_number} | ${t_user.email}`
                })
            }
            if (role === 'Patient') {
                this.setState({ patients: temp_users })
            }
            else if (role === 'Doctor') {
                this.setState({ doctors: temp_users })
            }
        }
    }

    populate_doctors = (string) => {
        if (string.length >= 1) {
            this.render_users(string, 'Doctor')
        }
        else {
            this.setState({ doctors: [] })
        }
    }

    populate_patient = (string) => {
        if (string.length >= 1) {
            this.render_users(string, 'Patient')
        }
        else {
            this.setState({ patients: [] })
        }
    }



    componentWillReceiveProps(new_props) {
        if (new_props.todays_patient) {
            this.setState({
                filtered_data: new_props.todays_patient.data,
                data: new_props.todays_patient.data
            })
        }
    }


    on_selected_changed = (e, actor) => {
        if (e !== null) {
            switch (e.id) {
                case 'location_selection':
                    this.setState({ user_blood_group: { value: e.label } })
                    break;
                case 'status_selection':
                    this.setState({ search_status: { value: e.label } })
                    break;
                case 'doctor_selection':
                    this.setState({ search_doctor: { value: e.reference } })
                    break;
                case 'patient_selection':
                    this.setState({ search_patient: { value: e.reference } })
                    break
                default:
                    break;
            }
        }
        else {
            switch (actor) {
                case 'location_selection':
                    this.setState({ user_blood_group: { value: '' } })
                    break;
                case 'status_selection':
                    this.setState({ search_status: { value: '' } })
                    break;
                case 'doctor_selection':
                    this.setState({ search_doctor: { value: '' } })
                    break;
                case 'patient_selection':
                    this.setState({ search_patient: { value: '' } })
                    break
                default:
                    break;
            }
        }
    }

    request_user = (id) => {
        this.setState({
            user_preview_modal_visibility: true
        }, () => {
            Axios.post(SEARCH_BY_ID_USER_REQUEST, {
                user_id: id
            }).then(res => {
                if (res.data.status === true) {
                    this.setState({
                        user_modal_props: res.data.payload.user
                    })
                }
            }).catch(err => {
                console.log('failed to fetch user')
            })
        })
    }
    renderDataInRows = (data) => {
        if (data === null) {
            return
        }
        return (data.map((booking, i) => {
            console.log('booking', booking)
            // var random_color = classNameColors[Math.floor(Math.random() * classNameColors.length)]
            const hidden_data = {
                appointment_description: booking.appointment_description
            }
            return (
                <TodaysPatientRow
                    key={i}
                    row_data={booking}
                    hidden_data={hidden_data}
                    open_procedure_modal={this.openProcedureModalHandler}
                    open_invoice_modal={this.openInvoiceModalHandler}
                    open_user_view_modal={this.request_user}
                    columns="8" />
            )
        }))
    }

    openProcedureModalHandler = (id) => {
        this.setState({ procedure_visibility: true }, () => {
            try {

                let response = Axios.post(`${BASE_PROCEDURES_URL}`, { appointment_id: id }, {
                    headers: { 'code-medicine': localStorage.getItem('user') }
                });
                response.then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            prev_procedure_list: response.data.payload,
                            procedure_appointment_id: id,
                            invoiceVisitId: 0
                        });
                    }
                    else {
                        this.props.notify('error', '', response.data.message)
                    }
                });
            }
            catch (err) {
                this.props.notify('error', '', 'Server is not responding! Please try again later');
            }
        });
    };
    closeProcedureModalHandler = (type) => {
        this.setState({ procedure_visibility: false, prev_procedure_list: [], data: null })
    };

    invoiceVisitIdHandler = (value) => {
        this.setState({ invoiceVisitId: value });
    };

    UpdateProcedureListHandler = (updateProcedureList) => {
        this.setState({ prevProcedureList: updateProcedureList });
    };

    open_new_appointment_modal = () => {
        this.setState({ new_appointment_modal_visibility: true })
    };
    openInvoiceModalHandler = (object) => {
        this.setState({ invoice_modal_visibility: true, appointment_invoice_id: object })
    };
    closeInvoiceModalHandler = () => {
        this.setState({ invoice_modal_visibility: false })
    };

    close_new_appointment_modal = () => {
        this.setState({ new_appointment_modal_visibility: false })
    };

    call_back_new_appointment_modal = () => {
        this.setState({ new_appointment_modal_visibility: false, data: null })
    };

    set_filters = () => {
        this.setState({ filtered_data: null }, () => {
            /**
             * P D S
             * ---------
             * 0 0 0 - 1
             * 0 0 1 - 2
             * 0 1 0 - 3
             * 0 1 1 - 4
             * 1 0 0 - 5
             * 1 0 1 - 6
             * 1 1 0 - 7
             * 1 1 1 - 8
             */

            const search_with_patients = this.state.search_patient.value !== '';
            const search_with_doctors = this.state.search_doctor.value !== '';
            const search_with_status = this.state.search_status.value !== '';

            // console.log('search state', search_with_patients, search_with_doctors, search_with_status)

            const temp = []
            for (let i = 0; i < this.state.data.length; ++i) {
                // console.log(this.state.search_patient.value, this.state.data[i].patient.id)
                // 0 0 1
                if (!search_with_patients && !search_with_doctors && search_with_status) {
                    if (this.state.search_status.value.toLowerCase() === this.state.data[i].appointment_status.info) {
                        temp.push(this.state.data[i])
                    }
                }
                // 0 1 0
                else if (!search_with_patients && search_with_doctors && !search_with_status) {
                    if (this.state.search_doctor.value === this.state.data[i].doctor.id) {
                        temp.push(this.state.data[i])
                    }
                }
                // 0 1 1
                else if (!search_with_patients && search_with_doctors && search_with_status) {
                    if (this.state.search_doctor.value === this.state.data[i].doctor.id &&
                        this.state.search_status.value.toLowerCase() === this.state.data[i].appointment_status.info) {
                        temp.push(this.state.data[i])
                    }
                }
                // 1 0 0
                else if (search_with_patients && !search_with_doctors && !search_with_status) {
                    if (this.state.search_patient.value === this.state.data[i].patient.id) {
                        temp.push(this.state.data[i])
                    }
                }
                // 1 0 1
                else if (search_with_patients && !search_with_doctors && search_with_status) {
                    if (this.state.search_patient.value === this.state.data[i].patient.id &&
                        this.state.search_status.value.toLowerCase() === this.state.data[i].appointment_status.info) {
                        temp.push(this.state.data[i])
                    }
                }
                // 1 1 0
                else if (search_with_patients && search_with_doctors && !search_with_status) {
                    if (this.state.search_patient.value === this.state.data[i].patient.id &&
                        this.state.search_doctor.value === this.state.data[i].doctor.id) {
                        temp.push(this.state.data[i])
                    }
                }
                // 1 1 1
                else if (search_with_patients && search_with_doctors && search_with_status) {
                    if (this.state.search_patient.value === this.state.data[i].patient.id &&
                        this.state.search_doctor.value === this.state.data[i].doctor.id &&
                        this.state.search_status.value.toLowerCase() === this.state.data[i].appointment_status.info) {
                        temp.push(this.state.data[i])
                    }
                }
            }
            let reset_check = true;
            ['search_patient', 'search_doctor', 'search_status'].map((item, i) => {
                if (this.state[item].value !== '') {
                    reset_check = false;
                    this.setState({ filtered_data: temp })
                }
                return '';
            })
            if (reset_check)
                this.setState({ filtered_data: this.state.data })
        })

    }

    todays_date_change = (e) => {
        if (e === '') {
            this.setState({ search_date: { value: '' } })
        }
        else {
            var configured_date = null;
            try {
                configured_date = e.format('ll');
                this.props.clear_todays_appointments()
                this.props.load_todays_appointments(configured_date)
                localStorage.setItem('Gh65$p3a008#2C', configured_date)
            }
            catch (err) {
                configured_date = ''
            }
            finally {
                this.setState({ search_date: { value: configured_date } })
            }
        }
    }


    render() {
        var table = <Loading size={150} />
        if (this.state.filtered_data != null) {
            if (this.state.filtered_data.length > 0) {
                table = <Fragment>

                    <div className="table-responsive mt-2 card mb-0 pb-0">
                        <table className="table table-hover mb-0">
                            <tbody>
                                {
                                    this.renderDataInRows(this.state.filtered_data)
                                }
                            </tbody>
                        </table>
                    </div>
                </Fragment>

            }
            else {
                table = <div className="alert alert-info mt-2" style={{ marginBottom: '0px' }}>
                    <strong>Info!</strong> No Appointments found.
                </div>;
            }
        }


        const Menu = props => {
            return (
                <components.Menu {...props} >
                    <div className={`bg-light text-teal-400`} style={{ width: '400px' }}>
                        {props.children}
                    </div>
                </components.Menu>
            );
        };

        const filters = <div className="row">
            <div className="col-md-10">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="font-weight-semibold">Doctors</label>
                            <Select
                                id="doctor_selection"
                                isClearable
                                components={{ Menu }}
                                menuPlacement="auto"
                                options={this.state.doctors}
                                classNamePrefix={`form-control`}
                                placeholder="Search Doctor"
                                onInputChange={e => this.populate_doctors(e)}
                                onChange={e => this.on_selected_changed(e, "doctor_selection")}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="font-weight-semibold">Patients</label>
                            <Select
                                id="patient_selection"
                                isClearable
                                components={{ Menu }}
                                menuPlacement="auto"
                                options={this.state.patients}
                                classNamePrefix={`form-control`}
                                placeholder="Search Patient"
                                onInputChange={e => this.populate_patient(e)}
                                onChange={e => this.on_selected_changed(e, "patient_selection")}
                            />
                        </div>
                    </div>

                    <div className={`col-md-4`}>

                        <div className="form-group">
                            <label className="font-weight-semibold">Status</label>
                            <Select
                                isClearable
                                options={PATIENT_VISIT_STATUSES}
                                placeholder="Status"
                                onChange={e => this.on_selected_changed(e, "status_selection")}
                                onClick={() => console.log('visit status')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-2 d-flex justify-content-center align-items-end mb-2 pb-2">

                <Popup
                    trigger={
                        <button
                            type="button"
                            className="btn btn-dark btn-icon mr-1 "
                            style={{ textTransform: "inherit" }}
                            onClick={this.set_filters}
                        >
                            <i className="icon-filter4"></i>

                        </button>}
                    content={
                        <div className={`card card-body bg-dark text-white shadow mb-1 py-1`}>
                            Filter records
                        </div>
                    }
                    flowing
                    // hoverable
                    position='top center'
                />

                <Popup
                    trigger={
                        <button
                            type="button"
                            className="btn bg-teal-400 btn-icon mr-1 btn-block"
                            style={{ textTransform: "inherit" }}
                            onClick={this.open_new_appointment_modal}>
                            <b><i className="icon-plus3"></i></b>
                        </button>}
                    content={
                        <div className={`card card-body bg-teal-400 text-white shadow mb-1 py-1`}>
                            New Appointment
                        </div>
                    }
                    flowing
                    // hoverable
                    position='top center'
                />

            </div>
        </div>

        const table_header = <div className="table-header-background shadow-sw">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center">
                    <span className="text-white">Patients list for date</span>
                    <span className="badge badge-secondary ml-2 d-none d-lg-block">
                        {this.state.search_date.value}
                    </span>
                </div>
                <div className="col-lg-3 d-none d-lg-block col-0"></div>
                <div className="col-lg-3 col-md-6 col-12 d-flex">
                    <DateTimePicker id="dob_text_input"
                        onChange={this.todays_date_change}
                        className="clock_datatime_picker "
                        inputProps={{
                            placeholder: 'Select Date',
                            width: '100%',
                            className: `form-control bg-teal-400 border-teal-400`
                        }}
                        input={true}
                        dateFormat={'ll'}
                        timeFormat={false}
                        closeOnSelect={true}
                        value={this.state.search_date.value}

                        onClick={() => console.log('date select', this.state.search_date.value)}
                    />
                    <button className="btn bg-teal-400 border-teal-400 text-teal-400 btn-sm ml-2" onClick={() => {
                        this.props.clear_todays_appointments()
                        this.props.load_todays_appointments(localStorage.getItem('Gh65$p3a008#2C'))
                    }}>
                        <i className="icon-search4" />
                    </button>
                </div>
            </div>
        </div>

        return (
            <Container container_type="todayspatient">
                {/* filters panel */}
                {filters}
                {table_header}
                {/* table of todays appointments */}
                {this.props.todays_patient.loading === true ? <Loading size={150} /> : table}

                {/* Add new appointment modal */}
                <NewAppointmentModal
                    visibility={this.state.new_appointment_modal_visibility}
                    close={this.close_new_appointment_modal}
                    call_back={this.call_back_new_appointment_modal}
                    bind_function={this.open_new_appointment_modal}
                    state={'new'} />

                <ProcedureModal
                    new_procedure_visibility={this.state.procedure_visibility}
                    appointment_id={this.state.procedure_appointment_id}
                    prev_procedure_list={this.state.prev_procedure_list}
                    updateProcedureList={this.UpdateProcedureListHandler}
                    procedure_backDrop={this.closeProcedureModalHandler}
                    cancelProcedureModal={this.closeProcedureModalHandler}
                />

                <InvoiceModal
                    modal_visibility={this.state.invoice_modal_visibility}
                    appointment_id={this.state.appointment_invoice_id}
                    close_modal={this.closeInvoiceModalHandler}
                />

                <UserPreviewModal visibility={this.state.user_preview_modal_visibility}
                    modal_props={this.state.user_modal_props}
                    on_click_back_drop={() => this.setState({ user_preview_modal_visibility: false, user_modal_props: null })}
                    on_click_cancel={() => this.setState({ user_preview_modal_visibility: false, user_modal_props: null })} />
            </Container>
        )
    }
}
function map_state_to_props(state) {
    return {
        notify: state.notify,
        todays_patient: state.todays_patient
    }
}
export default connect(map_state_to_props, { notify, set_active_page, load_todays_appointments, clear_todays_appointments })(withRouter(Todayspatient));