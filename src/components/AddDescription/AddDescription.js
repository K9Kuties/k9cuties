import React, {Component} from 'react'
import Header from '../Header/Header'
import './AddDescription.css'

export default class AddDescription extends Component {
    render(){
        return(
            <div className='descMain'>
                <div>
                    <Header/>
                </div>
                <div className='descDesc'>Add a description of your dog</div>
                <textarea name='text' className='descriptInput' placeholder='Example: Spike loves playing at the park and he loves long walks on the beach'/>
                <button className='nextBut'>Next</button>
                <button className='backBut'>Back</button>
            </div>
        )
    }
}