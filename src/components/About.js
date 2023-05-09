import React, { useState } from 'react'


export default function About(props) {




    // const [btntext, setBtnText] = useState('Enable Dark Mode');
    // const toggleButton = () => {
    //     if(myStyle.color === 'white') {
    //         let newMyStyle = {
    //             color: 'black',
    //             backgroundColor: 'white'
    //         }
    //         setMyStyle(newMyStyle);
    //         let newText = 'Enable Dark Mode';
    //         setBtnText(newText);
    //     }
    //     else{
    //         let newMyStyle = {
    //             color: 'white',
    //             backgroundColor: 'black',
    //             border: '1px solid white'
    //         }
    //         setMyStyle(newMyStyle);
    //         let newText = 'Enable Light Mode';
    //         setBtnText(newText);
    //     }


    // }
    let myStyle = {
        color: props.mode === "dark" ? 'white' : props.mode === "dark2" ? 'white' : '#042743',
        backgroundColor: props.mode === 'dark' ? 'rgb(36 64 104)' : props.mode === 'dark2' ? '#00224e' : 'white',

    }

    return (
        <div className="container"  >
            <div className="accordion my-3" id="accordionExample" >
                <h1 className='my-3' style={{ color: props.mode === "dark" ? 'white' : props.mode === "dark2" ? 'white' : '#042743', }} >About Us</h1>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">

                        <button className="accordion-button" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                            Analyze Your text
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                        <div className="accordion-body" >
                            Textutils gives you a way to analyze your text quickly and efficiently. Be it word count, character count or
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" >
                            Free to us
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body" >
                            TextUtils is a free character counter tool that provides instant character count & word count statistics for a given text. TextUtils reports the number of words and characters. Thus it is suitable for writing text with word/ character limit.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" >
                            Browser Compatible
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body" >
                            This word counter software works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera. It suits to count characters in facebook, blog, books, excel document, pdf document, essays, etc.
                        </div>
                    </div>
                </div>
                {/* <button className="btn btn-primary my-3" onClick={toggleButton}>{btntext}</button> */}
            </div>
        </div>
    )
}
