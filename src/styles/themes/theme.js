import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import styled from 'styled-components';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ED4040', // Establece el color rojo deseado aquí
    },
  },
});

export const cardContentStyles = {
  height: '15%',
  backgroundColor: '#c4c4c4',
  textAlign: 'left',
  display: 'flex',
  paddingBottom:'0px',
  paddingTop:'0px',
  paddingLeft:'10px',
  paddingRight:'15px',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: 1,
};

export const cardVideo = {
  width: '100%',
  height:"85%",
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}

export const cardVideoIconButton = {
  backgroundColor: '#8c8c8c',
  borderRadius: '50%',
  padding: '3px',
  color: 'white',
  position: 'absolute',
  bottom: 15,
  left: 15,
};

export const divStyleButton = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
};

export const StyledButton = styled(Button)({
  width: '180px',
  height: '50px',
  borderRadius: '8px'
});


export const iconStyles = {
  color: '#c4c4c4',
  fontSize: 50,
  cursor: 'pointer',
  position: 'absolute',
  bottom: '140px',
  left: '18px',
  zIndex: 1,
};
export const iconStylesDisabled = {
  color: '#c4c4c4',
  fontSize: 50,
  cursor: 'pointer',
  position: 'absolute',
  bottom: '65px',
  left: '18px',
  zIndex: 1,
};
export const containerCounter ={
  position: 'absolute',
  top: '15px',
  right: '18px',
  display:'flex',
  alignItems:'center',
  gap:'10px',
  zIndex: 1,
}

export const containerPlayStop ={
  backgroundColor:'#c4c4c4',
  display:'flex',
  alignItems:'center',
  justifyContent: 'space-between',
  padding:'15px',
}
export const navLinkReturn ={
  color: 'black',
  fontSize: '17px', 
  fontWeight: 'bold',
  textDecoration: 'none',
  marginLeft:'15px' 
}

export const navLinkContainer ={
  display:'flex',
  alignItems:'center',
  justifyContent: 'space-between',
  padding:'15px',
}
export const navLinkBack ={
  color: 'black',
  fontSize: '17px', 
  fontWeight: 'bold',
  textDecoration: 'none',
  marginLeft:'15px',
  backgroundColor:'white',
  border: 'none'
}

export const navLinkfollowing ={
  color: 'black',
  fontSize: '17px', 
  fontWeight: 'bold',
  textDecoration: 'none',
  marginLeft:'15px',
  backgroundColor:'white',
  border: 'none'
}

export const containerVideo ={
  display:"flex",
  flexDirection:'column',
  width:'710px',
  height:'604px',
  position:'relative'
}
export const containerMain ={
  display:'flex' ,
  flexDirection:'row',
  justifyContent:'center'
}