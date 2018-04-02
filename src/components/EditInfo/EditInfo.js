import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import edit from '../../edit.svg';
import dogicon from '../../dog_icon.png';
import PawLogo from '../../paw.svg';
import { connect } from 'react-redux';
import { addImage, editDogDeets, getUser, getDog } from './../../ducks/users';
import './EditInfo.css'
const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
    , CLOUDINARY_UPLOAD_PRESET = 'yltloitx'
    , imgPreview = document.getElementById('img-preview')

class EditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            img1: 'http://i67.tinypic.com/nd4dnl.jpg',
            img2: 'http://i67.tinypic.com/nd4dnl.jpg',
            img3: 'http://i67.tinypic.com/nd4dnl.jpg',
            img4: 'http://i67.tinypic.com/nd4dnl.jpg',
            img5: 'http://i67.tinypic.com/nd4dnl.jpg',
            img6: 'http://i67.tinypic.com/nd4dnl.jpg',
            name: '',
            breed: '',
            gender: '',
            description: ''
        }
        this.save = this.save.bind(this)
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                for (var key in res.data[0]) {
                    if (res.data[0][key]) {
                        console.log(res.data[0][key], key)
                        this.setState({
                            [key]: res.data[0][key]
                        })
                    }
                }
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
                    ['img' + number]: res.data.secure_url,

                })

            })
        }, .1);
    }

    save() {
        this.props.editDogDeets(this.props.dog.dog_id, this.state.name, this.state.breed, this.state.age, this.state.gender, this.state.description)
        this.setState({
            name: this.state.name,
            breed: this.state.breed,
            age: this.state.age,
            gender: this.state.gender,
            description: this.state.description
        })
    }

    render() {
        return (
            <div className='editInfo1'>
                <header className='edit_info_header' >
                    <Link to='/profile' ><img src={dogicon} className='dog_icon' alt='dog_icon' /></Link>
                    <img src={edit} className='edit_info_header_logo' alt='header logo' />
                    <Link to='/swiping' ><img src={PawLogo} className='paw_logo' alt='paw_icon' /></Link>
                </header>

                <h1 className='edit_profile_h1' >Edit Profile</h1>

                <div className='edit_info_images' >


                    <div className='image1_image2_image3' >
                        <div className='image1'>
                            <label htmlFor='file-upload1' className='file-upload-container1'>
                                <img src={this.state.img1} id='img-preview' className='dogPics1' alt='Dog Pics' />
                                <input type='file' onChange={(event) => this.fileSelectedHandler(1, event)} style={{ display: 'none' }} id='file-upload1' />
                            </label>
                        </div>


                        <div className='image2_image3' >
                            <div className='image2'>
                                <label htmlFor='file-upload2' className='file-upload-container2'>
                                    <img src={this.state.img2} id='img-preview' className='dogPics2' alt='Dog Pics' />
                                    <input type='file' onChange={(event) => this.fileSelectedHandler(2, event)} style={{ display: 'none' }} id='file-upload2' />
                                </label>
                            </div>

                            <div className='image3'>

                                <label htmlFor='file-upload3' className='file-upload-container2'>
                                    <img src={this.state.img3} id='img-preview' className='dogPics3' alt='Dog Pics' />
                                    <input type='file' onChange={(event) => this.fileSelectedHandler(3, event)} style={{ display: 'none' }} id='file-upload3' />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='image4'>
                        <label htmlFor='file-upload4' className='file-upload-container3'>
                            <img src={this.state.img4} id='img-preview' className='dogPics4' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(4, event)} style={{ display: 'none' }} id='file-upload4' />
                        </label>
                    </div>

                    <div className='image5'>
                        <label htmlFor='file-upload5' className='file-upload-container3'>
                            <img src={this.state.img5} id='img-preview' className='dogPics5' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(5, event)} style={{ display: 'none' }} id='file-upload5' />
                        </label>
                    </div>

                    <div className='image6'>
                        <label htmlFor='file-upload6' className='file-upload-container2'>
                            <img src={this.state.img6} id='img-preview' className='dogPics6' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(6, event)} style={{ display: 'none' }} id='file-upload6' />
                        </label>
                    </div>

                </div>

                    <div className='editInfo2'>
                        <div className='edit_info_inputs' >
                            <input type='text' className='name_input' name='name' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                            <hr className='edit_info_hr' />
                            <input type='text' className='breed_input' name='breed' value={this.state.breed} onChange={(e) => this.setState({ breed: e.target.value })} />
                            <hr className='edit_info_hr' />
                            <input type='text' className='age_input' name='age' value={this.state.age} onChange={(e) => this.setState({ age: e.target.value })} />
                            <hr className='edit_info_hr' />
                            <input type='text' className='gender_input' name='gender' value={this.state.gender} onChange={(e) => this.setState({ gender: e.target.value })} />
                            <hr className='edit_info_hr' />
                            <textarea type='text' className='description_input' name='description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} ></textarea>
                            <hr className='edit_info_hr' />
                        </div>
                        <button className='edit_info_save' onClick={this.save}>Save</button>
                    </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dog: state.dog,
        user: state.user
    }
}

export default connect(mapStateToProps, { addImage, editDogDeets, getUser, getDog })(EditInfo)