import './App.css'
import {Card, CardContent, Grid, IconButton, ThemeProvider, Typography } from '@mui/material'
import { StyledButton, cardContentStyles, cardVideo, cardVideoIconButton, divStyleButton, theme } from './styles/themes/theme';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { NavLink, useNavigate } from 'react-router-dom';
import { cardList } from './containers/video_recording/ListCard';


function Home() {
  const navigate = useNavigate();

  const handleVideoClick = (card) => {
    // Aquí puedes realizar cualquier lógica adicional antes de navegar al componente VideoRecording
    // Puedes obtener los datos adicionales que necesitas y luego redireccionar a la ruta
    navigate(`/card/${card._id}`, { state: { data: card } });
  };
  return (
    <Grid
      container
      justify="center"
      style={{ height: '100vh'}} // Ajusta la altura del contenedor principal según tus necesidades
    >
        <Grid item>
          <p style={{fontSize:'40px',fontFamily: 'Roboto',color:'black' }}>Video Cuestionario</p>
          <Grid container spacing={5}>
            {cardList.map((card, index) => (
              <Grid item key={index} >
                <Card sx={{ width:'280px', height: '393px' }}>
                  {card.video ? (
                        <video src={card.video} controls width="100%" height="85%">
                          Tu navegador no admite la reproducción de videos.
                        </video>
                      ) : (
                        <div style={cardVideo}>
                            <NavLink 
                                to={`/card/${card._id}`}
                                state={{ data: card }}
                                style={{ textDecoration: 'none' }}
                                onClick={() => handleVideoClick(card)}
                            >
                                <IconButton sx={cardVideoIconButton}>
                                    <PlayArrowIcon sx={{ fontSize: '40px' }} />
                                </IconButton>
                            </NavLink>
                        </div>

                      )
                  }
                  <CardContent sx={cardContentStyles}>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: '14px', fontFamily: 'Roboto' }}
                    >
                      {card.question}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div style={divStyleButton}>
            <ThemeProvider theme={theme}>
              <StyledButton variant="contained" color="primary">
                Enviar
              </StyledButton>
            </ThemeProvider>
          </div>
      </Grid>
    </Grid>
  )
}

export default Home
