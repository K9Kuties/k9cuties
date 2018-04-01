import React, {Component} from 'react';
import Header from '../Header/Header';
import './DogCreated.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, getDog } from './../../ducks/users';

const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'yltloitx'

class DogCreated extends Component {
    constructor () {
        super()
        this.state = {
            mainPicture: ''
        }
        this.changePictureLeft = this.changePictureLeft.bind(this)
        this.changePictureRight = this.changePictureRight.bind(this)
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                this.setState({
                    mainPicture: res.data[0].img1
                })
            })
        })
    }

    changePictureLeft() {
        if (this.state.mainPicture === this.props.dog.img1) {
            this.setState({
                mainPicture: this.props.dog.img1
            })
        } else if (this.state.mainPicture === this.props.dog.img2) {
            this.setState({
                mainPicture: this.props.dog.img1
            })
        } else if (this.state.mainPicture === this.props.dog.img3) {
            this.setState({
                mainPicture: this.props.dog.img2
            })
        } else if (this.state.mainPicture === this.props.dog.img4) {
            this.setState({
                mainPicture: this.props.dog.img3
            })
        } else if (this.state.mainPicture === this.props.dog.img5) {
            this.setState({
                mainPicture: this.props.dog.img4
            })
        } else if (this.state.mainPicture === this.props.dog.img6) {
            this.setState({
                mainPicture: this.props.dog.img5
            })
        }
    }

    changePictureRight() {
        if (this.state.mainPicture === this.props.dog.img1) {
            this.setState({
                mainPicture: this.props.dog.img2
            })
        } else if (this.state.mainPicture === this.props.dog.img2) {
            this.setState({
                mainPicture: this.props.dog.img3
            })
        } else if (this.state.mainPicture === this.props.dog.img3) {
            this.setState({
                mainPicture: this.props.dog.img4
            })
        } else if (this.state.mainPicture === this.props.dog.img4) {
            this.setState({
                mainPicture: this.props.dog.img5
            })
        } else if (this.state.mainPicture === this.props.dog.img5) {
            this.setState({
                mainPicture: this.props.dog.img6
            })
        } else if (this.state.mainPicture === this.props.dog.img6) {
            this.setState({
                mainPicture: this.props.dog.img6
            })
        }
    }

    render(){
        return(
            <div className='dogCreatedMain'>
                <Header/>   
                <div className='awesome'>AWESOME! Your dog is all set up :)</div>
                <div className='photoContainer'>
                    <img className='dogImage' src={this.state.mainPicture}></img>
                    <div className='left_picture' onClick={this.changePictureLeft} ></div>
                    <div className='right_picture' onClick={this.changePictureRight} ></div>
                    <div className='nameAndSettings'>
                            <div className='dogCreatedName'>{this.props.dog.name}</div>
                            <div className='dogCreatedAge'>{this.props.dog.age}</div>
                            <div className='dogCreatedBreed'>{this.props.dog.breed}</div> 
                            <div className='dogCreatedGender'>{this.props.dog.gender}</div>
                            
                    </div>
                </div>
                <div className='dogDescContainer'>
                    <div className='dogDesc'>{this.props.dog.description}</div>
                </div>
                <Link to='/swiping'><button className='dogCreatedFinish'>Finish</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog
    }
}

export default connect(mapStateToProps, { getUser, getDog })(DogCreated);