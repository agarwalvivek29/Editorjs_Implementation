import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Route, Routes} from 'react-router-dom'
import RichTextEditor from './Editorjs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <RichTextEditor /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
