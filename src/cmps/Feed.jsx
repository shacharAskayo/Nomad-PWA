import { useEffect, useState } from "react";
import { feedService } from "../services/feedService";
import { connect, useDispatch, useSelector } from "react-redux"
import { Moments } from "./Moments.jsx";
import { Posts } from "./Posts";
import { PostAdd } from "./PostAdd";
import { loadFeed, addPost, addMoment } from '../store/actions/feedAction.js'
import { Native } from "./Native";
import { Globus } from "./Globus/Globus";



export function Feed({ user }) {

  const feed = useSelector(state => state.userModule.feed)
  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(loadFeed(user))
  }, [])


if(!feed) return <h2>loading</h2>
  return (
    <div className="feed">
      {/* <Globus location={user.currentLocation.name} /> */}
      <Moments moments={feed.moments} />
      <PostAdd user={user} addPost={addPost} addMoment={addMoment} />
      <Posts posts={feed.posts} />
    </div>
  )
}


