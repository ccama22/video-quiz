import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink,useNavigate, useParams} from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { containerCounter, containerMain, containerPlayStop, containerVideo, iconStyles, iconStylesDisabled, navLinkBack, navLinkContainer, navLinkReturn, navLinkfollowing} from "./styles/themes/theme";
// import { getNextCardId, getPrevCardId } from "./containers/video_recording/navigationCard";
import { cardList } from "./containers/video_recording/ListCard";

export const VideoRecording = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // // const { data } = location.state;
    const { id } = useParams()

    const currentIndex = useMemo(() => {
        return cardList.findIndex((card) => card._id === id);
    }, [id]);
    const currentCard = cardList[currentIndex];

    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [recording, setRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isButtonPulsing, setIsButtonPulsing] = useState(false);

    
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    // const prevCardId = getPrevCardId(data._id);
    // const nextCardId = getNextCardId(data._id); 

    const [dataNavegation,setDataNavegation]=useState({});

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    const toggleButtonPulsing = useCallback(() => {
        setIsButtonPulsing((prevState) => !prevState);
    }, [setIsButtonPulsing]);
    
    const handleDataAvailable = useCallback((event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
    }, []);

    const startRecording = useCallback(() => {
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
    }, [cameraEnabled, setElapsedTime, streamRef, handleDataAvailable, setRecording, toggleButtonPulsing]);

    const startCamera = useCallback(() => {
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
      }, [cameraEnabled, recording, startRecording]);
      
      const stopCamera = useCallback(() => {
        if (streamRef.current) {
          const tracks = streamRef.current.getTracks();
          tracks.forEach((track) => track.stop());
          streamRef.current = null;
          setCameraEnabled(false);
        }
      }, []);
    
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
    
      
    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.removeEventListener('dataavailable', handleDataAvailable);
          mediaRecorderRef.current.stop();
        }
      
        setRecording(false);
        stopCamera();
        setIsButtonPulsing(false);
    }, [stopCamera,handleDataAvailable]);


    const goToNextCard = () => {
    if (currentIndex < cardList.length - 1) {
        const nextCard = cardList[currentIndex + 1];
        setDataNavegation(nextCard);
        stopCamera();
        stopRecording();
        navigate(`/card/${nextCard._id}`);
    } else {
        console.log("ingreso")
        const lastCard = cardList[0];
        setDataNavegation(lastCard);
        stopCamera();
        stopRecording();
        navigate(`/card/${lastCard._id}`);
    }
    };

    const goToPreviousCard = () => {
    if (currentIndex > 0) {
        console.log("retroceso")
        const previousCard = cardList[currentIndex - 1];
        setDataNavegation(previousCard);
        stopCamera();
        stopRecording();
        navigate(`/card/${previousCard._id}`);
    } else {
        console.log("ingreso")
        const firstCard = cardList[cardList.length - 1];
        setDataNavegation(firstCard);
        stopCamera();
        stopRecording();
        navigate(`/card/${firstCard._id}`);
    }
    };

    useEffect(() => {
        let timerId;
          timerId = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
          }, 1000);

      
        if (elapsedTime >= 120) {
          stopRecording();
          startCamera();
        }
      
        return () => clearInterval(timerId);
    }, [elapsedTime,stopRecording,startCamera]);


    useEffect(() => {
        const currentCard = cardList[currentIndex];
        navigate(`/card/${currentCard._id}`, { replace: true });
    }, [currentIndex,navigate]);


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
                        <p style={{color:'black'}}>{currentCard.question}</p>
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
                    {/* <NavLink 
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
                    </NavLink> */}
                    <button onClick={goToPreviousCard} style={navLinkBack} >Atrás</button>
                    <button onClick={goToNextCard} style={navLinkfollowing}>Siguiente</button>
                </div>
            </div>
        </div>
    )
}
