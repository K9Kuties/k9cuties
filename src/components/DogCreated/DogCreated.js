import React, {Component} from 'react';
import poochpals from '../../poochpals.svg';
import './DogCreated.css'


export default class DogCreated extends Component {
    render(){
        return(
            <div>
                <div className='dogCreatedHeader'>
                    <img src={poochpals} alt='PoochPals logo' className='logoDogCreated'/>
                </div>    
                <div className='awesome'>AWESOME! Your dog is all set up :)</div>
                <div className='photoContainer'>
                    <div className='dogImage'></div>
                    <div className='dogCreatedName'>DogName, Age</div>
                    <button className='dogCreatedSettings'>i</button>
                </div>
                <div className='dogDescContainer'>
                    <div className='dogDesc'>This is my dog description and it is all about my dawg!! My dog is awesome and he is a very good boy!! I just love my dog and YOU WILL TOO! Trust me! I know! If not you kind of blow hard man</div>
                </div>
                <button className='dogCreatedFinish'>Finish</button>
                <button className='dogCreatedBack'>Back</button>
            </div>
        )
    }
}