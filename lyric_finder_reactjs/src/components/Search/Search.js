import React, { Component } from 'react';
import axios from 'axios'

import { Consumer } from './../../Context'

class Search extends Component{

    state = {
      trackTitle:""
  }

  onChangeTextHandler= event=>{
    this.setState({[event.target.name]: event.target.value})
  }

  submitHandler=(dispatch, e)=>{
    e.preventDefault()
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&track_rating=desc`,{
        params:{apikey:process.env.REACT_APP_MM_KEY}
      }).then((result)=>{
          dispatch({
            type: "SEARCH_TRACKS",
            payLoad: result.data.message.body.track_list
          })
          this.setState({trackTitle:""})
      }).catch(error=>{
          console.log(error)
      })
  }

  render(){
      
      return(
        <Consumer>
          {value=>{
              const {dispatch} = value
              //getting the global state from context.js
              return(
                <div className="card card-body mb-4 p-4 shadow-lg border col-md-10 offset-md-1 d-flex justify-content-center" style={{borderRadius:10}}>
                  <h1 className="h4 text-center " style={{fontFamily:"Anton"}}><i className="fas fa-music"> </i> Find Song</h1>
                  <p className="text-lead ">Get song lyrics for any song</p>
                  {/* binding it to the current context */}
                  <form className="form-group " onSubmit={this.submitHandler.bind(this, dispatch)}>
                    <input type="text" className="form-control form-control-lg"
                      placeholder="Enter song title"
                      name="trackTitle"
                      value={this.state.trackTitle}
                      // eslint-disable-next-line no-undef
                      onChange={this.onChangeTextHandler}
                    />
                    <button type="submit"
                      className="btn btn-lg text-white btn-block mt-2 rounded-0" style={{ backgroundColor: "#EF233C"}}> Find Now</button>
                  </form>
                </div>
              )
          }}
        </Consumer>
      )
  }
}

export default Search