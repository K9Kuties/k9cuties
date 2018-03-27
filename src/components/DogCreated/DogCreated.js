import React, {Component} from 'react';
import Header from '../Header/Header';
import './DogCreated.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'yltloitx'

export default class DogCreated extends Component {
    state ={
        url1: 'http://cdn.skim.gs/images/c_fill,dpr_1.0,f_auto,fl_lossy,h_391,q_auto,w_695/fajkx3pdvvt9ax6btssg/20-of-the-cutest-small-dog-breeds-on-the-planet'
    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        setTimeout(() => {
            const fd = new FormData()
            fd.append('file', this.state.selectedFile)
            fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET )
            axios({
                url: CLOUDINARYURL,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: fd
            }).then((res)=>{
                console.log(res)
                this.setState({
                    url1: res.data.secure_url
                })
              
            })  
        }, 1);
    
    }
    render(){
        return(
            <div className='dogCreatedMain'>
                <Header/>   
                <div className='awesome'>AWESOME! Your dog is all set up :)</div>
                <div className='photoContainer'>
                    <img className='dogImage' src={this.state.url1}></img>
                    <div className='nameAndSettings'>
                            <div className='dogCreatedName'>DogName, Age</div>
                        <label htmlFor='file-upload' className='dogCreatedUploadContainer1'>
                        i
                            <input type='file'onChange={this.fileSelectedHandler} style={{display:'none'}} id='file-upload'/>
                        </label>
                    </div>
                </div>
                <div className='dogDescContainer'>
                    <div className='dogDesc'>This is my dog description and it is all about my dawg!! My dog is awesome and he is a very good boy!! I just love my dog and YOU WILL TOO! Trust me! I know! If not you kind of blow hard man</div>
                </div>
                <Link to='/swiping'><button className='dogCreatedFinish'>Finish</button></Link>
                <Link to='/adddescription'><button className='dogCreatedBack'>Back</button></Link>
            </div>
        )
    }
}