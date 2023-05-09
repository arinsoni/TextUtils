import React, { useState } from "react";


export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase", "success");
    }

    const handleLowClick = () => {
        let newText = text.toLocaleLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    const clearText = () => {
        let newtext = '';
        setText(newtext);
        props.showAlert("Text cleared succesfully", "success");
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        console.log(element);
        const file = new Blob([document.getElementById('myBox').value],
            { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
        props.showAlert("txt file downloaded", "success");
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Text Copied", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces has been removed", "success");
    }

    const [text, setText] = useState('');
    const word = text.split(" ").length == 1 ? 'word' : 'words';

    const [cnt, setCnt] = useState('');
    function countWords(text){
        let x = 0;
        text = String(text);
        let y = text.split(" ");
        for(let i=0;i<y.length; i++){
            if(y[i] != ""){
                x = x + 1;
            }
        }
        setCnt(x);

    }

    
    return (
        <>
            <div className="container" >
                <h1 className="text-center heading" style = {{color: props.mode === 'light' ? 'black' : 'white'}} > {props.heading}  </h1>
                <form>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            style={{ backgroundColor: props.mode === 'light'? 'white' : 'lightgrey', color: props.mode === 'dark' ? 'black' : 'light', }}
                            id="myBox"
                            value={text}
                            placeholder="Enter your text"
                            onChange={handleOnChange}
                            rows="8"
                        ></textarea>
                    </div>
                </form>
            </div>

            <div className="text-center" >

                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor: props.mode === 'light' ? 'lightgrey' : 'lightgrey', color: props.mode === 'light' ? 'black' : 'black'}}>
                    Dropdown button
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{backgroundColor: props.mode === 'light' ? 'grey' : '#00224e'}}>
                    <li  ><a className="dropdown-item" onClick={handleUpClick}  style = {{color: props.mode === 'light' ? 'white' : 'black'}}>Convert to Uppercase</a></li>
                    <li><a className="dropdown-item" onClick={handleLowClick} style={{color: props.mode === 'light' ? 'white' : 'black'}}>Convert to Lowercase</a></li>
                </ul>

                <button className="btn btn-primary my-3 mx-1" onClick={downloadTxtFile} style={{backgroundColor: props.mode === 'light' ? 'lightgrey' : 'lightgrey', color: props.mode === 'light' ? 'black' : 'black'}}>Download text File</button>
                <button className="btn btn-primary my-3 mx-1" onClick={clearText} style={{backgroundColor: props.mode === 'light' ? 'lightgrey' : 'lightgrey', color: props.mode === 'light' ? 'black' : 'black'}} >Clear text</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleCopy} style={{backgroundColor: props.mode === 'light' ? 'lightgrey' : 'lightgrey', color: props.mode === 'light' ? 'black' : 'black'}}>Copy text</button>
                <button className="btn btn-primary my-3 mx-1" onClick={handleExtraSpaces} style={{backgroundColor: props.mode === 'light' ? 'lightgrey' : 'lightgrey', color: props.mode === 'light' ? 'black' : 'black'}}>Remove Extra Spaces</button>
            </div>
            <div className="container" style={{ color: props.mode === 'light'  ? 'black' : 'white' }}>
                <h2>Your text summary</h2>
                <p> {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} <b>{word}</b> and {text.length} <b>characters</b>
                </p>
                <p>{0.008 * text.split(" ").length} Minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : 'Enter Your text to Preview'}</p>
            </div>





        </>
    );
}


