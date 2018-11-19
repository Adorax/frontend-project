import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import {CSVLink, CSVDownload} from 'react-csv';
import AddCar from './AddCar';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';

class Carlist extends Component {

  constructor(props) {
    super(props);
    this.state = { cars: [], showSnackbar: false };
  }

  componentDidMount() {
    this.loadCars();
  }

  // Load cars from REST API
  loadCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        cars: responseData._embedded.cars,
      });
    })
  }

  // Create new car
  addCar(car) {
    fetch('https://carstockrest.herokuapp.com/cars',
    {   method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(car)
    })
    .then(res => this.loadCars())
    .catch(err => console.error(err))
  }

  // Delete car
  onDelClick = (idLink) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this?',
      confirmLabel: 'OK',
      cancelLabel: 'CANCEL',
      onConfirm: () => {
        fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCars())//this.setState({ showSnackbar: true })
        .catch(err => console.error(err))

        toast.success("Delete succeed", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
  }

  // Update car
  updateCar(car, link) {
    fetch(link,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(car)
    })
    .then(
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      })
    )
    .catch( err => console.error(err))
  }

  /*handleClose = (event, reason) => {
      this.setState({ showSnackbar: false });
  };*/

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cars];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ cars: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cars[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {

      const columns =[
        {
          accessor: "_links.self.href",
          show: false
        },
        {
          Header: "Brand",
          accessor: "brand",
          Cell: this.renderEditable
        },
        {
          Header: "Model",
          accessor: "model",
          Cell: this.renderEditable
        },
        {
          Header: "Year",
          accessor: "year",
          Cell: this.renderEditable
        },
        {
          Header: "Color",
          accessor: "color",
          Cell: this.renderEditable
        },
        {
          Header: "Fuel",
          accessor: "fuel",
          Cell: this.renderEditable
        },
        {
          Header: "Price €",
          accessor: "price",
          Cell: this.renderEditable
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 100,
          accessor: '_links.self.href',
          Cell: ({value, row}) => (<button className="btn btn-default btn-link" onClick={()=>{this.updateCar(row, value)}}>Save</button>)
        },
        {
          id: 'button',
          sortable: false,
          filterable: false,
          width: 100,
          accessor: '_links.self.href',
          Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
        }
      ]
        /*  Cell: ({ row, value }) => (
              <Tooltip title='Update' placement='right'>
                  <IconButton onClick={() => this.updateCar(row,value)} aria-label='update'>
                      <SaveIcon />
                  </IconButton>
              </Tooltip>
          )

          Cell: ({ value }) => (
              <Tooltip title='Delete' placement='right'>
                  <IconButton onClick={() => this.deleteCar(value)} aria-label='delete'>
                      <DeleteIcon />
                  </IconButton>
              </Tooltip>
          )*/

      return (
          <div className="App-body">
            <div className="row">
              <AddCar addCar={this.addCar} loadCars={this.loadCars} />
              <CSVLink style={{padding: 20}} data={this.state.cars}>Download CSV</CSVLink>
            </div>
            <ReactTable data={this.state.cars} columns={columns} filterable className="-highlight" defaultPageSize={10} />
            <Snackbar message='Car deleteeeed' open={this.state.showSnackbar} onClose={this.handleClose} autoHideDuration={3000} />
            <ToastContainer autoClose={2000}/>
            //Toast is teacher, Snackbar is ben
          </div>
      );
  }
}

export default Carlist;
