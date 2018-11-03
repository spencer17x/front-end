---
title: 实现pdf预览功能(适用于安卓微信内置浏览器)
date: 2018-11-03 22:56:20
tags:
	- 2018.11
categories:
        - JavaScript
---

在做微信公众号网页的时候，发现 pdf 在 ios 可以实现预览功能，然而安卓机的情况下会自动跳转到其他浏览器去下载 pdf，通过 pdf.js 可以实现安卓也可以在微信内置浏览器中正常预览 pdf 。

首先需要 pdf.js 和 pdf.work.js 文件。

```html
通过 script 引入 pdf.js 文件，然后在 pdf.js 修改引入 pdf.work.js 文件的路径。
<script src="pdf.js"></script>
```

然后就是实现功能的代码了：

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Show PDF</title>
        <meta charset="utf-8"/>
        <script type="text/javascript" src='pdf.js'></script>
        <style type="text/css">
            html,body {
                width: 100%;
                margin: 0;
                padding: 0;
                background-color: #444;
            }

            body {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
            }
        </style>
    </head>
    <body></body>
    <script type="text/javascript">
        
        
	PDFJS.getDocument('https://xcx.alicdn2.hexiaoxiang.com/dev-norms/xxxx.pdf').then(pdf => {
		var numPages = pdf.numPages;
		var start = 1;
		renderPageAsync(pdf, numPages, start);
	});
	
	function renderPage(pdf, numPages, current){
		console.log("renderPage");
		pdf.getPage(current++).then(page => {
			//console.log('page', page);
			//page.getTextContent().then(v => console.log(v));
      		var scale = 1.5;
      		var viewport = page.getViewport(scale);
      		// Prepare canvas using PDF page dimensions.
      		var canvas = document.createElement("canvas");
      		var context = canvas.getContext('2d');
      		document.body.appendChild(canvas);
      		
      		canvas.height = viewport.height;
      		canvas.width = viewport.width;

      		// Render PDF page into canvas context.
      		var renderContext = {
        			canvasContext: context,
        			viewport: viewport
      		};
      		page.render(renderContext);
      		
      		//next
      		if(current<=numPages)return renderPage(pdf, numPages, current);
		});
	}
	
	async function renderPageAsync(pdf, numPages, current){
		console.log("renderPage async");
		for(let i=1; i<=numPages; i++){
			// page
			let page = await pdf.getPage(i);
			
      		let scale = 1.5;
      		let viewport = page.getViewport(scale);
      		// Prepare canvas using PDF page dimensions.
      		let canvas = document.createElement("canvas");
      		let context = canvas.getContext('2d');
      		document.body.appendChild(canvas);
      		
      		canvas.height = viewport.height;
      		canvas.width = viewport.width;

      		// Render PDF page into canvas context.
      		let renderContext = {
        			canvasContext: context,
        			viewport: viewport
      		};
      		page.render(renderContext);
		}
	}
    </script>
</html>

```

