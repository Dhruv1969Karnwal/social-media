import { useEffect } from "react";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/alert";
import { useSelector, useDispatch } from "react-redux";
import LogIn from "./pages/login";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/header";
import PrivateRouter from "./customRouter/privateRouter";
import StatusModal from "./components/statusModal";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import io from 'socket.io-client'
import {GLOBALTYPES} from './redux/actions/globalTypes'
import SocketClient from './socketClient'

import {getNotifies} from "./redux/actions/notifyAction"
import CallModal from './components/message/callModal'

import Peer from 'peerjs'
function App() {
  const { auth, status, modal, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  // console.log(auth.token)

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      host: '/', port: '3001'
    })
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])
  
  return (
    <>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {/* <Header /> */}
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Routes>
            <Route path="/" element={auth.token ? <Home /> : <LogIn />} />
            <Route path="/register" element={<Register />} />

            {/* <div style={{marginBottom: '60px'}}> */}

            <Route
              path="/:page"
              element={
                 // <PrivateRouter> 
                <PageRender />
                 // </PrivateRouter> 
              }
            />








            <Route
              path="/:page/:id"
              element={
                // <PrivateRouter>
                <PageRender />
                // </PrivateRouter>
              }
            />
            {/* </div> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
