import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getDog, updateRadius, updateInterestedIn, updateReason, updateRange } from './ducks/users'

class Geonames extends Component{
    constructor() {
        super()
        this.state = {
          currentState:'',
          city: '',
          user: ''
        }
        
    }
     componentWillMount(){
        
    }
    
    componentDidMount(){
        axios.get('/auth/me').then(res => {
                
                    this.setState({user: res.data.user})

            }).then(res=>{
                axios.get(`/api/getDog/${this.state.user.id}`).then(res => {
                    this.props.getDog(res.data[0])
                    console.log('res.data', res.data[0])
                }).then(res=>{
                    axios.get(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${this.props.dog.latitude}&lng=${this.props.dog.longitude}&username=sgueck9`).then(response =>{
                        console.log('response', response)
                        console.log('latitude', this.props.dog.latitude)
                        //  console.log('city', response.data.geonames[0].toponymName) 
                        // console.log('state', response.data.geonames[0].adminCode1)
                        this.setState({ currentState : response.data.geonames[0].adminCode1, city: response.data.geonames[0].toponymName })
                    })
                }) 

            })
        
        
    console.log('this is the component did mount')
    }

    render(){
        
        return(
            <div>
                <div>Geonames page city:{this.state.city} state:{this.state.currentState}</div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        dog: state.dog
    }
}

export default connect(mapStateToProps, { getDog, updateRadius, updateInterestedIn, updateReason, updateRange })(Geonames);

