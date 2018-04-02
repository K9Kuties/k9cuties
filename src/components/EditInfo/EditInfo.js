import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import edit from '../../edit.svg';
import dogicon from '../../dog_icon.png';
import PawLogo from '../../paw.svg';
import { connect } from 'react-redux';
import { addImage, editDogDeets, getUser, getDog } from './../../ducks/users';
import './EditInfo.css'
import BackArrow from '../../back-arrow.svg';


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
            gender: '',
            description: '',
            edit: false,
            newName: '',
            newBreed: '',
            newBirthdate: '',
            newGender: '',
            newDescription: ''

        }
        this.save = this.save.bind(this)
    }

    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data.user);
            axios.get(`/api/getDog/${res.data.user.id}`).then(res => {
                this.props.getDog(res.data[0])
                for (var key in res.data[0]) {
<<<<<<< HEAD
                    if (res.data[0][key]) { 
                        console.log(res.data[0][key], key)
=======
                    if (res.data[0][key]) {
>>>>>>> master
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

    toggleEdit() {
        this.setState({
            newName: this.state.name,
            newBreed: this.state.breed,
            newBirthdate: this.state.birthdate,
            newGender: this.state.gender,
            newDescription: this.state.description,
            edit: !this.state.edit
        })
    }

    save() {
        this.props.editDogDeets(this.props.dog.dog_id, this.state.newName, this.state.newBreed, this.state.newBirthdate, this.state.newGender, this.state.newDescription)
        this.setState({
            edit: false,
            name: this.state.newName,
            breed: this.state.newBreed,
            birthdate: this.state.newBirthdate,
            gender: this.state.newGender,
            description: this.state.newDescription
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
                            <label htmlFor='file-upload1' className='file-upload-container1'>
                                <img src={this.state.img1} id='img-preview' className='dogPics11' alt='Dog Pics' />
                                <input type='file' onChange={(event) => this.fileSelectedHandler(1, event)} style={{ display: 'none' }} id='file-upload1' />
                            </label>
                        </div>


                        <div className='image2_image3' >
                            <div className='image2'>
                                <label htmlFor='file-upload2' className='file-upload-container2'>
                                    <img src={this.state.img2} id='img-preview' className='dogPics22' alt='Dog Pics' />
                                    <input type='file' onChange={(event) => this.fileSelectedHandler(2, event)} style={{ display: 'none' }} id='file-upload2' />
                                </label>
                            </div>

                            <div className='image3'>

                                <label htmlFor='file-upload3' className='file-upload-container2'>
                                    <img src={this.state.img3} id='img-preview' className='dogPics33' alt='Dog Pics' />
                                    <input type='file' onChange={(event) => this.fileSelectedHandler(3, event)} style={{ display: 'none' }} id='file-upload3' />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='image4'>
                        <label htmlFor='file-upload4' className='file-upload-container3'>
                            <img src={this.state.img4} id='img-preview' className='dogPics44' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(4, event)} style={{ display: 'none' }} id='file-upload4' />
                        </label>
                    </div>

                    <div className='image5'>
                        <label htmlFor='file-upload5' className='file-upload-container3'>
                            <img src={this.state.img5} id='img-preview' className='dogPics55' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(5, event)} style={{ display: 'none' }} id='file-upload5' />
                        </label>
                    </div>

                    <div className='image6'>
                        <label htmlFor='file-upload6' className='file-upload-container2'>
                            <img src={this.state.img6} id='img-preview' className='dogPics66' alt='Dog Pics' />
                            <input type='file' onChange={(event) => this.fileSelectedHandler(6, event)} style={{ display: 'none' }} id='file-upload6' />
                        </label>
                    </div>

                {(this.state.edit)
                ?
                <div className='editInfo2'>
                    <div className='nameInput'>
                        NAME: <input type='text' className='name_input' value={this.state.newName} onChange={(e) => this.setState({ newName: e.target.value })} />
                    </div>
                    <div className='breedInput'>
                        Breed: <input type='text' className='breed_input' value={this.state.newBreed} onChange={(e) => this.setState({ newBreed: e.target.value })} />
                    </div>
                    <div className='ageInput'>
                        Birthdate: <input type="date" min='1998-01-01' className='age_input' value={this.state.newBirthdate} onChange={(e) => this.setState({ newBirthdate: e.target.value })} />
                    </div>
                    <div className='genderInput'>
                        GENDER: <input type='text' className='gender_input' value={this.state.newGender} onChange={(e) => this.setState({ newGender: e.target.value })} />
                    </div>
                    <div>
                        Description: <input type='text' className='description_input' value={this.state.newDescription} onChange={(e) => this.setState({ newDescription: e.target.value })} />
                    </div>
                    <button onClick={this.save}>Save</button>
                </div>
                :
                <div className='editInfo2'>
                    <div className='nameInput'>
                        <div>NAME: {this.state.name}</div>
                    </div>
                    <div className='breedInput'>
                        <div>Breed: {this.state.breed}</div>
                    </div>
                    <div className='ageInput'>
                        <div>Birthdate: {this.state.birthdate}</div>
                    </div>
                    <div className='genderInput'>
                        <div>GENDER: {this.state.gender}</div>
                    </div>
                    <div>
                        <div>Description: {this.state.description}</div>
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

export default connect(mapStateToProps, { addImage, editDogDeets, getUser, getDog })(EditInfo);