import {SignallingChannel} from "./SignallingChannel";
import {Media} from "./Media";
import {FormData, FormProps} from "./Form";

export class WebRtcChannel {
    iceConfiguration: RTCConfiguration;

    peerConnection: RTCPeerConnection ;
    signalingChannel: SignallingChannel ;
    dataChannel: RTCDataChannel ;
    addMessage: FormProps | null = null;


    // constructor(addMessage: FormProps) {
    constructor() {
        // this.addMessage = addMessage;
        this.iceConfiguration = {
            iceServers: [
                {
                    urls: 'turn:jim.vmware.com:3478',
                    username: 'ejim',
                    credential: 'TannerAndTobey100!'
                }
            ]
        }

        this.peerConnection = new RTCPeerConnection(this.iceConfiguration);
        this.signalingChannel = new SignallingChannel(this.peerConnection);
        this.dataChannel = this.peerConnection.createDataChannel("dataChannel");
        this.dataChannel.onerror = function (error) {
            console.log("Error:", error);
        };

        this.dataChannel.onclose = function () {
            console.log("Data channel is closed");
        };

        this.dataChannel.onmessage = function (event) {
            console.log("Message:", event.data);
            // addMessage.setSendUserResponse(event.data);
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

        const media: Media = new Media(this.peerConnection);
    }

    sendDataChannelMessage(message: string) {
        this.dataChannel.send(message);
    }
}

