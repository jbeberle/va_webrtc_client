
export class SignallingChannel {
    signalingChannel:WebSocket = new WebSocket('ws://localhost:8080/socket');

    constructor(peerConnection: RTCPeerConnection) {
        this.signalingChannel.addEventListener('message', (message) => {
            console.log(`Received message: ${message}`);
            console.log(message);
            console.log(message.data);
            let obj = JSON.parse(message.data);
            console.log(obj);
            if(obj?.event === "candidate") {
                console.log("I got a candidate!");
                console.log(obj.data);
                try {
                    peerConnection.addIceCandidate(new RTCIceCandidate(obj.data));
                } catch(e:unknown) {
                    console.log("error!");
                    console.log(e);
                }
            }
            else if (obj?.event === "offer") {
                console.log("I got an offer!")
                console.log(obj.data);
                if(peerConnection.signalingState !== "stable") {
                    peerConnection.setRemoteDescription(new RTCSessionDescription(obj.data));
                }
                peerConnection.createAnswer((answer) => {
                    peerConnection.setLocalDescription(answer);
                    this.send({
                        event : "answer",
                        data : answer
                    });
                }, function(error) {
                    // Handle error here
                });
            }
            else if (obj?.event === "answer") {
                console.log("I got an answer!");
                if(peerConnection.signalingState !== "stable") {
                    peerConnection.setRemoteDescription(new RTCSessionDescription(obj.data));
                }
            }
        });

    }

    send(message:any) {
      console.log(`sending message: ${JSON.stringify(message)}`);
      this.signalingChannel.send(JSON.stringify(message));
    }






}



