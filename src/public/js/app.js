const socket = io();
const myFace = document.querySelector("#myFace");
const muteBtn = document.querySelector("#mute");
const cameraBtn = document.querySelector("#camera");
const cameraSelect = document.getElementById("cameras");

let muted = false;
let cameraoff = false;

let myStream;

async function getCameras(){ // 유저의 camera들을 가져옴. 카메라를 선택할수 있게 select에 추가.
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks();
        cameras.forEach(camera =>  { 
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if (currentCamera.label == camera.label){ //현재 카메라를 select의 첫번째 항목으로 둠.
                option.selected = true;
            }
            cameraSelect.appendChild(option);
        })
    }catch(e)
    {console.log(e)} 
}

async function getMedia(deviceId){ //화면에 video를 paint해주는 함수 
    const initialConstrains = { // deviceID가 없으면 video를 설정하지않음.
        audio : false, //나중에 true로 바꾸기 
        video : { facingMode : "user"},
    };
    const cameraConstrains = { // device가 있으면 video를 deviceId로 설정함.
        audio : false,
        video : { deviceId: {exact : deviceId} },
    };  
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstrains : initialConstrains 
        );
        myFace.srcObject = myStream;
        if (!deviceId){ //카메라를 바꿀때마다 getCameras가 select에 paint하므로 없을때만 실행.
        await getCameras();
        }
    } catch(e) {
        console.log(e);
    }
}

getMedia();

function handleMuteClick() {
    myStream
    .getAudioTracks()
    .forEach((track) => track.enabled = !track.enabled);
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    }
    else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}

function handleCameraClick() {
    myStream
    .getVideoTracks()
    .forEach((track) => track.enabled = !track.enabled);
    if(cameraoff) {
        cameraBtn.innerText = "Camera Off";
        cameraoff = false;
    }
    else {
        cameraBtn.innerText = "Camera On";
        cameraoff = true;
    }   
}


async function handleCameraChange(){
    await getMedia(cameraSelect.value); 

}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);
