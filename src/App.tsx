import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {SignallingChannel} from "./SignallingChannel";
import {WebRtcChannel} from "./WebRtcChannel";
import Form, {FormData} from "./Form";

var rtcChannel: WebRtcChannel = new WebRtcChannel();
let message = "";

export async function makeCall() {
  rtcChannel.initChannel();
}

export async function sendMessage(formData: FormData) {
    rtcChannel.sendDataChannelMessage(formData.message);
}

function alertMsg(formData: FormData) {
    var message:HTMLElement | null = document.getElementById('message');
    alert(formData.message)
}
function App() {
    const [sendUserResponse, setSendUserResponse] = useState<string>("");
    // const rtcChannel: WebRtcChannel = new WebRtcChannel({onSubmit: sendMessage, sendUserResponse, setSendUserResponse});

    return (
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
  );
}

export default App;
