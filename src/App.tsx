import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SignallingChannel} from "./SignallingChannel";
import {WebRtcChannel} from "./WebRtcChannel";
import Form, {FormData} from "./Form";
import {WebrtcContext} from "./context/WebrtcContext";

function alertMsg(formData: FormData) {
    var message:HTMLElement | null = document.getElementById('message');
    alert(formData.message)
}
function App() {
    let message = "";
    var rtcChannel: WebRtcChannel = new WebRtcChannel();


    async function makeCall() {
        rtcChannel.initChannel();
    }

     async function sendMessage(formData: FormData) {
        rtcChannel.sendDataChannelMessage(formData.message);
    }

    const [sendUserResponse, setSendUserResponse] = useState<string>("");
    // const rtcChannel: WebRtcChannel = new WebRtcChannel({onSubmit: sendMessage, sendUserResponse, setSendUserResponse});

    return (
        <WebrtcContext.Provider
            value={{
                sendUserResponse,
                setSendUserResponse
            }}
        >
    <div className="App">
      <header className="App-header">
          <button onClick={makeCall}>Initialize Channel</button>
          <Form onSubmit={sendMessage} sendUserResponse={sendUserResponse} setSendUserResponse={setSendUserResponse}/>
          <audio src="" id="myAudio" controls preload="auto"></audio>
          <video id="myVideo" autoPlay></video>
      </header>
      <body>
      </body>
    </div>
        </WebrtcContext.Provider>
  );
}

export default App;
