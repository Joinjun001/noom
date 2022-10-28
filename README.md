noom
clone coding using WEBRTS and WebSocket


0.1 >

    getMedia();를 안써서 지금까지 실행이 안됐는데.. 왜 이걸 확인 못했을까?
    아무튼 
    카메라와, 마이크를 웹브라우저에 불러옴.
    camera를 선택할수있게 camera목록을 불러옴.
    카메라 목록에서 카메라를 선택함 > handleCameraChange가 getMedia에 현재 카메라의 deviceID를 줌.

    현재 기능 : 유저의 카메라목록들을 가져오고, 선택하면 그 카메라화면을 웹브라우저에 paint함.


0.2 >


    peer to peer 방식으로 연결되면 나 > 서버 > 너 가 아닌 나 > 너 로 서버를 거치지않고 바로 연결된다.
    webRTC가 peer to peer 방식이다. 그걸 하기위해서 signaling을 해주면 됨.
    즉 처음에 서버한테 내 정보를 주기만 하면 상대와 바로 연결이되서 서버를 안거쳐도 됨.
    복습) socket.emit(eventName, argument) 로 이벤트를 보냄
    wsServer.on("connection", socket => {
        socket.on("eventName", parameter => {

        })
    }) 이렇게 백엔드에서 프론트엔드로부터 받은 이벤트를 실행시킴. 


0.3 >

    
    a 에서 b 로 offer를 보낼때 b에서 myPeerConnection이 정의가 안되어있어서 
    initCall()을 await로 실행시켜서 기다려준다.