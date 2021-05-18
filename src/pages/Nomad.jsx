
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Feed } from "../cmps/Feed";
import { Globus } from "../cmps/Globus/Globus";
import { LocationPreview } from "../cmps/LocationPreview";
import { NomadHeader } from "../cmps/NomadHeader";
import { loadFeed } from "../store/actions/feedAction";
import { loadUser, login, logout } from '../store/actions/userActions'
import loadingGif from '../assets/gifs/loading.gif'
import loadingGif2 from '../assets/gifs/page-loader.gif'
import LeftMenu from "../cmps/LeftMenu";


// left


export function Nomad({ match, history, ...props }) {

  const user = useSelector(state => state.userModule.user)
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!user) {
      const loggedUser = await dispatch(login(null))
      if (!loggedUser) history.push('/login')
    }
  }, [])

  if (!user) return <img className='loader' src={loadingGif2} alt="" />
  return (
    <div className="app-container">
      <NomadHeader user={user} logout={logout} history={history} />
      {window.innerWidth > 700 && <LeftMenu user={user} />}
      <Feed user={user} />
      <LocationPreview location={user.currentLocation.name} />
    </div>
  )
}




