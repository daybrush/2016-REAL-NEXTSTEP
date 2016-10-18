export const load = (url) => {
		return new Promise(function(resolve, reject) {
			const scriptElem = document.querySelector("[file-url=\""+url+"\"]");
			if(scriptElem) {
				console.log("ALREAY LOADED");
				return;
			}
            var script = document.createElement('script');
            script.src = url;
            script.setAttribute("file-url", url);

            script.addEventListener('load', function() {
                resolve(script);
            }, false);
            
             script.addEventListener('error', function() {
                reject(script);
            }, false);
            
            
            
            document.body.appendChild(script);
           })           
            
            
}