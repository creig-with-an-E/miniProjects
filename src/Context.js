import React, {Component} from 'react'
import axios from 'axios'

const Context = React.createContext();

const reducer = (state, action)=>{
  switch (action.type){
    case "SEARCH_TRACKS":
    console.log(action.payLoad)
      return {
        ...state,
        track_list: action.payLoad,
        heading: "Search results"
      }
      default : return state
  }
}
export class Provider extends Component{

  componentDidMount(){
     axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ca&f_has_lyrics=1`,{
       params:{apikey:process.env.REACT_APP_MM_KEY}
     })
       .then((result)=>{
          this.setState({track_list: result.data.message.body.track_list})
        })
       .catch(error=>console.log(error))
    }

    state = {
       track_list: [],
       heading:"Top 10 Tracks right NOW ( Billboard.com )",
       dispatch: (action) => this.setState(state => reducer(state, action))
    }

    render(){
      return(
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      )
    }
}

export const Consumer = Context.Consumer;