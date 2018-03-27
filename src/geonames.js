import React, { Component } from 'react'
import axios from 'axios'

export default class Geonames extends Component{
    constructor() {
        super()
        this.state = {
          currentState:'',
          city: ''
        }
    }

    componentDidMount(){
        axios.get('http://api.geonames.org/findNearbyPlaceNameJSON?lat=40.2338&lng=-111.6585&username=sgueck9').then(response =>{
            console.log(response)
             console.log(response.data.geonames[0].toponymName) 
            console.log(response.data.geonames[0].adminCode1)
            this.setState({ currentState : response.data.geonames[0].adminCode1, city: response.data.geonames[0].toponymName })
         })
        console.log('this is the component did mount')

    }
    
    render(){
        return(
            <div>Geonames page city:{this.state.city} state:{this.state.currentState}</div>
        )
    }
}


