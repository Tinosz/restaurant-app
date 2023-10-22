import { Router, RouterProvider } from 'react-router-dom'
import router from './router'
import NavigationBar from './components/NavigationBar'
import './styles.css'

function App() {

  return (
    <>
        <NavigationBar />
        <RouterProvider router={router} />
    </>
  )
}

export default App
