import React from 'react'
import { render } from 'react-dom'


import { Provider } from 'react-redux'
import App from './containers/App'

import { browserHistory, Router, Route, IndexRoute } from 'react-router'


import CoursePage from './pages/CoursePage'
import mainPage from './pages/mainPage'
//import ProfessorPage from './pages/ProfessorPage'
import SessionPage from './pages/SessionPage'




import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './reset.css';
 
import configureStore from './store/configureStore'
 
const store = configureStore();




render(
  <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/" component={App} store={store}>
    	<IndexRoute component={mainPage} />
      <Route path="/course/:id" component={CoursePage} />
      <Route path="/lecture/:lectureId" component={CoursePage} />
      <Route path="/session/:id" component={SessionPage} />            
      
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
)
