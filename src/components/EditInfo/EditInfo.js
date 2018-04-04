import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import edit from '../../edit.svg';
import dogicon from '../../dog_icon.png';
import PawLogo from '../../paw.svg';
import { connect } from 'react-redux';
import { addImage, removeImage, editDogDeets, getUser, getDog } from './../../ducks/users';
import './EditInfo.css'
import BackArrow from '../../back-arrow.svg';
import cancelButton from '../../cancel-button.svg';


const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
    , CLOUDINARY_UPLOAD_PRESET = 'yltloitx'
    , imgPreview = document.getElementById('img-preview')

class EditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            img1: 'http://i68.tinypic.com/2z8pzwh.png',
            img2: 'http://i63.tinypic.com/talyqt.png',
            img3: 'http://i63.tinypic.com/talyqt.png',
            img4: 'http://i63.tinypic.com/talyqt.png',
            img5: 'http://i63.tinypic.com/talyqt.png',
            img6: 'http://i63.tinypic.com/talyqt.png',
            name: '',
            breed: '',
            birthdate: '',
            gender: '',
            description: ''
        }
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                for (var key in res.data[0]) {
                    if (res.data[0][key]) {
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
        this.props.editDogDeets(this.props.dog.dog_id, this.state.name, this.state.breed, this.state.birthdate, this.state.gender, this.state.description)
        this.setState({
            name: this.state.name,
            breed: this.state.breed,
            birthdate: this.state.birthdate,
            gender: this.state.gender,
            description: this.state.description
        })
    }

    cancel() {
        this.setState({
            name: this.props.dog.name,
            breed: this.props.dog.breed,
            birthdate: this.props.dog.birthdate,
            gender: this.props.dog.gender,
            description: this.props.dog.description
        })
    }

    render() {
        return (
            <div className='editInfo1'>
                <header className='edit_info_header' >
                    <Link to='/profile' ><img src={BackArrow} className='dog_icon' alt='dog_icon' /></Link>
                    <h3 className='edit_info_header_logo' >Edit Profile</h3>
                    <Link to='/swiping' ><img src={PawLogo} className='paw_logo' alt='paw_icon' /></Link>
                </header>

                <div className='edit_info_images' >


                    <div className='image1_image2_image3' >
                        <div className='image1'>
                            <img src={cancelButton} value='img1' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this photo?')) { this.props.removeImage(this.props.dog.dog_id, 1); this.setState({ img1: 'http://i68.tinypic.com/2z8pzwh.png' }) } }} className='remove_photo_one' />
                            <label htmlFor='file-upload1' className='file-upload-container1'>
                                <img src={this.state.img1} id='img-preview' className='dogPics11' alt='Dog Pics' />
                                <input type='file' onChange={(event) => this.fileSelectedHandler(1, event)} style={{ display: 'none' }} id='file-upload1' />
                            </label>
                        </div>


                        <div className='image2_image3' >
                            <div className='image2'>
                                <img src={cancelButton} value='img2' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this photo?')) { this.props.removeImage(this.props.dog.dog_id, 2); this.setState({ img2: 'http://i68.tinypic.com/2z8pzwh.png' }) } }} className='remove_photo' />
                                <label htmlFor='file-upload2' className='file-upload-container2'>
                                    <img src={this.state.img2} id='img-preview' className='dogPics22' alt='Dog Pics' />
                                    <input type='file' onChange={(event) => this.fileSelectedHandler(2, event)} style={{ display: 'none' }} id='file-upload2' />
                                </label>
                            </div>

                            <div className='image3'>
                                <img src={cancelButton} value='img3' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this photo?')) { this.props.removeImage(this.props.dog.dog_id, 3); this.setState({ img3: 'http://i68.tinypic.com/2z8pzwh.png' }) } }} className='remove_photo' />
                                <label htmlFor='file-upload3' className='file-upload-container2'>

                                    <img src={this.state.img3} id='img-preview' className='dogPics33' alt='Dog Pics' />
                                    <input type='file' onChange={(event) => this.fileSelectedHandler(3, event)} style={{ display: 'none' }} id='file-upload3' />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='image4'>
                        <img src={cancelButton} value='img4' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this photo?')) { this.props.removeImage(this.props.dog.dog_id, 4); this.setState({ img4: 'http://i68.tinypic.com/2z8pzwh.png' }) } }} className='remove_photo' />
                        <label htmlFor='file-upload4' className='file-upload-container3'>

                            <img src={this.state.img4} id='img-preview' className='dogPics44' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(4, event)} style={{ display: 'none' }} id='file-upload4' />
                        </label>
                    </div>

                    <div className='image5'>
                        <img src={cancelButton} value='img5' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this photo?')) { this.props.removeImage(this.props.dog.dog_id, 5); this.setState({ img5: 'http://i68.tinypic.com/2z8pzwh.png' }) } }} className='remove_photo' />
                        <label htmlFor='file-upload5' className='file-upload-container3'>

                            <img src={this.state.img5} id='img-preview' className='dogPics55' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(5, event)} style={{ display: 'none' }} id='file-upload5' />
                        </label>
                    </div>

                    <div className='image6'>
                        <img src={cancelButton} value='img6' onClick={(e) => { if (window.confirm('Are you sure you wish to delete this photo?')) { this.props.removeImage(this.props.dog.dog_id, 6); this.setState({ img6: 'http://i68.tinypic.com/2z8pzwh.png' }) } }} className='remove_photo' />
                        <label htmlFor='file-upload6' className='file-upload-container2'>

                            <img src={this.state.img6} id='img-preview' className='dogPics66' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(6, event)} style={{ display: 'none' }} id='file-upload6' />
                        </label>
                    </div>
                </div>


                <div className='editInfo2'>
                    <div className='nameInput'>
                        NAME: <input type='text' className='name_input' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className='breedInput'>
                        Breed: <input type='text' className='breed_input' value={this.state.breed} onChange={(e) => this.setState({ breed: e.target.value })} />
                    </div>
                    <div className='ageInput'>
                        Birthdate: <input type="date" min='1998-01-01' className='age_input' value={this.state.birthdate} onChange={(e) => this.setState({ birthdate: e.target.value })} />
                    </div>
                    <div className='genderInput'>
                        GENDER: <input type='text' className='gender_input' value={this.state.gender} onChange={(e) => this.setState({ gender: e.target.value })} />
                    </div>
                    <div>
                        Description: <input type='text' className='description_input' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </div>
                    <button  className='edit_info_cancel_button' onClick={this.cancel}>Cancel</button>
                    <button className='edit_info_save_button' onClick={this.save}>Save</button>
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

export default connect(mapStateToProps, { addImage, removeImage, editDogDeets, getUser, getDog })(EditInfo);