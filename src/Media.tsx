export const constraints = {
    video: true,audio : true
};

export class Media {

    init() {
        function hasUserMedia() {
            //check if the browser supports the WebRTC
            return !!(navigator.mediaDevices.getUserMedia(constraints)).catch((e) => console.log(e));;
        }

        if (hasUserMedia()) {
            //enabling video and audio channels
            navigator.mediaDevices.getUserMedia(constraints).then( function (stream) {
                var video:HTMLVideoElement | null = document.querySelector('video');
                console.log("Got videos stream!")

                //inserting our stream to the video tag
                video!.srcObject = stream;
            }, function (err) {}).catch((e) => console.log(e));;
        } else {
            alert("WebRTC is not supported");
        }
    }

   constructor(peerConnection: RTCPeerConnection) {
       // navigator.mediaDevices.getUserMedia(constraints).
       // then(function(stream) { /* use the stream */ })
       //     .catch(function(err) { /* handle the error */ });
       this.init();
       this.openStream(peerConnection).catch((e) => console.log(e));
   }

   setListener(peerConnection: RTCPeerConnection) {
       console.log("setListener called")
       let audioElement: HTMLAudioElement  = document.getElementById("myAudio") as HTMLAudioElement;
       peerConnection.ontrack = function (event) {
           console.log("ontrack called")
           //if(audioElement != null) {audioElement!.srcObject = event!.streams[0];}
       };
   }

   async openStream(peerConnection: RTCPeerConnection) {
        this.setListener(peerConnection)
        console.log("Open stream")
        const gumStream = await navigator.mediaDevices.getUserMedia(constraints);
        for(const track of gumStream.getTracks()) {
            console.log("Adding track")
            peerConnection.addTrack(track, gumStream);
        }

    }
}


