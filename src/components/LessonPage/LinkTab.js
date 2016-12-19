import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import "./css/LinkTab.css"


class component extends Component {

getFileExt(filename) {
	return filename.split('.').pop();
}
render() {
   const codes = [].slice.call(document.querySelectorAll(".page-wrapper pre.hljs"));
	return (
		<div className="link-tab">
			<div className="link-wrapper">
				<ul>
					{this.props.attachments.map((attachment,i) => {
						const type = this.getFileExt(attachment.url)
						return (<li key={attachment.id}>
							<div className="link-icon">
								{}
							</div>
							<div className="link-content">
								<div className={"link-content-type type-" + type}>
									{type.toUpperCase()}
								</div>
								<p className="link-content-name">{attachment.url}</p>
								<p className="link-content-date">{attachment.date}</p>
								
							</div>
						</li>)
					
					})}
					{codes.map((pre,i) => {
						return (<li key={i} dangerouslySetInnerHTML={{__html:pre.outerHTML}} ></li>)
					})
					}
				</ul>
				<div className="upload-wrapper">
					<p className="glyphicon glyphicon-plus"></p>
					<p>업로드할 파일을 선택해주세요.</p>
				</div>
			</div>
		</div>
	)
    
}
}
export default (component)
