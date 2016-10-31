import React from 'react'
import { render } from 'react-dom'


import { Provider } from 'react-redux'
import App from './containers/App'

import { browserHistory, Router, Route, IndexRoute } from 'react-router'


import LectureListPage from './pages/LectureListPage'
import mainPage from './pages/mainPage'
import ProfessorPage from './pages/ProfessorPage'
import Session from './pages/Session'




import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
 
import configureStore from './store/configureStore'
 
const store = configureStore();




render(
  <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/" component={App} store={store}>
    	<IndexRoute component={mainPage} />
      <Route path="/course/:id" component={LectureListPage} />
      <Route path="/view/:lectureId" component={LectureListPage} />      
      <Route path="/professor/:professorId" component={ProfessorPage} />            
      <Route path="/session/:id" component={Session} />            
      
    </Route>
  </Router>
  </Provider>,
  document.getElementById('root')
)
