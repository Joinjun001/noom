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

    peer to peer 연결방식을 만듬.
    다만 캠을 변경하고나서 연결이 끊기는 문제가 생김.


0.4 >


    카메라를 바꿔서 stream을 업데이트할때마다 peerconnection에 새로운 videotrack을 넣어줘서
    캠을 바꾸면 바꾼 화면이 브라우저에 나타나도록 고침.
    그리고 폰에서 테스트하기위해 npm i localtunnel 을 설치함.
    lt 입력하고 lt --port 3000 을 하면 글로벌에서 내 포트로 접속이 가능해진다.
    즉 핸드폰에서 내 코딩이 작동되는지 확인 가능!! 
    이것만 실행하면 504 time out 이 발생하므로
    분할터미널로 npm run dev도 같이 실행해주자.

    컴퓨터랑 핸드폰에서 같은 와이파이에 없으면 오류가 난다! > stun 서버로 해결 
    지금은 구글에서 stun서버를 무료로 쓰지만, 나중에 내가 WebRTC를 전문적으로 하고 싶으면 
    직접 stun서버를 만들어야함.
    stun 서버는 내 장치에 공용주소를 만들어준다. 그래야 같은 와이파이에 없어도 에러가 안남

0.5 >


    datachannel을 이용해서 채팅기능을 구현해보자    
    var pc = new myPeerConnection(options);
    var channel = pc.createDataChannel("chat"); chat이란 이름의 데이터채널을 만듬   
    channel.onopen (= channel.addEventListner("open") )
    channel.send(message) 로 메세지를 보낼수 있음. 

    오류 1 myDataChannel 에 사람이 없으면 채팅전송이 안되고 오류 발생.
    오류(?) 2 이름이 없어서 누가 보낸 채팅인지 모름. 0.6에서 개선할것 
    
    

0.6 >

    사람이 나가는걸 window.onupload()로 감지함. 즉 stream을 종료할 조건을 찾음.
    