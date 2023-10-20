import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SignallingChannel} from "./SignallingChannel";
import {WebRtcChannel} from "./WebRtcChannel";

const rtcChannel: WebRtcChannel = new WebRtcChannel();

export async function makeCall() {
  rtcChannel.initChannel();
}

export async function sendMessage() {
  rtcChannel.sendDataChannelMessage("data channel message");
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={makeCall}>Click Me</button>
        <button onClick={sendMessage}>Send Message</button>
      </header>
    </div>
  );
}

export default App;
