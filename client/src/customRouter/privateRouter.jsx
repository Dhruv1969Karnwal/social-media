import {Routes ,  Route, Navigate} from 'react-router-dom'

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('firstLogin')
    return
    <>
    <Routes>  
     firstLogin ? 
    <Route {...props} /> : <Navigate to="/" />
    </Routes>
    </>
}

export default PrivateRouter