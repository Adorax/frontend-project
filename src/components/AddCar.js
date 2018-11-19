import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

class AddCar extends Component {
    constructor(props) {
        super(props);
        //this.addModal = React.createRef();
        this.state = { brand: '', model: '', year: '', color: '', fuel: '' };
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    // Save car and load cars and finally close modal
    handleSubmit = (event) => {
        event.preventDefault();
        let newCar = {brand: this.state.brand, model: this.state.model, color: this.state.color, year: this.state.year, fuel: this.state.fuel};
        this.props.addCar(newCar);
        this.props.loadCars();
        this.refs.simpleDialog.hide();
    }

    render() {
      // Add car page doesn't fit to default size modal
      const addCarDialog = {
        width: '70%',
        height: '450px',
        marginTop: '-300px',
        marginLeft: '-35%',
      };

      return (
        <div>
          <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={() => this.addModal.current.show()}><AddIcon /> New Car </Button>
          <SkyLight hideOnOverlayClicked dialogStyles={addCarDialog} ref={this.addModal} title="Hi, I'm a simple modal">
            <TextField id="brand" label="Brand" placeholder="Placeholder" margin="normal" name="brand"
              onChange={this.handleChange} value={this.state.brand} /><br></br>
            <TextField id="model" label="Model" placeholder="Model" margin="normal" name="model"
                onChange={this.handleChange} value={this.state.model} /><br></br>
            <TextField id="color" label="Color" placeholder="color" margin="normal" name="color"
                onChange={this.handleChange} value={this.state.color} /><br></br>
            <TextField id="year" label="Year" placeholder="Year" margin="normal" name="year"
                onChange={this.handleChange} value={this.state.year} /><br></br>
            <TextField id="fuel" label="Fuel" placeholder="Fuel" margin="normal" name="fuel"
                onChange={this.handleChange} value={this.state.fuel} /><br></br>
            <TextField id="price" label="Price" placeholder="Price" margin="normal" name="price"
                onChange={this.handleChange} value={this.state.price} /><br></br>
            <Button style={{ margin: 10 }} variant="contained" color="secondary" onClick={this.saveCar}><SaveIcon /> Save Car </Button>
          </SkyLight>

          <SkyLight dialogStyles={addCarDialog} hideOnOverlayClicked ref="simpleDialog">
                <div className="card" style={{"width": "95%"}}>
                <div className="card-body">
                <h5 className="card-title">New car</h5>
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Brand" className="form-control" name="brand" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Model" className="form-control" name="model" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Color" className="form-control" name="color" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Year" className="form-control" name="year" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Fuel" className="form-control" name="fuel" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </div>
                </form>
                </div>
                </div>
          </SkyLight>
          <div className="col-md-2">
              <button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New car</button>
          </div>
        </div>
      );
    }
}

export default AddCar;

/*
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});
*/
