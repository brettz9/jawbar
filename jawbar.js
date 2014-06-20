//Copyright (c) 2008 Lewis Linn White Jr.
//Author: Lewis Linn White Jr.

//Permission is hereby granted, free of charge, to any person
//obtaining a copy of this software and associated documentation
//files (the "Software"), to deal in the Software without
//restriction, including without limitation the rights to use,
//copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the
//Software is furnished to do so, subject to the following
//conditions:

//The above copyright notice and this permission notice shall be
//included in all copies or substantial portions of the Software.
//Except as contained in this notice, the name(s) of the above 
//copyright holders shall not be used in advertising or otherwise 
//to promote the sale, use or other dealings in this Software without 
//prior written authorization.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
//OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//OTHER DEALINGS IN THE SOFTWARE.

//Icons used in this project are graciously provided by the Silk icons set:
//http://www.famfamfam.com/lab/icons/silk/

function jawBar(id)
{
	var that = this;
	this.parent = document.getElementById(id);
	this.visible = false;
	this.html = {};
	this.parent.onkeyup = function(e){that.findMatch(e)};
	this.init();
}

jawBar.prototype.init = function()
{
	var that = this;
	this.html.div = document.createElement('div');
	this.html.iframe = document.createElement('iframe');
	this.html.button = document.createElement('input');
	
	//Set our styles, positioning, etc.
	//The text box we are converting
	this.parent.style.position = 'relative';
	this.parent.setAttribute('autocomplete', 'off');
	
	//Combo Div.  Container for the options
	this.html.div.style.position = 'absolute';
	this.html.div.style.visibility = 'hidden';
	this.html.div.style.zIndex = '101';
	this.html.div.style.backgroundColor = '#ffffff';
	this.html.div.style.border = '1px solid #000000';
	this.html.div.style.overflow = 'auto';

	//Combo Frame.  Used to hide form elements in IE
	this.html.iframe.style.position = 'absolute';
	this.html.iframe.style.visibility = 'hidden';
	this.html.iframe.style.zIndex = '100';
	this.html.iframe.src = 'javascript:void(0)';
	this.html.iframe.frameBorder = '0';
	
	//create a button for dropdown
	this.html.button.type = 'button';
	this.html.button.style.position = 'absolute';
	this.html.button.style.border = '0px';
	this.html.button.style.width = '5px';
	this.html.button.style.background = 'url(down.png) center no-repeat';
	this.html.button.style.cursor = 'pointer';
	this.html.button.onclick = function()
								{
									if(that.visible)
									{
										that.hide();
									}
									else
									{
										that.show();
									}
								};
	
	document.body.appendChild(this.html.button);
	document.body.appendChild(this.html.div);
	document.body.appendChild(this.html.iframe);
	
	this.position();
};

jawBar.prototype.position = function()
{
	this.html.div.style.height = 200 + 'px';
	this.html.div.style.width = this.parent.offsetWidth + 'px';
	this.html.div.style.top = this.parent.offsetTop + this.parent.offsetHeight + 'px';
	this.html.div.style.left = this.parent.offsetLeft + 'px';
	this.html.iframe.style.width = this.parent.offsetWidth + 'px';
	this.html.iframe.style.height =  200 - 1 + 'px';
	this.html.iframe.style.top = this.parent.offsetTop + this.parent.offsetHeight + 'px';
	this.html.iframe.style.left = this.parent.offsetLeft + 'px';
	this.html.button.style.height = this.parent.offsetHeight + 'px';
	this.html.button.style.top = this.parent.offsetTop + 'px';
	this.html.button.style.left = this.parent.offsetLeft + this.parent.offsetWidth - 15 + 'px';
};

jawBar.prototype.show = function()
{
	this.html.div.style.visibility = 'visible';
	this.html.iframe.style.visibility = 'visible';
	this.visible = true;
};

jawBar.prototype.add = function(options)
{
	var that = this;
	var item = document.createElement('div');
	var imageDiv = document.createElement('div');
	var image = document.createElement('img')
	var text = document.createElement('div');
	var subText = document.createElement('div');
	item.style.backgroundColor = '#ffffff';
	item.displayValue = options.displayValue;
	item.searchValue = options.searchValue;
	item.style.cursor = 'pointer';
	item.style.borderBottom = '1px solid #e0e0e0 ';
	imageDiv.style.fontSize = '0px';
	imageDiv.style.padding = '2px';
	imageDiv.style.cssFloat = 'left';
	imageDiv.style.styleFloat = 'left';
	imageDiv.style.width = '16px';
	image.style.verticalAlign = 'top';
	image.src = options.icon;
	image.style.border = '0px';
	text.style.fontSize = '15pt';
	text.innerHTML = options.text
	subText.style.fontSize = '10pt';
	subText.style.fontStyle = 'italic';
	subText.innerHTML = options.subtext;
	imageDiv.appendChild(image)
	item.appendChild(imageDiv);
	item.appendChild(text);
	item.appendChild(subText);
	item.onmouseover = function()
	{
		item.style.backgroundColor = '#0099ff';
		item.style.color = '#ffffff';
	};
	item.onmouseout = function()
	{
		item.style.backgroundColor = '#ffffff';
		item.style.color = '#000000';
	};
	item.onclick = function()
	{
		that.parent.value = item.displayValue;
		that.hide();
	};
	this.html.div.appendChild(item);
	imageDiv.style.height = item.offsetHeight - 10 + 'px';
};

jawBar.prototype.hide = function()
{
	this.visible = false;
	this.html.div.style.visibility = 'hidden';
	this.html.iframe.style.visibility = 'hidden';
};

jawBar.prototype.findMatch = function(e)
{
	var evnt = e || window.event;
	if(!this.visible)
	{
		this.show();
	}
	var items = this.html.div.childNodes;
	for(var i = 0, e = items.length; i < e; i++)
	{
		if(items[i].searchValue.indexOf(this.parent.value) > -1)
		{
			items[i].style.display = 'block';
		}
		else
		{
			items[i].style.display = 'none';
		}
	}
}

jawBar.prototype.remove = function(index)
{
	if(typeof index == 'number')
	{
		this.html.div.removeChild(this.html.div.childNodes[index]);
		return;
	}
	while(this.html.div.firstChild)
	{
		this.html.div.removeChild(this.html.div.firstChild);
	}
}