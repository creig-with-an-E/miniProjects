import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom';

import Spinner from './../layouts/Spinner'
class Lyrics extends Component{
  state ={
    //component level state
    track: {},
    lyrics: {}
  }

  componentDidMount(){
    //apikey passed with headers.
    //request is unsuccessful when apikey passed as part of query string, apikey has to be passed with headers
    //track id received as param which is in the previous query string
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}`,
    {
      params:{apikey:process.env.REACT_APP_MM_KEY}})
      .then(result=>{
        this.setState({lyrics: result.data.message.body.lyrics})
        //make another request to get artist info
       return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}`,
          {
            params:{apikey:process.env.REACT_APP_MM_KEY}})
      })
      .then(res=>{
        this.setState({track: res.data.message.body.track})
      })
      .catch(error=>{
        console.log(error)
      })
  }

  render(){
    const { track, lyrics } = this.state

    console.log(track)
    if(track === undefined  ||
         lyrics === undefined ||
         Object.keys(track).length === 0 ||
         Object.keys(lyrics).length === 0){
          return <Spinner />
    }else{
      return (
        <React.Fragment>
          <Link to={"/"} className="btn btn-sm mb-4 p-3"><i className="far fa-hand-point-left fa-2x" style={{color:"#D90429"}}> Back</i> </Link>
          <div className="card" style={{backgroundColor: "#1a1a1a"}}>
            <h5 className="card-header text-light text-truncate">
              {track.track_name} ~ <span  style={{color: "#F0EDE5"}}>{track.artist_name} </span>
            </h5>
            <div className="card-body" style={{backgroundColor: "#EDF2F4"}}>
              <p style={{color:"#000"}}>
                {lyrics.lyrics_body}
              </p>
              <ul className="list-group mt-3" style={{color:"#264E36"}}>
                <li className="list-group-item">
                  <strong>Genre: </strong> <span className="text-muted">{track.primary_genres.music_genre_list[0] ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : `Unknown`}</span>
                </li>
                <li className="list-group-item">
                  <strong>Explit: </strong><span className="text-muted">{track.explicit > 0? `True`: `No`} </span>
                </li>
                <li className="list-group-item">
                  <strong>Released: </strong> <span className="text-muted">{moment(track.updated_time).format("MM/DD/YYYY") || "Unknown Date"} </span>
                </li>
              </ul>
            </div>
            <p className="m-3" style={{fontFamily:"Oswald", fontSize:20, color:"#D90429"}}>Please note this is a free app, and only 30% of the lyrics are available based on licence</p>
          </div>
        </React.Fragment>
      )
    }
  
}
}

export default Lyrics