import { useState } from 'react'
import { ContextProvider } from './context/ContextProvider'
import { Router, RouterProvider } from 'react-router-dom'
import router from './router'
import NavigationBar from './components/NavigationBar'
import './Styles.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App
