import {SignallingChannel} from "./SignallingChannel";

export class WebRtcChannel {
    iceConfiguration: RTCConfiguration = {
        iceServers: [
            {
                urls: 'turn:jim.vmware.com:3478',
                username: 'ejim',
                credential: 'TannerAndTobey100!'
            }
        ]
    }

    peerConnection: RTCPeerConnection = new RTCPeerConnection(this.iceConfiguration);
    signalingChannel: SignallingChannel = new SignallingChannel(this.peerConnection);
    dataChannel: RTCDataChannel = this.peerConnection.createDataChannel("dataChannel");

    constructor() {

        this.dataChannel.onerror = function (error) {
            console.log("Error:", error);
        };
        this.dataChannel.onclose = function () {
            console.log("Data channel is closed");
        };

        this.dataChannel.onmessage = function (event) {
            console.log("Message:", event.data);
        };

        this.peerConnection.ondatachannel =  (event) => {
            this.dataChannel = event.channel;
        };


        this.peerConnection.onicecandidate =  (event) => {
            if (event.candidate) {
                this.signalingChannel.send({
                    event: "candidate",
                    data: event.candidate
                });
            }
        }
    }

    async initChannel()  {
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.createOffer((offer) => {
            this.signalingChannel.send({
                event : "offer",
                data : offer
            });
            this.peerConnection.setLocalDescription(offer);
        }, function(error) {
            // Handle error here
        });

    }

    sendDataChannelMessage(message: string) {
        this.dataChannel.send(message);

    }
}

