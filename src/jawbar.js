/*globals document, window*/
(function () {'use strict';

function JawBar(sel, options) {
    var that = this;
    this.visible = false;
    this.html = {};
    this.parent = document.querySelector(sel);
    this.parent.addEventListener('keyup', function(e){
        that.findMatch(e);
    });
    this.init();
    if (options) {
        this.add(options);
    }
}

JawBar.prototype.init = function() {
    var that = this;
    var div = this.html.div = document.createElement('div');
    var button = this.html.button = document.createElement('input');
    
    // Set our styles, positioning, etc.
    // The text box we are converting
    this.parent.style.position = 'relative';
    this.parent.setAttribute('autocomplete', 'off');
    
    // Combo Div.  Container for the options
    div.className = 'jawbar-optionContainer';

    // Create a button for dropdown
    button.type = 'button';
    button.className = 'jawbar-dropdownButton';
    button.addEventListener('click', function() {
        if (that.visible) {
            that.hide();
        }
        else {
            that.show();
        }
    });
    
    document.body.appendChild(button);
    document.body.appendChild(div);
    
    this.position();
};

JawBar.prototype.position = function() {
    // Todo: use CSSOM to determine base style
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
    if (typeof options.length === 'number') {
        options.forEach(function (option) {
            this.add(option);
        }, this);
        return;
    }
    var that = this;
    var item = document.createElement('div');
    item.className = 'jawbar-menuitem';
    var imageDiv = document.createElement('div');
    imageDiv.className = 'jawbar-imageContainer';
    var image = document.createElement('img');
    image.className = 'jawbar-menuitem-icon';
    var text = document.createElement('div');
    text.className = 'jawbar-menuitem-text';
    var subText = document.createElement('div');
    subText.className = 'jawbar-menuitem-subText';
    // Todo: change to properly-namespaced dataset properties
    item.displayValue = options.displayValue;
    item.searchValue = options.searchValue;

    image.src = options.icon;
    text.appendChild(document.createTextNode(options.text));
    subText.appendChild(document.createTextNode(options.subtext));
    imageDiv.appendChild(image);
    item.appendChild(imageDiv);
    item.appendChild(text);
    item.appendChild(subText);
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
