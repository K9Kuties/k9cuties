import React, { Component } from "react";
import axios from 'axios';
import './UploadImage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProfileImage } from './../../ducks/users';
import Header from '../Header/Header';

const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
    , CLOUDINARY_UPLOAD_PRESET = 'yltloitx'
    , imgPreview = document.getElementById('img-preview');

class Photos extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: null,
            url: 'https://st.depositphotos.com/1798678/3986/v/950/depositphotos_39864187-stock-illustration-dog-silhouette-vector.jpg'
        }
    }

    fileSelectedHandler = event => {
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
                this.props.addProfileImage(this.props.dog.dog_id, res.data.secure_url)
                this.setState({
                    url: res.data.secure_url
                })
            })
        }, .1);
    }

    render() {

        console.log(this.props.dog)

        return (
            <div className='upload_image' >

                <Header />

                <h1 className='upload_image_h1' >Add a profile photo for your dog</h1>
                <h3 className='upload_image_h3' >(This will be their main photo)</h3>

                <img src={this.state.url} id='img-preview' className='dogPics' />
                <label htmlFor='file-upload' className='file-upload-container'>
                +
                <input type='file' onChange={this.fileSelectedHandler} style={{ display: 'none' }} id='file-upload' />
                </label>
                <Link to='/photospage'><button className='upload_image_next_button' >Next</button></Link>
                <Link to='/adddoginfo'><h5 className='upload_image_back_button' >Back</h5></Link>

                <div className='add_dog_info_dots' >
                    <div className='add_dog_info_dot_blue'></div>
                    <div className='add_dog_info_dot_grey'></div>
                    <div className='add_dog_info_dot_grey'></div>
                    <div className='add_dog_info_dot_grey'></div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog,
    }
}

export default connect(mapStateToProps, { addProfileImage })(Photos);