import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome5';

const iconFontAwesome5 = (props) => {
    return (
        <Icons name={props.icon} solid={props.isSolid} size={props.size} style={props.style} />
    )
}

export default iconFontAwesome5;