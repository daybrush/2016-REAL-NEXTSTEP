import marked from 'marked';


export default function custommarked(mark) {
	//highlighter
	mark = mark.replace(/```(\S+)([^```]+)```/g, "<pre><code class='$1'>$2</code></pre>");
	
	
	return marked(mark);
}