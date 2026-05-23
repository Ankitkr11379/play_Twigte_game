import { useState } from 'react'
import Board from './boardmap'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="Boardmap" >
       
        
        <Board />
       
      </div>
    </>
  )
}

export default App
