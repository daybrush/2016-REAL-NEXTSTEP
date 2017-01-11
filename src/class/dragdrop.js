
export default class DragDrop {
	
	constructor(selector) {
		this.selector = selector;
	}
	clonNode = ""
	selector = ""
	
	dragstart = (e, parent, content, ) => {
		const {width, height, top, left} = content.getBoundingClientRect();	
		parent.style.width = width  + "px";
		parent.style.height = height  + "px";
		
		this.cloneNode = parent.cloneNode(true);
		document.body.appendChild(this.cloneNode);
		this.cloneNode.style.left = "-1000px";
		this.cloneNode.style.position="absolute";
	
		e.dataTransfer.setDragImage(this.cloneNode, e.clientX - left, e.clientY - top + 40);
	
		this.cloneNode.classList.add("dragmove");
		parent.setAttribute("isdrag", 1);
		
		e.stopPropagation();
	
	}
	dragover = (e, parent, content) => {
		e.preventDefault();
		e.stopPropagation();
		
		const target = document.querySelector(this.selector + "[isdrag='1']")
		if(target && parent !== target) {

			console.log("SWAP");
			let elem = target;
			 do {
	            elem = elem.nextSibling;
	        } while (elem && elem !== parent);
	        
	        const position = elem === parent ? "afterend" : "beforebegin";
	        parent.insertAdjacentElement(position, target);
	        
		}

	}
	dragend = (e, parent, content) => {
		this.cloneNode.remove();
		this.cloneNode = "";
		parent.removeAttribute("isdrag");
	}
}