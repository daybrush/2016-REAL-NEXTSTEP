import marked from 'marked';


export default function custommarked(mark) {
	//highlighter
	mark = mark.replace(/```([a-zA-Z0-9.-]+)([^```]+)```/g, "<pre class=\"hljs-wrapper\"><div class=\"hljs-tip\">$1</div><code class='$1'>$2</code></pre>");
	
	
	return marked(mark);
}