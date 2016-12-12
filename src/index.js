import React from 'react'
import { render } from 'react-dom'


import { Provider } from 'react-redux'
import App from './containers/App'

import { browserHistory, Router, Route, IndexRoute } from 'react-router'


import CoursePage from './pages/CoursePage'
import mainPage from './pages/mainPage'
//import ProfessorPage from './pages/ProfessorPage'
import LessonPage from './pages/LessonPage'
import Apply from './pages/Apply'




import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './reset.css';
 
import configureStore from './store/configureStore'
 
 
import StoreSession from "./class/StoreSession"


const store = configureStore();
StoreSession.setStore("store", store)
var redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
	window.history.replaceState(null, null, redirect);
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/" component={App} store={store}>
		<IndexRoute component={mainPage} />
		<Route path="/apply" component={Apply} />
		<Route path="/:course/:session/lesson/:id" component={LessonPage} />
		<Route path="/:course" component={CoursePage} />
		<Route path="/:course/:session" component={CoursePage} />
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
)
