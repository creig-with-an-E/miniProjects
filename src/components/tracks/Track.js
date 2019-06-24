import React from 'react';
import {Link} from 'react-router-dom';

const Track = (props)=>{
  const { track } = props;
  return(
    <div className="col-md-6" >
    <div className="card mb-4 shadow-sm" style={{backgroundColor:"#1a1a1a"}}>
      <div className="card-body">
        <h4 className="text-truncate" style={{color:"#fffffa", fontFamily:"Oswald"}}>{track.artist_name}</h4>
        <p className="card-text" style={{color:"#EDF2F4"}}>
          <strong  style={{color:"#EDF2F4"}}><i className="fas fa-play mr-2" style={{color:"#EF233C"}}></i> Track</strong>: {track.track_name}
          <br/>
          <strong style={{color:"#EDF2F4"}}><i className="fas fa-compact-disc mr-2" style={{color:"#EF233C"}}></i>{track.primary_genres.music_genre_list[0] ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : `Unknown`}</strong>
        </p>
        <Link to={`lyrics/track/${track.track_id}`} className="btn btn-block p-2" style={style.buttonStyle}>
          <i className="fas fa-chevron-right"></i> View Lyrics
        </Link>
      </div>
    </div>
  </div>

  )
}

export default Track

const style= {
  buttonStyle:{  
    // borderColor: "#00A591",
    color:"#EF233C",
    borderWidth: 3,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "Anton",
    borderRadius: 5,
    backgroundColor:"#EDF2F4"
  }
}