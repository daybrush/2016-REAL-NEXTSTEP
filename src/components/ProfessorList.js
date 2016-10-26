import React, { Component } from 'react'
import ProfessorBoard from './ProfessorBoard'

export default class ProfessorList extends Component {


  render() {
    const { instructors } = this.props

    return (
        <div className="professor-list">
          {instructors.map(instructor =>
            <ProfessorBoard instructor={instructor} key={instructor.id} />
          )}
        </div>
    )
  }
}
