import React from 'react';

import Tracks from '../tracks/Tracks'
import Search from '../Search/Search';
const Index = () =>{
  return(
    <React.Fragment>
      <Search />
      <Tracks />
    </React.Fragment>
  )
}

export default Index