import { Router, RouterProvider } from 'react-router-dom'
import router from './router'
import NavigationBar from './components/NavigationBar'

import './styles.css'

function App() {
  return (
    <div className='App' id='app'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
