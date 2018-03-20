import React, { Component } from "react"
import axios from 'axios'
// import './photos.css'
const CLOUDINARYURL = 'https://api.cloudinary.com/v1_1/gexcloud/image/upload'
, CLOUDINARY_UPLOAD_PRESET = 'yltloitx'
, imgPreview = document.getElementById('img-preview')

// , imgPreview.src = res.data.secure_url




export default class Photos extends Component{
    state = {
        selectedFile : null ,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPrzhteGnU1-ZtBpptPYj6pADjoSySX7sVSbinqQ9-O__QUhD'
        // imgPreview: img 
        // imgPreview.src: res.data.secure_url
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
                    url: res.data.secure_url
                })
              
            })  
        }, .1);
    
    }
    // fileUploadHandler = () => {
    //     const fd = new FormData()
    //     fd.append('file', this.state.selectedFile)
    //     fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET )
    //     axios({
    //         url: CLOUDINARYURL,
    //         method: 'POST',
    //         headers:{
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         data: fd
    //     }).then((res)=>{
    //         console.log(res)
    //         this.setState({
    //             url: res.data.secure_url
    //         })
          
    //     })
    // }
    render() {
        return (
            <div>
                <img  src={this.state.url} id='img-preview' className='dogPics'/> 
                <label htmlFor='file-upload' className='file-upload-container'>
                +
                    <input type='file'onChange={this.fileSelectedHandler} style={{display:'none'}} id='file-upload'/>
                </label>
                {/* <input type='file'  onChange={this.fileSelectedHandler}/> */}
                
                {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
            </div>
        )
    }
}