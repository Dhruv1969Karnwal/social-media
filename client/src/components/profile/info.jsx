import React, { useState, useEffect } from "react";
import Avatar from "../avatar";

import EditProfile from "./editProfile";
import FollowBtn from "../followBtn";
import Followers from "./followers";
import Following from "./following";
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Info = ({id , auth , profile , dispatch}) => {
  // console.log(useParams())

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // this is used for user own profilw page
  useEffect(() => {
    if(id === auth.user._id){
        setUserData([auth.user])
    }else{
        const newData = profile.users.filter(user => user._id === id)
        setUserData(newData)
    }
}, [id, auth, dispatch, profile.users])


useEffect(() => {
    if(showFollowers || showFollowing || onEdit){
        dispatch({ type: GLOBALTYPES.MODAL, payload: true})
    }else{
        dispatch({ type: GLOBALTYPES.MODAL, payload: false})
    }
},[showFollowers, showFollowing, onEdit, dispatch])

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />

          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <div className="follow_btn">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>
                {user.followers.length} Followers
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>

            <h6>
              {user.fullname} <span className="text-danger">{user.mobile}</span>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}
          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
