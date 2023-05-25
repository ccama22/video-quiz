import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import { VideoRecording } from './videoRecording'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/card/:id" element={<VideoRecording/>} />
      </Routes>
    </BrowserRouter>
  )
}
