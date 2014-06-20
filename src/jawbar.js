/*globals document, window*/
(function () {'use strict';

function JawBar(id) {
    var that = this;
    this.visible = false;
    this.html = {};
    this.parent = document.getElementById(id);
    this.parent.addEventListener('keyup', function(e){
        that.findMatch(e);
    });
    this.init();
}

JawBar.prototype.init = function() {
    var that = this;
    this.html.div = document.createElement('div');
    this.html.button = document.createElement('input');
    
    // Set our styles, positioning, etc.
    // The text box we are converting
    this.parent.style.position = 'relative';
    this.parent.setAttribute('autocomplete', 'off');
    
    // Combo Div.  Container for the options
    var divStyle = this.html.div.style;
    divStyle.position = 'absolute';
    divStyle.visibility = 'hidden';
    divStyle.zIndex = '101';
    divStyle.backgroundColor = '#ffffff';
    divStyle.border = '1px solid #000000';
    divStyle.overflow = 'auto';

    // Create a button for dropdown
    var button = this.html.button;
    var buttonStyle = button.style;
    button.type = 'button';
    buttonStyle.position = 'absolute';
    buttonStyle.border = '0px';
    buttonStyle.width = '5px';
    buttonStyle.background = 'url(../src/images/down.png) center no-repeat';
    buttonStyle.cursor = 'pointer';
    button.addEventListener('click', function() {
        if (that.visible) {
            that.hide();
        }
        else {
            that.show();
        }
    });
    
    document.body.appendChild(button);
    document.body.appendChild(this.html.div);
    
    this.position();
};

JawBar.prototype.position = function() {
    var divStyle = this.html.div.style;
    divStyle.height = 200 + 'px';
    divStyle.width = this.parent.offsetWidth + 'px';
    divStyle.top = this.parent.offsetTop + this.parent.offsetHeight + 'px';
    divStyle.left = this.parent.offsetLeft + 'px';
    var buttonStyle = this.html.button.style;
    buttonStyle.height = this.parent.offsetHeight + 'px';
    buttonStyle.top = this.parent.offsetTop + 'px';
    buttonStyle.left = this.parent.offsetLeft + this.parent.offsetWidth - 15 + 'px';
};

JawBar.prototype.show = function() {
    this.html.div.style.visibility = 'visible';
    this.visible = true;
};

JawBar.prototype.add = function(options) {
    var that = this;
    var item = document.createElement('div');
    var imageDiv = document.createElement('div');
    var image = document.createElement('img');
    var text = document.createElement('div');
    var subText = document.createElement('div');
    item.style.backgroundColor = '#ffffff';
    item.displayValue = options.displayValue;
    item.searchValue = options.searchValue;
    item.style.cursor = 'pointer';
    item.style.borderBottom = '1px solid #e0e0e0 ';
    var imageDivStyle = imageDiv.style;
    imageDivStyle.fontSize = '0px';
    imageDivStyle.padding = '2px';
    imageDivStyle.cssFloat = 'left';
    imageDivStyle.styleFloat = 'left';
    imageDivStyle.width = '16px';
    image.style.verticalAlign = 'top';
    image.src = options.icon;
    image.style.border = '0px';
    text.style.fontSize = '15pt';
    text.innerHTML = options.text;
    subText.style.fontSize = '10pt';
    subText.style.fontStyle = 'italic';
    subText.innerHTML = options.subtext;
    imageDiv.appendChild(image);
    item.appendChild(imageDiv);
    item.appendChild(text);
    item.appendChild(subText);
    item.addEventListener('mouseover', function() {
        item.style.backgroundColor = '#0099ff';
        item.style.color = '#ffffff';
    });
    item.addEventListener('mouseout', function () {
        item.style.backgroundColor = '#ffffff';
        item.style.color = '#000000';
    });
    item.addEventListener('click', function () {
        that.parent.value = item.displayValue;
        that.hide();
    });
    this.html.div.appendChild(item);
    imageDiv.style.height = item.offsetHeight - 10 + 'px';
};

JawBar.prototype.hide = function () {
    this.visible = false;
    this.html.div.style.visibility = 'hidden';
};

JawBar.prototype.findMatch = function (e) {
    var evnt = e || window.event;
    if (!this.visible) {
        this.show();
    }
    var items = this.html.div.children;
    for (var i = 0, l = items.length; i < l; i++) {
        if (items[i].searchValue.indexOf(this.parent.value) > -1) {
            items[i].style.display = 'block';
        }
        else {
            items[i].style.display = 'none';
        }
    }
};

JawBar.prototype.remove = function(index) {
    var div = this.html.div;
    if (typeof index === 'number') {
        div.removeChild(div.childNodes[index]);
        return;
    }
    while(this.html.div.firstChild) {
        div.removeChild(div.firstChild);
    }
};

window.JawBar = JawBar;

}());
