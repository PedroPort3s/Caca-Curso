import React from 'react'
import Icons from 'react-native-vector-icons/AntDesign';

const iconAntDesign = (props) => {
    return (
        <Icons name={props.icon} size={props.size} style={props.style} />
    )
}

export default iconAntDesign;