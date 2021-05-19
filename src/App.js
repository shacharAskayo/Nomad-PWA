import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { HashRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import { Nomad } from './pages/Nomad'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import InterviewQuest from './pages/InterviewQuest'
import Friends from './pages/Friends'
import { login } from './store/actions/userActions'



// export default
 function App({ history }) {

  const dispatch = useDispatch()

  const user = useSelector(state => state.userModule.user)

  // useEffect(async () => {
  //   const { pathname } = window.location
  //   if (!user) {
  //     const loggedUser = await dispatch(login(null))
  //     if (!loggedUser) {
  //       if (pathname !== '/login' && pathname !== 'signup'){
  //         console.log('here',pathname);
  //         // window.location.replace("/login");
  //       } 
  //     }
  //   }
  // }, [])

  return (
    <div className="app" >
      <Router>
        <Switch>
          <Route path="/profile/:id" component={Profile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/friends" component={Friends} />
          {/* <Route path="/groups" component={Groups} /> */}
          <Route path="/" component={Nomad} />
        </Switch>
      </Router>
    </div>
  )
}

export default withRouter(App)