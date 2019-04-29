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
          <Link to={"/"} className="btn btn-dark btn-sm mb-4 p-3" style={{backgroundColor: "#8D9440"}}>Go Back</Link>
          <div className="card" >
            <h5 className="card-header text-light text-truncate">
              {track.track_name} ~ <span className="text-muted">{track.artist_name} </span>
            </h5>
            <div className="card-body">
              <p >
                {lyrics.lyrics_body}
              </p>
              <ul className="list-group mt-3">
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
          </div>
        </React.Fragment>
      )
    }
  
}
}

export default Lyrics