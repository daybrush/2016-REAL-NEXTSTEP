import marked from 'marked';


export default function custommarked(mark) {
	//highlighter
	mark = mark.replace(/```([a-zA-Z0-9.-]+)([^```]+)```/g, "<pre class=\"hljs hljs-wrapper\"><div class=\"hljs-tip\">$1</div><code class='$1'>$2</code></pre>");
	mark = mark.replace(/\[goto:([^:]+):([^\]]+)\]/g, "<a href=\"#\" class=\"mark-goto\" filename=\"$1\" position=\"$2\">$1 $2</a>");
	
	return marked(mark);
}