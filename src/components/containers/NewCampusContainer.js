import { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { addCampusThunk } from "../../store/thunks";
import { NewCampusView } from "../views";

class NewCampusContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            description: "",
            imageUrl: "https://timesandtrendsacademy.com/wp-content/uploads/How-to-pick-the-best-fashion-designing-college-re850.jpg",
            redirect: false, 
            redirectId: null
        };
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleSubmit = async (e) => {
        e.preventDefault();
        let campus = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
        };

        let newCampus = await this.props.addCampus(campus);
        // console.log(newCampus)
        // let url = window.location.href;
        // url = url.substring(0, url.lastIndexOf("/"));
        // await this.props.addCampusThunk(campus);
        // window.location.href = url + "/campuses";

        this.setState({
            name: "", 
            address: "", 
            description: "", 
            imageUrl: "https://64.media.tumblr.com/4c62bf7c01d15c7655adeb8a36b9702d/e7531ecdce802bee-c9/s640x960/838eaa8ff68dc51c2b2a38a088767a9704130d58.jpg",
            redirect: true, 
            redirectId: newCampus.id
          });


    };

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        console.log(this.state.redirectId)
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
          <NewCampusView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);
