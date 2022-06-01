import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ListCampaignComponent from './components/ListCampaignComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCampaignComponent from './components/CreateCampaignComponent';
import UpdateCampaignComponent from './components/UpdateCampaignComponent';
import ViewCampaignComponent from './components/ViewCampaignComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListCampaignComponent}></Route>
                          <Route path = "/campaigns" component = {ListCampaignComponent}></Route>
                          <Route path = "/add-campaign/:CampaignID" component = {CreateCampaignComponent}></Route>
                          <Route path = "/view-campaign/:CampaignID" component = {ViewCampaignComponent}></Route>
                          {/* <Route path = "/update-campaign/:CampaignID" component = {UpdateCampaignComponent}></Route> */}
                    </Switch>
                </div>
			<FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
