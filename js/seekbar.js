/**
 * DHTMLGoodies.com - Seekbar
 * Author: Alf Magne Kalleland, DHTMLGoodies.com, July 2015
 * License:: https://www.apache.org/licenses/LICENSE-2.0
 */
if(!Seekbar)var Seekbar = {};

Seekbar.Seekbar = function(config){
    config = config || {};

    var props = ["minValue","maxValue","value", "valueListener","negativeColor","positiveColor","needleSize","barSize"];
    for(var i=0;i<props.length;i++){
        var key = props[i];
        if(config[key] != undefined)this[key] = config[key];
    }


    if(config.renderTo != undefined)this.renderTo = $(config.renderTo);

    if(config.thumbColor != undefined){
        if(config.thumbColor.length == 9){
            var alpha = config.thumbColor.substr(1,2);
            this.thumbAlpha = parseInt(alpha,16) / 255;
            config.thumbColor = "#" + config.thumbColor.substr(3);
        }
        this.thumbColor = config.thumbColor;
    }


    this.render();
};

$.extend(Seekbar.Seekbar.prototype, {
    thumbAlpha : 1,
    renderTo:undefined,
    negativeColor : '#ffff1a',
    positiveColor : '#ccc',
    thumbColor : '#ffff1a',

    minValue : 0,
    maxValue : 10,
    value: 0,

    barSize: 20,

    el : undefined,
    elNegative : undefined,
    elPositive: undefined,

    thumb:undefined,
    thumbInner:undefined,
    thumbOuter:undefined,
    needleSize: 0.2,

    area : { width: 0, height: 0, max:0 },
    valueArea: { min: 0, max: 0, width:0 },

    orientation : undefined,
    thumbSize : 0,
    isActive : false,

    startCoordinates:undefined,

    valueListener:undefined,


    render:function(){
        this.el = $('<div class="dhtmlgoodies-seekbar" style="position:relative;height:100%"></div>');

        this.renderTo.append(this.el);

        this.area.width = this.el.width();
        this.area.height = this.el.height();
        this.area.size = Math.max(this.area.width, this.area.height);

        this.orientation = this.area.width >= this.area.height ? 'horizontal' : 'horizontal';

        this.elNegative = $('<div class="seekbar-negative" style="position:absolute;z-index:1" ></div>');
        this.elPositive = $('<div class="seekbar-positive" style="position:absolute;z-index:1" ></div>');

        if(this.negativeColor != undefined){
            this.elNegative.css("background-image","url('img/ptrn.gif')");
        }
        if(this.positiveColor != undefined){
            this.elPositive.css("background-color", this.positiveColor);
        }


        this.thumb = $('<div style="position:absolute;z-index:2"></div>');
        this.thumbInner = $('<div class="seekbar-thumb-needle" style="position:absolute;z-index:2;"></div>');
        this.thumbOuter = $('<div id="myNeedle" class="seekbar-thumb" style="position:absolute;z-index:2;height:100%;margin-left:10px;background-size:contain;background-image:url('+"'img/rocket.png'"+');background-repeat:no-repeat;"></div>');

		
        this.updateAlpha();

        this.thumb.append(this.thumbInner);
        this.thumb.append(this.thumbOuter);


        this.el.append(this.elNegative);
        this.el.append(this.elPositive);
        this.el.append(this.thumb);

		this.positionItems();
    },

    setValue:function(value){
        this.value = Math.max(this.minValue, value);
        this.value = Math.min(this.maxValue, this.value);

        this.positionBars();
        this.positionThumb();
    },

    positionItems:function(){
        this.thumbSize = Math.min(this.area.height, this.area.width);
        this.thumbSize += this.thumbSize % 2;
        var size = Math.max(this.area.width, this.area.height);

        this.thumbOuter.css({
           'width' : this.thumbSize, 'height' : this.thumbSize});
        this.thumb.css({
           'width' : this.thumbSize, 'height' : this.thumbSize});

        var needleSize = Math.round(this.thumbSize * this.needleSize);
        needleSize += needleSize % 2;
        var pos = (this.thumbSize / 2) - (needleSize / 2);

        this.thumbInner.css({
            width: needleSize, height: needleSize, borderRadius: needleSize / 2, left: pos, top:pos
        });


        this.valueArea.min = this.thumbSize / 2;
        this.valueArea.max = size - this.thumbSize / 2;
        this.valueArea.size = $('.container').width() - 50;

        var barPos = (this.thumbSize / 2) - (this.barSize / 2);
        if(this.orientation == 'horizontal'){

            this.elNegative.css({
                "left" : this.valueArea.min, top: barPos, height: this.barSize
            });
            this.elPositive.css({
                "left" : this.valueArea.min, top: barPos, height: this.barSize
            });
        }else{

            this.elNegative.css({
                "top": 0, width: this.barSize, left: barPos
            });

            this.elPositive.css({
                "top": this.valueArea.min, width: this.barSize, left: barPos
            });
        }
        var br = Math.floor(this.barSize / 2) + this.barSize % 2;

        this.elNegative.css("border-radius", br);
        this.elPositive.css("border-radius", br);

        this.positionBars();
        this.positionThumb();

    },


    positionThumb:function(){
        var pos = this.getValuePos();
        if(this.orientation == 'horizontal'){
            this.thumb.css("left", pos);
        }else{
            this.thumb.css("top", pos);
        }
    },

    positionBars:function(){
        var pos = this.getValuePos();

        if(this.orientation == 'horizontal'){
            console.log("Position:"+pos);
            console.log("Position:"+this.valueArea.size);
            this.elNegative.css("width", pos);
            this.elPositive.css({ "left" : pos + this.valueArea.min, "width": this.valueArea.size - pos});

        }else{
            this.elPositive.css("height", pos);
            this.elNegative.css({
                top:pos + this.valueArea.min,
                height: this.valueArea.size - pos
            });
        }

    },

    getValuePos:function(){
        if(this.orientation == 'horizontal'){
            return (this.valueArea.size * (this.value - this.minValue) / this.maxValue);
        }else{
            return this.valueArea.max - (this.valueArea.min + (this.valueArea.size * (this.value - this.minValue) / this.maxValue));
        }
    },

    startDragging:function(e){
        this.thumbOuter.css("opacity", "");
        this.thumbOuter.addClass("seekbar-thumb-over");
        this.active = true;

        var position = this.thumb.position();

        var x = e.pageX;
        var y = e.pageY;

        if(e.type && e.type == "touchstart"){
            x = e.originalEvent.touches[0].pageX;
            y = e.originalEvent.touches[0].pageY;
        }

        this.startCoordinates = { x : x, y: y, elX : position.left, elY: position.top };

        return false;
    },

    drag:function(e){
        if(!this.active)return;

        var x = e.pageX;
        var y = e.pageY;

        if(e.type && e.type == "touchmove"){
            x = e.originalEvent.touches[0].pageX;
            y = e.originalEvent.touches[0].pageY;
        }

        var pos = 0;
        if(this.orientation == 'horizontal') {
            pos = this.startCoordinates.elX + x - this.startCoordinates.x;

        }else{
            pos = this.startCoordinates.elY + y - this.startCoordinates.y;
        }


        if (pos < 0)pos = 0;
        if (pos > this.area.size - this.thumbSize)pos = this.area.size - this.thumbSize;

        this.value = this.minValue + (pos / this.valueArea.size * (this.maxValue-this.minValue));

        if(this.orientation == 'vertical'){
            this.value = this.maxValue - this.value;
        }

        if (this.valueListener != undefined) {
            this.valueListener.call(this, this.value);
        }

        this.positionBars();

        if(this.orientation == 'horizontal'){

            this.thumb.css("left", this.getValuePos());
        }else{
            this.thumb.css("top", this.getValuePos());
        }

        return false;
    },

    updateAlpha:function(){
        if(this.thumbAlpha < 1){
            this.thumbOuter.css("opacity", this.thumbAlpha);
        }
    },

    endDrag:function(){
        if(!this.active)return;

        this.updateAlpha();

        this.thumbOuter.removeClass("seekbar-thumb-over");

        this.active = false;
    }


});