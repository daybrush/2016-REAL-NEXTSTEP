import { PDFJS } from 'pdfjs-dist';


export default class PDFLoader {
fileName = "";
pdfFile = "";
textContentsElements = {};
pages = {};
scale = 1;
numPages = 0;
loadPageCount = 0;

constructor(fileName) {
	this.fileName = fileName;
}
addZoom = async function() {
	await this.zoom(this.scale + 0.2);
}
minusZoom = async function() {
	await this.zoom(this.scale - 0.2);
}
zoom = async function(scale) {
	this.scale = scale;
	for(let pageNumber in this.pages) {
		await this.pages[pageNumber].zoom(scale);
	}
}

_loadPage = async function(pageNumber, pageElem) {
	const page = this.pages[pageNumber];
	await page.render();
}
loadPage = async function(pageNumber, pageElem) {
	if(this.pages[pageNumber]) {
		this._loadPage(pageNumber, pageElem);
		return;
	}
	const page = await this.pdfFile.getPage(pageNumber);
	this.pages[pageNumber] = new PDFPage(pageNumber, pageElem, page);
	await this._loadPage(pageNumber, pageElem);
	
	this.loadPageCount++;
}

isFinishLoad = function() {
	return this.numPages > 0 && this.numPages === this.loadPageCount;
}

getPage = (pageNumber) => {
	return this.pages[pageNumber];
}

init = async function() {
	const pdf = await PDFJS.getDocument(this.fileName);
    this.pdfFile = pdf;
    this.numPages = pdf.numPages;	
}
	
}




class PDFPage {
	scale = 1;
	textContent
	textContentsText;
	pageNumber = 1;
	page = "";
	pageElem = "";
	width = 0;
	height = 0;
	is_show = false;
	constructor(pageNumber, pageElem, page) {
		this.pageNumber = pageNumber;
		this.page = page;
		this.pageElem = pageElem;
	}
	zoom = async function(scale = this.scale) {
		this.scale = scale;
	
		await this.render();
	}
	
	show = () => {
		if(this.is_show)
			return;
			
		this.is_show = true;
		this.render();
		
		this.pageElem.classList.remove("hide-page");
	}
	
	hide = () => {
		if(!this.is_show)
			return;
			
		this.is_show = false;
		
		this.pageElem.classList.add("hide-page");
	}
	_renderTextLayer = (textLayerElem) => {
		//pageElem.appe
		if(textLayerElem.children.length === 0)
			textLayerElem.innerHTML = this.textContentsText;
			
			
		textLayerElem.style.transform = "scale(" + this.scale +")";
	}
	renderTextLayer = (textLayerElem, viewport, textContent) => {
      let textDivs = [];
      let textLayerFrag = document.createDocumentFragment();
      let textLayerRenderTask = PDFJS.renderTextLayer({
        textContent: textContent,
        container: textLayerFrag,
        viewport: viewport,
        textDivs: textDivs,
      });
      const self = this;
      textLayerRenderTask.promise.then(() => {
        textLayerElem.appendChild(textLayerFrag);
        self.textContentsText = textLayerElem.innerHTML;
      });



      }
	render = async function(scale = this.scale) {
		const self = this;
		const page = this.page;
		const pageElem = this.pageElem;
		
		
		const viewport = page.getViewport(scale);
		
	

		
		const {width, height} = viewport;
		this.width = width;
		this.height =  height;

	
		pageElem.style.width = width +"px";
		pageElem.style.height = height +"px";
		
		if(!this.is_show)
			return;


		const canvas = pageElem.querySelector('.canvas-layer');
		const context = canvas.getContext('2d');
		
		
		canvas.width = width;
		canvas.height = height;

		
		
		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		
		
		let textLayerElem = pageElem.querySelector(".text-layer");		
		if(this.textContentsText) {
			this._renderTextLayer(textLayerElem);
		} else {
			const textContent = await page.getTextContent();
			this.renderTextLayer(textLayerElem, viewport, textContent);
		}
		page.render(renderContext);	
	}
}
