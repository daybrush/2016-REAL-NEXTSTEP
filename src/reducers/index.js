import { combineReducers } from 'redux'
import CoursePage from './CoursePage'
import Apply from './Apply'
import LecturePage from './LecturePage'
import MyCourses from './MyCourses'
import ProfessorPage from './ProfessorPage'
import Lesson from './Lesson'
import Login from './Login'
export default  combineReducers({
  Apply,
  CoursePage,
  LecturePage,
  MyCourses,
  ProfessorPage,
  Lesson,
  Login
})
