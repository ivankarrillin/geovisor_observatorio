import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import React, { Component } from 'react';

const Load =()=> {

    const [visible, setVisible] = React.useState(true);

     return(
      <Loader
         type="Puff"
         color="#B80150"
         height={20}
         width={20}
         timeout={0} //3 secs
         visible={visible}
      />
     );

}
export default Load;