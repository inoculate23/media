               
                var AWS = require('aws-sdk');
                // DescribeSignalingChannel API can also be used to get the ARN from a channel name.
    const channelARN = 'arn:aws:kinesisvideo:us-west-2:123456789012:channel/test-channel/1234567890';
    
    // AWS Credentials
    const accessKeyId = 'AKIA2NQPGVZDDOJDYENU';
    const secretAccessKey = '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';
    
    // <video> HTML elements to use to display the local webcam stream and remote stream from the master
    const localView = document.getElementsByTagName('video')[0];
    const remoteView = document.getElementsByTagName('video')[1];
    
    const region = 'us-west-2';
    const clientId = 'viewer';
    
    const kinesisVideoClient = new AWS.KinesisVideo({
        region,
        accessKeyId,
        secretAccessKey,
        correctClockSkew: true,
    });
    
    
    //Get Signaling Channel Endpoints
    
    //Each signaling channel is assigned an HTTPS and WSS endpoint to connect to for data-plane operations. These can be discovered using the GetSignalingChannelEndpoint API.
    
    async function myfunction() {
      console.log('Inside of myfunction');
    
    const getSignalingChannelEndpointResponse = await kinesisVideoClient
     .getSignalingChannelEndpoint({
            ChannelARN: channelARN,
            SingleMasterChannelEndpointConfiguration: {
                Protocols: ['WSS', 'HTTPS'],
                Role: KVSWebRTC.Role.VIEWER,
            },
        })
        .promise();
    const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
        endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
        return endpoints;
    }, {});
    
    }
    //Create KVS Signaling Client
    
    
    const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
        region,
        accessKeyId,
        secretAccessKey,
        endpoint: endpointsByProtocol.HTTPS,
        correctClockSkew: true,
    });
    
    //ice servers
    async function myfunction() {
      console.log('Inside of myfunction');
    
    const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
        .getIceServerConfig({
            ChannelARN: channelARN,
        })
        .promise();
    const iceServers = [
        { urls: `stun:stun.kinesisvideo.${region}.amazonaws.com:443` }
    ];
    getIceServerConfigResponse.IceServerList.forEach(iceServer =>
        iceServers.push({
            urls: iceServer.Uris,
            username: iceServer.Username,
            credential: iceServer.Password,
        }),
    );
    }
    //create peers
    const peerConnection = new RTCPeerConnection({ iceServers });
    
    //create signalig client
    signalingClient = new KVSWebRTC.SignalingClient({
        channelARN,
        channelEndpoint: endpointsByProtocol.WSS,
        clientId,
        role: KVSWebRTC.Role.VIEWER,
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        systemClockOffset: kinesisVideoClient.config.systemClockOffset,
    });
    
    
    //add listeners
    // Once the signaling channel connection is open, connect to the webcam and create an offer to send to the master
    signalingClient.on('open', async () => {
        // Get a stream from the webcam, add it to the peer connection, and display it in the local view
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: true,
            });
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
            localView.srcObject = localStream;
        } catch (e) {
            // Could not find webcam
            return;
        }
    
        // Create an SDP offer and send it to the master
        // If there is no concern about browser compatibility, using `addTransceiver` would be better
        const offer = await viewer.peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        });
        await peerConnection.setLocalDescription(offer);
        signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
    });
    
    // When the SDP answer is received back from the master, add it to the peer connection.
    signalingClient.on('sdpAnswer', async answer => {
        await peerConnection.setRemoteDescription(answer);
    });
    
    // When an ICE candidate is received from the master, add it to the peer connection.
    signalingClient.on('iceCandidate', candidate => {
        peerConnection.addIceCandidate(candidate);
    });
    
    signalingClient.on('close', () => {
        // Handle client closures
    });
    
    signalingClient.on('error', error => {
        // Handle client errors
    });
    
    //add peer listeners
    // Send any ICE candidates generated by the peer connection to the other peer
    peerConnection.addEventListener('icecandidate', ({ candidate }) => {
        if (candidate) {
            signalingClient.sendIceCandidate(candidate);
        } else {
            // No more ICE candidates will be generated
        }
    });
    
    // As remote tracks are received, add them to the remote view
    peerConnection.addEventListener('track', event => {
        if (remoteView.srcObject) {
            return;
        }
        remoteView.srcObject = event.streams[0];
    });
    
     //open signaling channel
    signalingClient.open();