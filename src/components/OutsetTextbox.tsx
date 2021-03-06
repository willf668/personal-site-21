import React, { ReactElement, useRef, useState, useEffect } from 'react'

import Typewriter from 'typewriter-effect';
import useOnScreen from './hooks/UseOnScreen';

interface Props {
    children: string,
    profile?: string,
    font?: string,
    height?: string
}

interface HeightStyle{
    height?: string
}

export default function OutsetTextbox(props: Props): ReactElement {
    const ref = useRef<Element>();
    const isVisible = useOnScreen(ref, "0px");
    let opened = true;

    let styleVar:HeightStyle={};
    if (props.height) styleVar["height"] = props.height;

    let finalText = "<div class='outsetText' ";
    if (props.font) finalText += "style='font-family:"+props.font+";'";
    finalText += ">" + props.children + "</div>";
    return (
        <div className="outsetTextbox" style={styleVar}>
            <div className="outsetTextBorder">
                {props.profile ? <img src={props.profile} alt="profile" className="profile-image" /> : null}
                {(opened || isVisible) && <Typewriter
                    options={{
                        cursor: '',
                        delay: 10,
                        //strings: props.children.split(','),
                        skipAddStyles: true,
                    }}
                    onInit={(typewriter) => {
                        opened = true;
                        typewriter.typeString(finalText).start();
                    }}
                />}
            </div>
        </div>
    )
}