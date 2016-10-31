import { combineReducers } from 'redux'
import CourseListPage from './CourseListPage'
import Apply from './Apply'
import Viewer from './Viewer'
import MyLectures from './MyLectures'
import ProfessorPage from './ProfessorPage'
import Session from './session'
export default  combineReducers({
  Apply,
  CourseListPage,
  Viewer,
  MyLectures,
  ProfessorPage,
  Session
})
