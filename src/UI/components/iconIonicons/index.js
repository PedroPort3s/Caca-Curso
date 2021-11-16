import React from 'react'
import Icons from 'react-native-vector-icons/Ionicons';

const iconIonicons = (props) => {
    return (
        <Icons name={props.icon} size={props.size} style={props.style} />
    )
}

export default iconIonicons;