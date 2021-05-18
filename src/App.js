import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Nomad } from './pages/Nomad'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import InterviewQuest from './pages/InterviewQuest'




export function App() {
  
  return (
    <div className="app" >
      <Router>
          <Switch>
            <Route path="/profile/:id" component={Profile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login"  component={Login} />
            {/* <Route path="/groups" component={Groups} /> */}
            <Route path="/interview" component={InterviewQuest} />
            <Route path="/" component={Nomad} />
          </Switch>
      </Router>
    </div>
  )
}