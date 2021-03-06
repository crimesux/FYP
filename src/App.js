import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListUserComponent from './components/ListUserComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import ListCampaignComponent from './components/ListCampaignComponent';
import CreateCampaignComponent from './components/CreateCampaignComponent';
import UpdateCampaignComponent from './components/UpdateCampaignComponent';
import ViewCampaignComponent from './components/ViewCampaignComponent';
import OptionsComponent from './components/OptionsComponent';
import ResultComponent from './components/ResultComponent';
import vote from './components/vote';
import VoterListComponent from './components/VoterListComponent';
import View from './components/view';
function App() {
  
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                    <Route path = "/" exact component = {ListCampaignComponent}></Route>
                          <Route path = "/users" component = {ListUserComponent}></Route>
                          <Route path = "/add-user/:id" component = {CreateUserComponent}></Route>
                          <Route path = "/view-user/:id" component = {ViewUserComponent}></Route>
                          <Route path = "/update-user/:id" component = {UpdateUserComponent}></Route> 
                          <Route path = "/campaigns" component = {ListCampaignComponent}></Route>
                          <Route path = "/add-campaign/:id" component = {CreateCampaignComponent}></Route>
                          <Route path = "/view-campaign/:id" component = {ViewCampaignComponent}></Route>
                          <Route path = "/update-campaign/:id" component = {UpdateCampaignComponent}></Route>
                          <Route path = "/options/:id" component = {OptionsComponent}></Route>
                          <Route path = "/result/:id" component = {ResultComponent}></Route>
                          <Route path = "/vote/:id" component = {vote}></Route> 
                          <Route path = "/voter-list/:id" component = {VoterListComponent}></Route> 
                          <Route path = "/view/:id/:userid" component = {View}></Route>      
                    </Switch>
                </div>
        </Router>
    </div>
    
  );
}

export default App;