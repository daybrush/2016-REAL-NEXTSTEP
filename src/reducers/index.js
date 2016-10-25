import { combineReducers } from 'redux'
import CourseListPage from './CourseListPage'
import Apply from './Apply'
import Viewer from './Viewer'
import MyLectures from './MyLectures'
import ProfessorPage from './ProfessorPage'
import issue from './issue'
export default  combineReducers({
  Apply,
  CourseListPage,
  Viewer,
  MyLectures,
  ProfessorPage,
  issue
})
