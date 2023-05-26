import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate} from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { containerCounter, containerMain, containerPlayStop, containerVideo, iconStyles, iconStylesDisabled, navLinkBack, navLinkContainer, navLinkReturn, navLinkfollowing } from "./styles/themes/theme";
import { getNextCardId, getPrevCardId } from "./containers/video_recording/navigationCard";

export const VideoRecording = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;

    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [recording, setRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isButtonPulsing, setIsButtonPulsing] = useState(false);
    
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    const prevCardId = getPrevCardId(data._id);
    const nextCardId = getNextCardId(data._id); 

    const [dataNavegation,setDataNavegation]=useState({});

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    const toggleButtonPulsing = () => {
    setIsButtonPulsing((prevState) => !prevState);
    };
    const startRecording = () => {
        if (cameraEnabled) {
            recordedChunksRef.current = [];
            setElapsedTime(0);
    
            const options = { mimeType: 'video/webm;codecs=vp9' };
            mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
    
            mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
            mediaRecorderRef.current.start();
    
            setRecording(true);
            toggleButtonPulsing(true);
        }
    };

    const startCamera = () => {
        if (!cameraEnabled) {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
              videoRef.current.srcObject = stream;
              streamRef.current = stream;
              setCameraEnabled(true);
              // Iniciar grabación si está activada
              if (recording) {
                console.log("empezo grabacion")
                startRecording();
              }
            })
            .catch((error) => {
              console.log('Error accessing camera:', error);
            });
        }
    };
    
    const stopCamera = () => {
        if (streamRef.current) {
          const tracks = streamRef.current.getTracks();
          tracks.forEach((track) => track.stop());
          streamRef.current = null;
          setCameraEnabled(false);
        }
    };
    
    const handleToggleCamera = () => {
        if (cameraEnabled) {
          stopCamera();
          stopRecording();
        } else {
          startCamera();
          startRecording();
        }
    };
    const handleDisabled = ()=>{
        stopCamera();
        stopRecording();
    }
    
      
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.removeEventListener('dataavailable', handleDataAvailable);
          mediaRecorderRef.current.stop();
        }
      
        setRecording(false);
        stopCamera();
        setIsButtonPulsing(false)
    };
      
    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
    };

    const handleDataVideoClick = (datas)=>{
        console.log("datas caama cruz",datas)
        setDataNavegation(datas)
        navigate(`/card/${datas._id}`, { state: { data: datas } });
    }

    useEffect(() => {
        if (cameraEnabled) {
            startCamera();
        }
    }, [cameraEnabled]);
    
    useEffect(() => {
        let timerId;
          timerId = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
          }, 1000);

      
        if (elapsedTime >= 120) {
          stopRecording();
        }
      
        return () => clearInterval(timerId);
    }, [elapsedTime]);

    return (
        <div style={containerMain}>
            <div style={containerVideo}>
                <div style={{display:"flex",justifyContent:'start'}}>
                    <NavLink to="/" style={navLinkReturn} onClick={handleDisabled}>
                        Volver
                    </NavLink>
                </div>

                <video ref={videoRef} autoPlay playsInline style={{ display: cameraEnabled ? 'block' : 'none' }}>
                    <button disabled={!cameraEnabled}>Open camera</button>
                </video>
                <div style={{ backgroundColor: 'black', width: '100%', height: '100%',display: cameraEnabled ? 'none' : 'block' }} />

                <div style={containerPlayStop}>
                    {dataNavegation && dataNavegation.question ? (
                        <p style={{color:'black'}}>{dataNavegation.question}</p>
                    ) : (
                        <p style={{color:'black'}}>{data.question}</p>
                    )}

                    {cameraEnabled ? (
                        <StopCircleIcon onClick={handleToggleCamera} style={iconStylesDisabled} />
                    ) : (
                        <PlayCircleFilledWhiteIcon onClick={handleToggleCamera} style={iconStyles}  />
                    )}
                </div>
                {cameraEnabled && (
                    <div style={containerCounter}>
                        <p style={{ color: 'black', marginLeft: '10px' }}>{`${formatTime(elapsedTime)} / 2:00`}</p>
                        <div 
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: !isButtonPulsing ? 'red' : 'transparent',
                                animation: !isButtonPulsing ? 'pulse 1s infinite' : 'none',
                            }}
                        />
                    </div>
                )}

                <div style={navLinkContainer}>
                    <NavLink 
                        to={prevCardId ? `/card/${prevCardId._id}` : '#'} 
                        state={{ data: data }}
                        style={navLinkBack}
                        onClick={() => handleDataVideoClick(prevCardId)}
                    >
                        Atras
                    </NavLink>
                    <NavLink 
                        to={prevCardId ? `/card/${prevCardId._id}` : '#'} 
                        state={{ data: data }}
                        style={navLinkfollowing}
                        onClick={() => handleDataVideoClick(nextCardId)}
                    >
                        Siguiente
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
