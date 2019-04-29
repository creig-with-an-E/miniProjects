import React from 'react';
import {Link} from 'react-router-dom';

const Track = (props)=>{
  const { track } = props;
  return(
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="text-truncate">{track.artist_name}</h5>
          <p className="card-text">
            <strong ><i className="fas fa-play"></i> Track</strong>: {track.track_name}
            <br/>
            <strong><i className="fas fa-compact-disc"></i></strong>
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
    borderColor: "#00A591",
    color:"#264E36",
    borderWidth: 3,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "Anton",
    borderRadius: 5,
  }
}