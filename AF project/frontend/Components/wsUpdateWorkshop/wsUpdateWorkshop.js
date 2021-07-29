import React from "react";
import axios from "axios";
import WHeader from "../WorkShopHeader/workshopHeader";

const initialState = {
  wsName: "",
  wsDate: "",
  wsDescription: "",
  wsPresentorName: "",
  wsPresentorDetails: "",
};

class wsUpdateWorkshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/workshops/getws/${this.props.match.params.id}`
      )
      .then((response) => {
        // console.log(response.data.wsName);
        this.setState({ wsName: response.data.wsName });
        this.setState({ wsDate: response.data.wsDate });
        this.setState({ wsDescription: response.data.wsDescription });
        this.setState({ wsPresentorName: response.data.wsPresentorName });
        this.setState({
          wsPresentorDetails: response.data.wsPresentorDescription,
        });
        //console.log("Data - ", response.data);
      })
      .catch((error) => {
        console.log("Error - ", error.message);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let workshop = {
      wsName: this.state.wsName,
      wsDate: this.state.wsDate,
      wsDescription: this.state.wsDescription,
      wsPresentorName: this.state.wsPresentorName,
      wsPresentorDescription: this.state.wsPresentorDetails,
    };

    axios
      .put(
        `http://localhost:5000/workshops/updatews/${this.props.match.params.id}`,
        workshop
      )
      .then((response) => {
        alert("Workshop updated sucessfully !");
      })
      .catch((error) => {
        alert("ERROR - Data didnt send");
        console.log("Error - ", error.message);
      });
  }

  render() {
    return (
      <div>
        <WHeader />
        <div className="container">
          <h1>Update Workshop</h1>
          <br /> <br />
          <p>Enter the data that you want to update</p>
          <form onSubmit={this.onSubmit}>
            <div className="mb-3">
              <label className="form-label">Workshop Name</label>
              <input
                value={this.state.wsName}
                type="text"
                className="form-control"
                name="wsName"
                onChange={this.onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                value={this.state.wsDate}
                type="date"
                className="form-control"
                name="wsDate"
                onChange={this.onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                value={this.state.wsDescription}
                type="text"
                className="form-control"
                name="wsDescription"
                onChange={this.onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Workshop Presentor</label>
              <input
                value={this.state.wsPresentorName}
                type="text"
                className="form-control"
                name="wsPresentorName"
                onChange={this.onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Presentor's Description</label>
              <textarea
                value={this.state.wsPresentorDetails}
                type="text"
                className="form-control"
                name="wsPresentorDetails"
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default wsUpdateWorkshop;
