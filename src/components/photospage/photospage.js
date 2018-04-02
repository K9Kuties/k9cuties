import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './photospage.css';
import { connect } from 'react-redux';
import { addImage, submitDescription, getUser, getDog } from './../../ducks/users';
import Header from '../Header/Header';

const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
    , CLOUDINARY_UPLOAD_PRESET = 'yltloitx'
    , imgPreview = document.getElementById('img-preview');

class Photospage extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: null,
            url1: 'http://i63.tinypic.com/talyqt.png',
            url2: 'http://i63.tinypic.com/talyqt.png',
            url3: 'http://i63.tinypic.com/talyqt.png',
            url4: 'http://i63.tinypic.com/talyqt.png',
            url5: 'http://i63.tinypic.com/talyqt.png',
            url6: 'http://i63.tinypic.com/talyqt.png'
        }
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                this.setState({
                    url1: this.props.dog.img1
                })
            })
        })
    }

    fileSelectedHandler = (number, event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        setTimeout(() => {
            const fd = new FormData()
            fd.append('file', this.state.selectedFile)
            fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            axios({
                url: CLOUDINARYURL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: fd
            }).then((res) => {
                this.props.addImage(this.props.dog.dog_id, number, res.data.secure_url)
                this.setState({
                    ['url' + number]: res.data.secure_url,
                })
            })
        }, .1);
    }
    render() {

        return (
            <div className='biggy'>

                <Header />

                <div className='textToDisplay'>
                    Add any additional images that you would like displayed
                </div>

                <div className='photospage_images'>

                    <div className='dogPics1_container' >

                        <label htmlFor='file-upload1' className='file-upload-container'>
                            <img src={this.state.url1} id='img-preview' className='dogPics1' alt='profile pics'  />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(1, event)} style={{ display: 'none' }} id='file-upload1' />
                        </label>
                    </div>
                    <div className='dogPics2_container'>

                        <label htmlFor='file-upload2' className='file-upload-container'>
                            <img src={this.state.url2} id='img-preview' className='dogPics2' alt='profile pics'  />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(2, event)} style={{ display: 'none' }} id='file-upload2' />
                        </label>
                    </div>
                    <div className='dogPics3_container'>

                        <label htmlFor='file-upload3' className='file-upload-container'>
                            <img src={this.state.url3} id='img-preview' className='dogPics3' alt='profile pics'  />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(3, event)} style={{ display: 'none' }} id='file-upload3' />
                        </label>
                    </div>
                    <div className='dogPics4_container'>

                        <label htmlFor='file-upload4' className='file-upload-container'>
                            <img src={this.state.url4} id='img-preview' className='dogPics4' alt='profile pics'  />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(4, event)} style={{ display: 'none' }} id='file-upload4' />
                        </label>
                    </div>
                    <div className='dogPics5_container'>

                        <label htmlFor='file-upload5' className='file-upload-container'>
                            <img src={this.state.url5} id='img-preview' className='dogPics5' alt='profile pics'  />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(5, event)} style={{ display: 'none' }} id='file-upload5' />
                        </label>
                    </div>
                    <div className='dogPics6_container'>

                        <label htmlFor='file-upload6' className='file-upload-container'>
                            <img src={this.state.url6} id='img-preview' className='dogPics6' alt='profile pics'  />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(6, event)} style={{ display: 'none' }} id='file-upload6' />
                        </label>
                    </div>

                </div>

                <Link to='/adddescription'><button onClick={this.submitDescription} className='photospage_next_button' >Next</button></Link>

                <div className='add_dog_info_dots' >
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_grey'></div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog
    }
}

export default connect(mapStateToProps, { addImage, submitDescription, getUser, getDog })(Photospage);