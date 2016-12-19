import { PDFJS } from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker';

PDFJS.workerSrc = "/js/pdf.worker.js"
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

zoom = async function(nowPage, scale, pageElem) {
	this.scale = scale;
	for(let num in this.pages) {
		this.pages[num].scale = scale
	}
	await this.pages[nowPage].zoom(scale, pageElem);
}

_loadPage = async function(pageNumber, scale, pageElem) {
	const page = this.pages[pageNumber]
	await page.zoom(scale, pageElem)
}
loadPage = async function(pageNumber, scale, pageElem) {
	if(this.pages[pageNumber]) {
		this._loadPage(pageNumber, scale, pageElem);
		return;
	}
	const page = await this.pdfFile.getPage(pageNumber);
	this.pages[pageNumber] = new PDFPage(pageNumber, page);
	await this._loadPage(pageNumber, scale, pageElem);
	
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
	width = 0;
	height = 0;
	is_show = false;
	constructor(pageNumber, page) {
		this.pageNumber = pageNumber;
		this.page = page;
	}
	zoom = async function(scale = this.scale, pageElem) {
		this.scale = scale;
	
		await this.render(pageElem);
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
	render = async function(pageElem) {
		const self = this;
		const page = this.page;
		const scale = this.scale;
		
		

		const viewport = page.getViewport(scale);
		
	

		
		const {width, height} = viewport;
		this.width = width;
		this.height =  height;

	
		pageElem.style.width = width +"px";
		pageElem.style.height = height +"px";
		


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
