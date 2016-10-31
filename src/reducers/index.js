import { combineReducers } from 'redux'
import LectureListPage from './LectureListPage'
import Apply from './Apply'
import Viewer from './Viewer'
import MyCourses from './MyCourses'
import ProfessorPage from './ProfessorPage'
import Session from './session'
export default  combineReducers({
  Apply,
  LectureListPage,
  Viewer,
  MyCourses,
  ProfessorPage,
  Session
})
