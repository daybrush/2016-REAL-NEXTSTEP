export default class PDFLoader {
fileName = "";
pdfFile = "";
constructor(fileName) {
	this.fileName = fileName;
	this.init();
}

renderTextLayer = (textLayerElem, viewport, textContent) => {
      let textDivs = [];
      let textLayerFrag = document.createDocumentFragment();
      let textLayerRenderTask = window.PDFJS.renderTextLayer({
        textContent: textContent,
        container: textLayerFrag,
        viewport: viewport,
        textDivs: textDivs,
      });
      textLayerRenderTask.promise.then(() => {
        textLayerElem.appendChild(textLayerFrag);
      });

}
loadPage = (pageNumber, pageElem) => {
	console.log(this, this.pdfFile);
	const self = this;
	this.pdfFile.getPage(pageNumber).then(function (page) {
		const scale = 2;
		const viewport = page.getViewport(scale);

		// Prepare canvas using PDF page dimensions.
		const canvas = pageElem.querySelector('.canvas-layer');
		const context = canvas.getContext('2d');
		const {width, height} = viewport;
		canvas.width = width;
		canvas.height = height;
		
		pageElem.style.width = width +"px";
		pageElem.style.height = height +"px";
		
		let textLayerElem = pageElem.querySelector(".text-layer");
		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		
		
		page.getTextContent().then(function (textContent) {
			self.renderTextLayer(textLayerElem, viewport, textContent);
		});
		page.render(renderContext);
	  
	});

}
init = () => {
	const self = this;
	return window.PDFJS.getDocument(this.fileName).then(pdf => {
	    self.pdfFile = pdf;
	    
	    return pdf;
    });
	
}
	
}