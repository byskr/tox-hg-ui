(function($,undefined ) {var uuid =0,runiqueId =/^ui-id-\d+$/;

$.ui =$.ui ||{};if ($.ui.version ) {return;}
$.extend($.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38
}
});$.fn.extend({_focus:$.fn.focus,focus:function(delay,fn ) {return typeof delay ==="number"?this.each(function() {var elem =this;setTimeout(function() {$(elem ).focus();if (fn ) {fn.call(elem );}
},delay );}) :this._focus.apply(this,arguments );},scrollParent:function() {var scrollParent;if (($.ui.ie &&(/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
scrollParent =this.parents().filter(function() {return (/(relative|absolute|fixed)/).test($.css(this,'position')) && (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
}).eq(0);} else {scrollParent =this.parents().filter(function() {return (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
}).eq(0);}
return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
},zIndex:function(zIndex ) {if (zIndex !==undefined ) {return this.css("zIndex",zIndex );}
if (this.length ) {var elem =$(this[0 ] ),position,value;while (elem.length &&elem[0 ] !==document ) {position =elem.css("position");if (position ==="absolute"||position ==="relative"||position ==="fixed") {value =parseInt(elem.css("zIndex"),10 );if (!isNaN(value ) &&value !==0 ) {return value;}
}
elem =elem.parent();}
}
return 0;},uniqueId:function() {return this.each(function() {if (!this.id ) {this.id ="ui-id-"+ (++uuid);}
});},removeUniqueId:function() {return this.each(function() {if (runiqueId.test(this.id ) ) {$(this ).removeAttr("id");}
});}
});function focusable(element,isTabIndexNotNaN ) {var map,mapName,img,nodeName =element.nodeName.toLowerCase();if ("area"===nodeName ) {map =element.parentNode;mapName =map.name;if (!element.href ||!mapName ||map.nodeName.toLowerCase() !=="map") {return false;}
img =$("img[usemap=#"+ mapName + "]")[0];return !!img &&visible(img );}
return (/input|select|textarea|button|object/.test( nodeName ) ?
!element.disabled :"a"===nodeName ?element.href ||isTabIndexNotNaN :isTabIndexNotNaN) &&visible(element );}
function visible(element ) {return $.expr.filters.visible(element ) &&!$(element ).parents().andSelf().filter(function() {return $.css(this,"visibility") ==="hidden";}).length;}
$.extend($.expr[":"],{data:$.expr.createPseudo ?$.expr.createPseudo(function(dataName ) {return function(elem ) {return !!$.data(elem,dataName );};}) :function(elem,i,match ) {return !!$.data(elem,match[3 ] );},focusable:function(element ) {return focusable(element,!isNaN($.attr(element,"tabindex") ) );},tabbable:function(element ) {var tabIndex =$.attr(element,"tabindex"),isTabIndexNaN =isNaN(tabIndex );return (isTabIndexNaN ||tabIndex >=0 ) &&focusable(element,!isTabIndexNaN );}
});$(function() {var body =document.body,div =body.appendChild(div =document.createElement("div") );div.offsetHeight;$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0
});$.support.minHeight =div.offsetHeight ===100;$.support.selectstart ="onselectstart"in div;body.removeChild(div ).style.display ="none";});if (!$("<a>").outerWidth(1 ).jquery ) {$.each(["Width","Height"],function(i,name ) {var side =name ==="Width"?["Left","Right"] :["Top","Bottom"],type =name.toLowerCase(),orig ={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight
};function reduce(elem,size,border,margin ) {$.each(side,function() {size -=parseFloat($.css(elem,"padding"+ this ) ) ||0;if (border ) {size -=parseFloat($.css(elem,"border"+ this + "Width") ) ||0;}
if (margin ) {size -=parseFloat($.css(elem,"margin"+ this ) ) ||0;}
});return size;}
$.fn["inner"+ name ] =function(size ) {if (size ===undefined ) {return orig["inner"+ name ].call(this );}
return this.each(function() {$(this ).css(type,reduce(this,size ) + "px");});};$.fn["outer"+ name] =function(size,margin ) {if (typeof size !=="number") {return orig["outer"+ name ].call(this,size );}
return this.each(function() {$(this).css(type,reduce(this,size,true,margin ) + "px");});};});}
if ($("<a>").data("a-b","a").removeData("a-b").data("a-b") ) {$.fn.removeData =(function(removeData ) {return function(key ) {if (arguments.length ) {return removeData.call(this,$.camelCase(key ) );} else {return removeData.call(this );}
};})($.fn.removeData );}
(function() {var uaMatch =/msie ([\w.]+)/.exec( navigator.userAgent.toLowerCase() ) || [];
$.ui.ie =uaMatch.length ?true :false;$.ui.ie6 =parseFloat(uaMatch[1 ],10 ) ===6;})();$.fn.extend({disableSelection:function() {return this.bind(($.support.selectstart ?"selectstart":"mousedown") +
".ui-disableSelection",function(event ) {event.preventDefault();});},enableSelection:function() {return this.unbind(".ui-disableSelection");}
});$.extend($.ui,{plugin:{add:function(module,option,set ) {var i,proto =$.ui[module ].prototype;for (i in set ) {proto.plugins[i ] =proto.plugins[i ] ||[];proto.plugins[i ].push([option,set[i ] ] );}
},call:function(instance,name,args ) {var i,set =instance.plugins[name ];if (!set ||!instance.element[0 ].parentNode ||instance.element[0 ].parentNode.nodeType ===11 ) {return;}
for (i =0;i < set.length;i++ ) {if (instance.options[set[i ][0 ] ] ) {set[i ][1 ].apply(instance.element,args );}
}
}
},contains:$.contains,hasScroll:function(el,a ) {if ($(el ).css("overflow") ==="hidden") {return false;}
var scroll =(a &&a ==="left") ?"scrollLeft":"scrollTop",has =false;if (el[scroll ] > 0 ) {return true;}
el[scroll ] =1;has =(el[scroll ] > 0 );el[scroll ] =0;return has;},isOverAxis:function(x,reference,size ) {return (x > reference ) &&(x < (reference + size ) );},isOver:function(y,x,top,left,height,width ) {return $.ui.isOverAxis(y,top,height ) &&$.ui.isOverAxis(x,left,width );}
});})(jQuery );(function($,undefined ) {var uuid =0,slice =Array.prototype.slice,_cleanData =$.cleanData;$.cleanData =function(elems ) {for (var i =0,elem;(elem =elems[i]) !=null;i++ ) {try {$(elem ).triggerHandler("remove");} catch(e ) {}
}
_cleanData(elems );};$.widget =function(name,base,prototype ) {var fullName,existingConstructor,constructor,basePrototype,namespace =name.split(".")[0 ];name =name.split(".")[1 ];fullName =namespace + "-"+ name;if (!prototype ) {prototype =base;base =$.Widget;}
$.expr[":"][fullName.toLowerCase() ] =function(elem ) {return !!$.data(elem,fullName );};$[namespace ] =$[namespace ] ||{};existingConstructor =$[namespace ][name ];constructor =$[namespace ][name ] =function(options,element ) {if (!this._createWidget ) {return new constructor(options,element );}
if (arguments.length ) {this._createWidget(options,element );}
};$.extend(constructor,existingConstructor,{version:prototype.version,_proto:$.extend({},prototype ),_childConstructors:[]
});basePrototype =new base();basePrototype.options =$.widget.extend({},basePrototype.options );$.each(prototype,function(prop,value ) {if ($.isFunction(value ) ) {prototype[prop ] =(function() {var _super =function() {return base.prototype[prop ].apply(this,arguments );},_superApply =function(args ) {return base.prototype[prop ].apply(this,args );};return function() {var __super =this._super,__superApply =this._superApply,returnValue;this._super =_super;this._superApply =_superApply;returnValue =value.apply(this,arguments );this._super =__super;this._superApply =__superApply;return returnValue;};})();}
});constructor.prototype =$.widget.extend(basePrototype,{widgetEventPrefix:existingConstructor ?basePrototype.widgetEventPrefix :name
},prototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetBaseClass:fullName,widgetFullName:fullName
});if (existingConstructor ) {$.each(existingConstructor._childConstructors,function(i,child ) {var childPrototype =child.prototype;$.widget(childPrototype.namespace + "."+ childPrototype.widgetName,constructor,child._proto );});delete existingConstructor._childConstructors;} else {base._childConstructors.push(constructor );}
$.widget.bridge(name,constructor );};$.widget.extend =function(target ) {var input =slice.call(arguments,1 ),inputIndex =0,inputLength =input.length,key,value;for (;inputIndex < inputLength;inputIndex++ ) {for (key in input[inputIndex ] ) {value =input[inputIndex ][key ];if (input[inputIndex ].hasOwnProperty(key ) &&value !==undefined ) {if ($.isPlainObject(value ) ) {target[key ] =$.isPlainObject(target[key ] ) ?$.widget.extend({},target[key ],value ) :$.widget.extend({},value );} else {target[key ] =value;}
}
}
}
return target;};$.widget.bridge =function(name,object ) {var fullName =object.prototype.widgetFullName ||name;$.fn[name ] =function(options ) {var isMethodCall =typeof options ==="string",args =slice.call(arguments,1 ),returnValue =this;options =!isMethodCall &&args.length ?$.widget.extend.apply(null,[options ].concat(args) ) :options;if (isMethodCall ) {this.each(function() {var methodValue,instance =$.data(this,fullName );if (!instance ) {return $.error("cannot call methods on "+ name + " prior to initialization; "+
"attempted to call method '"+ options + "'");}
if (!$.isFunction(instance[options] ) ||options.charAt(0 ) ==="_") {return $.error("no such method '"+ options + "' for "+ name + " widget instance");}
methodValue =instance[options ].apply(instance,args );if (methodValue !==instance &&methodValue !==undefined ) {returnValue =methodValue &&methodValue.jquery ?returnValue.pushStack(methodValue.get() ) :methodValue;return false;}
});} else {this.each(function() {var instance =$.data(this,fullName );if (instance ) {instance.option(options ||{} )._init();} else {$.data(this,fullName,new object(options,this ) );}
});}
return returnValue;};};$.Widget =function() {};$.Widget._childConstructors =[];$.Widget.prototype ={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null
},_createWidget:function(options,element ) {element =$(element ||this.defaultElement ||this )[0 ];this.element =$(element );this.uuid =uuid++;this.eventNamespace ="."+ this.widgetName + this.uuid;this.options =$.widget.extend({},this.options,this._getCreateOptions(),options );this.bindings =$();this.hoverable =$();this.focusable =$();if (element !==this ) {$.data(element,this.widgetName,this );$.data(element,this.widgetFullName,this );this._on(true,this.element,{remove:function(event ) {if (event.target ===element ) {this.destroy();}
}
});this.document =$(element.style ?element.ownerDocument :element.document ||element );this.window =$(this.document[0].defaultView ||this.document[0].parentWindow );}
this._create();this._trigger("create",null,this._getCreateEventData() );this._init();},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function() {this._destroy();this.element
.unbind(this.eventNamespace )
.removeData(this.widgetName )
.removeData(this.widgetFullName )
.removeData($.camelCase(this.widgetFullName ) );this.widget()
.unbind(this.eventNamespace )
.removeAttr("aria-disabled")
.removeClass(this.widgetFullName + "-disabled "+
"ui-state-disabled");this.bindings.unbind(this.eventNamespace );this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus");},_destroy:$.noop,widget:function() {return this.element;},option:function(key,value ) {var options =key,parts,curOption,i;if (arguments.length ===0 ) {return $.widget.extend({},this.options );}
if (typeof key ==="string") {options ={};parts =key.split(".");key =parts.shift();if (parts.length ) {curOption =options[key ] =$.widget.extend({},this.options[key ] );for (i =0;i < parts.length - 1;i++ ) {curOption[parts[i ] ] =curOption[parts[i ] ] ||{};curOption =curOption[parts[i ] ];}
key =parts.pop();if (value ===undefined ) {return curOption[key ] ===undefined ?null :curOption[key ];}
curOption[key ] =value;} else {if (value ===undefined ) {return this.options[key ] ===undefined ?null :this.options[key ];}
options[key ] =value;}
}
this._setOptions(options );return this;},_setOptions:function(options ) {var key;for (key in options ) {this._setOption(key,options[key ] );}
return this;},_setOption:function(key,value ) {this.options[key ] =value;if (key ==="disabled") {this.widget()
.toggleClass(this.widgetFullName + "-disabled ui-state-disabled",!!value )
.attr("aria-disabled",value );this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus");}
return this;},enable:function() {return this._setOption("disabled",false );},disable:function() {return this._setOption("disabled",true );},_on:function(suppressDisabledCheck,element,handlers ) {var delegateElement,instance =this;if (typeof suppressDisabledCheck !=="boolean") {handlers =element;element =suppressDisabledCheck;suppressDisabledCheck =false;}
if (!handlers ) {handlers =element;element =this.element;delegateElement =this.widget();} else {element =delegateElement =$(element );this.bindings =this.bindings.add(element );}
$.each(handlers,function(event,handler ) {function handlerProxy() {if (!suppressDisabledCheck &&(instance.options.disabled ===true ||$(this ).hasClass("ui-state-disabled") ) ) {return;}
return (typeof handler ==="string"?instance[handler ] :handler )
.apply(instance,arguments );}
if (typeof handler !=="string") {handlerProxy.guid =handler.guid =handler.guid ||handlerProxy.guid ||$.guid++;}
var match =event.match(/^(\w+)\s*(.*)$/ ),
eventName =match[1] + instance.eventNamespace,selector =match[2];if (selector ) {delegateElement.delegate(selector,eventName,handlerProxy );} else {element.bind(eventName,handlerProxy );}
});},_off:function(element,eventName ) {eventName =(eventName ||"").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;element.unbind(eventName ).undelegate(eventName );},_delay:function(handler,delay ) {function handlerProxy() {return (typeof handler ==="string"?instance[handler ] :handler )
.apply(instance,arguments );}
var instance =this;return setTimeout(handlerProxy,delay ||0 );},_hoverable:function(element ) {this.hoverable =this.hoverable.add(element );this._on(element,{mouseenter:function(event ) {$(event.currentTarget ).addClass("ui-state-hover");},mouseleave:function(event ) {$(event.currentTarget ).removeClass("ui-state-hover");}
});},_focusable:function(element ) {this.focusable =this.focusable.add(element );this._on(element,{focusin:function(event ) {$(event.currentTarget ).addClass("ui-state-focus");},focusout:function(event ) {$(event.currentTarget ).removeClass("ui-state-focus");}
});},_trigger:function(type,event,data ) {var prop,orig,callback =this.options[type ];data =data ||{};event =$.Event(event );event.type =(type ===this.widgetEventPrefix ?type :this.widgetEventPrefix + type ).toLowerCase();event.target =this.element[0 ];orig =event.originalEvent;if (orig ) {for (prop in orig ) {if (!(prop in event ) ) {event[prop ] =orig[prop ];}
}
}
this.element.trigger(event,data );return !($.isFunction(callback ) &&callback.apply(this.element[0],[event ].concat(data ) ) ===false ||event.isDefaultPrevented() );}
};$.each({show:"fadeIn",hide:"fadeOut"},function(method,defaultEffect ) {$.Widget.prototype["_"+ method ] =function(element,options,callback ) {if (typeof options ==="string") {options ={effect:options };}
var hasOptions,effectName =!options ?method :options ===true ||typeof options ==="number"?defaultEffect :options.effect ||defaultEffect;options =options ||{};if (typeof options ==="number") {options ={duration:options };}
hasOptions =!$.isEmptyObject(options );options.complete =callback;if (options.delay ) {element.delay(options.delay );}
if (hasOptions &&$.effects &&($.effects.effect[effectName ] ||$.uiBackCompat !==false &&$.effects[effectName ] ) ) {element[method ](options );} else if (effectName !==method &&element[effectName ] ) {element[effectName ](options.duration,options.easing,callback );} else {element.queue(function(next ) {$(this )[method ]();if (callback ) {callback.call(element[0 ] );}
next();});}
};});if ($.uiBackCompat !==false ) {$.Widget.prototype._getCreateOptions =function() {return $.metadata &&$.metadata.get(this.element[0] )[this.widgetName ];};}
})(jQuery );(function($,undefined ) {var mouseHandled =false;$(document ).mouseup(function(e ) {mouseHandled =false;});$.widget("ui.mouse",{version:"1.9.2",options:{cancel:'input,textarea,button,select,option',distance:1,delay:0
},_mouseInit:function() {var that =this;this.element
.bind('mousedown.'+this.widgetName,function(event) {return that._mouseDown(event);})
.bind('click.'+this.widgetName,function(event) {if (true ===$.data(event.target,that.widgetName + '.preventClickEvent')) {$.removeData(event.target,that.widgetName + '.preventClickEvent');event.stopImmediatePropagation();return false;}
});this.started =false;},_mouseDestroy:function() {this.element.unbind('.'+this.widgetName);if (this._mouseMoveDelegate ) {$(document)
.unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate)
.unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);}
},_mouseDown:function(event) {if(mouseHandled ) {return;}
(this._mouseStarted &&this._mouseUp(event));this._mouseDownEvent =event;var that =this,btnIsLeft =(event.which ===1),elIsCancel =(typeof this.options.cancel ==="string"&&event.target.nodeName ?$(event.target).closest(this.options.cancel).length :false);if (!btnIsLeft ||elIsCancel ||!this._mouseCapture(event)) {return true;}
this.mouseDelayMet =!this.options.delay;if (!this.mouseDelayMet) {this._mouseDelayTimer =setTimeout(function() {that.mouseDelayMet =true;},this.options.delay);}
if (this._mouseDistanceMet(event) &&this._mouseDelayMet(event)) {this._mouseStarted =(this._mouseStart(event) !==false);if (!this._mouseStarted) {event.preventDefault();return true;}
}
if (true ===$.data(event.target,this.widgetName + '.preventClickEvent')) {$.removeData(event.target,this.widgetName + '.preventClickEvent');}
this._mouseMoveDelegate =function(event) {return that._mouseMove(event);};this._mouseUpDelegate =function(event) {return that._mouseUp(event);};$(document)
.bind('mousemove.'+this.widgetName,this._mouseMoveDelegate)
.bind('mouseup.'+this.widgetName,this._mouseUpDelegate);event.preventDefault();mouseHandled =true;return true;},_mouseMove:function(event) {if ($.ui.ie &&!(document.documentMode >=9) &&!event.button) {return this._mouseUp(event);}
if (this._mouseStarted) {this._mouseDrag(event);return event.preventDefault();}
if (this._mouseDistanceMet(event) &&this._mouseDelayMet(event)) {this._mouseStarted =(this._mouseStart(this._mouseDownEvent,event) !==false);(this._mouseStarted ?this._mouseDrag(event) :this._mouseUp(event));}
return !this._mouseStarted;},_mouseUp:function(event) {$(document)
.unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate)
.unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if (this._mouseStarted) {this._mouseStarted =false;if (event.target ===this._mouseDownEvent.target) {$.data(event.target,this.widgetName + '.preventClickEvent',true);}
this._mouseStop(event);}
return false;},_mouseDistanceMet:function(event) {return (Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX),Math.abs(this._mouseDownEvent.pageY - event.pageY)
) >=this.options.distance
);},_mouseDelayMet:function(event) {return this.mouseDelayMet;},_mouseStart:function(event) {},_mouseDrag:function(event) {},_mouseStop:function(event) {},_mouseCapture:function(event) {return true;}
});})(jQuery);(function($,undefined ) {$.ui =$.ui ||{};var cachedScrollbarWidth,max =Math.max,abs =Math.abs,round =Math.round,rhorizontal =/left|center|right/,
rvertical =/top|center|bottom/,
roffset =/[\+\-]\d+%?/,
rposition =/^\w+/,
rpercent =/%$/,
_position =$.fn.position;function getOffsets(offsets,width,height ) {return [parseInt(offsets[0 ],10 ) * (rpercent.test(offsets[0 ] ) ?width / 100 :1 ),parseInt(offsets[1 ],10 ) * (rpercent.test(offsets[1 ] ) ?height / 100 :1 )
];}
function parseCss(element,property ) {return parseInt($.css(element,property ),10 ) ||0;}
$.position ={scrollbarWidth:function() {if (cachedScrollbarWidth !==undefined ) {return cachedScrollbarWidth;}
var w1,w2,div =$("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),innerDiv =div.children()[0];$("body").append(div );w1 =innerDiv.offsetWidth;div.css("overflow","scroll");w2 =innerDiv.offsetWidth;if (w1 ===w2 ) {w2 =div[0].clientWidth;}
div.remove();return (cachedScrollbarWidth =w1 - w2);},getScrollInfo:function(within ) {var overflowX =within.isWindow ?"":within.element.css("overflow-x"),overflowY =within.isWindow ?"":within.element.css("overflow-y"),hasOverflowX =overflowX ==="scroll"||(overflowX ==="auto"&&within.width < within.element[0].scrollWidth ),hasOverflowY =overflowY ==="scroll"||(overflowY ==="auto"&&within.height < within.element[0].scrollHeight );return {width:hasOverflowX ?$.position.scrollbarWidth() :0,height:hasOverflowY ?$.position.scrollbarWidth() :0
};},getWithinInfo:function(element ) {var withinElement =$(element ||window ),isWindow =$.isWindow(withinElement[0] );return {element:withinElement,isWindow:isWindow,offset:withinElement.offset() ||{left:0,top:0 },scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(),width:isWindow ?withinElement.width() :withinElement.outerWidth(),height:isWindow ?withinElement.height() :withinElement.outerHeight()
};}
};$.fn.position =function(options ) {if (!options ||!options.of ) {return _position.apply(this,arguments );}
options =$.extend({},options );var atOffset,targetWidth,targetHeight,targetOffset,basePosition,target =$(options.of ),within =$.position.getWithinInfo(options.within ),scrollInfo =$.position.getScrollInfo(within ),targetElem =target[0],collision =(options.collision ||"flip").split(" "),offsets ={};if (targetElem.nodeType ===9 ) {targetWidth =target.width();targetHeight =target.height();targetOffset ={top:0,left:0 };} else if ($.isWindow(targetElem ) ) {targetWidth =target.width();targetHeight =target.height();targetOffset ={top:target.scrollTop(),left:target.scrollLeft() };} else if (targetElem.preventDefault ) {options.at ="left top";targetWidth =targetHeight =0;targetOffset ={top:targetElem.pageY,left:targetElem.pageX };} else {targetWidth =target.outerWidth();targetHeight =target.outerHeight();targetOffset =target.offset();}
basePosition =$.extend({},targetOffset );$.each(["my","at"],function() {var pos =(options[this ] ||"").split(" "),horizontalOffset,verticalOffset;if (pos.length ===1) {pos =rhorizontal.test(pos[0 ] ) ?pos.concat(["center"] ) :rvertical.test(pos[0 ] ) ?["center"].concat(pos ) :["center","center"];}
pos[0 ] =rhorizontal.test(pos[0 ] ) ?pos[0 ] :"center";pos[1 ] =rvertical.test(pos[1 ] ) ?pos[1 ] :"center";horizontalOffset =roffset.exec(pos[0 ] );verticalOffset =roffset.exec(pos[1 ] );offsets[this ] =[horizontalOffset ?horizontalOffset[0 ] :0,verticalOffset ?verticalOffset[0 ] :0
];options[this ] =[rposition.exec(pos[0 ] )[0 ],rposition.exec(pos[1 ] )[0 ]
];});if (collision.length ===1 ) {collision[1 ] =collision[0 ];}
if (options.at[0 ] ==="right") {basePosition.left +=targetWidth;} else if (options.at[0 ] ==="center") {basePosition.left +=targetWidth / 2;}
if (options.at[1 ] ==="bottom") {basePosition.top +=targetHeight;} else if (options.at[1 ] ==="center") {basePosition.top +=targetHeight / 2;}
atOffset =getOffsets(offsets.at,targetWidth,targetHeight );basePosition.left +=atOffset[0 ];basePosition.top +=atOffset[1 ];return this.each(function() {var collisionPosition,using,elem =$(this ),elemWidth =elem.outerWidth(),elemHeight =elem.outerHeight(),marginLeft =parseCss(this,"marginLeft"),marginTop =parseCss(this,"marginTop"),collisionWidth =elemWidth + marginLeft + parseCss(this,"marginRight") + scrollInfo.width,collisionHeight =elemHeight + marginTop + parseCss(this,"marginBottom") + scrollInfo.height,position =$.extend({},basePosition ),myOffset =getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight() );if (options.my[0 ] ==="right") {position.left -=elemWidth;} else if (options.my[0 ] ==="center") {position.left -=elemWidth / 2;}
if (options.my[1 ] ==="bottom") {position.top -=elemHeight;} else if (options.my[1 ] ==="center") {position.top -=elemHeight / 2;}
position.left +=myOffset[0 ];position.top +=myOffset[1 ];if (!$.support.offsetFractions ) {position.left =round(position.left );position.top =round(position.top );}
collisionPosition ={marginLeft:marginLeft,marginTop:marginTop
};$.each(["left","top"],function(i,dir ) {if ($.ui.position[collision[i ] ] ) {$.ui.position[collision[i ] ][dir ](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:[atOffset[0 ] + myOffset[0 ],atOffset [1 ] + myOffset[1 ] ],my:options.my,at:options.at,within:within,elem :elem
});}
});if ($.fn.bgiframe ) {elem.bgiframe();}
if (options.using ) {using =function(props ) {var left =targetOffset.left - position.left,right =left + targetWidth - elemWidth,top =targetOffset.top - position.top,bottom =top + targetHeight - elemHeight,feedback ={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight
},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight
},horizontal:right < 0 ?"left":left > 0 ?"right":"center",vertical:bottom < 0 ?"top":top > 0 ?"bottom":"middle"};if (targetWidth < elemWidth &&abs(left + right ) < targetWidth ) {feedback.horizontal ="center";}
if (targetHeight < elemHeight &&abs(top + bottom ) < targetHeight ) {feedback.vertical ="middle";}
if (max(abs(left ),abs(right ) ) > max(abs(top ),abs(bottom ) ) ) {feedback.important ="horizontal";} else {feedback.important ="vertical";}
options.using.call(this,props,feedback );};}
elem.offset($.extend(position,{using:using } ) );});};$.ui.position ={fit:{left:function(position,data ) {var within =data.within,withinOffset =within.isWindow ?within.scrollLeft :within.offset.left,outerWidth =within.width,collisionPosLeft =position.left - data.collisionPosition.marginLeft,overLeft =withinOffset - collisionPosLeft,overRight =collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,newOverRight;if (data.collisionWidth > outerWidth ) {if (overLeft > 0 &&overRight <=0 ) {newOverRight =position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;position.left +=overLeft - newOverRight;} else if (overRight > 0 &&overLeft <=0 ) {position.left =withinOffset;} else {if (overLeft > overRight ) {position.left =withinOffset + outerWidth - data.collisionWidth;} else {position.left =withinOffset;}
}
} else if (overLeft > 0 ) {position.left +=overLeft;} else if (overRight > 0 ) {position.left -=overRight;} else {position.left =max(position.left - collisionPosLeft,position.left );}
},top:function(position,data ) {var within =data.within,withinOffset =within.isWindow ?within.scrollTop :within.offset.top,outerHeight =data.within.height,collisionPosTop =position.top - data.collisionPosition.marginTop,overTop =withinOffset - collisionPosTop,overBottom =collisionPosTop + data.collisionHeight - outerHeight - withinOffset,newOverBottom;if (data.collisionHeight > outerHeight ) {if (overTop > 0 &&overBottom <=0 ) {newOverBottom =position.top + overTop + data.collisionHeight - outerHeight - withinOffset;position.top +=overTop - newOverBottom;} else if (overBottom > 0 &&overTop <=0 ) {position.top =withinOffset;} else {if (overTop > overBottom ) {position.top =withinOffset + outerHeight - data.collisionHeight;} else {position.top =withinOffset;}
}
} else if (overTop > 0 ) {position.top +=overTop;} else if (overBottom > 0 ) {position.top -=overBottom;} else {position.top =max(position.top - collisionPosTop,position.top );}
}
},flip:{left:function(position,data ) {var within =data.within,withinOffset =within.offset.left + within.scrollLeft,outerWidth =within.width,offsetLeft =within.isWindow ?within.scrollLeft :within.offset.left,collisionPosLeft =position.left - data.collisionPosition.marginLeft,overLeft =collisionPosLeft - offsetLeft,overRight =collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,myOffset =data.my[0 ] ==="left"?-data.elemWidth :data.my[0 ] ==="right"?data.elemWidth :0,atOffset =data.at[0 ] ==="left"?data.targetWidth :data.at[0 ] ==="right"?-data.targetWidth :0,offset =-2 * data.offset[0 ],newOverRight,newOverLeft;if (overLeft < 0 ) {newOverRight =position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;if (newOverRight < 0 ||newOverRight < abs(overLeft ) ) {position.left +=myOffset + atOffset + offset;}
}
else if (overRight > 0 ) {newOverLeft =position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;if (newOverLeft > 0 ||abs(newOverLeft ) < overRight ) {position.left +=myOffset + atOffset + offset;}
}
},top:function(position,data ) {var within =data.within,withinOffset =within.offset.top + within.scrollTop,outerHeight =within.height,offsetTop =within.isWindow ?within.scrollTop :within.offset.top,collisionPosTop =position.top - data.collisionPosition.marginTop,overTop =collisionPosTop - offsetTop,overBottom =collisionPosTop + data.collisionHeight - outerHeight - offsetTop,top =data.my[1 ] ==="top",myOffset =top ?-data.elemHeight :data.my[1 ] ==="bottom"?data.elemHeight :0,atOffset =data.at[1 ] ==="top"?data.targetHeight :data.at[1 ] ==="bottom"?-data.targetHeight :0,offset =-2 * data.offset[1 ],newOverTop,newOverBottom;if (overTop < 0 ) {newOverBottom =position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;if ((position.top + myOffset + atOffset + offset) > overTop &&(newOverBottom < 0 ||newOverBottom < abs(overTop ) ) ) {position.top +=myOffset + atOffset + offset;}
}
else if (overBottom > 0 ) {newOverTop =position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;if ((position.top + myOffset + atOffset + offset) > overBottom &&(newOverTop > 0 ||abs(newOverTop ) < overBottom ) ) {position.top +=myOffset + atOffset + offset;}
}
}
},flipfit:{left:function() {$.ui.position.flip.left.apply(this,arguments );$.ui.position.fit.left.apply(this,arguments );},top:function() {$.ui.position.flip.top.apply(this,arguments );$.ui.position.fit.top.apply(this,arguments );}
}
};(function () {var testElement,testElementParent,testElementStyle,offsetLeft,i,body =document.getElementsByTagName("body")[0 ],div =document.createElement("div");testElement =document.createElement(body ?"div":"body");testElementStyle ={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if (body ) {$.extend(testElementStyle,{position:"absolute",left:"-1000px",top:"-1000px"});}
for (i in testElementStyle ) {testElement.style[i ] =testElementStyle[i ];}
testElement.appendChild(div );testElementParent =body ||document.documentElement;testElementParent.insertBefore(testElement,testElementParent.firstChild );div.style.cssText ="position: absolute; left: 10.7432222px;";offsetLeft =$(div ).offset().left;$.support.offsetFractions =offsetLeft > 10 &&offsetLeft < 11;testElement.innerHTML ="";testElementParent.removeChild(testElement );})();if ($.uiBackCompat !==false ) {(function($ ) {var _position =$.fn.position;$.fn.position =function(options ) {if (!options ||!options.offset ) {return _position.call(this,options );}
var offset =options.offset.split(" "),at =options.at.split(" ");if (offset.length ===1 ) {offset[1 ] =offset[0 ];}
if (/^\d/.test( offset[ 0 ] ) ) {
offset[0 ] ="+"+ offset[0 ];}
if (/^\d/.test( offset[ 1 ] ) ) {
offset[1 ] ="+"+ offset[1 ];}
if (at.length ===1 ) {if (/left|center|right/.test( at[ 0 ] ) ) {
at[1 ] ="center";} else {at[1 ] =at[0 ];at[0 ] ="center";}
}
return _position.call(this,$.extend(options,{at:at[0 ] + offset[0 ] + " "+ at[1 ] + offset[1 ],offset:undefined
} ) );};}(jQuery ) );}
}(jQuery ) );(function($,undefined ) {var uid =0,hideProps ={},showProps ={};hideProps.height =hideProps.paddingTop =hideProps.paddingBottom =hideProps.borderTopWidth =hideProps.borderBottomWidth ="hide";showProps.height =showProps.paddingTop =showProps.paddingBottom =showProps.borderTopWidth =showProps.borderBottomWidth ="show";$.widget("ui.accordion",{version:"1.9.2",options:{active:0,animate:{},collapsible:false,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null
},_create:function() {var accordionId =this.accordionId ="ui-accordion-"+
(this.element.attr("id") ||++uid),options =this.options;this.prevShow =this.prevHide =$();this.element.addClass("ui-accordion ui-widget ui-helper-reset");this.headers =this.element.find(options.header )
.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all");this._hoverable(this.headers );this._focusable(this.headers );this.headers.next()
.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom")
.hide();if (!options.collapsible &&(options.active ===false ||options.active ==null) ) {options.active =0;}
if (options.active < 0 ) {options.active +=this.headers.length;}
this.active =this._findActive(options.active )
.addClass("ui-accordion-header-active ui-state-active")
.toggleClass("ui-corner-all ui-corner-top");this.active.next()
.addClass("ui-accordion-content-active")
.show();this._createIcons();this.refresh();this.element.attr("role","tablist");this.headers
.attr("role","tab")
.each(function(i ) {var header =$(this ),headerId =header.attr("id"),panel =header.next(),panelId =panel.attr("id");if (!headerId ) {headerId =accordionId + "-header-"+ i;header.attr("id",headerId );}
if (!panelId ) {panelId =accordionId + "-panel-"+ i;panel.attr("id",panelId );}
header.attr("aria-controls",panelId );panel.attr("aria-labelledby",headerId );})
.next()
.attr("role","tabpanel");this.headers
.not(this.active )
.attr({"aria-selected":"false",tabIndex:-1
})
.next()
.attr({"aria-expanded":"false","aria-hidden":"true"})
.hide();if (!this.active.length ) {this.headers.eq(0 ).attr("tabIndex",0 );} else {this.active.attr({"aria-selected":"true",tabIndex:0
})
.next()
.attr({"aria-expanded":"true","aria-hidden":"false"});}
this._on(this.headers,{keydown:"_keydown"});this._on(this.headers.next(),{keydown:"_panelKeyDown"});this._setupEvents(options.event );},_getCreateEventData:function() {return {header:this.active,content:!this.active.length ?$() :this.active.next()
};},_createIcons:function() {var icons =this.options.icons;if (icons ) {$("<span>")
.addClass("ui-accordion-header-icon ui-icon "+ icons.header )
.prependTo(this.headers );this.active.children(".ui-accordion-header-icon")
.removeClass(icons.header )
.addClass(icons.activeHeader );this.headers.addClass("ui-accordion-icons");}
},_destroyIcons:function() {this.headers
.removeClass("ui-accordion-icons")
.children(".ui-accordion-header-icon")
.remove();},_destroy:function() {var contents;this.element
.removeClass("ui-accordion ui-widget ui-helper-reset")
.removeAttr("role");this.headers
.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top")
.removeAttr("role")
.removeAttr("aria-selected")
.removeAttr("aria-controls")
.removeAttr("tabIndex")
.each(function() {if (/^ui-accordion/.test( this.id ) ) {
this.removeAttribute("id");}
});this._destroyIcons();contents =this.headers.next()
.css("display","")
.removeAttr("role")
.removeAttr("aria-expanded")
.removeAttr("aria-hidden")
.removeAttr("aria-labelledby")
.removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled")
.each(function() {if (/^ui-accordion/.test( this.id ) ) {
this.removeAttribute("id");}
});if (this.options.heightStyle !=="content") {contents.css("height","");}
},_setOption:function(key,value ) {if (key ==="active") {this._activate(value );return;}
if (key ==="event") {if (this.options.event ) {this._off(this.headers,this.options.event );}
this._setupEvents(value );}
this._super(key,value );if (key ==="collapsible"&&!value &&this.options.active ===false ) {this._activate(0 );}
if (key ==="icons") {this._destroyIcons();if (value ) {this._createIcons();}
}
if (key ==="disabled") {this.headers.add(this.headers.next() )
.toggleClass("ui-state-disabled",!!value );}
},_keydown:function(event ) {if (event.altKey ||event.ctrlKey ) {return;}
var keyCode =$.ui.keyCode,length =this.headers.length,currentIndex =this.headers.index(event.target ),toFocus =false;switch (event.keyCode ) {case keyCode.RIGHT:case keyCode.DOWN:toFocus =this.headers[(currentIndex + 1 ) % length ];break;case keyCode.LEFT:case keyCode.UP:toFocus =this.headers[(currentIndex - 1 + length ) % length ];break;case keyCode.SPACE:case keyCode.ENTER:this._eventHandler(event );break;case keyCode.HOME:toFocus =this.headers[0 ];break;case keyCode.END:toFocus =this.headers[length - 1 ];break;}
if (toFocus ) {$(event.target ).attr("tabIndex",-1 );$(toFocus ).attr("tabIndex",0 );toFocus.focus();event.preventDefault();}
},_panelKeyDown :function(event ) {if (event.keyCode ===$.ui.keyCode.UP &&event.ctrlKey ) {$(event.currentTarget ).prev().focus();}
},refresh:function() {var maxHeight,overflow,heightStyle =this.options.heightStyle,parent =this.element.parent();if (heightStyle ==="fill") {if (!$.support.minHeight ) {overflow =parent.css("overflow");parent.css("overflow","hidden");}
maxHeight =parent.height();this.element.siblings(":visible").each(function() {var elem =$(this ),position =elem.css("position");if (position ==="absolute"||position ==="fixed") {return;}
maxHeight -=elem.outerHeight(true );});if (overflow ) {parent.css("overflow",overflow );}
this.headers.each(function() {maxHeight -=$(this ).outerHeight(true );});this.headers.next()
.each(function() {$(this ).height(Math.max(0,maxHeight -
$(this ).innerHeight() + $(this ).height() ) );})
.css("overflow","auto");} else if (heightStyle ==="auto") {maxHeight =0;this.headers.next()
.each(function() {maxHeight =Math.max(maxHeight,$(this ).css("height","").height() );})
.height(maxHeight );}
},_activate:function(index ) {var active =this._findActive(index )[0 ];if (active ===this.active[0 ] ) {return;}
active =active ||this.active[0 ];this._eventHandler({target:active,currentTarget:active,preventDefault:$.noop
});},_findActive:function(selector ) {return typeof selector ==="number"?this.headers.eq(selector ) :$();},_setupEvents:function(event ) {var events ={};if (!event ) {return;}
$.each(event.split(" "),function(index,eventName ) {events[eventName ] ="_eventHandler";});this._on(this.headers,events );},_eventHandler:function(event ) {var options =this.options,active =this.active,clicked =$(event.currentTarget ),clickedIsActive =clicked[0 ] ===active[0 ],collapsing =clickedIsActive &&options.collapsible,toShow =collapsing ?$() :clicked.next(),toHide =active.next(),eventData ={oldHeader:active,oldPanel:toHide,newHeader:collapsing ?$() :clicked,newPanel:toShow
};event.preventDefault();if ((clickedIsActive &&!options.collapsible ) ||(this._trigger("beforeActivate",event,eventData ) ===false ) ) {return;}
options.active =collapsing ?false :this.headers.index(clicked );this.active =clickedIsActive ?$() :clicked;this._toggle(eventData );active.removeClass("ui-accordion-header-active ui-state-active");if (options.icons ) {active.children(".ui-accordion-header-icon")
.removeClass(options.icons.activeHeader )
.addClass(options.icons.header );}
if (!clickedIsActive ) {clicked
.removeClass("ui-corner-all")
.addClass("ui-accordion-header-active ui-state-active ui-corner-top");if (options.icons ) {clicked.children(".ui-accordion-header-icon")
.removeClass(options.icons.header )
.addClass(options.icons.activeHeader );}
clicked
.next()
.addClass("ui-accordion-content-active");}
},_toggle:function(data ) {var toShow =data.newPanel,toHide =this.prevShow.length ?this.prevShow :data.oldPanel;this.prevShow.add(this.prevHide ).stop(true,true );this.prevShow =toShow;this.prevHide =toHide;if (this.options.animate ) {this._animate(toShow,toHide,data );} else {toHide.hide();toShow.show();this._toggleComplete(data );}
toHide.attr({"aria-expanded":"false","aria-hidden":"true"});toHide.prev().attr("aria-selected","false");if (toShow.length &&toHide.length ) {toHide.prev().attr("tabIndex",-1 );} else if (toShow.length ) {this.headers.filter(function() {return $(this ).attr("tabIndex") ===0;})
.attr("tabIndex",-1 );}
toShow
.attr({"aria-expanded":"true","aria-hidden":"false"})
.prev()
.attr({"aria-selected":"true",tabIndex:0
});},_animate:function(toShow,toHide,data ) {var total,easing,duration,that =this,adjust =0,down =toShow.length &&(!toHide.length ||(toShow.index() < toHide.index() ) ),animate =this.options.animate ||{},options =down &&animate.down ||animate,complete =function() {that._toggleComplete(data );};if (typeof options ==="number") {duration =options;}
if (typeof options ==="string") {easing =options;}
easing =easing ||options.easing ||animate.easing;duration =duration ||options.duration ||animate.duration;if (!toHide.length ) {return toShow.animate(showProps,duration,easing,complete );}
if (!toShow.length ) {return toHide.animate(hideProps,duration,easing,complete );}
total =toShow.show().outerHeight();toHide.animate(hideProps,{duration:duration,easing:easing,step:function(now,fx ) {fx.now =Math.round(now );}
});toShow
.hide()
.animate(showProps,{duration:duration,easing:easing,complete:complete,step:function(now,fx ) {fx.now =Math.round(now );if (fx.prop !=="height") {adjust +=fx.now;} else if (that.options.heightStyle !=="content") {fx.now =Math.round(total - toHide.outerHeight() - adjust );adjust =0;}
}
});},_toggleComplete:function(data ) {var toHide =data.oldPanel;toHide
.removeClass("ui-accordion-content-active")
.prev()
.removeClass("ui-corner-top")
.addClass("ui-corner-all");if (toHide.length ) {toHide.parent()[0].className =toHide.parent()[0].className;}
this._trigger("activate",null,data );}
});if ($.uiBackCompat !==false ) {(function($,prototype ) {$.extend(prototype.options,{navigation:false,navigationFilter:function() {return this.href.toLowerCase() ===location.href.toLowerCase();}
});var _create =prototype._create;prototype._create =function() {if (this.options.navigation ) {var that =this,headers =this.element.find(this.options.header ),content =headers.next(),current =headers.add(content )
.find("a")
.filter(this.options.navigationFilter )
[0 ];if (current ) {headers.add(content ).each(function(index ) {if ($.contains(this,current ) ) {that.options.active =Math.floor(index / 2 );return false;}
});}
}
_create.call(this );};}(jQuery,jQuery.ui.accordion.prototype ) );(function($,prototype ) {$.extend(prototype.options,{heightStyle:null,autoHeight:true,clearStyle:false,fillSpace:false });var _create =prototype._create,_setOption =prototype._setOption;$.extend(prototype,{_create:function() {this.options.heightStyle =this.options.heightStyle ||this._mergeHeightStyle();_create.call(this );},_setOption:function(key ) {if (key ==="autoHeight"||key ==="clearStyle"||key ==="fillSpace") {this.options.heightStyle =this._mergeHeightStyle();}
_setOption.apply(this,arguments );},_mergeHeightStyle:function() {var options =this.options;if (options.fillSpace ) {return "fill";}
if (options.clearStyle ) {return "content";}
if (options.autoHeight ) {return "auto";}
}
});}(jQuery,jQuery.ui.accordion.prototype ) );(function($,prototype ) {$.extend(prototype.options.icons,{activeHeader:null,headerSelected:"ui-icon-triangle-1-s"});var _createIcons =prototype._createIcons;prototype._createIcons =function() {if (this.options.icons ) {this.options.icons.activeHeader =this.options.icons.activeHeader ||this.options.icons.headerSelected;}
_createIcons.call(this );};}(jQuery,jQuery.ui.accordion.prototype ) );(function($,prototype ) {prototype.activate =prototype._activate;var _findActive =prototype._findActive;prototype._findActive =function(index ) {if (index ===-1 ) {index =false;}
if (index &&typeof index !=="number") {index =this.headers.index(this.headers.filter(index ) );if (index ===-1 ) {index =false;}
}
return _findActive.call(this,index );};}(jQuery,jQuery.ui.accordion.prototype ) );jQuery.ui.accordion.prototype.resize =jQuery.ui.accordion.prototype.refresh;(function($,prototype ) {$.extend(prototype.options,{change:null,changestart:null
});var _trigger =prototype._trigger;prototype._trigger =function(type,event,data ) {var ret =_trigger.apply(this,arguments );if (!ret ) {return false;}
if (type ==="beforeActivate") {ret =_trigger.call(this,"changestart",event,{oldHeader:data.oldHeader,oldContent:data.oldPanel,newHeader:data.newHeader,newContent:data.newPanel
});} else if (type ==="activate") {ret =_trigger.call(this,"change",event,{oldHeader:data.oldHeader,oldContent:data.oldPanel,newHeader:data.newHeader,newContent:data.newPanel
});}
return ret;};}(jQuery,jQuery.ui.accordion.prototype ) );(function($,prototype ) {$.extend(prototype.options,{animate:null,animated:"slide"});var _create =prototype._create;prototype._create =function() {var options =this.options;if (options.animate ===null ) {if (!options.animated ) {options.animate =false;} else if (options.animated ==="slide") {options.animate =300;} else if (options.animated ==="bounceslide") {options.animate ={duration:200,down:{easing:"easeOutBounce",duration:1000
}
};} else {options.animate =options.animated;}
}
_create.call(this );};}(jQuery,jQuery.ui.accordion.prototype ) );}
})(jQuery );(function($,undefined ) {var requestIndex =0;$.widget("ui.autocomplete",{version:"1.9.2",defaultElement:"<input>",options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null
},pending:0,_create:function() {var suppressKeyPress,suppressKeyPressRepeat,suppressInput;this.isMultiLine =this._isMultiLine();this.valueMethod =this.element[this.element.is("input,textarea") ?"val":"text"];this.isNewMenu =true;this.element
.addClass("ui-autocomplete-input")
.attr("autocomplete","off");this._on(this.element,{keydown:function(event ) {if (this.element.prop("readOnly") ) {suppressKeyPress =true;suppressInput =true;suppressKeyPressRepeat =true;return;}
suppressKeyPress =false;suppressInput =false;suppressKeyPressRepeat =false;var keyCode =$.ui.keyCode;switch(event.keyCode ) {case keyCode.PAGE_UP:suppressKeyPress =true;this._move("previousPage",event );break;case keyCode.PAGE_DOWN:suppressKeyPress =true;this._move("nextPage",event );break;case keyCode.UP:suppressKeyPress =true;this._keyEvent("previous",event );break;case keyCode.DOWN:suppressKeyPress =true;this._keyEvent("next",event );break;case keyCode.ENTER:case keyCode.NUMPAD_ENTER:if (this.menu.active ) {suppressKeyPress =true;event.preventDefault();this.menu.select(event );}
break;case keyCode.TAB:if (this.menu.active ) {this.menu.select(event );}
break;case keyCode.ESCAPE:if (this.menu.element.is(":visible") ) {this._value(this.term );this.close(event );event.preventDefault();}
break;default:suppressKeyPressRepeat =true;this._searchTimeout(event );break;}
},keypress:function(event ) {if (suppressKeyPress ) {suppressKeyPress =false;event.preventDefault();return;}
if (suppressKeyPressRepeat ) {return;}
var keyCode =$.ui.keyCode;switch(event.keyCode ) {case keyCode.PAGE_UP:this._move("previousPage",event );break;case keyCode.PAGE_DOWN:this._move("nextPage",event );break;case keyCode.UP:this._keyEvent("previous",event );break;case keyCode.DOWN:this._keyEvent("next",event );break;}
},input:function(event ) {if (suppressInput ) {suppressInput =false;event.preventDefault();return;}
this._searchTimeout(event );},focus:function() {this.selectedItem =null;this.previous =this._value();},blur:function(event ) {if (this.cancelBlur ) {delete this.cancelBlur;return;}
clearTimeout(this.searching );this.close(event );this._change(event );}
});this._initSource();this.menu =$("<ul>")
.addClass("ui-autocomplete")
.appendTo(this.document.find(this.options.appendTo ||"body")[0 ] )
.menu({input:$(),role:null
})
.zIndex(this.element.zIndex() + 1 )
.hide()
.data("menu");this._on(this.menu.element,{mousedown:function(event ) {event.preventDefault();this.cancelBlur =true;this._delay(function() {delete this.cancelBlur;});var menuElement =this.menu.element[0 ];if (!$(event.target ).closest(".ui-menu-item").length ) {this._delay(function() {var that =this;this.document.one("mousedown",function(event ) {if (event.target !==that.element[0 ] &&event.target !==menuElement &&!$.contains(menuElement,event.target ) ) {that.close();}
});});}
},menufocus:function(event,ui ) {if (this.isNewMenu ) {this.isNewMenu =false;if (event.originalEvent &&/^mouse/.test( event.originalEvent.type ) ) {
this.menu.blur();this.document.one("mousemove",function() {$(event.target ).trigger(event.originalEvent );});return;}
}
var item =ui.item.data("ui-autocomplete-item") ||ui.item.data("item.autocomplete");if (false !==this._trigger("focus",event,{item:item } ) ) {if (event.originalEvent &&/^key/.test( event.originalEvent.type ) ) {
this._value(item.value );}
} else {}
},menuselect:function(event,ui ) {var item =ui.item.data("ui-autocomplete-item") ||ui.item.data("item.autocomplete"),previous =this.previous;if (this.element[0] !==this.document[0].activeElement ) {this.element.focus();this.previous =previous;this._delay(function() {this.previous =previous;this.selectedItem =item;});}
if (false !==this._trigger("select",event,{item:item } ) ) {this._value(item.value );}
this.term =this._value();this.close(event );this.selectedItem =item;}
});this.liveRegion =$("<span>",{role:"status","aria-live":"polite"})
.addClass("ui-helper-hidden-accessible")
.insertAfter(this.element );if ($.fn.bgiframe ) {this.menu.element.bgiframe();}
this._on(this.window,{beforeunload:function() {this.element.removeAttr("autocomplete");}
});},_destroy:function() {clearTimeout(this.searching );this.element
.removeClass("ui-autocomplete-input")
.removeAttr("autocomplete");this.menu.element.remove();this.liveRegion.remove();},_setOption:function(key,value ) {this._super(key,value );if (key ==="source") {this._initSource();}
if (key ==="appendTo") {this.menu.element.appendTo(this.document.find(value ||"body")[0] );}
if (key ==="disabled"&&value &&this.xhr ) {this.xhr.abort();}
},_isMultiLine:function() {if (this.element.is("textarea") ) {return true;}
if (this.element.is("input") ) {return false;}
return this.element.prop("isContentEditable");},_initSource:function() {var array,url,that =this;if ($.isArray(this.options.source) ) {array =this.options.source;this.source =function(request,response ) {response($.ui.autocomplete.filter(array,request.term ) );};} else if (typeof this.options.source ==="string") {url =this.options.source;this.source =function(request,response ) {if (that.xhr ) {that.xhr.abort();}
that.xhr =$.ajax({url:url,data:request,dataType:"json",success:function(data ) {response(data );},error:function() {response([] );}
});};} else {this.source =this.options.source;}
},_searchTimeout:function(event ) {clearTimeout(this.searching );this.searching =this._delay(function() {if (this.term !==this._value() ) {this.selectedItem =null;this.search(null,event );}
},this.options.delay );},search:function(value,event ) {value =value !=null ?value :this._value();this.term =this._value();if (value.length < this.options.minLength ) {return this.close(event );}
if (this._trigger("search",event ) ===false ) {return;}
return this._search(value );},_search:function(value ) {this.pending++;this.element.addClass("ui-autocomplete-loading");this.cancelSearch =false;this.source({term:value },this._response() );},_response:function() {var that =this,index =++requestIndex;return function(content ) {if (index ===requestIndex ) {that.__response(content );}
that.pending--;if (!that.pending ) {that.element.removeClass("ui-autocomplete-loading");}
};},__response:function(content ) {if (content ) {content =this._normalize(content );}
this._trigger("response",null,{content:content } );if (!this.options.disabled &&content &&content.length &&!this.cancelSearch ) {this._suggest(content );this._trigger("open");} else {this._close();}
},close:function(event ) {this.cancelSearch =true;this._close(event );},_close:function(event ) {if (this.menu.element.is(":visible") ) {this.menu.element.hide();this.menu.blur();this.isNewMenu =true;this._trigger("close",event );}
},_change:function(event ) {if (this.previous !==this._value() ) {this._trigger("change",event,{item:this.selectedItem } );}
},_normalize:function(items ) {if (items.length &&items[0].label &&items[0].value ) {return items;}
return $.map(items,function(item ) {if (typeof item ==="string") {return {label:item,value:item
};}
return $.extend({label:item.label ||item.value,value:item.value ||item.label
},item );});},_suggest:function(items ) {var ul =this.menu.element
.empty()
.zIndex(this.element.zIndex() + 1 );this._renderMenu(ul,items );this.menu.refresh();ul.show();this._resizeMenu();ul.position($.extend({of:this.element
},this.options.position ));if (this.options.autoFocus ) {this.menu.next();}
},_resizeMenu:function() {var ul =this.menu.element;ul.outerWidth(Math.max(ul.width("").outerWidth() + 1,this.element.outerWidth()
) );},_renderMenu:function(ul,items ) {var that =this;$.each(items,function(index,item ) {that._renderItemData(ul,item );});},_renderItemData:function(ul,item ) {return this._renderItem(ul,item ).data("ui-autocomplete-item",item );},_renderItem:function(ul,item ) {return $("<li>")
.append($("<a>").text(item.label ) )
.appendTo(ul );},_move:function(direction,event ) {if (!this.menu.element.is(":visible") ) {this.search(null,event );return;}
if (this.menu.isFirstItem() &&/^previous/.test( direction ) ||
this.menu.isLastItem() &&/^next/.test( direction ) ) {
this._value(this.term );this.menu.blur();return;}
this.menu[direction ](event );},widget:function() {return this.menu.element;},_value:function() {return this.valueMethod.apply(this.element,arguments );},_keyEvent:function(keyEvent,event ) {if (!this.isMultiLine ||this.menu.element.is(":visible") ) {this._move(keyEvent,event );event.preventDefault();}
}
});$.extend($.ui.autocomplete,{escapeRegex:function(value ) {return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
},filter:function(array,term) {var matcher =new RegExp($.ui.autocomplete.escapeRegex(term),"i");return $.grep(array,function(value) {return matcher.test(value.label ||value.value ||value );});}
});$.widget("ui.autocomplete",$.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(amount ) {return amount + (amount > 1 ?" results are":" result is") +
" available, use up and down arrow keys to navigate.";}
}
},__response:function(content ) {var message;this._superApply(arguments );if (this.options.disabled ||this.cancelSearch ) {return;}
if (content &&content.length ) {message =this.options.messages.results(content.length );} else {message =this.options.messages.noResults;}
this.liveRegion.text(message );}
});}(jQuery ));(function($,undefined ) {var lastActive,startXPos,startYPos,clickDragged,baseClasses ="ui-button ui-widget ui-state-default ui-corner-all",stateClasses ="ui-state-hover ui-state-active ",typeClasses ="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",formResetHandler =function() {var buttons =$(this ).find(":ui-button");setTimeout(function() {buttons.button("refresh");},1 );},radioGroup =function(radio ) {var name =radio.name,form =radio.form,radios =$([] );if (name ) {if (form ) {radios =$(form ).find("[name='"+ name + "']");} else {radios =$("[name='"+ name + "']",radio.ownerDocument )
.filter(function() {return !this.form;});}
}
return radios;};$.widget("ui.button",{version:"1.9.2",defaultElement:"<button>",options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null
}
},_create:function() {this.element.closest("form")
.unbind("reset"+ this.eventNamespace )
.bind("reset"+ this.eventNamespace,formResetHandler );if (typeof this.options.disabled !=="boolean") {this.options.disabled =!!this.element.prop("disabled");} else {this.element.prop("disabled",this.options.disabled );}
this._determineButtonType();this.hasTitle =!!this.buttonElement.attr("title");var that =this,options =this.options,toggleButton =this.type ==="checkbox"||this.type ==="radio",activeClass =!toggleButton ?"ui-state-active":"",focusClass ="ui-state-focus";if (options.label ===null ) {options.label =(this.type ==="input"?this.buttonElement.val() :this.buttonElement.html());}
this._hoverable(this.buttonElement );this.buttonElement
.addClass(baseClasses )
.attr("role","button")
.bind("mouseenter"+ this.eventNamespace,function() {if (options.disabled ) {return;}
if (this ===lastActive ) {$(this ).addClass("ui-state-active");}
})
.bind("mouseleave"+ this.eventNamespace,function() {if (options.disabled ) {return;}
$(this ).removeClass(activeClass );})
.bind("click"+ this.eventNamespace,function(event ) {if (options.disabled ) {event.preventDefault();event.stopImmediatePropagation();}
});this.element
.bind("focus"+ this.eventNamespace,function() {that.buttonElement.addClass(focusClass );})
.bind("blur"+ this.eventNamespace,function() {that.buttonElement.removeClass(focusClass );});if (toggleButton ) {this.element.bind("change"+ this.eventNamespace,function() {if (clickDragged ) {return;}
that.refresh();});this.buttonElement
.bind("mousedown"+ this.eventNamespace,function(event ) {if (options.disabled ) {return;}
clickDragged =false;startXPos =event.pageX;startYPos =event.pageY;})
.bind("mouseup"+ this.eventNamespace,function(event ) {if (options.disabled ) {return;}
if (startXPos !==event.pageX ||startYPos !==event.pageY ) {clickDragged =true;}
});}
if (this.type ==="checkbox") {this.buttonElement.bind("click"+ this.eventNamespace,function() {if (options.disabled ||clickDragged ) {return false;}
$(this ).toggleClass("ui-state-active");that.buttonElement.attr("aria-pressed",that.element[0].checked );});} else if (this.type ==="radio") {this.buttonElement.bind("click"+ this.eventNamespace,function() {if (options.disabled ||clickDragged ) {return false;}
$(this ).addClass("ui-state-active");that.buttonElement.attr("aria-pressed","true");var radio =that.element[0 ];radioGroup(radio )
.not(radio )
.map(function() {return $(this ).button("widget")[0 ];})
.removeClass("ui-state-active")
.attr("aria-pressed","false");});} else {this.buttonElement
.bind("mousedown"+ this.eventNamespace,function() {if (options.disabled ) {return false;}
$(this ).addClass("ui-state-active");lastActive =this;that.document.one("mouseup",function() {lastActive =null;});})
.bind("mouseup"+ this.eventNamespace,function() {if (options.disabled ) {return false;}
$(this ).removeClass("ui-state-active");})
.bind("keydown"+ this.eventNamespace,function(event) {if (options.disabled ) {return false;}
if (event.keyCode ===$.ui.keyCode.SPACE ||event.keyCode ===$.ui.keyCode.ENTER ) {$(this ).addClass("ui-state-active");}
})
.bind("keyup"+ this.eventNamespace,function() {$(this ).removeClass("ui-state-active");});if (this.buttonElement.is("a") ) {this.buttonElement.keyup(function(event) {if (event.keyCode ===$.ui.keyCode.SPACE ) {$(this ).click();}
});}
}
this._setOption("disabled",options.disabled );this._resetButton();},_determineButtonType:function() {var ancestor,labelSelector,checked;if (this.element.is("[type=checkbox]") ) {this.type ="checkbox";} else if (this.element.is("[type=radio]") ) {this.type ="radio";} else if (this.element.is("input") ) {this.type ="input";} else {this.type ="button";}
if (this.type ==="checkbox"||this.type ==="radio") {ancestor =this.element.parents().last();labelSelector ="label[for='"+ this.element.attr("id") + "']";this.buttonElement =ancestor.find(labelSelector );if (!this.buttonElement.length ) {ancestor =ancestor.length ?ancestor.siblings() :this.element.siblings();this.buttonElement =ancestor.filter(labelSelector );if (!this.buttonElement.length ) {this.buttonElement =ancestor.find(labelSelector );}
}
this.element.addClass("ui-helper-hidden-accessible");checked =this.element.is(":checked");if (checked ) {this.buttonElement.addClass("ui-state-active");}
this.buttonElement.prop("aria-pressed",checked );} else {this.buttonElement =this.element;}
},widget:function() {return this.buttonElement;},_destroy:function() {this.element
.removeClass("ui-helper-hidden-accessible");this.buttonElement
.removeClass(baseClasses + " "+ stateClasses + " "+ typeClasses )
.removeAttr("role")
.removeAttr("aria-pressed")
.html(this.buttonElement.find(".ui-button-text").html() );if (!this.hasTitle ) {this.buttonElement.removeAttr("title");}
},_setOption:function(key,value ) {this._super(key,value );if (key ==="disabled") {if (value ) {this.element.prop("disabled",true );} else {this.element.prop("disabled",false );}
return;}
this._resetButton();},refresh:function() {var isDisabled =this.element.is("input, button") ?this.element.is(":disabled") :this.element.hasClass("ui-button-disabled");if (isDisabled !==this.options.disabled ) {this._setOption("disabled",isDisabled );}
if (this.type ==="radio") {radioGroup(this.element[0] ).each(function() {if ($(this ).is(":checked") ) {$(this ).button("widget")
.addClass("ui-state-active")
.attr("aria-pressed","true");} else {$(this ).button("widget")
.removeClass("ui-state-active")
.attr("aria-pressed","false");}
});} else if (this.type ==="checkbox") {if (this.element.is(":checked") ) {this.buttonElement
.addClass("ui-state-active")
.attr("aria-pressed","true");} else {this.buttonElement
.removeClass("ui-state-active")
.attr("aria-pressed","false");}
}
},_resetButton:function() {if (this.type ==="input") {if (this.options.label ) {this.element.val(this.options.label );}
return;}
var buttonElement =this.buttonElement.removeClass(typeClasses ),buttonText =$("<span></span>",this.document[0] )
.addClass("ui-button-text")
.html(this.options.label )
.appendTo(buttonElement.empty() )
.text(),icons =this.options.icons,multipleIcons =icons.primary &&icons.secondary,buttonClasses =[];if (icons.primary ||icons.secondary ) {if (this.options.text ) {buttonClasses.push("ui-button-text-icon"+ (multipleIcons ?"s":(icons.primary ?"-primary":"-secondary") ) );}
if (icons.primary ) {buttonElement.prepend("<span class='ui-button-icon-primary ui-icon "+ icons.primary + "'></span>");}
if (icons.secondary ) {buttonElement.append("<span class='ui-button-icon-secondary ui-icon "+ icons.secondary + "'></span>");}
if (!this.options.text ) {buttonClasses.push(multipleIcons ?"ui-button-icons-only":"ui-button-icon-only");if (!this.hasTitle ) {buttonElement.attr("title",$.trim(buttonText ) );}
}
} else {buttonClasses.push("ui-button-text-only");}
buttonElement.addClass(buttonClasses.join(" ") );}
});$.widget("ui.buttonset",{version:"1.9.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"},_create:function() {this.element.addClass("ui-buttonset");},_init:function() {this.refresh();},_setOption:function(key,value ) {if (key ==="disabled") {this.buttons.button("option",key,value );}
this._super(key,value );},refresh:function() {var rtl =this.element.css("direction") ==="rtl";this.buttons =this.element.find(this.options.items )
.filter(":ui-button")
.button("refresh")
.end()
.not(":ui-button")
.button()
.end()
.map(function() {return $(this ).button("widget")[0 ];})
.removeClass("ui-corner-all ui-corner-left ui-corner-right")
.filter(":first")
.addClass(rtl ?"ui-corner-right":"ui-corner-left")
.end()
.filter(":last")
.addClass(rtl ?"ui-corner-left":"ui-corner-right")
.end()
.end();},_destroy:function() {this.element.removeClass("ui-buttonset");this.buttons
.map(function() {return $(this ).button("widget")[0 ];})
.removeClass("ui-corner-left ui-corner-right")
.end()
.button("destroy");}
});}(jQuery ) );(function($,undefined ) {$.extend($.ui,{datepicker:{version:"1.9.2"} });var PROP_NAME ='datepicker';var dpuuid =new Date().getTime();var instActive;function Datepicker() {this.debug =false;this._curInst =null;this._keyEvent =false;this._disabledInputs =[];this._datepickerShowing =false;this._inDialog =false;this._mainDivId ='ui-datepicker-div';this._inlineClass ='ui-datepicker-inline';this._appendClass ='ui-datepicker-append';this._triggerClass ='ui-datepicker-trigger';this._dialogClass ='ui-datepicker-dialog';this._disableClass ='ui-datepicker-disabled';this._unselectableClass ='ui-datepicker-unselectable';this._currentClass ='ui-datepicker-current-day';this._dayOverClass ='ui-datepicker-days-cell-over';this.regional =[];this.regional[''] ={closeText:'Done',prevText:'Prev',nextText:'Next',currentText:'Today',monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],monthNamesShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],dayNamesShort:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],dayNamesMin:['Su','Mo','Tu','We','Th','Fr','Sa'],weekHeader:'Wk',dateFormat:'mm/dd/yy',firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:''};this._defaults ={showOn:'focus',showAnim:'fadeIn',showOptions:{},defaultDate:null,appendText:'',buttonText:'...',buttonImage:'',buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:'c-10:c+10',showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:'+10',minDate:null,maxDate:null,duration:'fast',beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:'',altFormat:'',constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false };$.extend(this._defaults,this.regional['']);this.dpDiv =bindHover($('<div id="'+ this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));}
$.extend(Datepicker.prototype,{markerClassName:'hasDatepicker',maxRows:4,log:function () {if (this.debug)
console.log.apply('',arguments);},_widgetDatepicker:function() {return this.dpDiv;},setDefaults:function(settings) {extendRemove(this._defaults,settings ||{});return this;},_attachDatepicker:function(target,settings) {var inlineSettings =null;for (var attrName in this._defaults) {var attrValue =target.getAttribute('date:'+ attrName);if (attrValue) {inlineSettings =inlineSettings ||{};try {inlineSettings[attrName] =eval(attrValue);} catch (err) {inlineSettings[attrName] =attrValue;}
}
}
var nodeName =target.nodeName.toLowerCase();var inline =(nodeName =='div'||nodeName =='span');if (!target.id) {this.uuid +=1;target.id ='dp'+ this.uuid;}
var inst =this._newInst($(target),inline);inst.settings =$.extend({},settings ||{},inlineSettings ||{});if (nodeName =='input') {this._connectDatepicker(target,inst);} else if (inline) {this._inlineDatepicker(target,inst);}
},_newInst:function(target,inline) {var id =target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
return {id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline ?this.dpDiv :bindHover($('<div class="'+ this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))};},_connectDatepicker:function(target,inst) {var input =$(target);inst.append =$([]);inst.trigger =$([]);if (input.hasClass(this.markerClassName))
return;this._attachments(input,inst);input.addClass(this.markerClassName).keydown(this._doKeyDown).
keypress(this._doKeyPress).keyup(this._doKeyUp).
bind("setData.datepicker",function(event,key,value) {inst.settings[key] =value;}).bind("getData.datepicker",function(event,key) {return this._get(inst,key);});this._autoSize(inst);$.data(target,PROP_NAME,inst);if(inst.settings.disabled ) {this._disableDatepicker(target );}
},_attachments:function(input,inst) {var appendText =this._get(inst,'appendText');var isRTL =this._get(inst,'isRTL');if (inst.append)
inst.append.remove();if (appendText) {inst.append =$('<span class="'+ this._appendClass + '">'+ appendText + '</span>');input[isRTL ?'before':'after'](inst.append);}
input.unbind('focus',this._showDatepicker);if (inst.trigger)
inst.trigger.remove();var showOn =this._get(inst,'showOn');if (showOn =='focus'||showOn =='both') input.focus(this._showDatepicker);if (showOn =='button'||showOn =='both') {var buttonText =this._get(inst,'buttonText');var buttonImage =this._get(inst,'buttonImage');inst.trigger =$(this._get(inst,'buttonImageOnly') ?$('<img/>').addClass(this._triggerClass).
attr({src:buttonImage,alt:buttonText,title:buttonText }) :$('<button type="button"></button>').addClass(this._triggerClass).
html(buttonImage ==''?buttonText :$('<img/>').attr({src:buttonImage,alt:buttonText,title:buttonText })));input[isRTL ?'before':'after'](inst.trigger);inst.trigger.click(function() {if ($.datepicker._datepickerShowing &&$.datepicker._lastInput ==input[0])
$.datepicker._hideDatepicker();else if ($.datepicker._datepickerShowing &&$.datepicker._lastInput !=input[0]) {$.datepicker._hideDatepicker();$.datepicker._showDatepicker(input[0]);} else
$.datepicker._showDatepicker(input[0]);return false;});}
},_autoSize:function(inst) {if (this._get(inst,'autoSize') &&!inst.inline) {var date =new Date(2009,12 - 1,20);var dateFormat =this._get(inst,'dateFormat');if (dateFormat.match(/[DM]/)) {
var findMax =function(names) {var max =0;var maxI =0;for (var i =0;i < names.length;i++) {if (names[i].length > max) {max =names[i].length;maxI =i;}
}
return maxI;};date.setMonth(findMax(this._get(inst,(dateFormat.match(/MM/) ?
'monthNames':'monthNamesShort'))));date.setDate(findMax(this._get(inst,(dateFormat.match(/DD/) ?
'dayNames':'dayNamesShort'))) + 20 - date.getDay());}
inst.input.attr('size',this._formatDate(inst,date).length);}
},_inlineDatepicker:function(target,inst) {var divSpan =$(target);if (divSpan.hasClass(this.markerClassName))
return;divSpan.addClass(this.markerClassName).append(inst.dpDiv).
bind("setData.datepicker",function(event,key,value){inst.settings[key] =value;}).bind("getData.datepicker",function(event,key){return this._get(inst,key);});$.data(target,PROP_NAME,inst);this._setDate(inst,this._getDefaultDate(inst),true);this._updateDatepicker(inst);this._updateAlternate(inst);if(inst.settings.disabled ) {this._disableDatepicker(target );}
inst.dpDiv.css("display","block");},_dialogDatepicker:function(input,date,onSelect,settings,pos) {var inst =this._dialogInst;if (!inst) {this.uuid +=1;var id ='dp'+ this.uuid;this._dialogInput =$('<input type="text" id="'+ id +
'" style="position: absolute; top: -100px; width: 0px;"/>');this._dialogInput.keydown(this._doKeyDown);$('body').append(this._dialogInput);inst =this._dialogInst =this._newInst(this._dialogInput,false);inst.settings ={};$.data(this._dialogInput[0],PROP_NAME,inst);}
extendRemove(inst.settings,settings ||{});date =(date &&date.constructor ==Date ?this._formatDate(inst,date) :date);this._dialogInput.val(date);this._pos =(pos ?(pos.length ?pos :[pos.pageX,pos.pageY]) :null);if (!this._pos) {var browserWidth =document.documentElement.clientWidth;var browserHeight =document.documentElement.clientHeight;var scrollX =document.documentElement.scrollLeft ||document.body.scrollLeft;var scrollY =document.documentElement.scrollTop ||document.body.scrollTop;this._pos =[(browserWidth / 2) - 100 + scrollX,(browserHeight / 2) - 150 + scrollY];}
this._dialogInput.css('left',(this._pos[0] + 20) + 'px').css('top',this._pos[1] + 'px');inst.settings.onSelect =onSelect;this._inDialog =true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if ($.blockUI)
$.blockUI(this.dpDiv);$.data(this._dialogInput[0],PROP_NAME,inst);return this;},_destroyDatepicker:function(target) {var $target =$(target);var inst =$.data(target,PROP_NAME);if (!$target.hasClass(this.markerClassName)) {return;}
var nodeName =target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);if (nodeName =='input') {inst.append.remove();inst.trigger.remove();$target.removeClass(this.markerClassName).
unbind('focus',this._showDatepicker).
unbind('keydown',this._doKeyDown).
unbind('keypress',this._doKeyPress).
unbind('keyup',this._doKeyUp);} else if (nodeName =='div'||nodeName =='span')
$target.removeClass(this.markerClassName).empty();},_enableDatepicker:function(target) {var $target =$(target);var inst =$.data(target,PROP_NAME);if (!$target.hasClass(this.markerClassName)) {return;}
var nodeName =target.nodeName.toLowerCase();if (nodeName =='input') {target.disabled =false;inst.trigger.filter('button').
each(function() {this.disabled =false;}).end().
filter('img').css({opacity:'1.0',cursor:''});}
else if (nodeName =='div'||nodeName =='span') {var inline =$target.children('.'+ this._inlineClass);inline.children().removeClass('ui-state-disabled');inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
prop("disabled",false);}
this._disabledInputs =$.map(this._disabledInputs,function(value) {return (value ==target ?null :value);});},_disableDatepicker:function(target) {var $target =$(target);var inst =$.data(target,PROP_NAME);if (!$target.hasClass(this.markerClassName)) {return;}
var nodeName =target.nodeName.toLowerCase();if (nodeName =='input') {target.disabled =true;inst.trigger.filter('button').
each(function() {this.disabled =true;}).end().
filter('img').css({opacity:'0.5',cursor:'default'});}
else if (nodeName =='div'||nodeName =='span') {var inline =$target.children('.'+ this._inlineClass);inline.children().addClass('ui-state-disabled');inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
prop("disabled",true);}
this._disabledInputs =$.map(this._disabledInputs,function(value) {return (value ==target ?null :value);});this._disabledInputs[this._disabledInputs.length] =target;},_isDisabledDatepicker:function(target) {if (!target) {return false;}
for (var i =0;i < this._disabledInputs.length;i++) {if (this._disabledInputs[i] ==target)
return true;}
return false;},_getInst:function(target) {try {return $.data(target,PROP_NAME);}
catch (err) {throw 'Missing instance data for this datepicker';}
},_optionDatepicker:function(target,name,value) {var inst =this._getInst(target);if (arguments.length ==2 &&typeof name =='string') {return (name =='defaults'?$.extend({},$.datepicker._defaults) :(inst ?(name =='all'?$.extend({},inst.settings) :this._get(inst,name)) :null));}
var settings =name ||{};if (typeof name =='string') {settings ={};settings[name] =value;}
if (inst) {if (this._curInst ==inst) {this._hideDatepicker();}
var date =this._getDateDatepicker(target,true);var minDate =this._getMinMaxDate(inst,'min');var maxDate =this._getMinMaxDate(inst,'max');extendRemove(inst.settings,settings);if (minDate !==null &&settings['dateFormat'] !==undefined &&settings['minDate'] ===undefined)
inst.settings.minDate =this._formatDate(inst,minDate);if (maxDate !==null &&settings['dateFormat'] !==undefined &&settings['maxDate'] ===undefined)
inst.settings.maxDate =this._formatDate(inst,maxDate);this._attachments($(target),inst);this._autoSize(inst);this._setDate(inst,date);this._updateAlternate(inst);this._updateDatepicker(inst);}
},_changeDatepicker:function(target,name,value) {this._optionDatepicker(target,name,value);},_refreshDatepicker:function(target) {var inst =this._getInst(target);if (inst) {this._updateDatepicker(inst);}
},_setDateDatepicker:function(target,date) {var inst =this._getInst(target);if (inst) {this._setDate(inst,date);this._updateDatepicker(inst);this._updateAlternate(inst);}
},_getDateDatepicker:function(target,noDefault) {var inst =this._getInst(target);if (inst &&!inst.inline)
this._setDateFromField(inst,noDefault);return (inst ?this._getDate(inst) :null);},_doKeyDown:function(event) {var inst =$.datepicker._getInst(event.target);var handled =true;var isRTL =inst.dpDiv.is('.ui-datepicker-rtl');inst._keyEvent =true;if ($.datepicker._datepickerShowing)
switch (event.keyCode) {case 9:$.datepicker._hideDatepicker();handled =false;break;case 13:var sel =$('td.'+ $.datepicker._dayOverClass + ':not(.'+
$.datepicker._currentClass + ')',inst.dpDiv);if (sel[0])
$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0]);var onSelect =$.datepicker._get(inst,'onSelect');if (onSelect) {var dateStr =$.datepicker._formatDate(inst);onSelect.apply((inst.input ?inst.input[0] :null),[dateStr,inst]);}
else
$.datepicker._hideDatepicker();return false;break;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey ?-$.datepicker._get(inst,'stepBigMonths') :-$.datepicker._get(inst,'stepMonths')),'M');break;case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey ?+$.datepicker._get(inst,'stepBigMonths') :+$.datepicker._get(inst,'stepMonths')),'M');break;case 35:if (event.ctrlKey ||event.metaKey) $.datepicker._clearDate(event.target);handled =event.ctrlKey ||event.metaKey;break;case 36:if (event.ctrlKey ||event.metaKey) $.datepicker._gotoToday(event.target);handled =event.ctrlKey ||event.metaKey;break;case 37:if (event.ctrlKey ||event.metaKey) $.datepicker._adjustDate(event.target,(isRTL ?+1 :-1),'D');handled =event.ctrlKey ||event.metaKey;if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target,(event.ctrlKey ?-$.datepicker._get(inst,'stepBigMonths') :-$.datepicker._get(inst,'stepMonths')),'M');break;case 38:if (event.ctrlKey ||event.metaKey) $.datepicker._adjustDate(event.target,-7,'D');handled =event.ctrlKey ||event.metaKey;break;case 39:if (event.ctrlKey ||event.metaKey) $.datepicker._adjustDate(event.target,(isRTL ?-1 :+1),'D');handled =event.ctrlKey ||event.metaKey;if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target,(event.ctrlKey ?+$.datepicker._get(inst,'stepBigMonths') :+$.datepicker._get(inst,'stepMonths')),'M');break;case 40:if (event.ctrlKey ||event.metaKey) $.datepicker._adjustDate(event.target,+7,'D');handled =event.ctrlKey ||event.metaKey;break;default:handled =false;}
else if (event.keyCode ==36 &&event.ctrlKey) $.datepicker._showDatepicker(this);else {handled =false;}
if (handled) {event.preventDefault();event.stopPropagation();}
},_doKeyPress:function(event) {var inst =$.datepicker._getInst(event.target);if ($.datepicker._get(inst,'constrainInput')) {var chars =$.datepicker._possibleChars($.datepicker._get(inst,'dateFormat'));var chr =String.fromCharCode(event.charCode ==undefined ?event.keyCode :event.charCode);return event.ctrlKey ||event.metaKey ||(chr < ' '||!chars ||chars.indexOf(chr) > -1);}
},_doKeyUp:function(event) {var inst =$.datepicker._getInst(event.target);if (inst.input.val() !=inst.lastVal) {try {var date =$.datepicker.parseDate($.datepicker._get(inst,'dateFormat'),(inst.input ?inst.input.val() :null),$.datepicker._getFormatConfig(inst));if (date) {$.datepicker._setDateFromField(inst);$.datepicker._updateAlternate(inst);$.datepicker._updateDatepicker(inst);}
}
catch (err) {$.datepicker.log(err);}
}
return true;},_showDatepicker:function(input) {input =input.target ||input;if (input.nodeName.toLowerCase() !='input') input =$('input',input.parentNode)[0];if ($.datepicker._isDisabledDatepicker(input) ||$.datepicker._lastInput ==input) return;var inst =$.datepicker._getInst(input);if ($.datepicker._curInst &&$.datepicker._curInst !=inst) {$.datepicker._curInst.dpDiv.stop(true,true);if (inst &&$.datepicker._datepickerShowing ) {$.datepicker._hideDatepicker($.datepicker._curInst.input[0] );}
}
var beforeShow =$.datepicker._get(inst,'beforeShow');var beforeShowSettings =beforeShow ?beforeShow.apply(input,[input,inst]) :{};if(beforeShowSettings ===false){return;}
extendRemove(inst.settings,beforeShowSettings);inst.lastVal =null;$.datepicker._lastInput =input;$.datepicker._setDateFromField(inst);if ($.datepicker._inDialog) input.value ='';if (!$.datepicker._pos) {$.datepicker._pos =$.datepicker._findPos(input);$.datepicker._pos[1] +=input.offsetHeight;}
var isFixed =false;$(input).parents().each(function() {isFixed |=$(this).css('position') =='fixed';return !isFixed;});var offset ={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos =null;inst.dpDiv.empty();inst.dpDiv.css({position:'absolute',display:'block',top:'-1000px'});$.datepicker._updateDatepicker(inst);offset =$.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker._inDialog &&$.blockUI ?'static':(isFixed ?'fixed':'absolute')),display:'none',left:offset.left + 'px',top:offset.top + 'px'});if (!inst.inline) {var showAnim =$.datepicker._get(inst,'showAnim');var duration =$.datepicker._get(inst,'duration');var postProcess =function() {var cover =inst.dpDiv.find('iframe.ui-datepicker-cover');if(!!cover.length ){var borders =$.datepicker._getBorders(inst.dpDiv);cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()});}
};inst.dpDiv.zIndex($(input).zIndex()+1);$.datepicker._datepickerShowing =true;if ($.effects &&($.effects.effect[showAnim ] ||$.effects[showAnim ] ) )
inst.dpDiv.show(showAnim,$.datepicker._get(inst,'showOptions'),duration,postProcess);else
inst.dpDiv[showAnim ||'show']((showAnim ?duration :null),postProcess);if (!showAnim ||!duration)
postProcess();if (inst.input.is(':visible') &&!inst.input.is(':disabled'))
inst.input.focus();$.datepicker._curInst =inst;}
},_updateDatepicker:function(inst) {this.maxRows =4;var borders =$.datepicker._getBorders(inst.dpDiv);instActive =inst;inst.dpDiv.empty().append(this._generateHTML(inst));this._attachHandlers(inst);var cover =inst.dpDiv.find('iframe.ui-datepicker-cover');if(!!cover.length ){cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}
inst.dpDiv.find('.'+ this._dayOverClass + ' a').mouseover();var numMonths =this._getNumberOfMonths(inst);var cols =numMonths[1];var width =17;inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');if (cols > 1)
inst.dpDiv.addClass('ui-datepicker-multi-'+ cols).css('width',(width * cols) + 'em');inst.dpDiv[(numMonths[0] !=1 ||numMonths[1] !=1 ?'add':'remove') +
'Class']('ui-datepicker-multi');inst.dpDiv[(this._get(inst,'isRTL') ?'add':'remove') +
'Class']('ui-datepicker-rtl');if (inst ==$.datepicker._curInst &&$.datepicker._datepickerShowing &&inst.input &&inst.input.is(':visible') &&!inst.input.is(':disabled') &&inst.input[0] !=document.activeElement)
inst.input.focus();if(inst.yearshtml ){var origyearshtml =inst.yearshtml;setTimeout(function(){if(origyearshtml ===inst.yearshtml &&inst.yearshtml ){inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);}
origyearshtml =inst.yearshtml =null;},0);}
},_getBorders:function(elem) {var convert =function(value) {return {thin:1,medium:2,thick:3}[value] ||value;};return [parseFloat(convert(elem.css('border-left-width'))),parseFloat(convert(elem.css('border-top-width')))];},_checkOffset:function(inst,offset,isFixed) {var dpWidth =inst.dpDiv.outerWidth();var dpHeight =inst.dpDiv.outerHeight();var inputWidth =inst.input ?inst.input.outerWidth() :0;var inputHeight =inst.input ?inst.input.outerHeight() :0;var viewWidth =document.documentElement.clientWidth + (isFixed ?0 :$(document).scrollLeft());var viewHeight =document.documentElement.clientHeight + (isFixed ?0 :$(document).scrollTop());offset.left -=(this._get(inst,'isRTL') ?(dpWidth - inputWidth) :0);offset.left -=(isFixed &&offset.left ==inst.input.offset().left) ?$(document).scrollLeft() :0;offset.top -=(isFixed &&offset.top ==(inst.input.offset().top + inputHeight)) ?$(document).scrollTop() :0;offset.left -=Math.min(offset.left,(offset.left + dpWidth > viewWidth &&viewWidth > dpWidth) ?Math.abs(offset.left + dpWidth - viewWidth) :0);offset.top -=Math.min(offset.top,(offset.top + dpHeight > viewHeight &&viewHeight > dpHeight) ?Math.abs(dpHeight + inputHeight) :0);return offset;},_findPos:function(obj) {var inst =this._getInst(obj);var isRTL =this._get(inst,'isRTL');while (obj &&(obj.type =='hidden'||obj.nodeType !=1 ||$.expr.filters.hidden(obj))) {obj =obj[isRTL ?'previousSibling':'nextSibling'];}
var position =$(obj).offset();return [position.left,position.top];},_hideDatepicker:function(input) {var inst =this._curInst;if (!inst ||(input &&inst !=$.data(input,PROP_NAME)))
return;if (this._datepickerShowing) {var showAnim =this._get(inst,'showAnim');var duration =this._get(inst,'duration');var postProcess =function() {$.datepicker._tidyDialog(inst);};if ($.effects &&($.effects.effect[showAnim ] ||$.effects[showAnim ] ) )
inst.dpDiv.hide(showAnim,$.datepicker._get(inst,'showOptions'),duration,postProcess);else
inst.dpDiv[(showAnim =='slideDown'?'slideUp':(showAnim =='fadeIn'?'fadeOut':'hide'))]((showAnim ?duration :null),postProcess);if (!showAnim)
postProcess();this._datepickerShowing =false;var onClose =this._get(inst,'onClose');if (onClose)
onClose.apply((inst.input ?inst.input[0] :null),[(inst.input ?inst.input.val() :''),inst]);this._lastInput =null;if (this._inDialog) {this._dialogInput.css({position:'absolute',left:'0',top:'-100px'});if ($.blockUI) {$.unblockUI();$('body').append(this.dpDiv);}
}
this._inDialog =false;}
},_tidyDialog:function(inst) {inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');},_checkExternalClick:function(event) {if (!$.datepicker._curInst)
return;var $target =$(event.target),inst =$.datepicker._getInst($target[0]);if ((($target[0].id !=$.datepicker._mainDivId &&$target.parents('#'+ $.datepicker._mainDivId).length ==0 &&!$target.hasClass($.datepicker.markerClassName) &&!$target.closest("."+ $.datepicker._triggerClass).length &&$.datepicker._datepickerShowing &&!($.datepicker._inDialog &&$.blockUI) ) ) ||($target.hasClass($.datepicker.markerClassName) &&$.datepicker._curInst !=inst ) )
$.datepicker._hideDatepicker();},_adjustDate:function(id,offset,period) {var target =$(id);var inst =this._getInst(target[0]);if (this._isDisabledDatepicker(target[0])) {return;}
this._adjustInstDate(inst,offset +
(period =='M'?this._get(inst,'showCurrentAtPos') :0),period);this._updateDatepicker(inst);},_gotoToday:function(id) {var target =$(id);var inst =this._getInst(target[0]);if (this._get(inst,'gotoCurrent') &&inst.currentDay) {inst.selectedDay =inst.currentDay;inst.drawMonth =inst.selectedMonth =inst.currentMonth;inst.drawYear =inst.selectedYear =inst.currentYear;}
else {var date =new Date();inst.selectedDay =date.getDate();inst.drawMonth =inst.selectedMonth =date.getMonth();inst.drawYear =inst.selectedYear =date.getFullYear();}
this._notifyChange(inst);this._adjustDate(target);},_selectMonthYear:function(id,select,period) {var target =$(id);var inst =this._getInst(target[0]);inst['selected'+ (period =='M'?'Month':'Year')] =inst['draw'+ (period =='M'?'Month':'Year')] =parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target);},_selectDay:function(id,month,year,td) {var target =$(id);if ($(td).hasClass(this._unselectableClass) ||this._isDisabledDatepicker(target[0])) {return;}
var inst =this._getInst(target[0]);inst.selectedDay =inst.currentDay =$('a',td).html();inst.selectedMonth =inst.currentMonth =month;inst.selectedYear =inst.currentYear =year;this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));},_clearDate:function(id) {var target =$(id);var inst =this._getInst(target[0]);this._selectDate(target,'');},_selectDate:function(id,dateStr) {var target =$(id);var inst =this._getInst(target[0]);dateStr =(dateStr !=null ?dateStr :this._formatDate(inst));if (inst.input)
inst.input.val(dateStr);this._updateAlternate(inst);var onSelect =this._get(inst,'onSelect');if (onSelect)
onSelect.apply((inst.input ?inst.input[0] :null),[dateStr,inst]);else if (inst.input)
inst.input.trigger('change');if (inst.inline)
this._updateDatepicker(inst);else {this._hideDatepicker();this._lastInput =inst.input[0];if (typeof(inst.input[0]) !='object')
inst.input.focus();this._lastInput =null;}
},_updateAlternate:function(inst) {var altField =this._get(inst,'altField');if (altField) {var altFormat =this._get(inst,'altFormat') ||this._get(inst,'dateFormat');var date =this._getDate(inst);var dateStr =this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function() {$(this).val(dateStr);});}
},noWeekends:function(date) {var day =date.getDay();return [(day > 0 &&day < 6),''];},iso8601Week:function(date) {var checkDate =new Date(date.getTime());checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() ||7));var time =checkDate.getTime();checkDate.setMonth(0);checkDate.setDate(1);return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;},parseDate:function (format,value,settings) {if (format ==null ||value ==null)
throw 'Invalid arguments';value =(typeof value =='object'?value.toString() :value + '');if (value =='')
return null;var shortYearCutoff =(settings ?settings.shortYearCutoff :null) ||this._defaults.shortYearCutoff;shortYearCutoff =(typeof shortYearCutoff !='string'?shortYearCutoff :new Date().getFullYear() % 100 + parseInt(shortYearCutoff,10));var dayNamesShort =(settings ?settings.dayNamesShort :null) ||this._defaults.dayNamesShort;var dayNames =(settings ?settings.dayNames :null) ||this._defaults.dayNames;var monthNamesShort =(settings ?settings.monthNamesShort :null) ||this._defaults.monthNamesShort;var monthNames =(settings ?settings.monthNames :null) ||this._defaults.monthNames;var year =-1;var month =-1;var day =-1;var doy =-1;var literal =false;var lookAhead =function(match) {var matches =(iFormat + 1 < format.length &&format.charAt(iFormat + 1) ==match);if (matches)
iFormat++;return matches;};var getNumber =function(match) {var isDoubled =lookAhead(match);var size =(match =='@'?14 :(match =='!'?20 :(match =='y'&&isDoubled ?4 :(match =='o'?3 :2))));var digits =new RegExp('^\\d{1,'+ size + '}');var num =value.substring(iValue).match(digits);if (!num)
throw 'Missing number at position '+ iValue;iValue +=num[0].length;return parseInt(num[0],10);};var getName =function(match,shortNames,longNames) {var names =$.map(lookAhead(match) ?longNames :shortNames,function (v,k) {return [[k,v] ];}).sort(function (a,b) {return -(a[1].length - b[1].length);});var index =-1;$.each(names,function (i,pair) {var name =pair[1];if (value.substr(iValue,name.length).toLowerCase() ==name.toLowerCase()) {index =pair[0];iValue +=name.length;return false;}
});if (index !=-1)
return index + 1;else
throw 'Unknown name at position '+ iValue;};var checkLiteral =function() {if (value.charAt(iValue) !=format.charAt(iFormat))
throw 'Unexpected literal at position '+ iValue;iValue++;};var iValue =0;for (var iFormat =0;iFormat < format.length;iFormat++) {if (literal)
if (format.charAt(iFormat) =="'"&&!lookAhead("'"))
literal =false;else
checkLiteral();else
switch (format.charAt(iFormat)) {case 'd':day =getNumber('d');break;case 'D':getName('D',dayNamesShort,dayNames);break;case 'o':doy =getNumber('o');break;case 'm':month =getNumber('m');break;case 'M':month =getName('M',monthNamesShort,monthNames);break;case 'y':year =getNumber('y');break;case '@':var date =new Date(getNumber('@'));year =date.getFullYear();month =date.getMonth() + 1;day =date.getDate();break;case '!':var date =new Date((getNumber('!') - this._ticksTo1970) / 10000);year =date.getFullYear();month =date.getMonth() + 1;day =date.getDate();break;case "'":if (lookAhead("'"))
checkLiteral();else
literal =true;break;default:checkLiteral();}
}
if (iValue < value.length){var extra =value.substr(iValue);if (!/^\s+/.test(extra)) {
throw "Extra/unparsed characters found in date: "+ extra;}
}
if (year ==-1)
year =new Date().getFullYear();else if (year < 100)
year +=new Date().getFullYear() - new Date().getFullYear() % 100 +
(year <=shortYearCutoff ?0 :-100);if (doy > -1) {month =1;day =doy;do {var dim =this._getDaysInMonth(year,month - 1);if (day <=dim)
break;month++;day -=dim;} while (true);}
var date =this._daylightSavingAdjust(new Date(year,month - 1,day));if (date.getFullYear() !=year ||date.getMonth() + 1 !=month ||date.getDate() !=day)
throw 'Invalid date';return date;},ATOM:'yy-mm-dd',COOKIE:'D, dd M yy',ISO_8601:'yy-mm-dd',RFC_822:'D, d M y',RFC_850:'DD, dd-M-y',RFC_1036:'D, d M y',RFC_1123:'D, d M yy',RFC_2822:'D, d M yy',RSS:'D, d M y',TICKS:'!',TIMESTAMP:'@',W3C:'yy-mm-dd',_ticksTo1970:(((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),formatDate:function (format,date,settings) {if (!date)
return '';var dayNamesShort =(settings ?settings.dayNamesShort :null) ||this._defaults.dayNamesShort;var dayNames =(settings ?settings.dayNames :null) ||this._defaults.dayNames;var monthNamesShort =(settings ?settings.monthNamesShort :null) ||this._defaults.monthNamesShort;var monthNames =(settings ?settings.monthNames :null) ||this._defaults.monthNames;var lookAhead =function(match) {var matches =(iFormat + 1 < format.length &&format.charAt(iFormat + 1) ==match);if (matches)
iFormat++;return matches;};var formatNumber =function(match,value,len) {var num =''+ value;if (lookAhead(match))
while (num.length < len)
num ='0'+ num;return num;};var formatName =function(match,value,shortNames,longNames) {return (lookAhead(match) ?longNames[value] :shortNames[value]);};var output ='';var literal =false;if (date)
for (var iFormat =0;iFormat < format.length;iFormat++) {if (literal)
if (format.charAt(iFormat) =="'"&&!lookAhead("'"))
literal =false;else
output +=format.charAt(iFormat);else
switch (format.charAt(iFormat)) {case 'd':output +=formatNumber('d',date.getDate(),2);break;case 'D':output +=formatName('D',date.getDay(),dayNamesShort,dayNames);break;case 'o':output +=formatNumber('o',Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() - new Date(date.getFullYear(),0,0).getTime()) / 86400000),3);break;case 'm':output +=formatNumber('m',date.getMonth() + 1,2);break;case 'M':output +=formatName('M',date.getMonth(),monthNamesShort,monthNames);break;case 'y':output +=(lookAhead('y') ?date.getFullYear() :(date.getYear() % 100 < 10 ?'0':'') + date.getYear() % 100);break;case '@':output +=date.getTime();break;case '!':output +=date.getTime() * 10000 + this._ticksTo1970;break;case "'":if (lookAhead("'"))
output +="'";else
literal =true;break;default:output +=format.charAt(iFormat);}
}
return output;},_possibleChars:function (format) {var chars ='';var literal =false;var lookAhead =function(match) {var matches =(iFormat + 1 < format.length &&format.charAt(iFormat + 1) ==match);if (matches)
iFormat++;return matches;};for (var iFormat =0;iFormat < format.length;iFormat++)
if (literal)
if (format.charAt(iFormat) =="'"&&!lookAhead("'"))
literal =false;else
chars +=format.charAt(iFormat);else
switch (format.charAt(iFormat)) {case 'd':case 'm':case 'y':case '@':chars +='0123456789';break;case 'D':case 'M':return null;case "'":if (lookAhead("'"))
chars +="'";else
literal =true;break;default:chars +=format.charAt(iFormat);}
return chars;},_get:function(inst,name) {return inst.settings[name] !==undefined ?inst.settings[name] :this._defaults[name];},_setDateFromField:function(inst,noDefault) {if (inst.input.val() ==inst.lastVal) {return;}
var dateFormat =this._get(inst,'dateFormat');var dates =inst.lastVal =inst.input ?inst.input.val() :null;var date,defaultDate;date =defaultDate =this._getDefaultDate(inst);var settings =this._getFormatConfig(inst);try {date =this.parseDate(dateFormat,dates,settings) ||defaultDate;} catch (event) {this.log(event);dates =(noDefault ?'':dates);}
inst.selectedDay =date.getDate();inst.drawMonth =inst.selectedMonth =date.getMonth();inst.drawYear =inst.selectedYear =date.getFullYear();inst.currentDay =(dates ?date.getDate() :0);inst.currentMonth =(dates ?date.getMonth() :0);inst.currentYear =(dates ?date.getFullYear() :0);this._adjustInstDate(inst);},_getDefaultDate:function(inst) {return this._restrictMinMax(inst,this._determineDate(inst,this._get(inst,'defaultDate'),new Date()));},_determineDate:function(inst,date,defaultDate) {var offsetNumeric =function(offset) {var date =new Date();date.setDate(date.getDate() + offset);return date;};var offsetString =function(offset) {try {return $.datepicker.parseDate($.datepicker._get(inst,'dateFormat'),offset,$.datepicker._getFormatConfig(inst));}
catch (e) {}
var date =(offset.toLowerCase().match(/^c/) ?
$.datepicker._getDate(inst) :null) ||new Date();var year =date.getFullYear();var month =date.getMonth();var day =date.getDate();var pattern =/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches =pattern.exec(offset);while (matches) {switch (matches[2] ||'d') {case 'd':case 'D':day +=parseInt(matches[1],10);break;case 'w':case 'W':day +=parseInt(matches[1],10) * 7;break;case 'm':case 'M':month +=parseInt(matches[1],10);day =Math.min(day,$.datepicker._getDaysInMonth(year,month));break;case 'y':case 'Y':year +=parseInt(matches[1],10);day =Math.min(day,$.datepicker._getDaysInMonth(year,month));break;}
matches =pattern.exec(offset);}
return new Date(year,month,day);};var newDate =(date ==null ||date ===''?defaultDate :(typeof date =='string'?offsetString(date) :(typeof date =='number'?(isNaN(date) ?defaultDate :offsetNumeric(date)) :new Date(date.getTime()))));newDate =(newDate &&newDate.toString() =='Invalid Date'?defaultDate :newDate);if (newDate) {newDate.setHours(0);newDate.setMinutes(0);newDate.setSeconds(0);newDate.setMilliseconds(0);}
return this._daylightSavingAdjust(newDate);},_daylightSavingAdjust:function(date) {if (!date) return null;date.setHours(date.getHours() > 12 ?date.getHours() + 2 :0);return date;},_setDate:function(inst,date,noChange) {var clear =!date;var origMonth =inst.selectedMonth;var origYear =inst.selectedYear;var newDate =this._restrictMinMax(inst,this._determineDate(inst,date,new Date()));inst.selectedDay =inst.currentDay =newDate.getDate();inst.drawMonth =inst.selectedMonth =inst.currentMonth =newDate.getMonth();inst.drawYear =inst.selectedYear =inst.currentYear =newDate.getFullYear();if ((origMonth !=inst.selectedMonth ||origYear !=inst.selectedYear) &&!noChange)
this._notifyChange(inst);this._adjustInstDate(inst);if (inst.input) {inst.input.val(clear ?'':this._formatDate(inst));}
},_getDate:function(inst) {var startDate =(!inst.currentYear ||(inst.input &&inst.input.val() =='') ?null :this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return startDate;},_attachHandlers:function(inst) {var stepMonths =this._get(inst,'stepMonths');var id ='#'+ inst.id.replace(/\\\\/g, "\\" );
inst.dpDiv.find('[data-handler]').map(function () {var handler ={prev:function () {window['DP_jQuery_'+ dpuuid].datepicker._adjustDate(id,-stepMonths,'M');},next:function () {window['DP_jQuery_'+ dpuuid].datepicker._adjustDate(id,+stepMonths,'M');},hide:function () {window['DP_jQuery_'+ dpuuid].datepicker._hideDatepicker();},today:function () {window['DP_jQuery_'+ dpuuid].datepicker._gotoToday(id);},selectDay:function () {window['DP_jQuery_'+ dpuuid].datepicker._selectDay(id,+this.getAttribute('data-month'),+this.getAttribute('data-year'),this);return false;},selectMonth:function () {window['DP_jQuery_'+ dpuuid].datepicker._selectMonthYear(id,this,'M');return false;},selectYear:function () {window['DP_jQuery_'+ dpuuid].datepicker._selectMonthYear(id,this,'Y');return false;}
};$(this).bind(this.getAttribute('data-event'),handler[this.getAttribute('data-handler')]);});},_generateHTML:function(inst) {var today =new Date();today =this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));var isRTL =this._get(inst,'isRTL');var showButtonPanel =this._get(inst,'showButtonPanel');var hideIfNoPrevNext =this._get(inst,'hideIfNoPrevNext');var navigationAsDateFormat =this._get(inst,'navigationAsDateFormat');var numMonths =this._getNumberOfMonths(inst);var showCurrentAtPos =this._get(inst,'showCurrentAtPos');var stepMonths =this._get(inst,'stepMonths');var isMultiMonth =(numMonths[0] !=1 ||numMonths[1] !=1);var currentDate =this._daylightSavingAdjust((!inst.currentDay ?new Date(9999,9,9) :new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));var minDate =this._getMinMaxDate(inst,'min');var maxDate =this._getMinMaxDate(inst,'max');var drawMonth =inst.drawMonth - showCurrentAtPos;var drawYear =inst.drawYear;if (drawMonth < 0) {drawMonth +=12;drawYear--;}
if (maxDate) {var maxDraw =this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1,maxDate.getDate()));maxDraw =(minDate &&maxDraw < minDate ?minDate :maxDraw);while (this._daylightSavingAdjust(new Date(drawYear,drawMonth,1)) > maxDraw) {drawMonth--;if (drawMonth < 0) {drawMonth =11;drawYear--;}
}
}
inst.drawMonth =drawMonth;inst.drawYear =drawYear;var prevText =this._get(inst,'prevText');prevText =(!navigationAsDateFormat ?prevText :this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth - stepMonths,1)),this._getFormatConfig(inst)));var prev =(this._canAdjustMonth(inst,-1,drawYear,drawMonth) ?'<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"'+
' title="'+ prevText + '"><span class="ui-icon ui-icon-circle-triangle-'+ (isRTL ?'e':'w') + '">'+ prevText + '</span></a>':(hideIfNoPrevNext ?'':'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+ prevText +'"><span class="ui-icon ui-icon-circle-triangle-'+ (isRTL ?'e':'w') + '">'+ prevText + '</span></a>'));var nextText =this._get(inst,'nextText');nextText =(!navigationAsDateFormat ?nextText :this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth + stepMonths,1)),this._getFormatConfig(inst)));var next =(this._canAdjustMonth(inst,+1,drawYear,drawMonth) ?'<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"'+
' title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-'+ (isRTL ?'w':'e') + '">'+ nextText + '</span></a>':(hideIfNoPrevNext ?'':'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+ nextText + '"><span class="ui-icon ui-icon-circle-triangle-'+ (isRTL ?'w':'e') + '">'+ nextText + '</span></a>'));var currentText =this._get(inst,'currentText');var gotoDate =(this._get(inst,'gotoCurrent') &&inst.currentDay ?currentDate :today);currentText =(!navigationAsDateFormat ?currentText :this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));var controls =(!inst.inline ?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">'+
this._get(inst,'closeText') + '</button>':'');var buttonPanel =(showButtonPanel) ?'<div class="ui-datepicker-buttonpane ui-widget-content">'+ (isRTL ?controls :'') +
(this._isInRange(inst,gotoDate) ?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"'+
'>'+ currentText + '</button>':'') + (isRTL ?'':controls) + '</div>':'';var firstDay =parseInt(this._get(inst,'firstDay'),10);firstDay =(isNaN(firstDay) ?0 :firstDay);var showWeek =this._get(inst,'showWeek');var dayNames =this._get(inst,'dayNames');var dayNamesShort =this._get(inst,'dayNamesShort');var dayNamesMin =this._get(inst,'dayNamesMin');var monthNames =this._get(inst,'monthNames');var monthNamesShort =this._get(inst,'monthNamesShort');var beforeShowDay =this._get(inst,'beforeShowDay');var showOtherMonths =this._get(inst,'showOtherMonths');var selectOtherMonths =this._get(inst,'selectOtherMonths');var calculateWeek =this._get(inst,'calculateWeek') ||this.iso8601Week;var defaultDate =this._getDefaultDate(inst);var html ='';for (var row =0;row < numMonths[0];row++) {var group ='';this.maxRows =4;for (var col =0;col < numMonths[1];col++) {var selectedDate =this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));var cornerClass =' ui-corner-all';var calender ='';if (isMultiMonth) {calender +='<div class="ui-datepicker-group';if (numMonths[1] > 1)
switch (col) {case 0:calender +=' ui-datepicker-group-first';cornerClass =' ui-corner-'+ (isRTL ?'right':'left');break;case numMonths[1]-1:calender +=' ui-datepicker-group-last';cornerClass =' ui-corner-'+ (isRTL ?'left':'right');break;default:calender +=' ui-datepicker-group-middle';cornerClass ='';break;}
calender +='">';}
calender +='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+ cornerClass + '">'+
(/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') +
(/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') +
this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,row > 0 ||col > 0,monthNames,monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead>'+
'<tr>';var thead =(showWeek ?'<th class="ui-datepicker-week-col">'+ this._get(inst,'weekHeader') + '</th>':'');for (var dow =0;dow < 7;dow++) {var day =(dow + firstDay) % 7;thead +='<th'+ ((dow + firstDay + 6) % 7 >=5 ?' class="ui-datepicker-week-end"':'') + '>'+
'<span title="'+ dayNames[day] + '">'+ dayNamesMin[day] + '</span></th>';}
calender +=thead + '</tr></thead><tbody>';var daysInMonth =this._getDaysInMonth(drawYear,drawMonth);if (drawYear ==inst.selectedYear &&drawMonth ==inst.selectedMonth)
inst.selectedDay =Math.min(inst.selectedDay,daysInMonth);var leadDays =(this._getFirstDayOfMonth(drawYear,drawMonth) - firstDay + 7) % 7;var curRows =Math.ceil((leadDays + daysInMonth) / 7);var numRows =(isMultiMonth ?this.maxRows > curRows ?this.maxRows :curRows :curRows);this.maxRows =numRows;var printDate =this._daylightSavingAdjust(new Date(drawYear,drawMonth,1 - leadDays));for (var dRow =0;dRow < numRows;dRow++) {calender +='<tr>';var tbody =(!showWeek ?'':'<td class="ui-datepicker-week-col">'+
this._get(inst,'calculateWeek')(printDate) + '</td>');for (var dow =0;dow < 7;dow++) {var daySettings =(beforeShowDay ?beforeShowDay.apply((inst.input ?inst.input[0] :null),[printDate]) :[true,'']);var otherMonth =(printDate.getMonth() !=drawMonth);var unselectable =(otherMonth &&!selectOtherMonths) ||!daySettings[0] ||(minDate &&printDate < minDate) ||(maxDate &&printDate > maxDate);tbody +='<td class="'+
((dow + firstDay + 6) % 7 >=5 ?' ui-datepicker-week-end':'') + (otherMonth ?' ui-datepicker-other-month':'') + ((printDate.getTime() ==selectedDate.getTime() &&drawMonth ==inst.selectedMonth &&inst._keyEvent) ||(defaultDate.getTime() ==printDate.getTime() &&defaultDate.getTime() ==selectedDate.getTime()) ?' '+ this._dayOverClass :'') + (unselectable ?' '+ this._unselectableClass + ' ui-state-disabled':'') + (otherMonth &&!showOtherMonths ?'':' '+ daySettings[1] + (printDate.getTime() ==currentDate.getTime() ?' '+ this._currentClass :'') + (printDate.getTime() ==today.getTime() ?' ui-datepicker-today':'')) + '"'+ ((!otherMonth ||showOtherMonths) &&daySettings[2] ?' title="'+ daySettings[2] + '"':'') + (unselectable ?'':' data-handler="selectDay" data-event="click" data-month="'+ printDate.getMonth() + '" data-year="'+ printDate.getFullYear() + '"') + '>'+ (otherMonth &&!showOtherMonths ?'&#xa0;':(unselectable ?'<span class="ui-state-default">'+ printDate.getDate() + '</span>':'<a class="ui-state-default'+
(printDate.getTime() ==today.getTime() ?' ui-state-highlight':'') +
(printDate.getTime() ==currentDate.getTime() ?' ui-state-active':'') + (otherMonth ?' ui-priority-secondary':'') + '" href="#">'+ printDate.getDate() + '</a>')) + '</td>';printDate.setDate(printDate.getDate() + 1);printDate =this._daylightSavingAdjust(printDate);}
calender +=tbody + '</tr>';}
drawMonth++;if (drawMonth > 11) {drawMonth =0;drawYear++;}
calender +='</tbody></table>'+ (isMultiMonth ?'</div>'+
((numMonths[0] > 0 &&col ==numMonths[1]-1) ?'<div class="ui-datepicker-row-break"></div>':'') :'');group +=calender;}
html +=group;}
html +=buttonPanel + ($.ui.ie6 &&!inst.inline ?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':'');inst._keyEvent =false;return html;},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,secondary,monthNames,monthNamesShort) {var changeMonth =this._get(inst,'changeMonth');var changeYear =this._get(inst,'changeYear');var showMonthAfterYear =this._get(inst,'showMonthAfterYear');var html ='<div class="ui-datepicker-title">';var monthHtml ='';if (secondary ||!changeMonth)
monthHtml +='<span class="ui-datepicker-month">'+ monthNames[drawMonth] + '</span>';else {var inMinYear =(minDate &&minDate.getFullYear() ==drawYear);var inMaxYear =(maxDate &&maxDate.getFullYear() ==drawYear);monthHtml +='<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';for (var month =0;month < 12;month++) {if ((!inMinYear ||month >=minDate.getMonth()) &&(!inMaxYear ||month <=maxDate.getMonth()))
monthHtml +='<option value="'+ month + '"'+
(month ==drawMonth ?' selected="selected"':'') +
'>'+ monthNamesShort[month] + '</option>';}
monthHtml +='</select>';}
if (!showMonthAfterYear)
html +=monthHtml + (secondary ||!(changeMonth &&changeYear) ?'&#xa0;':'');if (!inst.yearshtml ) {inst.yearshtml ='';if (secondary ||!changeYear)
html +='<span class="ui-datepicker-year">'+ drawYear + '</span>';else {var years =this._get(inst,'yearRange').split(':');var thisYear =new Date().getFullYear();var determineYear =function(value) {var year =(value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :
(value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :
parseInt(value,10)));return (isNaN(year) ?thisYear :year);};var year =determineYear(years[0]);var endYear =Math.max(year,determineYear(years[1] ||''));year =(minDate ?Math.max(year,minDate.getFullYear()) :year);endYear =(maxDate ?Math.min(endYear,maxDate.getFullYear()) :endYear);inst.yearshtml +='<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';for (;year <=endYear;year++) {inst.yearshtml +='<option value="'+ year + '"'+
(year ==drawYear ?' selected="selected"':'') +
'>'+ year + '</option>';}
inst.yearshtml +='</select>';html +=inst.yearshtml;inst.yearshtml =null;}
}
html +=this._get(inst,'yearSuffix');if (showMonthAfterYear)
html +=(secondary ||!(changeMonth &&changeYear) ?'&#xa0;':'') + monthHtml;html +='</div>';return html;},_adjustInstDate:function(inst,offset,period) {var year =inst.drawYear + (period =='Y'?offset :0);var month =inst.drawMonth + (period =='M'?offset :0);var day =Math.min(inst.selectedDay,this._getDaysInMonth(year,month)) +
(period =='D'?offset :0);var date =this._restrictMinMax(inst,this._daylightSavingAdjust(new Date(year,month,day)));inst.selectedDay =date.getDate();inst.drawMonth =inst.selectedMonth =date.getMonth();inst.drawYear =inst.selectedYear =date.getFullYear();if (period =='M'||period =='Y')
this._notifyChange(inst);},_restrictMinMax:function(inst,date) {var minDate =this._getMinMaxDate(inst,'min');var maxDate =this._getMinMaxDate(inst,'max');var newDate =(minDate &&date < minDate ?minDate :date);newDate =(maxDate &&newDate > maxDate ?maxDate :newDate);return newDate;},_notifyChange:function(inst) {var onChange =this._get(inst,'onChangeMonthYear');if (onChange)
onChange.apply((inst.input ?inst.input[0] :null),[inst.selectedYear,inst.selectedMonth + 1,inst]);},_getNumberOfMonths:function(inst) {var numMonths =this._get(inst,'numberOfMonths');return (numMonths ==null ?[1,1] :(typeof numMonths =='number'?[1,numMonths] :numMonths));},_getMinMaxDate:function(inst,minMax) {return this._determineDate(inst,this._get(inst,minMax + 'Date'),null);},_getDaysInMonth:function(year,month) {return 32 - this._daylightSavingAdjust(new Date(year,month,32)).getDate();},_getFirstDayOfMonth:function(year,month) {return new Date(year,month,1).getDay();},_canAdjustMonth:function(inst,offset,curYear,curMonth) {var numMonths =this._getNumberOfMonths(inst);var date =this._daylightSavingAdjust(new Date(curYear,curMonth + (offset < 0 ?offset :numMonths[0] * numMonths[1]),1));if (offset < 0)
date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()));return this._isInRange(inst,date);},_isInRange:function(inst,date) {var minDate =this._getMinMaxDate(inst,'min');var maxDate =this._getMinMaxDate(inst,'max');return ((!minDate ||date.getTime() >=minDate.getTime()) &&(!maxDate ||date.getTime() <=maxDate.getTime()));},_getFormatConfig:function(inst) {var shortYearCutoff =this._get(inst,'shortYearCutoff');shortYearCutoff =(typeof shortYearCutoff !='string'?shortYearCutoff :new Date().getFullYear() % 100 + parseInt(shortYearCutoff,10));return {shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,'dayNamesShort'),dayNames:this._get(inst,'dayNames'),monthNamesShort:this._get(inst,'monthNamesShort'),monthNames:this._get(inst,'monthNames')};},_formatDate:function(inst,day,month,year) {if (!day) {inst.currentDay =inst.selectedDay;inst.currentMonth =inst.selectedMonth;inst.currentYear =inst.selectedYear;}
var date =(day ?(typeof day =='object'?day :this._daylightSavingAdjust(new Date(year,month,day))) :this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return this.formatDate(this._get(inst,'dateFormat'),date,this._getFormatConfig(inst));}
});function bindHover(dpDiv) {var selector ='button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';return dpDiv.delegate(selector,'mouseout',function() {$(this).removeClass('ui-state-hover');if (this.className.indexOf('ui-datepicker-prev') !=-1) $(this).removeClass('ui-datepicker-prev-hover');if (this.className.indexOf('ui-datepicker-next') !=-1) $(this).removeClass('ui-datepicker-next-hover');})
.delegate(selector,'mouseover',function(){if (!$.datepicker._isDisabledDatepicker(instActive.inline ?dpDiv.parent()[0] :instActive.input[0])) {$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');$(this).addClass('ui-state-hover');if (this.className.indexOf('ui-datepicker-prev') !=-1) $(this).addClass('ui-datepicker-prev-hover');if (this.className.indexOf('ui-datepicker-next') !=-1) $(this).addClass('ui-datepicker-next-hover');}
});}
function extendRemove(target,props) {$.extend(target,props);for (var name in props)
if (props[name] ==null ||props[name] ==undefined)
target[name] =props[name];return target;};$.fn.datepicker =function(options){if (!this.length ) {return this;}
if (!$.datepicker.initialized) {$(document).mousedown($.datepicker._checkExternalClick).
find(document.body).append($.datepicker.dpDiv);$.datepicker.initialized =true;}
var otherArgs =Array.prototype.slice.call(arguments,1);if (typeof options =='string'&&(options =='isDisabled'||options =='getDate'||options =='widget'))
return $.datepicker['_'+ options + 'Datepicker'].
apply($.datepicker,[this[0]].concat(otherArgs));if (options =='option'&&arguments.length ==2 &&typeof arguments[1] =='string')
return $.datepicker['_'+ options + 'Datepicker'].
apply($.datepicker,[this[0]].concat(otherArgs));return this.each(function() {typeof options =='string'?$.datepicker['_'+ options + 'Datepicker'].
apply($.datepicker,[this].concat(otherArgs)) :$.datepicker._attachDatepicker(this,options);});};$.datepicker =new Datepicker();$.datepicker.initialized =false;$.datepicker.uuid =new Date().getTime();$.datepicker.version ="1.9.2";window['DP_jQuery_'+ dpuuid] =$;})(jQuery);(function($,undefined ) {var uiDialogClasses ="ui-dialog ui-widget ui-widget-content ui-corner-all ",sizeRelatedOptions ={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true
},resizableRelatedOptions ={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true
};$.widget("ui.dialog",{version:"1.9.2",options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",of:window,collision:"fit",using:function(pos ) {var topOffset =$(this ).css(pos ).offset().top;if (topOffset < 0 ) {$(this ).css("top",pos.top - topOffset );}
}
},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000
},_create:function() {this.originalTitle =this.element.attr("title");if (typeof this.originalTitle !=="string") {this.originalTitle ="";}
this.oldPosition ={parent:this.element.parent(),index:this.element.parent().children().index(this.element )
};this.options.title =this.options.title ||this.originalTitle;var that =this,options =this.options,title =options.title ||"&#160;",uiDialog,uiDialogTitlebar,uiDialogTitlebarClose,uiDialogTitle,uiDialogButtonPane;uiDialog =(this.uiDialog =$("<div>") )
.addClass(uiDialogClasses + options.dialogClass )
.css({display:"none",outline:0,zIndex:options.zIndex
})
.attr("tabIndex",-1)
.keydown(function(event ) {if (options.closeOnEscape &&!event.isDefaultPrevented() &&event.keyCode &&event.keyCode ===$.ui.keyCode.ESCAPE ) {that.close(event );event.preventDefault();}
})
.mousedown(function(event ) {that.moveToTop(false,event );})
.appendTo("body");this.element
.show()
.removeAttr("title")
.addClass("ui-dialog-content ui-widget-content")
.appendTo(uiDialog );uiDialogTitlebar =(this.uiDialogTitlebar =$("<div>") )
.addClass("ui-dialog-titlebar  ui-widget-header  "+
"ui-corner-all  ui-helper-clearfix")
.bind("mousedown",function() {uiDialog.focus();})
.prependTo(uiDialog );uiDialogTitlebarClose =$("<a href='#'></a>")
.addClass("ui-dialog-titlebar-close  ui-corner-all")
.attr("role","button")
.click(function(event ) {event.preventDefault();that.close(event );})
.appendTo(uiDialogTitlebar );(this.uiDialogTitlebarCloseText =$("<span>") )
.addClass("ui-icon ui-icon-closethick")
.text(options.closeText )
.appendTo(uiDialogTitlebarClose );uiDialogTitle =$("<span>")
.uniqueId()
.addClass("ui-dialog-title")
.html(title )
.prependTo(uiDialogTitlebar );uiDialogButtonPane =(this.uiDialogButtonPane =$("<div>") )
.addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");(this.uiButtonSet =$("<div>") )
.addClass("ui-dialog-buttonset")
.appendTo(uiDialogButtonPane );uiDialog.attr({role:"dialog","aria-labelledby":uiDialogTitle.attr("id")
});uiDialogTitlebar.find("*").add(uiDialogTitlebar ).disableSelection();this._hoverable(uiDialogTitlebarClose );this._focusable(uiDialogTitlebarClose );if (options.draggable &&$.fn.draggable ) {this._makeDraggable();}
if (options.resizable &&$.fn.resizable ) {this._makeResizable();}
this._createButtons(options.buttons );this._isOpen =false;if ($.fn.bgiframe ) {uiDialog.bgiframe();}
this._on(uiDialog,{keydown:function(event ) {if (!options.modal ||event.keyCode !==$.ui.keyCode.TAB ) {return;}
var tabbables =$(":tabbable",uiDialog ),first =tabbables.filter(":first"),last =tabbables.filter(":last");if (event.target ===last[0] &&!event.shiftKey ) {first.focus(1 );return false;} else if (event.target ===first[0] &&event.shiftKey ) {last.focus(1 );return false;}
}});},_init:function() {if (this.options.autoOpen ) {this.open();}
},_destroy:function() {var next,oldPosition =this.oldPosition;if (this.overlay ) {this.overlay.destroy();}
this.uiDialog.hide();this.element
.removeClass("ui-dialog-content ui-widget-content")
.hide()
.appendTo("body");this.uiDialog.remove();if (this.originalTitle ) {this.element.attr("title",this.originalTitle );}
next =oldPosition.parent.children().eq(oldPosition.index );if (next.length &&next[0 ] !==this.element[0 ] ) {next.before(this.element );} else {oldPosition.parent.append(this.element );}
},widget:function() {return this.uiDialog;},close:function(event ) {var that =this,maxZ,thisZ;if (!this._isOpen ) {return;}
if (false ===this._trigger("beforeClose",event ) ) {return;}
this._isOpen =false;if (this.overlay ) {this.overlay.destroy();}
if (this.options.hide ) {this._hide(this.uiDialog,this.options.hide,function() {that._trigger("close",event );});} else {this.uiDialog.hide();this._trigger("close",event );}
$.ui.dialog.overlay.resize();if (this.options.modal ) {maxZ =0;$(".ui-dialog").each(function() {if (this !==that.uiDialog[0] ) {thisZ =$(this ).css("z-index");if (!isNaN(thisZ ) ) {maxZ =Math.max(maxZ,thisZ );}
}
});$.ui.dialog.maxZ =maxZ;}
return this;},isOpen:function() {return this._isOpen;},moveToTop:function(force,event ) {var options =this.options,saveScroll;if ((options.modal &&!force ) ||(!options.stack &&!options.modal ) ) {return this._trigger("focus",event );}
if (options.zIndex > $.ui.dialog.maxZ ) {$.ui.dialog.maxZ =options.zIndex;}
if (this.overlay ) {$.ui.dialog.maxZ +=1;$.ui.dialog.overlay.maxZ =$.ui.dialog.maxZ;this.overlay.$el.css("z-index",$.ui.dialog.overlay.maxZ );}
saveScroll ={scrollTop:this.element.scrollTop(),scrollLeft:this.element.scrollLeft()
};$.ui.dialog.maxZ +=1;this.uiDialog.css("z-index",$.ui.dialog.maxZ );this.element.attr(saveScroll );this._trigger("focus",event );return this;},open:function() {if (this._isOpen ) {return;}
var hasFocus,options =this.options,uiDialog =this.uiDialog;this._size();this._position(options.position );uiDialog.show(options.show );this.overlay =options.modal ?new $.ui.dialog.overlay(this ) :null;this.moveToTop(true );hasFocus =this.element.find(":tabbable");if (!hasFocus.length ) {hasFocus =this.uiDialogButtonPane.find(":tabbable");if (!hasFocus.length ) {hasFocus =uiDialog;}
}
hasFocus.eq(0 ).focus();this._isOpen =true;this._trigger("open");return this;},_createButtons:function(buttons ) {var that =this,hasButtons =false;this.uiDialogButtonPane.remove();this.uiButtonSet.empty();if (typeof buttons ==="object"&&buttons !==null ) {$.each(buttons,function() {return !(hasButtons =true);});}
if (hasButtons ) {$.each(buttons,function(name,props ) {var button,click;props =$.isFunction(props ) ?{click:props,text:name } :props;props =$.extend({type:"button"},props );click =props.click;props.click =function() {click.apply(that.element[0],arguments );};button =$("<button></button>",props )
.appendTo(that.uiButtonSet );if ($.fn.button ) {button.button();}
});this.uiDialog.addClass("ui-dialog-buttons");this.uiDialogButtonPane.appendTo(this.uiDialog );} else {this.uiDialog.removeClass("ui-dialog-buttons");}
},_makeDraggable:function() {var that =this,options =this.options;function filteredUi(ui ) {return {position:ui.position,offset:ui.offset
};}
this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(event,ui ) {$(this )
.addClass("ui-dialog-dragging");that._trigger("dragStart",event,filteredUi(ui ) );},drag:function(event,ui ) {that._trigger("drag",event,filteredUi(ui ) );},stop:function(event,ui ) {options.position =[ui.position.left - that.document.scrollLeft(),ui.position.top - that.document.scrollTop()
];$(this )
.removeClass("ui-dialog-dragging");that._trigger("dragStop",event,filteredUi(ui ) );$.ui.dialog.overlay.resize();}
});},_makeResizable:function(handles ) {handles =(handles ===undefined ?this.options.resizable :handles);var that =this,options =this.options,position =this.uiDialog.css("position"),resizeHandles =typeof handles ==='string'?handles:"n,e,s,w,se,sw,ne,nw";function filteredUi(ui ) {return {originalPosition:ui.originalPosition,originalSize:ui.originalSize,position:ui.position,size:ui.size
};}
this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:options.maxWidth,maxHeight:options.maxHeight,minWidth:options.minWidth,minHeight:this._minHeight(),handles:resizeHandles,start:function(event,ui ) {$(this ).addClass("ui-dialog-resizing");that._trigger("resizeStart",event,filteredUi(ui ) );},resize:function(event,ui ) {that._trigger("resize",event,filteredUi(ui ) );},stop:function(event,ui ) {$(this ).removeClass("ui-dialog-resizing");options.height =$(this ).height();options.width =$(this ).width();that._trigger("resizeStop",event,filteredUi(ui ) );$.ui.dialog.overlay.resize();}
})
.css("position",position )
.find(".ui-resizable-se")
.addClass("ui-icon ui-icon-grip-diagonal-se");},_minHeight:function() {var options =this.options;if (options.height ==="auto") {return options.minHeight;} else {return Math.min(options.minHeight,options.height );}
},_position:function(position ) {var myAt =[],offset =[0,0 ],isVisible;if (position ) {if (typeof position ==="string"||(typeof position ==="object"&&"0"in position ) ) {myAt =position.split ?position.split(" ") :[position[0 ],position[1 ] ];if (myAt.length ===1 ) {myAt[1 ] =myAt[0 ];}
$.each(["left","top"],function(i,offsetPosition ) {if (+myAt[i ] ===myAt[i ] ) {offset[i ] =myAt[i ];myAt[i ] =offsetPosition;}
});position ={my:myAt[0] + (offset[0] < 0 ?offset[0] :"+"+ offset[0]) + " "+
myAt[1] + (offset[1] < 0 ?offset[1] :"+"+ offset[1]),at:myAt.join(" ")
};}
position =$.extend({},$.ui.dialog.prototype.options.position,position );} else {position =$.ui.dialog.prototype.options.position;}
isVisible =this.uiDialog.is(":visible");if (!isVisible ) {this.uiDialog.show();}
this.uiDialog.position(position );if (!isVisible ) {this.uiDialog.hide();}
},_setOptions:function(options ) {var that =this,resizableOptions ={},resize =false;$.each(options,function(key,value ) {that._setOption(key,value );if (key in sizeRelatedOptions ) {resize =true;}
if (key in resizableRelatedOptions ) {resizableOptions[key ] =value;}
});if (resize ) {this._size();}
if (this.uiDialog.is(":data(resizable)") ) {this.uiDialog.resizable("option",resizableOptions );}
},_setOption:function(key,value ) {var isDraggable,isResizable,uiDialog =this.uiDialog;switch (key ) {case "buttons":this._createButtons(value );break;case "closeText":this.uiDialogTitlebarCloseText.text(""+ value );break;case "dialogClass":uiDialog
.removeClass(this.options.dialogClass )
.addClass(uiDialogClasses + value );break;case "disabled":if (value ) {uiDialog.addClass("ui-dialog-disabled");} else {uiDialog.removeClass("ui-dialog-disabled");}
break;case "draggable":isDraggable =uiDialog.is(":data(draggable)");if (isDraggable &&!value ) {uiDialog.draggable("destroy");}
if (!isDraggable &&value ) {this._makeDraggable();}
break;case "position":this._position(value );break;case "resizable":isResizable =uiDialog.is(":data(resizable)");if (isResizable &&!value ) {uiDialog.resizable("destroy");}
if (isResizable &&typeof value ==="string") {uiDialog.resizable("option","handles",value );}
if (!isResizable &&value !==false ) {this._makeResizable(value );}
break;case "title":$(".ui-dialog-title",this.uiDialogTitlebar )
.html(""+ (value ||"&#160;") );break;}
this._super(key,value );},_size:function() {var nonContentHeight,minContentHeight,autoHeight,options =this.options,isVisible =this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0
});if (options.minWidth > options.width ) {options.width =options.minWidth;}
nonContentHeight =this.uiDialog.css({height:"auto",width:options.width
})
.outerHeight();minContentHeight =Math.max(0,options.minHeight - nonContentHeight );if (options.height ==="auto") {if ($.support.minHeight ) {this.element.css({minHeight:minContentHeight,height:"auto"});} else {this.uiDialog.show();autoHeight =this.element.css("height","auto").height();if (!isVisible ) {this.uiDialog.hide();}
this.element.height(Math.max(autoHeight,minContentHeight ) );}
} else {this.element.height(Math.max(options.height - nonContentHeight,0 ) );}
if (this.uiDialog.is(":data(resizable)") ) {this.uiDialog.resizable("option","minHeight",this._minHeight() );}
}
});$.extend($.ui.dialog,{uuid:0,maxZ:0,getTitleId:function($el) {var id =$el.attr("id");if (!id ) {this.uuid +=1;id =this.uuid;}
return "ui-dialog-title-"+ id;},overlay:function(dialog ) {this.$el =$.ui.dialog.overlay.create(dialog );}
});$.extend($.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:$.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(event ) {return event + ".dialog-overlay";}
).join(" "),create:function(dialog ) {if (this.instances.length ===0 ) {setTimeout(function() {if ($.ui.dialog.overlay.instances.length ) {$(document ).bind($.ui.dialog.overlay.events,function(event ) {if ($(event.target ).zIndex() < $.ui.dialog.overlay.maxZ ) {return false;}
});}
},1 );$(window ).bind("resize.dialog-overlay",$.ui.dialog.overlay.resize );}
var $el =(this.oldInstances.pop() ||$("<div>").addClass("ui-widget-overlay") );$(document ).bind("keydown.dialog-overlay",function(event ) {var instances =$.ui.dialog.overlay.instances;if (instances.length !==0 &&instances[instances.length - 1 ] ===$el &&dialog.options.closeOnEscape &&!event.isDefaultPrevented() &&event.keyCode &&event.keyCode ===$.ui.keyCode.ESCAPE ) {dialog.close(event );event.preventDefault();}
});$el.appendTo(document.body ).css({width:this.width(),height:this.height()
});if ($.fn.bgiframe ) {$el.bgiframe();}
this.instances.push($el );return $el;},destroy:function($el ) {var indexOf =$.inArray($el,this.instances ),maxZ =0;if (indexOf !==-1 ) {this.oldInstances.push(this.instances.splice(indexOf,1 )[0 ] );}
if (this.instances.length ===0 ) {$([document,window ] ).unbind(".dialog-overlay");}
$el.height(0 ).width(0 ).remove();$.each(this.instances,function() {maxZ =Math.max(maxZ,this.css("z-index") );});this.maxZ =maxZ;},height:function() {var scrollHeight,offsetHeight;if ($.ui.ie ) {scrollHeight =Math.max(document.documentElement.scrollHeight,document.body.scrollHeight
);offsetHeight =Math.max(document.documentElement.offsetHeight,document.body.offsetHeight
);if (scrollHeight < offsetHeight ) {return $(window ).height() + "px";} else {return scrollHeight + "px";}
} else {return $(document ).height() + "px";}
},width:function() {var scrollWidth,offsetWidth;if ($.ui.ie ) {scrollWidth =Math.max(document.documentElement.scrollWidth,document.body.scrollWidth
);offsetWidth =Math.max(document.documentElement.offsetWidth,document.body.offsetWidth
);if (scrollWidth < offsetWidth ) {return $(window ).width() + "px";} else {return scrollWidth + "px";}
} else {return $(document ).width() + "px";}
},resize:function() {var $overlays =$([] );$.each($.ui.dialog.overlay.instances,function() {$overlays =$overlays.add(this );});$overlays.css({width:0,height:0
}).css({width:$.ui.dialog.overlay.width(),height:$.ui.dialog.overlay.height()
});}
});$.extend($.ui.dialog.overlay.prototype,{destroy:function() {$.ui.dialog.overlay.destroy(this.$el );}
});}(jQuery ) );(function($,undefined ) {$.widget("ui.draggable",$.ui.mouse,{version:"1.9.2",widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false
},_create:function() {if (this.options.helper =='original'&&!(/^(?:r|a|f)/).test(this.element.css("position")))
this.element[0].style.position ='relative';(this.options.addClasses &&this.element.addClass("ui-draggable"));(this.options.disabled &&this.element.addClass("ui-draggable-disabled"));this._mouseInit();},_destroy:function() {this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();},_mouseCapture:function(event) {var o =this.options;if (this.helper ||o.disabled ||$(event.target).is('.ui-resizable-handle'))
return false;this.handle =this._getHandle(event);if (!this.handle)
return false;$(o.iframeFix ===true ?"iframe":o.iframeFix).each(function() {$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
.css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000
})
.css($(this).offset())
.appendTo("body");});return true;},_mouseStart:function(event) {var o =this.options;this.helper =this._createHelper(event);this.helper.addClass("ui-draggable-dragging");this._cacheHelperProportions();if($.ui.ddmanager)
$.ui.ddmanager.current =this;this._cacheMargins();this.cssPosition =this.helper.css("position");this.scrollParent =this.helper.scrollParent();this.offset =this.positionAbs =this.element.offset();this.offset ={top:this.offset.top - this.margins.top,left:this.offset.left - this.margins.left
};$.extend(this.offset,{click:{left:event.pageX - this.offset.left,top:event.pageY - this.offset.top
},parent:this._getParentOffset(),relative:this._getRelativeOffset() });this.originalPosition =this.position =this._generatePosition(event);this.originalPageX =event.pageX;this.originalPageY =event.pageY;(o.cursorAt &&this._adjustOffsetFromHelper(o.cursorAt));if(o.containment)
this._setContainment();if(this._trigger("start",event) ===false) {this._clear();return false;}
this._cacheHelperProportions();if ($.ui.ddmanager &&!o.dropBehaviour)
$.ui.ddmanager.prepareOffsets(this,event);this._mouseDrag(event,true);if ($.ui.ddmanager ) $.ui.ddmanager.dragStart(this,event);return true;},_mouseDrag:function(event,noPropagation) {this.position =this._generatePosition(event);this.positionAbs =this._convertPositionTo("absolute");if (!noPropagation) {var ui =this._uiHash();if(this._trigger('drag',event,ui) ===false) {this._mouseUp({});return false;}
this.position =ui.position;}
if(!this.options.axis ||this.options.axis !="y") this.helper[0].style.left =this.position.left+'px';if(!this.options.axis ||this.options.axis !="x") this.helper[0].style.top =this.position.top+'px';if($.ui.ddmanager) $.ui.ddmanager.drag(this,event);return false;},_mouseStop:function(event) {var dropped =false;if ($.ui.ddmanager &&!this.options.dropBehaviour)
dropped =$.ui.ddmanager.drop(this,event);if(this.dropped) {dropped =this.dropped;this.dropped =false;}
var element =this.element[0],elementInDom =false;while (element &&(element =element.parentNode) ) {if (element ==document ) {elementInDom =true;}
}
if (!elementInDom &&this.options.helper ==="original")
return false;if((this.options.revert =="invalid"&&!dropped) ||(this.options.revert =="valid"&&dropped) ||this.options.revert ===true ||($.isFunction(this.options.revert) &&this.options.revert.call(this.element,dropped))) {var that =this;$(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function() {if(that._trigger("stop",event) !==false) {that._clear();}
});} else {if(this._trigger("stop",event) !==false) {this._clear();}
}
return false;},_mouseUp:function(event) {$("div.ui-draggable-iframeFix").each(function() {this.parentNode.removeChild(this);});if($.ui.ddmanager ) $.ui.ddmanager.dragStop(this,event);return $.ui.mouse.prototype._mouseUp.call(this,event);},cancel:function() {if(this.helper.is(".ui-draggable-dragging")) {this._mouseUp({});} else {this._clear();}
return this;},_getHandle:function(event) {var handle =!this.options.handle ||!$(this.options.handle,this.element).length ?true :false;$(this.options.handle,this.element)
.find("*")
.andSelf()
.each(function() {if(this ==event.target) handle =true;});return handle;},_createHelper:function(event) {var o =this.options;var helper =$.isFunction(o.helper) ?$(o.helper.apply(this.element[0],[event])) :(o.helper =='clone'?this.element.clone().removeAttr('id') :this.element);if(!helper.parents('body').length)
helper.appendTo((o.appendTo =='parent'?this.element[0].parentNode :o.appendTo));if(helper[0] !=this.element[0] &&!(/(fixed|absolute)/).test(helper.css("position")))
helper.css("position","absolute");return helper;},_adjustOffsetFromHelper:function(obj) {if (typeof obj =='string') {obj =obj.split(' ');}
if ($.isArray(obj)) {obj ={left:+obj[0],top:+obj[1] ||0};}
if ('left'in obj) {this.offset.click.left =obj.left + this.margins.left;}
if ('right'in obj) {this.offset.click.left =this.helperProportions.width - obj.right + this.margins.left;}
if ('top'in obj) {this.offset.click.top =obj.top + this.margins.top;}
if ('bottom'in obj) {this.offset.click.top =this.helperProportions.height - obj.bottom + this.margins.top;}
},_getParentOffset:function() {this.offsetParent =this.helper.offsetParent();var po =this.offsetParent.offset();if(this.cssPosition =='absolute'&&this.scrollParent[0] !=document &&$.contains(this.scrollParent[0],this.offsetParent[0])) {po.left +=this.scrollParent.scrollLeft();po.top +=this.scrollParent.scrollTop();}
if((this.offsetParent[0] ==document.body) ||(this.offsetParent[0].tagName &&this.offsetParent[0].tagName.toLowerCase() =='html'&&$.ui.ie)) po ={top:0,left:0 };return {top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) ||0),left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) ||0)
};},_getRelativeOffset:function() {if(this.cssPosition =="relative") {var p =this.element.position();return {top:p.top - (parseInt(this.helper.css("top"),10) ||0) + this.scrollParent.scrollTop(),left:p.left - (parseInt(this.helper.css("left"),10) ||0) + this.scrollParent.scrollLeft()
};} else {return {top:0,left:0 };}
},_cacheMargins:function() {this.margins ={left:(parseInt(this.element.css("marginLeft"),10) ||0),top:(parseInt(this.element.css("marginTop"),10) ||0),right:(parseInt(this.element.css("marginRight"),10) ||0),bottom:(parseInt(this.element.css("marginBottom"),10) ||0)
};},_cacheHelperProportions:function() {this.helperProportions ={width:this.helper.outerWidth(),height:this.helper.outerHeight()
};},_setContainment:function() {var o =this.options;if(o.containment =='parent') o.containment =this.helper[0].parentNode;if(o.containment =='document'||o.containment =='window') this.containment =[o.containment =='document'?0 :$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,o.containment =='document'?0 :$(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,(o.containment =='document'?0 :$(window).scrollLeft()) + $(o.containment =='document'?document :window).width() - this.helperProportions.width - this.margins.left,(o.containment =='document'?0 :$(window).scrollTop()) + ($(o.containment =='document'?document :window).height() ||document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
];if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
var c =$(o.containment);var ce =c[0];if(!ce) return;var co =c.offset();var over =($(ce).css("overflow") !='hidden');this.containment =[(parseInt($(ce).css("borderLeftWidth"),10) ||0) + (parseInt($(ce).css("paddingLeft"),10) ||0),(parseInt($(ce).css("borderTopWidth"),10) ||0) + (parseInt($(ce).css("paddingTop"),10) ||0),(over ?Math.max(ce.scrollWidth,ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) ||0) - (parseInt($(ce).css("paddingRight"),10) ||0) - this.helperProportions.width - this.margins.left - this.margins.right,(over ?Math.max(ce.scrollHeight,ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) ||0) - (parseInt($(ce).css("paddingBottom"),10) ||0) - this.helperProportions.height - this.margins.top - this.margins.bottom
];this.relative_container =c;} else if(o.containment.constructor ==Array) {this.containment =o.containment;}
},_convertPositionTo:function(d,pos) {if(!pos) pos =this.position;var mod =d =="absolute"?1 :-1;var o =this.options,scroll =this.cssPosition =='absolute'&&!(this.scrollParent[0] !=document &&$.contains(this.scrollParent[0],this.offsetParent[0])) ?this.offsetParent :this.scrollParent,scrollIsRootNode =(/(html|body)/i).test(scroll[0].tagName);

return {top:(pos.top+ this.offset.relative.top * mod+ this.offset.parent.top * mod- ((this.cssPosition =='fixed'?-this.scrollParent.scrollTop() :(scrollIsRootNode ?0 :scroll.scrollTop() ) ) * mod)
),left:(pos.left+ this.offset.relative.left * mod+ this.offset.parent.left * mod- ((this.cssPosition =='fixed'?-this.scrollParent.scrollLeft() :scrollIsRootNode ?0 :scroll.scrollLeft() ) * mod)
)
};},_generatePosition:function(event) {var o =this.options,scroll =this.cssPosition =='absolute'&&!(this.scrollParent[0] !=document &&$.contains(this.scrollParent[0],this.offsetParent[0])) ?this.offsetParent :this.scrollParent,scrollIsRootNode =(/(html|body)/i).test(scroll[0].tagName);
var pageX =event.pageX;var pageY =event.pageY;if(this.originalPosition) {var containment;if(this.containment) {if (this.relative_container){var co =this.relative_container.offset();containment =[this.containment[0] + co.left,this.containment[1] + co.top,this.containment[2] + co.left,this.containment[3] + co.top ];}
else {containment =this.containment;}
if(event.pageX - this.offset.click.left < containment[0]) pageX =containment[0] + this.offset.click.left;if(event.pageY - this.offset.click.top < containment[1]) pageY =containment[1] + this.offset.click.top;if(event.pageX - this.offset.click.left > containment[2]) pageX =containment[2] + this.offset.click.left;if(event.pageY - this.offset.click.top > containment[3]) pageY =containment[3] + this.offset.click.top;}
if(o.grid) {var top =o.grid[1] ?this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] :this.originalPageY;pageY =containment ?(!(top - this.offset.click.top < containment[1] ||top - this.offset.click.top > containment[3]) ?top :(!(top - this.offset.click.top < containment[1]) ?top - o.grid[1] :top + o.grid[1])) :top;var left =o.grid[0] ?this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] :this.originalPageX;pageX =containment ?(!(left - this.offset.click.left < containment[0] ||left - this.offset.click.left > containment[2]) ?left :(!(left - this.offset.click.left < containment[0]) ?left - o.grid[0] :left + o.grid[0])) :left;}
}
return {top:(pageY- this.offset.click.top- this.offset.relative.top- this.offset.parent.top+ ((this.cssPosition =='fixed'?-this.scrollParent.scrollTop() :(scrollIsRootNode ?0 :scroll.scrollTop() ) ))
),left:(pageX- this.offset.click.left- this.offset.relative.left- this.offset.parent.left+ ((this.cssPosition =='fixed'?-this.scrollParent.scrollLeft() :scrollIsRootNode ?0 :scroll.scrollLeft() ))
)
};},_clear:function() {this.helper.removeClass("ui-draggable-dragging");if(this.helper[0] !=this.element[0] &&!this.cancelHelperRemoval) this.helper.remove();this.helper =null;this.cancelHelperRemoval =false;},_trigger:function(type,event,ui) {ui =ui ||this._uiHash();$.ui.plugin.call(this,type,[event,ui]);if(type =="drag") this.positionAbs =this._convertPositionTo("absolute");return $.Widget.prototype._trigger.call(this,type,event,ui);},plugins:{},_uiHash:function(event) {return {helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs
};}
});$.ui.plugin.add("draggable","connectToSortable",{start:function(event,ui) {var inst =$(this).data("draggable"),o =inst.options,uiSortable =$.extend({},ui,{item:inst.element });inst.sortables =[];$(o.connectToSortable).each(function() {var sortable =$.data(this,'sortable');if (sortable &&!sortable.options.disabled) {inst.sortables.push({instance:sortable,shouldRevert:sortable.options.revert
});sortable.refreshPositions();sortable._trigger("activate",event,uiSortable);}
});},stop:function(event,ui) {var inst =$(this).data("draggable"),uiSortable =$.extend({},ui,{item:inst.element });$.each(inst.sortables,function() {if(this.instance.isOver) {this.instance.isOver =0;inst.cancelHelperRemoval =true;this.instance.cancelHelperRemoval =false;if(this.shouldRevert) this.instance.options.revert =true;this.instance._mouseStop(event);this.instance.options.helper =this.instance.options._helper;if(inst.options.helper =='original')
this.instance.currentItem.css({top:'auto',left:'auto'});} else {this.instance.cancelHelperRemoval =false;this.instance._trigger("deactivate",event,uiSortable);}
});},drag:function(event,ui) {var inst =$(this).data("draggable"),that =this;var checkPos =function(o) {var dyClick =this.offset.click.top,dxClick =this.offset.click.left;var helperTop =this.positionAbs.top,helperLeft =this.positionAbs.left;var itemHeight =o.height,itemWidth =o.width;var itemTop =o.top,itemLeft =o.left;return $.ui.isOver(helperTop + dyClick,helperLeft + dxClick,itemTop,itemLeft,itemHeight,itemWidth);};$.each(inst.sortables,function(i) {var innermostIntersecting =false;var thisSortable =this;this.instance.positionAbs =inst.positionAbs;this.instance.helperProportions =inst.helperProportions;this.instance.offset.click =inst.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)) {innermostIntersecting =true;$.each(inst.sortables,function () {this.instance.positionAbs =inst.positionAbs;this.instance.helperProportions =inst.helperProportions;this.instance.offset.click =inst.offset.click;if (this !=thisSortable
&&this.instance._intersectsWith(this.instance.containerCache)
&&$.ui.contains(thisSortable.instance.element[0],this.instance.element[0]))
innermostIntersecting =false;return innermostIntersecting;});}
if(innermostIntersecting) {if(!this.instance.isOver) {this.instance.isOver =1;this.instance.currentItem =$(that).clone().removeAttr('id').appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper =this.instance.options.helper;this.instance.options.helper =function() {return ui.helper[0];};event.target =this.instance.currentItem[0];this.instance._mouseCapture(event,true);this.instance._mouseStart(event,true,true);this.instance.offset.click.top =inst.offset.click.top;this.instance.offset.click.left =inst.offset.click.left;this.instance.offset.parent.left -=inst.offset.parent.left - this.instance.offset.parent.left;this.instance.offset.parent.top -=inst.offset.parent.top - this.instance.offset.parent.top;inst._trigger("toSortable",event);inst.dropped =this.instance.element;inst.currentItem =inst.element;this.instance.fromOutside =inst;}
if(this.instance.currentItem) this.instance._mouseDrag(event);} else {if(this.instance.isOver) {this.instance.isOver =0;this.instance.cancelHelperRemoval =true;this.instance.options.revert =false;this.instance._trigger('out',event,this.instance._uiHash(this.instance));this.instance._mouseStop(event,true);this.instance.options.helper =this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder) this.instance.placeholder.remove();inst._trigger("fromSortable",event);inst.dropped =false;}
};});}
});$.ui.plugin.add("draggable","cursor",{start:function(event,ui) {var t =$('body'),o =$(this).data('draggable').options;if (t.css("cursor")) o._cursor =t.css("cursor");t.css("cursor",o.cursor);},stop:function(event,ui) {var o =$(this).data('draggable').options;if (o._cursor) $('body').css("cursor",o._cursor);}
});$.ui.plugin.add("draggable","opacity",{start:function(event,ui) {var t =$(ui.helper),o =$(this).data('draggable').options;if(t.css("opacity")) o._opacity =t.css("opacity");t.css('opacity',o.opacity);},stop:function(event,ui) {var o =$(this).data('draggable').options;if(o._opacity) $(ui.helper).css('opacity',o._opacity);}
});$.ui.plugin.add("draggable","scroll",{start:function(event,ui) {var i =$(this).data("draggable");if(i.scrollParent[0] !=document &&i.scrollParent[0].tagName !='HTML') i.overflowOffset =i.scrollParent.offset();},drag:function(event,ui) {var i =$(this).data("draggable"),o =i.options,scrolled =false;if(i.scrollParent[0] !=document &&i.scrollParent[0].tagName !='HTML') {if(!o.axis ||o.axis !='x') {if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
i.scrollParent[0].scrollTop =scrolled =i.scrollParent[0].scrollTop + o.scrollSpeed;else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
i.scrollParent[0].scrollTop =scrolled =i.scrollParent[0].scrollTop - o.scrollSpeed;}
if(!o.axis ||o.axis !='y') {if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
i.scrollParent[0].scrollLeft =scrolled =i.scrollParent[0].scrollLeft + o.scrollSpeed;else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
i.scrollParent[0].scrollLeft =scrolled =i.scrollParent[0].scrollLeft - o.scrollSpeed;}
} else {if(!o.axis ||o.axis !='x') {if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
scrolled =$(document).scrollTop($(document).scrollTop() - o.scrollSpeed);else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
scrolled =$(document).scrollTop($(document).scrollTop() + o.scrollSpeed);}
if(!o.axis ||o.axis !='y') {if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
scrolled =$(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
scrolled =$(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);}
}
if(scrolled !==false &&$.ui.ddmanager &&!o.dropBehaviour)
$.ui.ddmanager.prepareOffsets(i,event);}
});$.ui.plugin.add("draggable","snap",{start:function(event,ui) {var i =$(this).data("draggable"),o =i.options;i.snapElements =[];$(o.snap.constructor !=String ?(o.snap.items ||':data(draggable)') :o.snap).each(function() {var $t =$(this);var $o =$t.offset();if(this !=i.element[0]) i.snapElements.push({item:this,width:$t.outerWidth(),height:$t.outerHeight(),top:$o.top,left:$o.left
});});},drag:function(event,ui) {var inst =$(this).data("draggable"),o =inst.options;var d =o.snapTolerance;var x1 =ui.offset.left,x2 =x1 + inst.helperProportions.width,y1 =ui.offset.top,y2 =y1 + inst.helperProportions.height;for (var i =inst.snapElements.length - 1;i >=0;i--){var l =inst.snapElements[i].left,r =l + inst.snapElements[i].width,t =inst.snapElements[i].top,b =t + inst.snapElements[i].height;if(!((l-d < x1 &&x1 < r+d &&t-d < y1 &&y1 < b+d) ||(l-d < x1 &&x1 < r+d &&t-d < y2 &&y2 < b+d) ||(l-d < x2 &&x2 < r+d &&t-d < y1 &&y1 < b+d) ||(l-d < x2 &&x2 < r+d &&t-d < y2 &&y2 < b+d))) {if(inst.snapElements[i].snapping) (inst.options.snap.release &&inst.options.snap.release.call(inst.element,event,$.extend(inst._uiHash(),{snapItem:inst.snapElements[i].item })));inst.snapElements[i].snapping =false;continue;}
if(o.snapMode !='inner') {var ts =Math.abs(t - y2) <=d;var bs =Math.abs(b - y1) <=d;var ls =Math.abs(l - x2) <=d;var rs =Math.abs(r - x1) <=d;if(ts) ui.position.top =inst._convertPositionTo("relative",{top:t - inst.helperProportions.height,left:0 }).top - inst.margins.top;if(bs) ui.position.top =inst._convertPositionTo("relative",{top:b,left:0 }).top - inst.margins.top;if(ls) ui.position.left =inst._convertPositionTo("relative",{top:0,left:l - inst.helperProportions.width }).left - inst.margins.left;if(rs) ui.position.left =inst._convertPositionTo("relative",{top:0,left:r }).left - inst.margins.left;}
var first =(ts ||bs ||ls ||rs);if(o.snapMode !='outer') {var ts =Math.abs(t - y1) <=d;var bs =Math.abs(b - y2) <=d;var ls =Math.abs(l - x1) <=d;var rs =Math.abs(r - x2) <=d;if(ts) ui.position.top =inst._convertPositionTo("relative",{top:t,left:0 }).top - inst.margins.top;if(bs) ui.position.top =inst._convertPositionTo("relative",{top:b - inst.helperProportions.height,left:0 }).top - inst.margins.top;if(ls) ui.position.left =inst._convertPositionTo("relative",{top:0,left:l }).left - inst.margins.left;if(rs) ui.position.left =inst._convertPositionTo("relative",{top:0,left:r - inst.helperProportions.width }).left - inst.margins.left;}
if(!inst.snapElements[i].snapping &&(ts ||bs ||ls ||rs ||first))
(inst.options.snap.snap &&inst.options.snap.snap.call(inst.element,event,$.extend(inst._uiHash(),{snapItem:inst.snapElements[i].item })));inst.snapElements[i].snapping =(ts ||bs ||ls ||rs ||first);};}
});$.ui.plugin.add("draggable","stack",{start:function(event,ui) {var o =$(this).data("draggable").options;var group =$.makeArray($(o.stack)).sort(function(a,b) {return (parseInt($(a).css("zIndex"),10) ||0) - (parseInt($(b).css("zIndex"),10) ||0);});if (!group.length) {return;}
var min =parseInt(group[0].style.zIndex) ||0;$(group).each(function(i) {this.style.zIndex =min + i;});this[0].style.zIndex =min + group.length;}
});$.ui.plugin.add("draggable","zIndex",{start:function(event,ui) {var t =$(ui.helper),o =$(this).data("draggable").options;if(t.css("zIndex")) o._zIndex =t.css("zIndex");t.css('zIndex',o.zIndex);},stop:function(event,ui) {var o =$(this).data("draggable").options;if(o._zIndex) $(ui.helper).css('zIndex',o._zIndex);}
});})(jQuery);(function($,undefined ) {$.widget("ui.droppable",{version:"1.9.2",widgetEventPrefix:"drop",options:{accept:'*',activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:'default',tolerance:'intersect'},_create:function() {var o =this.options,accept =o.accept;this.isover =0;this.isout =1;this.accept =$.isFunction(accept) ?accept :function(d) {return d.is(accept);};this.proportions ={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight };$.ui.ddmanager.droppables[o.scope] =$.ui.ddmanager.droppables[o.scope] ||[];$.ui.ddmanager.droppables[o.scope].push(this);(o.addClasses &&this.element.addClass("ui-droppable"));},_destroy:function() {var drop =$.ui.ddmanager.droppables[this.options.scope];for (var i =0;i < drop.length;i++ )
if (drop[i] ==this )
drop.splice(i,1);this.element.removeClass("ui-droppable ui-droppable-disabled");},_setOption:function(key,value) {if(key =='accept') {this.accept =$.isFunction(value) ?value :function(d) {return d.is(value);};}
$.Widget.prototype._setOption.apply(this,arguments);},_activate:function(event) {var draggable =$.ui.ddmanager.current;if(this.options.activeClass) this.element.addClass(this.options.activeClass);(draggable &&this._trigger('activate',event,this.ui(draggable)));},_deactivate:function(event) {var draggable =$.ui.ddmanager.current;if(this.options.activeClass) this.element.removeClass(this.options.activeClass);(draggable &&this._trigger('deactivate',event,this.ui(draggable)));},_over:function(event) {var draggable =$.ui.ddmanager.current;if (!draggable ||(draggable.currentItem ||draggable.element)[0] ==this.element[0]) return;if (this.accept.call(this.element[0],(draggable.currentItem ||draggable.element))) {if(this.options.hoverClass) this.element.addClass(this.options.hoverClass);this._trigger('over',event,this.ui(draggable));}
},_out:function(event) {var draggable =$.ui.ddmanager.current;if (!draggable ||(draggable.currentItem ||draggable.element)[0] ==this.element[0]) return;if (this.accept.call(this.element[0],(draggable.currentItem ||draggable.element))) {if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);this._trigger('out',event,this.ui(draggable));}
},_drop:function(event,custom) {var draggable =custom ||$.ui.ddmanager.current;if (!draggable ||(draggable.currentItem ||draggable.element)[0] ==this.element[0]) return false;var childrenIntersection =false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {var inst =$.data(this,'droppable');if(inst.options.greedy
&&!inst.options.disabled
&&inst.options.scope ==draggable.options.scope
&&inst.accept.call(inst.element[0],(draggable.currentItem ||draggable.element))
&&$.ui.intersect(draggable,$.extend(inst,{offset:inst.element.offset() }),inst.options.tolerance)
) {childrenIntersection =true;return false;}
});if(childrenIntersection) return false;if(this.accept.call(this.element[0],(draggable.currentItem ||draggable.element))) {if(this.options.activeClass) this.element.removeClass(this.options.activeClass);if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);this._trigger('drop',event,this.ui(draggable));return this.element;}
return false;},ui:function(c) {return {draggable:(c.currentItem ||c.element),helper:c.helper,position:c.position,offset:c.positionAbs
};}
});$.ui.intersect =function(draggable,droppable,toleranceMode) {if (!droppable.offset) return false;var x1 =(draggable.positionAbs ||draggable.position.absolute).left,x2 =x1 + draggable.helperProportions.width,y1 =(draggable.positionAbs ||draggable.position.absolute).top,y2 =y1 + draggable.helperProportions.height;var l =droppable.offset.left,r =l + droppable.proportions.width,t =droppable.offset.top,b =t + droppable.proportions.height;switch (toleranceMode) {case 'fit':return (l <=x1 &&x2 <=r
&&t <=y1 &&y2 <=b);break;case 'intersect':return (l < x1 + (draggable.helperProportions.width / 2) &&x2 - (draggable.helperProportions.width / 2) < r &&t < y1 + (draggable.helperProportions.height / 2) &&y2 - (draggable.helperProportions.height / 2) < b );break;case 'pointer':var draggableLeft =((draggable.positionAbs ||draggable.position.absolute).left + (draggable.clickOffset ||draggable.offset.click).left),draggableTop =((draggable.positionAbs ||draggable.position.absolute).top + (draggable.clickOffset ||draggable.offset.click).top),isOver =$.ui.isOver(draggableTop,draggableLeft,t,l,droppable.proportions.height,droppable.proportions.width);return isOver;break;case 'touch':return ((y1 >=t &&y1 <=b) ||(y2 >=t &&y2 <=b) ||(y1 < t &&y2 > b)) &&((x1 >=l &&x1 <=r) ||(x2 >=l &&x2 <=r) ||(x1 < l &&x2 > r));break;default:return false;break;}
};$.ui.ddmanager ={current:null,droppables:{'default':[] },prepareOffsets:function(t,event) {var m =$.ui.ddmanager.droppables[t.options.scope] ||[];var type =event ?event.type :null;var list =(t.currentItem ||t.element).find(":data(droppable)").andSelf();droppablesLoop:for (var i =0;i < m.length;i++) {if(m[i].options.disabled ||(t &&!m[i].accept.call(m[i].element[0],(t.currentItem ||t.element)))) continue;for (var j=0;j < list.length;j++) {if(list[j] ==m[i].element[0]) {m[i].proportions.height =0;continue droppablesLoop;} };m[i].visible =m[i].element.css("display") !="none";if(!m[i].visible) continue;if(type =="mousedown") m[i]._activate.call(m[i],event);m[i].offset =m[i].element.offset();m[i].proportions ={width:m[i].element[0].offsetWidth,height:m[i].element[0].offsetHeight };}
},drop:function(draggable,event) {var dropped =false;$.each($.ui.ddmanager.droppables[draggable.options.scope] ||[],function() {if(!this.options) return;if (!this.options.disabled &&this.visible &&$.ui.intersect(draggable,this,this.options.tolerance))
dropped =this._drop.call(this,event) ||dropped;if (!this.options.disabled &&this.visible &&this.accept.call(this.element[0],(draggable.currentItem ||draggable.element))) {this.isout =1;this.isover =0;this._deactivate.call(this,event);}
});return dropped;},dragStart:function(draggable,event ) {draggable.element.parentsUntil("body").bind("scroll.droppable",function() {if(!draggable.options.refreshPositions ) $.ui.ddmanager.prepareOffsets(draggable,event );});},drag:function(draggable,event) {if(draggable.options.refreshPositions) $.ui.ddmanager.prepareOffsets(draggable,event);$.each($.ui.ddmanager.droppables[draggable.options.scope] ||[],function() {if(this.options.disabled ||this.greedyChild ||!this.visible) return;var intersects =$.ui.intersect(draggable,this,this.options.tolerance);var c =!intersects &&this.isover ==1 ?'isout':(intersects &&this.isover ==0 ?'isover':null);if(!c) return;var parentInstance;if (this.options.greedy) {var scope =this.options.scope;var parent =this.element.parents(':data(droppable)').filter(function () {return $.data(this,'droppable').options.scope ===scope;});if (parent.length) {parentInstance =$.data(parent[0],'droppable');parentInstance.greedyChild =(c =='isover'?1 :0);}
}
if (parentInstance &&c =='isover') {parentInstance['isover'] =0;parentInstance['isout'] =1;parentInstance._out.call(parentInstance,event);}
this[c] =1;this[c =='isout'?'isover':'isout'] =0;this[c =="isover"?"_over":"_out"].call(this,event);if (parentInstance &&c =='isout') {parentInstance['isout'] =0;parentInstance['isover'] =1;parentInstance._over.call(parentInstance,event);}
});},dragStop:function(draggable,event ) {draggable.element.parentsUntil("body").unbind("scroll.droppable");if(!draggable.options.refreshPositions ) $.ui.ddmanager.prepareOffsets(draggable,event );}
};})(jQuery);;(jQuery.effects ||(function($,undefined) {var backCompat =$.uiBackCompat !==false,dataSpace ="ui-effects-";$.effects ={effect:{}
};(function(jQuery,undefined ) {var stepHooks ="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),rplusequals =/^([\-+])=\s*(\d+\.?\d*)/,
stringParsers =[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
parse:function(execResult ) {return [execResult[1 ],execResult[2 ],execResult[3 ],execResult[4 ]
];}
},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
parse:function(execResult ) {return [execResult[1 ] * 2.55,execResult[2 ] * 2.55,execResult[3 ] * 2.55,execResult[4 ]
];}
},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
parse:function(execResult ) {return [parseInt(execResult[1 ],16 ),parseInt(execResult[2 ],16 ),parseInt(execResult[3 ],16 )
];}
},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,
parse:function(execResult ) {return [parseInt(execResult[1 ] + execResult[1 ],16 ),parseInt(execResult[2 ] + execResult[2 ],16 ),parseInt(execResult[3 ] + execResult[3 ],16 )
];}
},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
space:"hsla",parse:function(execResult ) {return [execResult[1 ],execResult[2 ] / 100,execResult[3 ] / 100,execResult[4 ]
];}
}],color =jQuery.Color =function(color,green,blue,alpha ) {return new jQuery.Color.fn.parse(color,green,blue,alpha );},spaces ={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}
}
},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}
}
}
},propTypes ={"byte":{floor:true,max:255
},"percent":{max:1
},"degrees":{mod:360,floor:true
}
},support =color.support ={},supportElem =jQuery("<p>")[0 ],colors,each =jQuery.each;supportElem.style.cssText ="background-color:rgba(1,1,1,.5)";support.rgba =supportElem.style.backgroundColor.indexOf("rgba") > -1;each(spaces,function(spaceName,space ) {space.cache ="_"+ spaceName;space.props.alpha ={idx:3,type:"percent",def:1
};});function clamp(value,prop,allowEmpty ) {var type =propTypes[prop.type ] ||{};if (value ==null ) {return (allowEmpty ||!prop.def) ?null :prop.def;}
value =type.floor ?~~value :parseFloat(value );if (isNaN(value ) ) {return prop.def;}
if (type.mod ) {return (value + type.mod) % type.mod;}
return 0 > value ?0 :type.max < value ?type.max :value;}
function stringParse(string ) {var inst =color(),rgba =inst._rgba =[];string =string.toLowerCase();each(stringParsers,function(i,parser ) {var parsed,match =parser.re.exec(string ),values =match &&parser.parse(match ),spaceName =parser.space ||"rgba";if (values ) {parsed =inst[spaceName ](values );inst[spaces[spaceName ].cache ] =parsed[spaces[spaceName ].cache ];rgba =inst._rgba =parsed._rgba;return false;}
});if (rgba.length ) {if (rgba.join() ==="0,0,0,0") {jQuery.extend(rgba,colors.transparent );}
return inst;}
return colors[string ];}
color.fn =jQuery.extend(color.prototype,{parse:function(red,green,blue,alpha ) {if (red ===undefined ) {this._rgba =[null,null,null,null ];return this;}
if (red.jquery ||red.nodeType ) {red =jQuery(red ).css(green );green =undefined;}
var inst =this,type =jQuery.type(red ),rgba =this._rgba =[];if (green !==undefined ) {red =[red,green,blue,alpha ];type ="array";}
if (type ==="string") {return this.parse(stringParse(red ) ||colors._default );}
if (type ==="array") {each(spaces.rgba.props,function(key,prop ) {rgba[prop.idx ] =clamp(red[prop.idx ],prop );});return this;}
if (type ==="object") {if (red instanceof color ) {each(spaces,function(spaceName,space ) {if (red[space.cache ] ) {inst[space.cache ] =red[space.cache ].slice();}
});} else {each(spaces,function(spaceName,space ) {var cache =space.cache;each(space.props,function(key,prop ) {if (!inst[cache ] &&space.to ) {if (key ==="alpha"||red[key ] ==null ) {return;}
inst[cache ] =space.to(inst._rgba );}
inst[cache ][prop.idx ] =clamp(red[key ],prop,true );});if (inst[cache ] &&$.inArray(null,inst[cache ].slice(0,3 ) ) < 0 ) {inst[cache ][3 ] =1;if (space.from ) {inst._rgba =space.from(inst[cache ] );}
}
});}
return this;}
},is:function(compare ) {var is =color(compare ),same =true,inst =this;each(spaces,function(_,space ) {var localCache,isCache =is[space.cache ];if (isCache) {localCache =inst[space.cache ] ||space.to &&space.to(inst._rgba ) ||[];each(space.props,function(_,prop ) {if (isCache[prop.idx ] !=null ) {same =(isCache[prop.idx ] ===localCache[prop.idx ] );return same;}
});}
return same;});return same;},_space:function() {var used =[],inst =this;each(spaces,function(spaceName,space ) {if (inst[space.cache ] ) {used.push(spaceName );}
});return used.pop();},transition:function(other,distance ) {var end =color(other ),spaceName =end._space(),space =spaces[spaceName ],startColor =this.alpha() ===0 ?color("transparent") :this,start =startColor[space.cache ] ||space.to(startColor._rgba ),result =start.slice();end =end[space.cache ];each(space.props,function(key,prop ) {var index =prop.idx,startValue =start[index ],endValue =end[index ],type =propTypes[prop.type ] ||{};if (endValue ===null ) {return;}
if (startValue ===null ) {result[index ] =endValue;} else {if (type.mod ) {if (endValue - startValue > type.mod / 2 ) {startValue +=type.mod;} else if (startValue - endValue > type.mod / 2 ) {startValue -=type.mod;}
}
result[index ] =clamp((endValue - startValue ) * distance + startValue,prop );}
});return this[spaceName ](result );},blend:function(opaque ) {if (this._rgba[3 ] ===1 ) {return this;}
var rgb =this._rgba.slice(),a =rgb.pop(),blend =color(opaque )._rgba;return color(jQuery.map(rgb,function(v,i ) {return (1 - a ) * blend[i ] + a * v;}));},toRgbaString:function() {var prefix ="rgba(",rgba =jQuery.map(this._rgba,function(v,i ) {return v ==null ?(i > 2 ?1 :0 ) :v;});if (rgba[3 ] ===1 ) {rgba.pop();prefix ="rgb(";}
return prefix + rgba.join() + ")";},toHslaString:function() {var prefix ="hsla(",hsla =jQuery.map(this.hsla(),function(v,i ) {if (v ==null ) {v =i > 2 ?1 :0;}
if (i &&i < 3 ) {v =Math.round(v * 100 ) + "%";}
return v;});if (hsla[3 ] ===1 ) {hsla.pop();prefix ="hsl(";}
return prefix + hsla.join() + ")";},toHexString:function(includeAlpha ) {var rgba =this._rgba.slice(),alpha =rgba.pop();if (includeAlpha ) {rgba.push(~~(alpha * 255 ) );}
return "#"+ jQuery.map(rgba,function(v ) {v =(v ||0 ).toString(16 );return v.length ===1 ?"0"+ v :v;}).join("");},toString:function() {return this._rgba[3 ] ===0 ?"transparent":this.toRgbaString();}
});color.fn.parse.prototype =color.fn;function hue2rgb(p,q,h ) {h =(h + 1 ) % 1;if (h * 6 < 1 ) {return p + (q - p) * h * 6;}
if (h * 2 < 1) {return q;}
if (h * 3 < 2 ) {return p + (q - p) * ((2/3) - h) * 6;}
return p;}
spaces.hsla.to =function (rgba ) {if (rgba[0 ] ==null ||rgba[1 ] ==null ||rgba[2 ] ==null ) {return [null,null,null,rgba[3 ] ];}
var r =rgba[0 ] / 255,g =rgba[1 ] / 255,b =rgba[2 ] / 255,a =rgba[3 ],max =Math.max(r,g,b ),min =Math.min(r,g,b ),diff =max - min,add =max + min,l =add * 0.5,h,s;if (min ===max ) {h =0;} else if (r ===max ) {h =(60 * (g - b ) / diff ) + 360;} else if (g ===max ) {h =(60 * (b - r ) / diff ) + 120;} else {h =(60 * (r - g ) / diff ) + 240;}
if (l ===0 ||l ===1 ) {s =l;} else if (l <=0.5 ) {s =diff / add;} else {s =diff / (2 - add );}
return [Math.round(h) % 360,s,l,a ==null ?1 :a ];};spaces.hsla.from =function (hsla ) {if (hsla[0 ] ==null ||hsla[1 ] ==null ||hsla[2 ] ==null ) {return [null,null,null,hsla[3 ] ];}
var h =hsla[0 ] / 360,s =hsla[1 ],l =hsla[2 ],a =hsla[3 ],q =l <=0.5 ?l * (1 + s ) :l + s - l * s,p =2 * l - q;return [Math.round(hue2rgb(p,q,h + (1 / 3 ) ) * 255 ),Math.round(hue2rgb(p,q,h ) * 255 ),Math.round(hue2rgb(p,q,h - (1 / 3 ) ) * 255 ),a
];};each(spaces,function(spaceName,space ) {var props =space.props,cache =space.cache,to =space.to,from =space.from;color.fn[spaceName ] =function(value ) {if (to &&!this[cache ] ) {this[cache ] =to(this._rgba );}
if (value ===undefined ) {return this[cache ].slice();}
var ret,type =jQuery.type(value ),arr =(type ==="array"||type ==="object") ?value :arguments,local =this[cache ].slice();each(props,function(key,prop ) {var val =arr[type ==="object"?key :prop.idx ];if (val ==null ) {val =local[prop.idx ];}
local[prop.idx ] =clamp(val,prop );});if (from ) {ret =color(from(local ) );ret[cache ] =local;return ret;} else {return color(local );}
};each(props,function(key,prop ) {if (color.fn[key ] ) {return;}
color.fn[key ] =function(value ) {var vtype =jQuery.type(value ),fn =(key ==="alpha"?(this._hsla ?"hsla":"rgba") :spaceName ),local =this[fn ](),cur =local[prop.idx ],match;if (vtype ==="undefined") {return cur;}
if (vtype ==="function") {value =value.call(this,cur );vtype =jQuery.type(value );}
if (value ==null &&prop.empty ) {return this;}
if (vtype ==="string") {match =rplusequals.exec(value );if (match ) {value =cur + parseFloat(match[2 ] ) * (match[1 ] ==="+"?1 :-1 );}
}
local[prop.idx ] =value;return this[fn ](local );};});});each(stepHooks,function(i,hook ) {jQuery.cssHooks[hook ] ={set:function(elem,value ) {var parsed,curElem,backgroundColor ="";if (jQuery.type(value ) !=="string"||(parsed =stringParse(value ) ) ) {value =color(parsed ||value );if (!support.rgba &&value._rgba[3 ] !==1 ) {curElem =hook ==="backgroundColor"?elem.parentNode :elem;while ((backgroundColor ===""||backgroundColor ==="transparent") &&curElem &&curElem.style
) {try {backgroundColor =jQuery.css(curElem,"backgroundColor");curElem =curElem.parentNode;} catch (e ) {}
}
value =value.blend(backgroundColor &&backgroundColor !=="transparent"?backgroundColor :"_default");}
value =value.toRgbaString();}
try {elem.style[hook ] =value;} catch(error ) {}
}
};jQuery.fx.step[hook ] =function(fx ) {if (!fx.colorInit ) {fx.start =color(fx.elem,hook );fx.end =color(fx.end );fx.colorInit =true;}
jQuery.cssHooks[hook ].set(fx.elem,fx.start.transition(fx.end,fx.pos ) );};});jQuery.cssHooks.borderColor ={expand:function(value ) {var expanded ={};each(["Top","Right","Bottom","Left"],function(i,part ) {expanded["border"+ part + "Color"] =value;});return expanded;}
};colors =jQuery.Color.names ={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0 ],_default:"#ffffff"};})(jQuery );(function() {var classAnimationActions =["add","remove","toggle"],shorthandStyles ={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1
};$.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(_,prop ) {$.fx.step[prop ] =function(fx ) {if (fx.end !=="none"&&!fx.setAttr ||fx.pos ===1 &&!fx.setAttr ) {jQuery.style(fx.elem,prop,fx.end );fx.setAttr =true;}
};});function getElementStyles() {var style =this.ownerDocument.defaultView ?this.ownerDocument.defaultView.getComputedStyle(this,null ) :this.currentStyle,newStyle ={},key,len;if (style &&style.length &&style[0 ] &&style[style[0 ] ] ) {len =style.length;while (len-- ) {key =style[len ];if (typeof style[key ] ==="string") {newStyle[$.camelCase(key ) ] =style[key ];}
}
} else {for (key in style ) {if (typeof style[key ] ==="string") {newStyle[key ] =style[key ];}
}
}
return newStyle;}
function styleDifference(oldStyle,newStyle ) {var diff ={},name,value;for (name in newStyle ) {value =newStyle[name ];if (oldStyle[name ] !==value ) {if (!shorthandStyles[name ] ) {if ($.fx.step[name ] ||!isNaN(parseFloat(value ) ) ) {diff[name ] =value;}
}
}
}
return diff;}
$.effects.animateClass =function(value,duration,easing,callback ) {var o =$.speed(duration,easing,callback );return this.queue(function() {var animated =$(this ),baseClass =animated.attr("class") ||"",applyClassChange,allAnimations =o.children ?animated.find("*").andSelf() :animated;allAnimations =allAnimations.map(function() {var el =$(this );return {el:el,start:getElementStyles.call(this )
};});applyClassChange =function() {$.each(classAnimationActions,function(i,action) {if (value[action ] ) {animated[action + "Class"](value[action ] );}
});};applyClassChange();allAnimations =allAnimations.map(function() {this.end =getElementStyles.call(this.el[0 ] );this.diff =styleDifference(this.start,this.end );return this;});animated.attr("class",baseClass );allAnimations =allAnimations.map(function() {var styleInfo =this,dfd =$.Deferred(),opts =jQuery.extend({},o,{queue:false,complete:function() {dfd.resolve(styleInfo );}
});this.el.animate(this.diff,opts );return dfd.promise();});$.when.apply($,allAnimations.get() ).done(function() {applyClassChange();$.each(arguments,function() {var el =this.el;$.each(this.diff,function(key) {el.css(key,'');});});o.complete.call(animated[0 ] );});});};$.fn.extend({_addClass:$.fn.addClass,addClass:function(classNames,speed,easing,callback ) {return speed ?$.effects.animateClass.call(this,{add:classNames },speed,easing,callback ) :this._addClass(classNames );},_removeClass:$.fn.removeClass,removeClass:function(classNames,speed,easing,callback ) {return speed ?$.effects.animateClass.call(this,{remove:classNames },speed,easing,callback ) :this._removeClass(classNames );},_toggleClass:$.fn.toggleClass,toggleClass:function(classNames,force,speed,easing,callback ) {if (typeof force ==="boolean"||force ===undefined ) {if (!speed ) {return this._toggleClass(classNames,force );} else {return $.effects.animateClass.call(this,(force ?{add:classNames } :{remove:classNames }),speed,easing,callback );}
} else {return $.effects.animateClass.call(this,{toggle:classNames },force,speed,easing );}
},switchClass:function(remove,add,speed,easing,callback) {return $.effects.animateClass.call(this,{add:add,remove:remove
},speed,easing,callback );}
});})();(function() {$.extend($.effects,{version:"1.9.2",save:function(element,set ) {for(var i=0;i < set.length;i++ ) {if (set[i ] !==null ) {element.data(dataSpace + set[i ],element[0 ].style[set[i ] ] );}
}
},restore:function(element,set ) {var val,i;for(i=0;i < set.length;i++ ) {if (set[i ] !==null ) {val =element.data(dataSpace + set[i ] );if (val ===undefined ) {val ="";}
element.css(set[i ],val );}
}
},setMode:function(el,mode ) {if (mode ==="toggle") {mode =el.is(":hidden") ?"show":"hide";}
return mode;},getBaseline:function(origin,original ) {var y,x;switch (origin[0 ] ) {case "top":y =0;break;case "middle":y =0.5;break;case "bottom":y =1;break;default:y =origin[0 ] / original.height;}
switch (origin[1 ] ) {case "left":x =0;break;case "center":x =0.5;break;case "right":x =1;break;default:x =origin[1 ] / original.width;}
return {x:x,y:y
};},createWrapper:function(element ) {if (element.parent().is(".ui-effects-wrapper")) {return element.parent();}
var props ={width:element.outerWidth(true),height:element.outerHeight(true),"float":element.css("float")
},wrapper =$("<div></div>")
.addClass("ui-effects-wrapper")
.css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0
}),size ={width:element.width(),height:element.height()
},active =document.activeElement;try {active.id;} catch(e ) {active =document.body;}
element.wrap(wrapper );if (element[0 ] ===active ||$.contains(element[0 ],active ) ) {$(active ).focus();}
wrapper =element.parent();if (element.css("position") ==="static") {wrapper.css({position:"relative"});element.css({position:"relative"});} else {$.extend(props,{position:element.css("position"),zIndex:element.css("z-index")
});$.each(["top","left","bottom","right"],function(i,pos) {props[pos ] =element.css(pos );if (isNaN(parseInt(props[pos ],10 ) ) ) {props[pos ] ="auto";}
});element.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"});}
element.css(size);return wrapper.css(props ).show();},removeWrapper:function(element ) {var active =document.activeElement;if (element.parent().is(".ui-effects-wrapper") ) {element.parent().replaceWith(element );if (element[0 ] ===active ||$.contains(element[0 ],active ) ) {$(active ).focus();}
}
return element;},setTransition:function(element,list,factor,value ) {value =value ||{};$.each(list,function(i,x ) {var unit =element.cssUnit(x );if (unit[0 ] > 0 ) {value[x ] =unit[0 ] * factor + unit[1 ];}
});return value;}
});function _normalizeArguments(effect,options,speed,callback ) {if ($.isPlainObject(effect ) ) {options =effect;effect =effect.effect;}
effect ={effect:effect };if (options ==null ) {options ={};}
if ($.isFunction(options ) ) {callback =options;speed =null;options ={};}
if (typeof options ==="number"||$.fx.speeds[options ] ) {callback =speed;speed =options;options ={};}
if ($.isFunction(speed ) ) {callback =speed;speed =null;}
if (options ) {$.extend(effect,options );}
speed =speed ||options.duration;effect.duration =$.fx.off ?0 :typeof speed ==="number"?speed :speed in $.fx.speeds ?$.fx.speeds[speed ] :$.fx.speeds._default;effect.complete =callback ||options.complete;return effect;}
function standardSpeed(speed ) {if (!speed ||typeof speed ==="number"||$.fx.speeds[speed ] ) {return true;}
if (typeof speed ==="string"&&!$.effects.effect[speed ] ) {if (backCompat &&$.effects[speed ] ) {return false;}
return true;}
return false;}
$.fn.extend({effect:function() {var args =_normalizeArguments.apply(this,arguments ),mode =args.mode,queue =args.queue,effectMethod =$.effects.effect[args.effect ],oldEffectMethod =!effectMethod &&backCompat &&$.effects[args.effect ];if ($.fx.off ||!(effectMethod ||oldEffectMethod ) ) {if (mode ) {return this[mode ](args.duration,args.complete );} else {return this.each(function() {if (args.complete ) {args.complete.call(this );}
});}
}
function run(next ) {var elem =$(this ),complete =args.complete,mode =args.mode;function done() {if ($.isFunction(complete ) ) {complete.call(elem[0] );}
if ($.isFunction(next ) ) {next();}
}
if (elem.is(":hidden") ?mode ==="hide":mode ==="show") {done();} else {effectMethod.call(elem[0],args,done );}
}
if (effectMethod ) {return queue ===false ?this.each(run ) :this.queue(queue ||"fx",run );} else {return oldEffectMethod.call(this,{options:args,duration:args.duration,callback:args.complete,mode:args.mode
});}
},_show:$.fn.show,show:function(speed ) {if (standardSpeed(speed ) ) {return this._show.apply(this,arguments );} else {var args =_normalizeArguments.apply(this,arguments );args.mode ="show";return this.effect.call(this,args );}
},_hide:$.fn.hide,hide:function(speed ) {if (standardSpeed(speed ) ) {return this._hide.apply(this,arguments );} else {var args =_normalizeArguments.apply(this,arguments );args.mode ="hide";return this.effect.call(this,args );}
},__toggle:$.fn.toggle,toggle:function(speed ) {if (standardSpeed(speed ) ||typeof speed ==="boolean"||$.isFunction(speed ) ) {return this.__toggle.apply(this,arguments );} else {var args =_normalizeArguments.apply(this,arguments );args.mode ="toggle";return this.effect.call(this,args );}
},cssUnit:function(key) {var style =this.css(key ),val =[];$.each(["em","px","%","pt"],function(i,unit ) {if (style.indexOf(unit ) > 0 ) {val =[parseFloat(style ),unit ];}
});return val;}
});})();(function() {var baseEasings ={};$.each(["Quad","Cubic","Quart","Quint","Expo"],function(i,name ) {baseEasings[name ] =function(p ) {return Math.pow(p,i + 2 );};});$.extend(baseEasings,{Sine:function (p ) {return 1 - Math.cos(p * Math.PI / 2 );},Circ:function (p ) {return 1 - Math.sqrt(1 - p * p );},Elastic:function(p ) {return p ===0 ||p ===1 ?p :-Math.pow(2,8 * (p - 1) ) * Math.sin(((p - 1) * 80 - 7.5 ) * Math.PI / 15 );},Back:function(p ) {return p * p * (3 * p - 2 );},Bounce:function (p ) {var pow2,bounce =4;while (p < ((pow2 =Math.pow(2,--bounce ) ) - 1 ) / 11 ) {}
return 1 / Math.pow(4,3 - bounce ) - 7.5625 * Math.pow((pow2 * 3 - 2 ) / 22 - p,2 );}
});$.each(baseEasings,function(name,easeIn ) {$.easing["easeIn"+ name ] =easeIn;$.easing["easeOut"+ name ] =function(p ) {return 1 - easeIn(1 - p );};$.easing["easeInOut"+ name ] =function(p ) {return p < 0.5 ?easeIn(p * 2 ) / 2 :1 - easeIn(p * -2 + 2 ) / 2;};});})();})(jQuery));(function($,undefined ) {var rvertical =/up|down|vertical/,
rpositivemotion =/up|left|vertical|horizontal/;

$.effects.effect.blind =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","height","width"],mode =$.effects.setMode(el,o.mode ||"hide"),direction =o.direction ||"up",vertical =rvertical.test(direction ),ref =vertical ?"height":"width",ref2 =vertical ?"top":"left",motion =rpositivemotion.test(direction ),animation ={},show =mode ==="show",wrapper,distance,margin;if (el.parent().is(".ui-effects-wrapper") ) {$.effects.save(el.parent(),props );} else {$.effects.save(el,props );}
el.show();wrapper =$.effects.createWrapper(el ).css({overflow:"hidden"});distance =wrapper[ref ]();margin =parseFloat(wrapper.css(ref2 ) ) ||0;animation[ref ] =show ?distance :0;if (!motion ) {el
.css(vertical ?"bottom":"right",0 )
.css(vertical ?"top":"left","auto")
.css({position:"absolute"});animation[ref2 ] =show ?margin :distance + margin;}
if (show ) {wrapper.css(ref,0 );if (!motion ) {wrapper.css(ref2,margin + distance );}
}
wrapper.animate(animation,{duration:o.duration,easing:o.easing,queue:false,complete:function() {if (mode ==="hide") {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();}
});};})(jQuery);(function($,undefined ) {$.effects.effect.bounce =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","height","width"],mode =$.effects.setMode(el,o.mode ||"effect"),hide =mode ==="hide",show =mode ==="show",direction =o.direction ||"up",distance =o.distance,times =o.times ||5,anims =times * 2 + (show ||hide ?1 :0 ),speed =o.duration / anims,easing =o.easing,ref =(direction ==="up"||direction ==="down") ?"top":"left",motion =(direction ==="up"||direction ==="left"),i,upAnim,downAnim,queue =el.queue(),queuelen =queue.length;if (show ||hide ) {props.push("opacity");}
$.effects.save(el,props );el.show();$.effects.createWrapper(el );if (!distance ) {distance =el[ref ==="top"?"outerHeight":"outerWidth"]() / 3;}
if (show ) {downAnim ={opacity:1 };downAnim[ref ] =0;el.css("opacity",0 )
.css(ref,motion ?-distance * 2 :distance * 2 )
.animate(downAnim,speed,easing );}
if (hide ) {distance =distance / Math.pow(2,times - 1 );}
downAnim ={};downAnim[ref ] =0;for (i =0;i < times;i++ ) {upAnim ={};upAnim[ref ] =(motion ?"-=":"+=") + distance;el.animate(upAnim,speed,easing )
.animate(downAnim,speed,easing );distance =hide ?distance * 2 :distance / 2;}
if (hide ) {upAnim ={opacity:0 };upAnim[ref ] =(motion ?"-=":"+=") + distance;el.animate(upAnim,speed,easing );}
el.queue(function() {if (hide ) {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();});if (queuelen > 1) {queue.splice.apply(queue,[1,0 ].concat(queue.splice(queuelen,anims + 1 ) ) );}
el.dequeue();};})(jQuery);(function($,undefined ) {$.effects.effect.clip =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","height","width"],mode =$.effects.setMode(el,o.mode ||"hide"),show =mode ==="show",direction =o.direction ||"vertical",vert =direction ==="vertical",size =vert ?"height":"width",position =vert ?"top":"left",animation ={},wrapper,animate,distance;$.effects.save(el,props );el.show();wrapper =$.effects.createWrapper(el ).css({overflow:"hidden"});animate =(el[0].tagName ==="IMG") ?wrapper :el;distance =animate[size ]();if (show ) {animate.css(size,0 );animate.css(position,distance / 2 );}
animation[size ] =show ?distance :0;animation[position ] =show ?0 :distance / 2;animate.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function() {if (!show ) {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();}
});};})(jQuery);(function($,undefined ) {$.effects.effect.drop =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","opacity","height","width"],mode =$.effects.setMode(el,o.mode ||"hide"),show =mode ==="show",direction =o.direction ||"left",ref =(direction ==="up"||direction ==="down") ?"top":"left",motion =(direction ==="up"||direction ==="left") ?"pos":"neg",animation ={opacity:show ?1 :0
},distance;$.effects.save(el,props );el.show();$.effects.createWrapper(el );distance =o.distance ||el[ref ==="top"?"outerHeight":"outerWidth"](true ) / 2;if (show ) {el
.css("opacity",0 )
.css(ref,motion ==="pos"?-distance :distance );}
animation[ref ] =(show ?(motion ==="pos"?"+=":"-=") :(motion ==="pos"?"-=":"+=") ) +
distance;el.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function() {if (mode ==="hide") {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();}
});};})(jQuery);(function($,undefined ) {$.effects.effect.explode =function(o,done ) {var rows =o.pieces ?Math.round(Math.sqrt(o.pieces ) ) :3,cells =rows,el =$(this ),mode =$.effects.setMode(el,o.mode ||"hide"),show =mode ==="show",offset =el.show().css("visibility","hidden").offset(),width =Math.ceil(el.outerWidth() / cells ),height =Math.ceil(el.outerHeight() / rows ),pieces =[],i,j,left,top,mx,my;function childComplete() {pieces.push(this );if (pieces.length ===rows * cells ) {animComplete();}
}
for(i =0;i < rows ;i++ ) {top =offset.top + i * height;my =i - (rows - 1 ) / 2 ;for(j =0;j < cells ;j++ ) {left =offset.left + j * width;mx =j - (cells - 1 ) / 2 ;el
.clone()
.appendTo("body")
.wrap("<div></div>")
.css({position:"absolute",visibility:"visible",left:-j * width,top:-i * height
})
.parent()
.addClass("ui-effects-explode")
.css({position:"absolute",overflow:"hidden",width:width,height:height,left:left + (show ?mx * width :0 ),top:top + (show ?my * height :0 ),opacity:show ?0 :1
}).animate({left:left + (show ?0 :mx * width ),top:top + (show ?0 :my * height ),opacity:show ?1 :0
},o.duration ||500,o.easing,childComplete );}
}
function animComplete() {el.css({visibility:"visible"});$(pieces ).remove();if (!show ) {el.hide();}
done();}
};})(jQuery);(function($,undefined ) {$.effects.effect.fade =function(o,done ) {var el =$(this ),mode =$.effects.setMode(el,o.mode ||"toggle");el.animate({opacity:mode
},{queue:false,duration:o.duration,easing:o.easing,complete:done
});};})(jQuery );(function($,undefined ) {$.effects.effect.fold =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","height","width"],mode =$.effects.setMode(el,o.mode ||"hide"),show =mode ==="show",hide =mode ==="hide",size =o.size ||15,percent =/([0-9]+)%/.exec( size ),
horizFirst =!!o.horizFirst,widthFirst =show !==horizFirst,ref =widthFirst ?["width","height"] :["height","width"],duration =o.duration / 2,wrapper,distance,animation1 ={},animation2 ={};$.effects.save(el,props );el.show();wrapper =$.effects.createWrapper(el ).css({overflow:"hidden"});distance =widthFirst ?[wrapper.width(),wrapper.height() ] :[wrapper.height(),wrapper.width() ];if (percent ) {size =parseInt(percent[1 ],10 ) / 100 * distance[hide ?0 :1 ];}
if (show ) {wrapper.css(horizFirst ?{height:0,width:size
} :{height:size,width:0
});}
animation1[ref[0 ] ] =show ?distance[0 ] :size;animation2[ref[1 ] ] =show ?distance[1 ] :0;wrapper
.animate(animation1,duration,o.easing )
.animate(animation2,duration,o.easing,function() {if (hide ) {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();});};})(jQuery);(function($,undefined ) {$.effects.effect.highlight =function(o,done ) {var elem =$(this ),props =["backgroundImage","backgroundColor","opacity"],mode =$.effects.setMode(elem,o.mode ||"show"),animation ={backgroundColor:elem.css("backgroundColor")
};if (mode ==="hide") {animation.opacity =0;}
$.effects.save(elem,props );elem
.show()
.css({backgroundImage:"none",backgroundColor:o.color ||"#ffff99"})
.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function() {if (mode ==="hide") {elem.hide();}
$.effects.restore(elem,props );done();}
});};})(jQuery);(function($,undefined ) {$.effects.effect.pulsate =function(o,done ) {var elem =$(this ),mode =$.effects.setMode(elem,o.mode ||"show"),show =mode ==="show",hide =mode ==="hide",showhide =(show ||mode ==="hide"),anims =((o.times ||5 ) * 2 ) + (showhide ?1 :0 ),duration =o.duration / anims,animateTo =0,queue =elem.queue(),queuelen =queue.length,i;if (show ||!elem.is(":visible")) {elem.css("opacity",0 ).show();animateTo =1;}
for (i =1;i < anims;i++ ) {elem.animate({opacity:animateTo
},duration,o.easing );animateTo =1 - animateTo;}
elem.animate({opacity:animateTo
},duration,o.easing);elem.queue(function() {if (hide ) {elem.hide();}
done();});if (queuelen > 1 ) {queue.splice.apply(queue,[1,0 ].concat(queue.splice(queuelen,anims + 1 ) ) );}
elem.dequeue();};})(jQuery);(function($,undefined ) {$.effects.effect.puff =function(o,done ) {var elem =$(this ),mode =$.effects.setMode(elem,o.mode ||"hide"),hide =mode ==="hide",percent =parseInt(o.percent,10 ) ||150,factor =percent / 100,original ={height:elem.height(),width:elem.width(),outerHeight:elem.outerHeight(),outerWidth:elem.outerWidth()
};$.extend(o,{effect:"scale",queue:false,fade:true,mode:mode,complete:done,percent:hide ?percent :100,from:hide ?original :{height:original.height * factor,width:original.width * factor,outerHeight:original.outerHeight * factor,outerWidth:original.outerWidth * factor
}
});elem.effect(o );};$.effects.effect.scale =function(o,done ) {var el =$(this ),options =$.extend(true,{},o ),mode =$.effects.setMode(el,o.mode ||"effect"),percent =parseInt(o.percent,10 ) ||(parseInt(o.percent,10 ) ===0 ?0 :(mode ==="hide"?0 :100 ) ),direction =o.direction ||"both",origin =o.origin,original ={height:el.height(),width:el.width(),outerHeight:el.outerHeight(),outerWidth:el.outerWidth()
},factor ={y:direction !=="horizontal"?(percent / 100) :1,x:direction !=="vertical"?(percent / 100) :1
};options.effect ="size";options.queue =false;options.complete =done;if (mode !=="effect") {options.origin =origin ||["middle","center"];options.restore =true;}
options.from =o.from ||(mode ==="show"?{height:0,width:0,outerHeight:0,outerWidth:0
} :original );options.to ={height:original.height * factor.y,width:original.width * factor.x,outerHeight:original.outerHeight * factor.y,outerWidth:original.outerWidth * factor.x
};if (options.fade ) {if (mode ==="show") {options.from.opacity =0;options.to.opacity =1;}
if (mode ==="hide") {options.from.opacity =1;options.to.opacity =0;}
}
el.effect(options );};$.effects.effect.size =function(o,done ) {var original,baseline,factor,el =$(this ),props0 =["position","top","bottom","left","right","width","height","overflow","opacity"],props1 =["position","top","bottom","left","right","overflow","opacity"],props2 =["width","height","overflow"],cProps =["fontSize"],vProps =["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],hProps =["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],mode =$.effects.setMode(el,o.mode ||"effect"),restore =o.restore ||mode !=="effect",scale =o.scale ||"both",origin =o.origin ||["middle","center"],position =el.css("position"),props =restore ?props0 :props1,zero ={height:0,width:0,outerHeight:0,outerWidth:0
};if (mode ==="show") {el.show();}
original ={height:el.height(),width:el.width(),outerHeight:el.outerHeight(),outerWidth:el.outerWidth()
};if (o.mode ==="toggle"&&mode ==="show") {el.from =o.to ||zero;el.to =o.from ||original;} else {el.from =o.from ||(mode ==="show"?zero :original );el.to =o.to ||(mode ==="hide"?zero :original );}
factor ={from:{y:el.from.height / original.height,x:el.from.width / original.width
},to:{y:el.to.height / original.height,x:el.to.width / original.width
}
};if (scale ==="box"||scale ==="both") {if (factor.from.y !==factor.to.y ) {props =props.concat(vProps );el.from =$.effects.setTransition(el,vProps,factor.from.y,el.from );el.to =$.effects.setTransition(el,vProps,factor.to.y,el.to );}
if (factor.from.x !==factor.to.x ) {props =props.concat(hProps );el.from =$.effects.setTransition(el,hProps,factor.from.x,el.from );el.to =$.effects.setTransition(el,hProps,factor.to.x,el.to );}
}
if (scale ==="content"||scale ==="both") {if (factor.from.y !==factor.to.y ) {props =props.concat(cProps ).concat(props2 );el.from =$.effects.setTransition(el,cProps,factor.from.y,el.from );el.to =$.effects.setTransition(el,cProps,factor.to.y,el.to );}
}
$.effects.save(el,props );el.show();$.effects.createWrapper(el );el.css("overflow","hidden").css(el.from );if (origin) {baseline =$.effects.getBaseline(origin,original );el.from.top =(original.outerHeight - el.outerHeight() ) * baseline.y;el.from.left =(original.outerWidth - el.outerWidth() ) * baseline.x;el.to.top =(original.outerHeight - el.to.outerHeight ) * baseline.y;el.to.left =(original.outerWidth - el.to.outerWidth ) * baseline.x;}
el.css(el.from );if (scale ==="content"||scale ==="both") {vProps =vProps.concat(["marginTop","marginBottom"]).concat(cProps);hProps =hProps.concat(["marginLeft","marginRight"]);props2 =props0.concat(vProps).concat(hProps);el.find("*[width]").each(function(){var child =$(this ),c_original ={height:child.height(),width:child.width(),outerHeight:child.outerHeight(),outerWidth:child.outerWidth()
};if (restore) {$.effects.save(child,props2);}
child.from ={height:c_original.height * factor.from.y,width:c_original.width * factor.from.x,outerHeight:c_original.outerHeight * factor.from.y,outerWidth:c_original.outerWidth * factor.from.x
};child.to ={height:c_original.height * factor.to.y,width:c_original.width * factor.to.x,outerHeight:c_original.height * factor.to.y,outerWidth:c_original.width * factor.to.x
};if (factor.from.y !==factor.to.y ) {child.from =$.effects.setTransition(child,vProps,factor.from.y,child.from );child.to =$.effects.setTransition(child,vProps,factor.to.y,child.to );}
if (factor.from.x !==factor.to.x ) {child.from =$.effects.setTransition(child,hProps,factor.from.x,child.from );child.to =$.effects.setTransition(child,hProps,factor.to.x,child.to );}
child.css(child.from );child.animate(child.to,o.duration,o.easing,function() {if (restore ) {$.effects.restore(child,props2 );}
});});}
el.animate(el.to,{queue:false,duration:o.duration,easing:o.easing,complete:function() {if (el.to.opacity ===0 ) {el.css("opacity",el.from.opacity );}
if(mode ==="hide") {el.hide();}
$.effects.restore(el,props );if (!restore ) {if (position ==="static") {el.css({position:"relative",top:el.to.top,left:el.to.left
});} else {$.each(["top","left"],function(idx,pos ) {el.css(pos,function(_,str ) {var val =parseInt(str,10 ),toRef =idx ?el.to.left :el.to.top;if (str ==="auto") {return toRef + "px";}
return val + toRef + "px";});});}
}
$.effects.removeWrapper(el );done();}
});};})(jQuery);(function($,undefined ) {$.effects.effect.shake =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","height","width"],mode =$.effects.setMode(el,o.mode ||"effect"),direction =o.direction ||"left",distance =o.distance ||20,times =o.times ||3,anims =times * 2 + 1,speed =Math.round(o.duration/anims),ref =(direction ==="up"||direction ==="down") ?"top":"left",positiveMotion =(direction ==="up"||direction ==="left"),animation ={},animation1 ={},animation2 ={},i,queue =el.queue(),queuelen =queue.length;$.effects.save(el,props );el.show();$.effects.createWrapper(el );animation[ref ] =(positiveMotion ?"-=":"+=") + distance;animation1[ref ] =(positiveMotion ?"+=":"-=") + distance * 2;animation2[ref ] =(positiveMotion ?"-=":"+=") + distance * 2;el.animate(animation,speed,o.easing );for (i =1;i < times;i++ ) {el.animate(animation1,speed,o.easing ).animate(animation2,speed,o.easing );}
el
.animate(animation1,speed,o.easing )
.animate(animation,speed / 2,o.easing )
.queue(function() {if (mode ==="hide") {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();});if (queuelen > 1) {queue.splice.apply(queue,[1,0 ].concat(queue.splice(queuelen,anims + 1 ) ) );}
el.dequeue();};})(jQuery);(function($,undefined ) {$.effects.effect.slide =function(o,done ) {var el =$(this ),props =["position","top","bottom","left","right","width","height"],mode =$.effects.setMode(el,o.mode ||"show"),show =mode ==="show",direction =o.direction ||"left",ref =(direction ==="up"||direction ==="down") ?"top":"left",positiveMotion =(direction ==="up"||direction ==="left"),distance,animation ={};$.effects.save(el,props );el.show();distance =o.distance ||el[ref ==="top"?"outerHeight":"outerWidth"](true );$.effects.createWrapper(el ).css({overflow:"hidden"});if (show ) {el.css(ref,positiveMotion ?(isNaN(distance) ?"-"+ distance :-distance) :distance );}
animation[ref ] =(show ?(positiveMotion ?"+=":"-=") :(positiveMotion ?"-=":"+=")) +
distance;el.animate(animation,{queue:false,duration:o.duration,easing:o.easing,complete:function() {if (mode ==="hide") {el.hide();}
$.effects.restore(el,props );$.effects.removeWrapper(el );done();}
});};})(jQuery);(function($,undefined ) {$.effects.effect.transfer =function(o,done ) {var elem =$(this ),target =$(o.to ),targetFixed =target.css("position") ==="fixed",body =$("body"),fixTop =targetFixed ?body.scrollTop() :0,fixLeft =targetFixed ?body.scrollLeft() :0,endPosition =target.offset(),animation ={top:endPosition.top - fixTop ,left:endPosition.left - fixLeft ,height:target.innerHeight(),width:target.innerWidth()
},startPosition =elem.offset(),transfer =$('<div class="ui-effects-transfer"></div>')
.appendTo(document.body )
.addClass(o.className )
.css({top:startPosition.top - fixTop ,left:startPosition.left - fixLeft ,height:elem.innerHeight(),width:elem.innerWidth(),position:targetFixed ?"fixed":"absolute"})
.animate(animation,o.duration,o.easing,function() {transfer.remove();done();});};})(jQuery);(function($,undefined ) {var mouseHandled =false;$.widget("ui.menu",{version:"1.9.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null
},_create:function() {this.activeMenu =this.element;this.element
.uniqueId()
.addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length )
.attr({role:this.options.role,tabIndex:0
})
.bind("click"+ this.eventNamespace,$.proxy(function(event ) {if (this.options.disabled ) {event.preventDefault();}
},this ));if (this.options.disabled ) {this.element
.addClass("ui-state-disabled")
.attr("aria-disabled","true");}
this._on({"mousedown .ui-menu-item > a":function(event ) {event.preventDefault();},"click .ui-state-disabled > a":function(event ) {event.preventDefault();},"click .ui-menu-item:has(a)":function(event ) {var target =$(event.target ).closest(".ui-menu-item");if (!mouseHandled &&target.not(".ui-state-disabled").length ) {mouseHandled =true;this.select(event );if (target.has(".ui-menu").length ) {this.expand(event );} else if (!this.element.is(":focus") ) {this.element.trigger("focus",[true ] );if (this.active &&this.active.parents(".ui-menu").length ===1 ) {clearTimeout(this.timer );}
}
}
},"mouseenter .ui-menu-item":function(event ) {var target =$(event.currentTarget );target.siblings().children(".ui-state-active").removeClass("ui-state-active");this.focus(event,target );},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(event,keepActiveItem ) {var item =this.active ||this.element.children(".ui-menu-item").eq(0 );if (!keepActiveItem ) {this.focus(event,item );}
},blur:function(event ) {this._delay(function() {if (!$.contains(this.element[0],this.document[0].activeElement ) ) {this.collapseAll(event );}
});},keydown:"_keydown"});this.refresh();this._on(this.document,{click:function(event ) {if (!$(event.target ).closest(".ui-menu").length ) {this.collapseAll(event );}
mouseHandled =false;}
});},_destroy:function() {this.element
.removeAttr("aria-activedescendant")
.find(".ui-menu").andSelf()
.removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons")
.removeAttr("role")
.removeAttr("tabIndex")
.removeAttr("aria-labelledby")
.removeAttr("aria-expanded")
.removeAttr("aria-hidden")
.removeAttr("aria-disabled")
.removeUniqueId()
.show();this.element.find(".ui-menu-item")
.removeClass("ui-menu-item")
.removeAttr("role")
.removeAttr("aria-disabled")
.children("a")
.removeUniqueId()
.removeClass("ui-corner-all ui-state-hover")
.removeAttr("tabIndex")
.removeAttr("role")
.removeAttr("aria-haspopup")
.children().each(function() {var elem =$(this );if (elem.data("ui-menu-submenu-carat") ) {elem.remove();}
});this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");},_keydown:function(event ) {var match,prev,character,skip,regex,preventDefault =true;function escape(value ) {return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
}
switch (event.keyCode ) {case $.ui.keyCode.PAGE_UP:this.previousPage(event );break;case $.ui.keyCode.PAGE_DOWN:this.nextPage(event );break;case $.ui.keyCode.HOME:this._move("first","first",event );break;case $.ui.keyCode.END:this._move("last","last",event );break;case $.ui.keyCode.UP:this.previous(event );break;case $.ui.keyCode.DOWN:this.next(event );break;case $.ui.keyCode.LEFT:this.collapse(event );break;case $.ui.keyCode.RIGHT:if (this.active &&!this.active.is(".ui-state-disabled") ) {this.expand(event );}
break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(event );break;case $.ui.keyCode.ESCAPE:this.collapse(event );break;default:preventDefault =false;prev =this.previousFilter ||"";character =String.fromCharCode(event.keyCode );skip =false;clearTimeout(this.filterTimer );if (character ===prev ) {skip =true;} else {character =prev + character;}
regex =new RegExp("^"+ escape(character ),"i");match =this.activeMenu.children(".ui-menu-item").filter(function() {return regex.test($(this ).children("a").text() );});match =skip &&match.index(this.active.next() ) !==-1 ?this.active.nextAll(".ui-menu-item") :match;if (!match.length ) {character =String.fromCharCode(event.keyCode );regex =new RegExp("^"+ escape(character ),"i");match =this.activeMenu.children(".ui-menu-item").filter(function() {return regex.test($(this ).children("a").text() );});}
if (match.length ) {this.focus(event,match );if (match.length > 1 ) {this.previousFilter =character;this.filterTimer =this._delay(function() {delete this.previousFilter;},1000 );} else {delete this.previousFilter;}
} else {delete this.previousFilter;}
}
if (preventDefault ) {event.preventDefault();}
},_activate:function(event ) {if (!this.active.is(".ui-state-disabled") ) {if (this.active.children("a[aria-haspopup='true']").length ) {this.expand(event );} else {this.select(event );}
}
},refresh:function() {var menus,icon =this.options.icons.submenu,submenus =this.element.find(this.options.menus );submenus.filter(":not(.ui-menu)")
.addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
.hide()
.attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"})
.each(function() {var menu =$(this ),item =menu.prev("a"),submenuCarat =$("<span>")
.addClass("ui-menu-icon ui-icon "+ icon )
.data("ui-menu-submenu-carat",true );item
.attr("aria-haspopup","true")
.prepend(submenuCarat );menu.attr("aria-labelledby",item.attr("id") );});menus =submenus.add(this.element );menus.children(":not(.ui-menu-item):has(a)")
.addClass("ui-menu-item")
.attr("role","presentation")
.children("a")
.uniqueId()
.addClass("ui-corner-all")
.attr({tabIndex:-1,role:this._itemRole()
});menus.children(":not(.ui-menu-item)").each(function() {var item =$(this );if (!/[^\-—–\s]/.test( item.text() ) ) {
item.addClass("ui-widget-content ui-menu-divider");}
});menus.children(".ui-state-disabled").attr("aria-disabled","true");if (this.active &&!$.contains(this.element[0 ],this.active[0 ] ) ) {this.blur();}
},_itemRole:function() {return {menu:"menuitem",listbox:"option"}[this.options.role ];},focus:function(event,item ) {var nested,focused;this.blur(event,event &&event.type ==="focus");this._scrollIntoView(item );this.active =item.first();focused =this.active.children("a").addClass("ui-state-focus");if (this.options.role ) {this.element.attr("aria-activedescendant",focused.attr("id") );}
this.active
.parent()
.closest(".ui-menu-item")
.children("a:first")
.addClass("ui-state-active");if (event &&event.type ==="keydown") {this._close();} else {this.timer =this._delay(function() {this._close();},this.delay );}
nested =item.children(".ui-menu");if (nested.length &&(/^mouse/.test( event.type ) ) ) {
this._startOpening(nested);}
this.activeMenu =item.parent();this._trigger("focus",event,{item:item } );},_scrollIntoView:function(item ) {var borderTop,paddingTop,offset,scroll,elementHeight,itemHeight;if (this._hasScroll() ) {borderTop =parseFloat($.css(this.activeMenu[0],"borderTopWidth") ) ||0;paddingTop =parseFloat($.css(this.activeMenu[0],"paddingTop") ) ||0;offset =item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;scroll =this.activeMenu.scrollTop();elementHeight =this.activeMenu.height();itemHeight =item.height();if (offset < 0 ) {this.activeMenu.scrollTop(scroll + offset );} else if (offset + itemHeight > elementHeight ) {this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight );}
}
},blur:function(event,fromFocus ) {if (!fromFocus ) {clearTimeout(this.timer );}
if (!this.active ) {return;}
this.active.children("a").removeClass("ui-state-focus");this.active =null;this._trigger("blur",event,{item:this.active } );},_startOpening:function(submenu ) {clearTimeout(this.timer );if (submenu.attr("aria-hidden") !=="true") {return;}
this.timer =this._delay(function() {this._close();this._open(submenu );},this.delay );},_open:function(submenu ) {var position =$.extend({of:this.active
},this.options.position );clearTimeout(this.timer );this.element.find(".ui-menu").not(submenu.parents(".ui-menu") )
.hide()
.attr("aria-hidden","true");submenu
.show()
.removeAttr("aria-hidden")
.attr("aria-expanded","true")
.position(position );},collapseAll:function(event,all ) {clearTimeout(this.timer );this.timer =this._delay(function() {var currentMenu =all ?this.element :$(event &&event.target ).closest(this.element.find(".ui-menu") );if (!currentMenu.length ) {currentMenu =this.element;}
this._close(currentMenu );this.blur(event );this.activeMenu =currentMenu;},this.delay );},_close:function(startMenu ) {if (!startMenu ) {startMenu =this.active ?this.active.parent() :this.element;}
startMenu
.find(".ui-menu")
.hide()
.attr("aria-hidden","true")
.attr("aria-expanded","false")
.end()
.find("a.ui-state-active")
.removeClass("ui-state-active");},collapse:function(event ) {var newItem =this.active &&this.active.parent().closest(".ui-menu-item",this.element );if (newItem &&newItem.length ) {this._close();this.focus(event,newItem );}
},expand:function(event ) {var newItem =this.active &&this.active
.children(".ui-menu ")
.children(".ui-menu-item")
.first();if (newItem &&newItem.length ) {this._open(newItem.parent() );this._delay(function() {this.focus(event,newItem );});}
},next:function(event ) {this._move("next","first",event );},previous:function(event ) {this._move("prev","last",event );},isFirstItem:function() {return this.active &&!this.active.prevAll(".ui-menu-item").length;},isLastItem:function() {return this.active &&!this.active.nextAll(".ui-menu-item").length;},_move:function(direction,filter,event ) {var next;if (this.active ) {if (direction ==="first"||direction ==="last") {next =this.active
[direction ==="first"?"prevAll":"nextAll"](".ui-menu-item")
.eq(-1 );} else {next =this.active
[direction + "All"](".ui-menu-item")
.eq(0 );}
}
if (!next ||!next.length ||!this.active ) {next =this.activeMenu.children(".ui-menu-item")[filter ]();}
this.focus(event,next );},nextPage:function(event ) {var item,base,height;if (!this.active ) {this.next(event );return;}
if (this.isLastItem() ) {return;}
if (this._hasScroll() ) {base =this.active.offset().top;height =this.element.height();this.active.nextAll(".ui-menu-item").each(function() {item =$(this );return item.offset().top - base - height < 0;});this.focus(event,item );} else {this.focus(event,this.activeMenu.children(".ui-menu-item")
[!this.active ?"first":"last"]() );}
},previousPage:function(event ) {var item,base,height;if (!this.active ) {this.next(event );return;}
if (this.isFirstItem() ) {return;}
if (this._hasScroll() ) {base =this.active.offset().top;height =this.element.height();this.active.prevAll(".ui-menu-item").each(function() {item =$(this );return item.offset().top - base + height > 0;});this.focus(event,item );} else {this.focus(event,this.activeMenu.children(".ui-menu-item").first() );}
},_hasScroll:function() {return this.element.outerHeight() < this.element.prop("scrollHeight");},select:function(event ) {this.active =this.active ||$(event.target ).closest(".ui-menu-item");var ui ={item:this.active };if (!this.active.has(".ui-menu").length ) {this.collapseAll(event,true );}
this._trigger("select",event,ui );}
});}(jQuery ));(function($,undefined ) {$.widget("ui.progressbar",{version:"1.9.2",options:{value:0,max:100
},min:0,_create:function() {this.element
.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all")
.attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()
});this.valueDiv =$("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>")
.appendTo(this.element );this.oldValue =this._value();this._refreshValue();},_destroy:function() {this.element
.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all")
.removeAttr("role")
.removeAttr("aria-valuemin")
.removeAttr("aria-valuemax")
.removeAttr("aria-valuenow");this.valueDiv.remove();},value:function(newValue ) {if (newValue ===undefined ) {return this._value();}
this._setOption("value",newValue );return this;},_setOption:function(key,value ) {if (key ==="value") {this.options.value =value;this._refreshValue();if (this._value() ===this.options.max ) {this._trigger("complete");}
}
this._super(key,value );},_value:function() {var val =this.options.value;if (typeof val !=="number") {val =0;}
return Math.min(this.options.max,Math.max(this.min,val ) );},_percentage:function() {return 100 * this._value() / this.options.max;},_refreshValue:function() {var value =this.value(),percentage =this._percentage();if (this.oldValue !==value ) {this.oldValue =value;this._trigger("change");}
this.valueDiv
.toggle(value > this.min )
.toggleClass("ui-corner-right",value ===this.options.max )
.width(percentage.toFixed(0) + "%");this.element.attr("aria-valuenow",value );}
});})(jQuery );(function($,undefined ) {$.widget("ui.resizable",$.ui.mouse,{version:"1.9.2",widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000
},_create:function() {var that =this,o =this.options;this.element.addClass("ui-resizable");$.extend(this,{_aspectRatio:!!(o.aspectRatio),aspectRatio:o.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:o.helper ||o.ghost ||o.animate ?o.helper ||'ui-resizable-helper':null
});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {

this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css('position'),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css('top'),left:this.element.css('left')
})
);this.element =this.element.parent().data("resizable",this.element.data('resizable')
);this.elementIsWrapper =true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom") });this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle =this.originalElement.css('resize');this.originalElement.css('resize','none');this._proportionallyResizeElements.push(this.originalElement.css({position:'static',zoom:1,display:'block'}));this.originalElement.css({margin:this.originalElement.css('margin') });this._proportionallyResize();}
this.handles =o.handles ||(!$('.ui-resizable-handle',this.element).length ?"e,s,se":{n:'.ui-resizable-n',e:'.ui-resizable-e',s:'.ui-resizable-s',w:'.ui-resizable-w',se:'.ui-resizable-se',sw:'.ui-resizable-sw',ne:'.ui-resizable-ne',nw:'.ui-resizable-nw'});if(this.handles.constructor ==String) {if(this.handles =='all') this.handles ='n,e,s,w,se,sw,ne,nw';var n =this.handles.split(",");this.handles ={};for(var i =0;i < n.length;i++) {var handle =$.trim(n[i]),hname ='ui-resizable-'+handle;var axis =$('<div class="ui-resizable-handle '+ hname + '"></div>');axis.css({zIndex:o.zIndex });if ('se'==handle) {axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');};this.handles[handle] ='.ui-resizable-'+handle;this.element.append(axis);}
}
this._renderAxis =function(target) {target =target ||this.element;for(var i in this.handles) {if(this.handles[i].constructor ==String)
this.handles[i] =$(this.handles[i],this.element).show();if (this.elementIsWrapper &&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {

var axis =$(this.handles[i],this.element),padWrapper =0;padWrapper =/sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

var padPos =['padding',/ne|nw|n/.test(i) ? 'Top' :
/se|sw|s/.test(i) ? 'Bottom' :
/^e$/.test(i) ? 'Right' : 'Left' ].join("");

target.css(padPos,padWrapper);this._proportionallyResize();}
if(!$(this.handles[i]).length)
continue;}
};this._renderAxis(this.element);this._handles =$('.ui-resizable-handle',this.element)
.disableSelection();this._handles.mouseover(function() {if (!that.resizing) {if (this.className)
var axis =this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
that.axis =axis &&axis[1] ?axis[1] :'se';}
});if (o.autoHide) {this._handles.hide();$(this.element)
.addClass("ui-resizable-autohide")
.mouseenter(function() {if (o.disabled) return;$(this).removeClass("ui-resizable-autohide");that._handles.show();})
.mouseleave(function(){if (o.disabled) return;if (!that.resizing) {$(this).addClass("ui-resizable-autohide");that._handles.hide();}
});}
this._mouseInit();},_destroy:function() {this._mouseDestroy();var _destroy =function(exp) {$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
.removeData("resizable").removeData("ui-resizable").unbind(".resizable").find('.ui-resizable-handle').remove();};if (this.elementIsWrapper) {_destroy(this.element);var wrapper =this.element;this.originalElement.css({position:wrapper.css('position'),width:wrapper.outerWidth(),height:wrapper.outerHeight(),top:wrapper.css('top'),left:wrapper.css('left')
}).insertAfter(wrapper );wrapper.remove();}
this.originalElement.css('resize',this.originalResizeStyle);_destroy(this.originalElement);return this;},_mouseCapture:function(event) {var handle =false;for (var i in this.handles) {if ($(this.handles[i])[0] ==event.target) {handle =true;}
}
return !this.options.disabled &&handle;},_mouseStart:function(event) {var o =this.options,iniPos =this.element.position(),el =this.element;this.resizing =true;this.documentScroll ={top:$(document).scrollTop(),left:$(document).scrollLeft() };if (el.is('.ui-draggable') ||(/absolute/).test(el.css('position'))) {
el.css({position:'absolute',top:iniPos.top,left:iniPos.left });}
this._renderProxy();var curleft =num(this.helper.css('left')),curtop =num(this.helper.css('top'));if (o.containment) {curleft +=$(o.containment).scrollLeft() ||0;curtop +=$(o.containment).scrollTop() ||0;}
this.offset =this.helper.offset();this.position ={left:curleft,top:curtop };this.size =this._helper ?{width:el.outerWidth(),height:el.outerHeight() } :{width:el.width(),height:el.height() };this.originalSize =this._helper ?{width:el.outerWidth(),height:el.outerHeight() } :{width:el.width(),height:el.height() };this.originalPosition ={left:curleft,top:curtop };this.sizeDiff ={width:el.outerWidth() - el.width(),height:el.outerHeight() - el.height() };this.originalMousePosition ={left:event.pageX,top:event.pageY };this.aspectRatio =(typeof o.aspectRatio =='number') ?o.aspectRatio :((this.originalSize.width / this.originalSize.height) ||1);var cursor =$('.ui-resizable-'+ this.axis).css('cursor');$('body').css('cursor',cursor =='auto'?this.axis + '-resize':cursor);el.addClass("ui-resizable-resizing");this._propagate("start",event);return true;},_mouseDrag:function(event) {var el =this.helper,o =this.options,props ={},that =this,smp =this.originalMousePosition,a =this.axis;var dx =(event.pageX-smp.left)||0,dy =(event.pageY-smp.top)||0;var trigger =this._change[a];if (!trigger) return false;var data =trigger.apply(this,[event,dx,dy]);this._updateVirtualBoundaries(event.shiftKey);if (this._aspectRatio ||event.shiftKey)
data =this._updateRatio(data,event);data =this._respectSize(data,event);this._propagate("resize",event);el.css({top:this.position.top + "px",left:this.position.left + "px",width:this.size.width + "px",height:this.size.height + "px"});if (!this._helper &&this._proportionallyResizeElements.length)
this._proportionallyResize();this._updateCache(data);this._trigger('resize',event,this.ui());return false;},_mouseStop:function(event) {this.resizing =false;var o =this.options,that =this;if(this._helper) {var pr =this._proportionallyResizeElements,ista =pr.length &&(/textarea/i).test(pr[0].nodeName),
soffseth =ista &&$.ui.hasScroll(pr[0],'left') ?0 :that.sizeDiff.height,soffsetw =ista ?0 :that.sizeDiff.width;var s ={width:(that.helper.width() - soffsetw),height:(that.helper.height() - soffseth) },left =(parseInt(that.element.css('left'),10) + (that.position.left - that.originalPosition.left)) ||null,top =(parseInt(that.element.css('top'),10) + (that.position.top - that.originalPosition.top)) ||null;if (!o.animate)
this.element.css($.extend(s,{top:top,left:left }));that.helper.height(that.size.height);that.helper.width(that.size.width);if (this._helper &&!o.animate) this._proportionallyResize();}
$('body').css('cursor','auto');this.element.removeClass("ui-resizable-resizing");this._propagate("stop",event);if (this._helper) this.helper.remove();return false;},_updateVirtualBoundaries:function(forceAspectRatio) {var o =this.options,pMinWidth,pMaxWidth,pMinHeight,pMaxHeight,b;b ={minWidth:isNumber(o.minWidth) ?o.minWidth :0,maxWidth:isNumber(o.maxWidth) ?o.maxWidth :Infinity,minHeight:isNumber(o.minHeight) ?o.minHeight :0,maxHeight:isNumber(o.maxHeight) ?o.maxHeight :Infinity
};if(this._aspectRatio ||forceAspectRatio) {pMinWidth =b.minHeight * this.aspectRatio;pMinHeight =b.minWidth / this.aspectRatio;pMaxWidth =b.maxHeight * this.aspectRatio;pMaxHeight =b.maxWidth / this.aspectRatio;if(pMinWidth > b.minWidth) b.minWidth =pMinWidth;if(pMinHeight > b.minHeight) b.minHeight =pMinHeight;if(pMaxWidth < b.maxWidth) b.maxWidth =pMaxWidth;if(pMaxHeight < b.maxHeight) b.maxHeight =pMaxHeight;}
this._vBoundaries =b;},_updateCache:function(data) {var o =this.options;this.offset =this.helper.offset();if (isNumber(data.left)) this.position.left =data.left;if (isNumber(data.top)) this.position.top =data.top;if (isNumber(data.height)) this.size.height =data.height;if (isNumber(data.width)) this.size.width =data.width;},_updateRatio:function(data,event) {var o =this.options,cpos =this.position,csize =this.size,a =this.axis;if (isNumber(data.height)) data.width =(data.height * this.aspectRatio);else if (isNumber(data.width)) data.height =(data.width / this.aspectRatio);if (a =='sw') {data.left =cpos.left + (csize.width - data.width);data.top =null;}
if (a =='nw') {data.top =cpos.top + (csize.height - data.height);data.left =cpos.left + (csize.width - data.width);}
return data;},_respectSize:function(data,event) {var el =this.helper,o =this._vBoundaries,pRatio =this._aspectRatio ||event.shiftKey,a =this.axis,ismaxw =isNumber(data.width) &&o.maxWidth &&(o.maxWidth < data.width),ismaxh =isNumber(data.height) &&o.maxHeight &&(o.maxHeight < data.height),isminw =isNumber(data.width) &&o.minWidth &&(o.minWidth > data.width),isminh =isNumber(data.height) &&o.minHeight &&(o.minHeight > data.height);if (isminw) data.width =o.minWidth;if (isminh) data.height =o.minHeight;if (ismaxw) data.width =o.maxWidth;if (ismaxh) data.height =o.maxHeight;var dw =this.originalPosition.left + this.originalSize.width,dh =this.position.top + this.size.height;var cw =/sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);

if (isminw &&cw) data.left =dw - o.minWidth;if (ismaxw &&cw) data.left =dw - o.maxWidth;if (isminh &&ch)data.top =dh - o.minHeight;if (ismaxh &&ch)data.top =dh - o.maxHeight;var isNotwh =!data.width &&!data.height;if (isNotwh &&!data.left &&data.top) data.top =null;else if (isNotwh &&!data.top &&data.left) data.left =null;return data;},_proportionallyResize:function() {var o =this.options;if (!this._proportionallyResizeElements.length) return;var element =this.helper ||this.element;for (var i=0;i < this._proportionallyResizeElements.length;i++) {var prel =this._proportionallyResizeElements[i];if (!this.borderDif) {var b =[prel.css('borderTopWidth'),prel.css('borderRightWidth'),prel.css('borderBottomWidth'),prel.css('borderLeftWidth')],p =[prel.css('paddingTop'),prel.css('paddingRight'),prel.css('paddingBottom'),prel.css('paddingLeft')];this.borderDif =$.map(b,function(v,i) {var border =parseInt(v,10)||0,padding =parseInt(p[i],10)||0;return border + padding;});}
prel.css({height:(element.height() - this.borderDif[0] - this.borderDif[2]) ||0,width:(element.width() - this.borderDif[1] - this.borderDif[3]) ||0
});};},_renderProxy:function() {var el =this.element,o =this.options;this.elementOffset =el.offset();if(this._helper) {this.helper =this.helper ||$('<div style="overflow:hidden;"></div>');var ie6offset =($.ui.ie6 ?1 :0),pxyoffset =($.ui.ie6 ?2 :-1 );this.helper.addClass(this._helper).css({width:this.element.outerWidth() + pxyoffset,height:this.element.outerHeight() + pxyoffset,position:'absolute',left:this.elementOffset.left - ie6offset +'px',top:this.elementOffset.top - ie6offset +'px',zIndex:++o.zIndex });this.helper
.appendTo("body")
.disableSelection();} else {this.helper =this.element;}
},_change:{e:function(event,dx,dy) {return {width:this.originalSize.width + dx };},w:function(event,dx,dy) {var o =this.options,cs =this.originalSize,sp =this.originalPosition;return {left:sp.left + dx,width:cs.width - dx };},n:function(event,dx,dy) {var o =this.options,cs =this.originalSize,sp =this.originalPosition;return {top:sp.top + dy,height:cs.height - dy };},s:function(event,dx,dy) {return {height:this.originalSize.height + dy };},se:function(event,dx,dy) {return $.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[event,dx,dy]));},sw:function(event,dx,dy) {return $.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[event,dx,dy]));},ne:function(event,dx,dy) {return $.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[event,dx,dy]));},nw:function(event,dx,dy) {return $.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[event,dx,dy]));}
},_propagate:function(n,event) {$.ui.plugin.call(this,n,[event,this.ui()]);(n !="resize"&&this._trigger(n,event,this.ui()));},plugins:{},ui:function() {return {originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition
};}
});$.ui.plugin.add("resizable","alsoResize",{start:function (event,ui) {var that =$(this).data("resizable"),o =that.options;var _store =function (exp) {$(exp).each(function() {var el =$(this);el.data("resizable-alsoresize",{width:parseInt(el.width(),10),height:parseInt(el.height(),10),left:parseInt(el.css('left'),10),top:parseInt(el.css('top'),10)
});});};if (typeof(o.alsoResize) =='object'&&!o.alsoResize.parentNode) {if (o.alsoResize.length) {o.alsoResize =o.alsoResize[0];_store(o.alsoResize);}
else {$.each(o.alsoResize,function (exp) {_store(exp);});}
}else{_store(o.alsoResize);}
},resize:function (event,ui) {var that =$(this).data("resizable"),o =that.options,os =that.originalSize,op =that.originalPosition;var delta ={height:(that.size.height - os.height) ||0,width:(that.size.width - os.width) ||0,top:(that.position.top - op.top) ||0,left:(that.position.left - op.left) ||0
},_alsoResize =function (exp,c) {$(exp).each(function() {var el =$(this),start =$(this).data("resizable-alsoresize"),style ={},css =c &&c.length ?c :el.parents(ui.originalElement[0]).length ?['width','height'] :['width','height','top','left'];$.each(css,function (i,prop) {var sum =(start[prop]||0) + (delta[prop]||0);if (sum &&sum >=0)
style[prop] =sum ||null;});el.css(style);});};if (typeof(o.alsoResize) =='object'&&!o.alsoResize.nodeType) {$.each(o.alsoResize,function (exp,c) {_alsoResize(exp,c);});}else{_alsoResize(o.alsoResize);}
},stop:function (event,ui) {$(this).removeData("resizable-alsoresize");}
});$.ui.plugin.add("resizable","animate",{stop:function(event,ui) {var that =$(this).data("resizable"),o =that.options;var pr =that._proportionallyResizeElements,ista =pr.length &&(/textarea/i).test(pr[0].nodeName),
soffseth =ista &&$.ui.hasScroll(pr[0],'left') ?0 :that.sizeDiff.height,soffsetw =ista ?0 :that.sizeDiff.width;var style ={width:(that.size.width - soffsetw),height:(that.size.height - soffseth) },left =(parseInt(that.element.css('left'),10) + (that.position.left - that.originalPosition.left)) ||null,top =(parseInt(that.element.css('top'),10) + (that.position.top - that.originalPosition.top)) ||null;that.element.animate($.extend(style,top &&left ?{top:top,left:left } :{}),{duration:o.animateDuration,easing:o.animateEasing,step:function() {var data ={width:parseInt(that.element.css('width'),10),height:parseInt(that.element.css('height'),10),top:parseInt(that.element.css('top'),10),left:parseInt(that.element.css('left'),10)
};if (pr &&pr.length) $(pr[0]).css({width:data.width,height:data.height });that._updateCache(data);that._propagate("resize",event);}
}
);}
});$.ui.plugin.add("resizable","containment",{start:function(event,ui) {var that =$(this).data("resizable"),o =that.options,el =that.element;var oc =o.containment,ce =(oc instanceof $) ?oc.get(0) :(/parent/.test(oc)) ? el.parent().get(0) : oc;
if (!ce) return;that.containerElement =$(ce);if (/document/.test(oc) || oc == document) {
that.containerOffset ={left:0,top:0 };that.containerPosition ={left:0,top:0 };that.parentData ={element:$(document),left:0,top:0,width:$(document).width(),height:$(document).height() ||document.body.parentNode.scrollHeight
};}
else {var element =$(ce),p =[];$(["Top","Right","Left","Bottom"]).each(function(i,name) {p[i] =num(element.css("padding"+ name));});that.containerOffset =element.offset();that.containerPosition =element.position();that.containerSize ={height:(element.innerHeight() - p[3]),width:(element.innerWidth() - p[1]) };var co =that.containerOffset,ch =that.containerSize.height,cw =that.containerSize.width,width =($.ui.hasScroll(ce,"left") ?ce.scrollWidth :cw ),height =($.ui.hasScroll(ce) ?ce.scrollHeight :ch);that.parentData ={element:ce,left:co.left,top:co.top,width:width,height:height
};}
},resize:function(event,ui) {var that =$(this).data("resizable"),o =that.options,ps =that.containerSize,co =that.containerOffset,cs =that.size,cp =that.position,pRatio =that._aspectRatio ||event.shiftKey,cop ={top:0,left:0 },ce =that.containerElement;if (ce[0] !=document &&(/static/).test(ce.css('position'))) cop = co;

if (cp.left < (that._helper ?co.left :0)) {that.size.width =that.size.width + (that._helper ?(that.position.left - co.left) :(that.position.left - cop.left));if (pRatio) that.size.height =that.size.width / that.aspectRatio;that.position.left =o.helper ?co.left :0;}
if (cp.top < (that._helper ?co.top :0)) {that.size.height =that.size.height + (that._helper ?(that.position.top - co.top) :that.position.top);if (pRatio) that.size.width =that.size.height * that.aspectRatio;that.position.top =that._helper ?co.top :0;}
that.offset.left =that.parentData.left+that.position.left;that.offset.top =that.parentData.top+that.position.top;var woset =Math.abs((that._helper ?that.offset.left - cop.left :(that.offset.left - cop.left)) + that.sizeDiff.width ),hoset =Math.abs((that._helper ?that.offset.top - cop.top :(that.offset.top - co.top)) + that.sizeDiff.height );var isParent =that.containerElement.get(0) ==that.element.parent().get(0),isOffsetRelative =/relative|absolute/.test(that.containerElement.css('position'));

if(isParent &&isOffsetRelative) woset -=that.parentData.left;if (woset + that.size.width >=that.parentData.width) {that.size.width =that.parentData.width - woset;if (pRatio) that.size.height =that.size.width / that.aspectRatio;}
if (hoset + that.size.height >=that.parentData.height) {that.size.height =that.parentData.height - hoset;if (pRatio) that.size.width =that.size.height * that.aspectRatio;}
},stop:function(event,ui){var that =$(this).data("resizable"),o =that.options,cp =that.position,co =that.containerOffset,cop =that.containerPosition,ce =that.containerElement;var helper =$(that.helper),ho =helper.offset(),w =helper.outerWidth() - that.sizeDiff.width,h =helper.outerHeight() - that.sizeDiff.height;if (that._helper &&!o.animate &&(/relative/).test(ce.css('position')))
$(this).css({left:ho.left - cop.left - co.left,width:w,height:h });if (that._helper &&!o.animate &&(/static/).test(ce.css('position')))
$(this).css({left:ho.left - cop.left - co.left,width:w,height:h });}
});$.ui.plugin.add("resizable","ghost",{start:function(event,ui) {var that =$(this).data("resizable"),o =that.options,cs =that.size;that.ghost =that.originalElement.clone();that.ghost
.css({opacity:.25,display:'block',position:'relative',height:cs.height,width:cs.width,margin:0,left:0,top:0 })
.addClass('ui-resizable-ghost')
.addClass(typeof o.ghost =='string'?o.ghost :'');that.ghost.appendTo(that.helper);},resize:function(event,ui){var that =$(this).data("resizable"),o =that.options;if (that.ghost) that.ghost.css({position:'relative',height:that.size.height,width:that.size.width });},stop:function(event,ui){var that =$(this).data("resizable"),o =that.options;if (that.ghost &&that.helper) that.helper.get(0).removeChild(that.ghost.get(0));}
});$.ui.plugin.add("resizable","grid",{resize:function(event,ui) {var that =$(this).data("resizable"),o =that.options,cs =that.size,os =that.originalSize,op =that.originalPosition,a =that.axis,ratio =o._aspectRatio ||event.shiftKey;o.grid =typeof o.grid =="number"?[o.grid,o.grid] :o.grid;var ox =Math.round((cs.width - os.width) / (o.grid[0]||1)) * (o.grid[0]||1),oy =Math.round((cs.height - os.height) / (o.grid[1]||1)) * (o.grid[1]||1);if (/^(se|s|e)$/.test(a)) {
that.size.width =os.width + ox;that.size.height =os.height + oy;}
else if (/^(ne)$/.test(a)) {
that.size.width =os.width + ox;that.size.height =os.height + oy;that.position.top =op.top - oy;}
else if (/^(sw)$/.test(a)) {
that.size.width =os.width + ox;that.size.height =os.height + oy;that.position.left =op.left - ox;}
else {that.size.width =os.width + ox;that.size.height =os.height + oy;that.position.top =op.top - oy;that.position.left =op.left - ox;}
}
});var num =function(v) {return parseInt(v,10) ||0;};var isNumber =function(value) {return !isNaN(parseInt(value,10));};})(jQuery);(function($,undefined ) {$.widget("ui.selectable",$.ui.mouse,{version:"1.9.2",options:{appendTo:'body',autoRefresh:true,distance:0,filter:'*',tolerance:'touch'},_create:function() {var that =this;this.element.addClass("ui-selectable");this.dragged =false;var selectees;this.refresh =function() {selectees =$(that.options.filter,that.element[0]);selectees.addClass("ui-selectee");selectees.each(function() {var $this =$(this);var pos =$this.offset();$.data(this,"selectable-item",{element:this,$element:$this,left:pos.left,top:pos.top,right:pos.left + $this.outerWidth(),bottom:pos.top + $this.outerHeight(),startselected:false,selected:$this.hasClass('ui-selected'),selecting:$this.hasClass('ui-selecting'),unselecting:$this.hasClass('ui-unselecting')
});});};this.refresh();this.selectees =selectees.addClass("ui-selectee");this._mouseInit();this.helper =$("<div class='ui-selectable-helper'></div>");},_destroy:function() {this.selectees
.removeClass("ui-selectee")
.removeData("selectable-item");this.element
.removeClass("ui-selectable ui-selectable-disabled");this._mouseDestroy();},_mouseStart:function(event) {var that =this;this.opos =[event.pageX,event.pageY];if (this.options.disabled)
return;var options =this.options;this.selectees =$(options.filter,this.element[0]);this._trigger("start",event);$(options.appendTo).append(this.helper);this.helper.css({"left":event.clientX,"top":event.clientY,"width":0,"height":0
});if (options.autoRefresh) {this.refresh();}
this.selectees.filter('.ui-selected').each(function() {var selectee =$.data(this,"selectable-item");selectee.startselected =true;if (!event.metaKey &&!event.ctrlKey) {selectee.$element.removeClass('ui-selected');selectee.selected =false;selectee.$element.addClass('ui-unselecting');selectee.unselecting =true;that._trigger("unselecting",event,{unselecting:selectee.element
});}
});$(event.target).parents().andSelf().each(function() {var selectee =$.data(this,"selectable-item");if (selectee) {var doSelect =(!event.metaKey &&!event.ctrlKey) ||!selectee.$element.hasClass('ui-selected');selectee.$element
.removeClass(doSelect ?"ui-unselecting":"ui-selected")
.addClass(doSelect ?"ui-selecting":"ui-unselecting");selectee.unselecting =!doSelect;selectee.selecting =doSelect;selectee.selected =doSelect;if (doSelect) {that._trigger("selecting",event,{selecting:selectee.element
});} else {that._trigger("unselecting",event,{unselecting:selectee.element
});}
return false;}
});},_mouseDrag:function(event) {var that =this;this.dragged =true;if (this.options.disabled)
return;var options =this.options;var x1 =this.opos[0],y1 =this.opos[1],x2 =event.pageX,y2 =event.pageY;if (x1 > x2) {var tmp =x2;x2 =x1;x1 =tmp;}
if (y1 > y2) {var tmp =y2;y2 =y1;y1 =tmp;}
this.helper.css({left:x1,top:y1,width:x2-x1,height:y2-y1});this.selectees.each(function() {var selectee =$.data(this,"selectable-item");if (!selectee ||selectee.element ==that.element[0])
return;var hit =false;if (options.tolerance =='touch') {hit =(!(selectee.left > x2 ||selectee.right < x1 ||selectee.top > y2 ||selectee.bottom < y1) );} else if (options.tolerance =='fit') {hit =(selectee.left > x1 &&selectee.right < x2 &&selectee.top > y1 &&selectee.bottom < y2);}
if (hit) {if (selectee.selected) {selectee.$element.removeClass('ui-selected');selectee.selected =false;}
if (selectee.unselecting) {selectee.$element.removeClass('ui-unselecting');selectee.unselecting =false;}
if (!selectee.selecting) {selectee.$element.addClass('ui-selecting');selectee.selecting =true;that._trigger("selecting",event,{selecting:selectee.element
});}
} else {if (selectee.selecting) {if ((event.metaKey ||event.ctrlKey) &&selectee.startselected) {selectee.$element.removeClass('ui-selecting');selectee.selecting =false;selectee.$element.addClass('ui-selected');selectee.selected =true;} else {selectee.$element.removeClass('ui-selecting');selectee.selecting =false;if (selectee.startselected) {selectee.$element.addClass('ui-unselecting');selectee.unselecting =true;}
that._trigger("unselecting",event,{unselecting:selectee.element
});}
}
if (selectee.selected) {if (!event.metaKey &&!event.ctrlKey &&!selectee.startselected) {selectee.$element.removeClass('ui-selected');selectee.selected =false;selectee.$element.addClass('ui-unselecting');selectee.unselecting =true;that._trigger("unselecting",event,{unselecting:selectee.element
});}
}
}
});return false;},_mouseStop:function(event) {var that =this;this.dragged =false;var options =this.options;$('.ui-unselecting',this.element[0]).each(function() {var selectee =$.data(this,"selectable-item");selectee.$element.removeClass('ui-unselecting');selectee.unselecting =false;selectee.startselected =false;that._trigger("unselected",event,{unselected:selectee.element
});});$('.ui-selecting',this.element[0]).each(function() {var selectee =$.data(this,"selectable-item");selectee.$element.removeClass('ui-selecting').addClass('ui-selected');selectee.selecting =false;selectee.selected =true;selectee.startselected =true;that._trigger("selected",event,{selected:selectee.element
});});this._trigger("stop",event);this.helper.remove();return false;}
});})(jQuery);(function($,undefined ) {var numPages =5;$.widget("ui.slider",$.ui.mouse,{version:"1.9.2",widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null
},_create:function() {var i,handleCount,o =this.options,existingHandles =this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),handle ="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",handles =[];this._keySliding =false;this._mouseSliding =false;this._animateOff =true;this._handleIndex =null;this._detectOrientation();this._mouseInit();this.element
.addClass("ui-slider"+
" ui-slider-"+ this.orientation +
" ui-widget"+
" ui-widget-content"+
" ui-corner-all"+
(o.disabled ?" ui-slider-disabled ui-disabled":"") );this.range =$([]);if (o.range ) {if (o.range ===true ) {if (!o.values ) {o.values =[this._valueMin(),this._valueMin() ];}
if (o.values.length &&o.values.length !==2 ) {o.values =[o.values[0],o.values[0] ];}
}
this.range =$("<div></div>")
.appendTo(this.element )
.addClass("ui-slider-range"+
" ui-widget-header"+
((o.range ==="min"||o.range ==="max") ?" ui-slider-range-"+ o.range :"") );}
handleCount =(o.values &&o.values.length ) ||1;for (i =existingHandles.length;i < handleCount;i++ ) {handles.push(handle );}
this.handles =existingHandles.add($(handles.join("") ).appendTo(this.element ) );this.handle =this.handles.eq(0 );this.handles.add(this.range ).filter("a")
.click(function(event ) {event.preventDefault();})
.mouseenter(function() {if (!o.disabled ) {$(this ).addClass("ui-state-hover");}
})
.mouseleave(function() {$(this ).removeClass("ui-state-hover");})
.focus(function() {if (!o.disabled ) {$(".ui-slider .ui-state-focus").removeClass("ui-state-focus");$(this ).addClass("ui-state-focus");} else {$(this ).blur();}
})
.blur(function() {$(this ).removeClass("ui-state-focus");});this.handles.each(function(i ) {$(this ).data("ui-slider-handle-index",i );});this._on(this.handles,{keydown:function(event ) {var allowed,curVal,newVal,step,index =$(event.target ).data("ui-slider-handle-index");switch (event.keyCode ) {case $.ui.keyCode.HOME:case $.ui.keyCode.END:case $.ui.keyCode.PAGE_UP:case $.ui.keyCode.PAGE_DOWN:case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:event.preventDefault();if (!this._keySliding ) {this._keySliding =true;$(event.target ).addClass("ui-state-active");allowed =this._start(event,index );if (allowed ===false ) {return;}
}
break;}
step =this.options.step;if (this.options.values &&this.options.values.length ) {curVal =newVal =this.values(index );} else {curVal =newVal =this.value();}
switch (event.keyCode ) {case $.ui.keyCode.HOME:newVal =this._valueMin();break;case $.ui.keyCode.END:newVal =this._valueMax();break;case $.ui.keyCode.PAGE_UP:newVal =this._trimAlignValue(curVal + ((this._valueMax() - this._valueMin()) / numPages ) );break;case $.ui.keyCode.PAGE_DOWN:newVal =this._trimAlignValue(curVal - ((this._valueMax() - this._valueMin()) / numPages ) );break;case $.ui.keyCode.UP:case $.ui.keyCode.RIGHT:if (curVal ===this._valueMax() ) {return;}
newVal =this._trimAlignValue(curVal + step );break;case $.ui.keyCode.DOWN:case $.ui.keyCode.LEFT:if (curVal ===this._valueMin() ) {return;}
newVal =this._trimAlignValue(curVal - step );break;}
this._slide(event,index,newVal );},keyup:function(event ) {var index =$(event.target ).data("ui-slider-handle-index");if (this._keySliding ) {this._keySliding =false;this._stop(event,index );this._change(event,index );$(event.target ).removeClass("ui-state-active");}
}
});this._refreshValue();this._animateOff =false;},_destroy:function() {this.handles.remove();this.range.remove();this.element
.removeClass("ui-slider"+
" ui-slider-horizontal"+
" ui-slider-vertical"+
" ui-slider-disabled"+
" ui-widget"+
" ui-widget-content"+
" ui-corner-all");this._mouseDestroy();},_mouseCapture:function(event ) {var position,normValue,distance,closestHandle,index,allowed,offset,mouseOverHandle,that =this,o =this.options;if (o.disabled ) {return false;}
this.elementSize ={width:this.element.outerWidth(),height:this.element.outerHeight()
};this.elementOffset =this.element.offset();position ={x:event.pageX,y:event.pageY };normValue =this._normValueFromMouse(position );distance =this._valueMax() - this._valueMin() + 1;this.handles.each(function(i ) {var thisDistance =Math.abs(normValue - that.values(i) );if (distance > thisDistance ) {distance =thisDistance;closestHandle =$(this );index =i;}
});if(o.range ===true &&this.values(1) ===o.min ) {index +=1;closestHandle =$(this.handles[index] );}
allowed =this._start(event,index );if (allowed ===false ) {return false;}
this._mouseSliding =true;this._handleIndex =index;closestHandle
.addClass("ui-state-active")
.focus();offset =closestHandle.offset();mouseOverHandle =!$(event.target ).parents().andSelf().is(".ui-slider-handle");this._clickOffset =mouseOverHandle ?{left:0,top:0 } :{left:event.pageX - offset.left - (closestHandle.width() / 2 ),top:event.pageY - offset.top -
(closestHandle.height() / 2 ) -
(parseInt(closestHandle.css("borderTopWidth"),10 ) ||0 ) -
(parseInt(closestHandle.css("borderBottomWidth"),10 ) ||0) +
(parseInt(closestHandle.css("marginTop"),10 ) ||0)
};if (!this.handles.hasClass("ui-state-hover") ) {this._slide(event,index,normValue );}
this._animateOff =true;return true;},_mouseStart:function() {return true;},_mouseDrag:function(event ) {var position ={x:event.pageX,y:event.pageY },normValue =this._normValueFromMouse(position );this._slide(event,this._handleIndex,normValue );return false;},_mouseStop:function(event ) {this.handles.removeClass("ui-state-active");this._mouseSliding =false;this._stop(event,this._handleIndex );this._change(event,this._handleIndex );this._handleIndex =null;this._clickOffset =null;this._animateOff =false;return false;},_detectOrientation:function() {this.orientation =(this.options.orientation ==="vertical") ?"vertical":"horizontal";},_normValueFromMouse:function(position ) {var pixelTotal,pixelMouse,percentMouse,valueTotal,valueMouse;if (this.orientation ==="horizontal") {pixelTotal =this.elementSize.width;pixelMouse =position.x - this.elementOffset.left - (this._clickOffset ?this._clickOffset.left :0 );} else {pixelTotal =this.elementSize.height;pixelMouse =position.y - this.elementOffset.top - (this._clickOffset ?this._clickOffset.top :0 );}
percentMouse =(pixelMouse / pixelTotal );if (percentMouse > 1 ) {percentMouse =1;}
if (percentMouse < 0 ) {percentMouse =0;}
if (this.orientation ==="vertical") {percentMouse =1 - percentMouse;}
valueTotal =this._valueMax() - this._valueMin();valueMouse =this._valueMin() + percentMouse * valueTotal;return this._trimAlignValue(valueMouse );},_start:function(event,index ) {var uiHash ={handle:this.handles[index ],value:this.value()
};if (this.options.values &&this.options.values.length ) {uiHash.value =this.values(index );uiHash.values =this.values();}
return this._trigger("start",event,uiHash );},_slide:function(event,index,newVal ) {var otherVal,newValues,allowed;if (this.options.values &&this.options.values.length ) {otherVal =this.values(index ?0 :1 );if ((this.options.values.length ===2 &&this.options.range ===true ) &&((index ===0 &&newVal > otherVal) ||(index ===1 &&newVal < otherVal ) )
) {newVal =otherVal;}
if (newVal !==this.values(index ) ) {newValues =this.values();newValues[index ] =newVal;allowed =this._trigger("slide",event,{handle:this.handles[index ],value:newVal,values:newValues
} );otherVal =this.values(index ?0 :1 );if (allowed !==false ) {this.values(index,newVal,true );}
}
} else {if (newVal !==this.value() ) {allowed =this._trigger("slide",event,{handle:this.handles[index ],value:newVal
} );if (allowed !==false ) {this.value(newVal );}
}
}
},_stop:function(event,index ) {var uiHash ={handle:this.handles[index ],value:this.value()
};if (this.options.values &&this.options.values.length ) {uiHash.value =this.values(index );uiHash.values =this.values();}
this._trigger("stop",event,uiHash );},_change:function(event,index ) {if (!this._keySliding &&!this._mouseSliding ) {var uiHash ={handle:this.handles[index ],value:this.value()
};if (this.options.values &&this.options.values.length ) {uiHash.value =this.values(index );uiHash.values =this.values();}
this._trigger("change",event,uiHash );}
},value:function(newValue ) {if (arguments.length ) {this.options.value =this._trimAlignValue(newValue );this._refreshValue();this._change(null,0 );return;}
return this._value();},values:function(index,newValue ) {var vals,newValues,i;if (arguments.length > 1 ) {this.options.values[index ] =this._trimAlignValue(newValue );this._refreshValue();this._change(null,index );return;}
if (arguments.length ) {if ($.isArray(arguments[0 ] ) ) {vals =this.options.values;newValues =arguments[0 ];for (i =0;i < vals.length;i +=1 ) {vals[i ] =this._trimAlignValue(newValues[i ] );this._change(null,i );}
this._refreshValue();} else {if (this.options.values &&this.options.values.length ) {return this._values(index );} else {return this.value();}
}
} else {return this._values();}
},_setOption:function(key,value ) {var i,valsLength =0;if ($.isArray(this.options.values ) ) {valsLength =this.options.values.length;}
$.Widget.prototype._setOption.apply(this,arguments );switch (key ) {case "disabled":if (value ) {this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.prop("disabled",true );this.element.addClass("ui-disabled");} else {this.handles.prop("disabled",false );this.element.removeClass("ui-disabled");}
break;case "orientation":this._detectOrientation();this.element
.removeClass("ui-slider-horizontal ui-slider-vertical")
.addClass("ui-slider-"+ this.orientation );this._refreshValue();break;case "value":this._animateOff =true;this._refreshValue();this._change(null,0 );this._animateOff =false;break;case "values":this._animateOff =true;this._refreshValue();for (i =0;i < valsLength;i +=1 ) {this._change(null,i );}
this._animateOff =false;break;case "min":case "max":this._animateOff =true;this._refreshValue();this._animateOff =false;break;}
},_value:function() {var val =this.options.value;val =this._trimAlignValue(val );return val;},_values:function(index ) {var val,vals,i;if (arguments.length ) {val =this.options.values[index ];val =this._trimAlignValue(val );return val;} else {vals =this.options.values.slice();for (i =0;i < vals.length;i+=1) {vals[i ] =this._trimAlignValue(vals[i ] );}
return vals;}
},_trimAlignValue:function(val ) {if (val <=this._valueMin() ) {return this._valueMin();}
if (val >=this._valueMax() ) {return this._valueMax();}
var step =(this.options.step > 0 ) ?this.options.step :1,valModStep =(val - this._valueMin()) % step,alignValue =val - valModStep;if (Math.abs(valModStep) * 2 >=step ) {alignValue +=(valModStep > 0 ) ?step :(-step );}
return parseFloat(alignValue.toFixed(5) );},_valueMin:function() {return this.options.min;},_valueMax:function() {return this.options.max;},_refreshValue:function() {var lastValPercent,valPercent,value,valueMin,valueMax,oRange =this.options.range,o =this.options,that =this,animate =(!this._animateOff ) ?o.animate :false,_set ={};if (this.options.values &&this.options.values.length ) {this.handles.each(function(i ) {valPercent =(that.values(i) - that._valueMin() ) / (that._valueMax() - that._valueMin() ) * 100;_set[that.orientation ==="horizontal"?"left":"bottom"] =valPercent + "%";$(this ).stop(1,1 )[animate ?"animate":"css"](_set,o.animate );if (that.options.range ===true ) {if (that.orientation ==="horizontal") {if (i ===0 ) {that.range.stop(1,1 )[animate ?"animate":"css"]({left:valPercent + "%"},o.animate );}
if (i ===1 ) {that.range[animate ?"animate":"css"]({width:(valPercent - lastValPercent ) + "%"},{queue:false,duration:o.animate } );}
} else {if (i ===0 ) {that.range.stop(1,1 )[animate ?"animate":"css"]({bottom:(valPercent ) + "%"},o.animate );}
if (i ===1 ) {that.range[animate ?"animate":"css"]({height:(valPercent - lastValPercent ) + "%"},{queue:false,duration:o.animate } );}
}
}
lastValPercent =valPercent;});} else {value =this.value();valueMin =this._valueMin();valueMax =this._valueMax();valPercent =(valueMax !==valueMin ) ?(value - valueMin ) / (valueMax - valueMin ) * 100 :0;_set[this.orientation ==="horizontal"?"left":"bottom"] =valPercent + "%";this.handle.stop(1,1 )[animate ?"animate":"css"](_set,o.animate );if (oRange ==="min"&&this.orientation ==="horizontal") {this.range.stop(1,1 )[animate ?"animate":"css"]({width:valPercent + "%"},o.animate );}
if (oRange ==="max"&&this.orientation ==="horizontal") {this.range[animate ?"animate":"css"]({width:(100 - valPercent ) + "%"},{queue:false,duration:o.animate } );}
if (oRange ==="min"&&this.orientation ==="vertical") {this.range.stop(1,1 )[animate ?"animate":"css"]({height:valPercent + "%"},o.animate );}
if (oRange ==="max"&&this.orientation ==="vertical") {this.range[animate ?"animate":"css"]({height:(100 - valPercent ) + "%"},{queue:false,duration:o.animate } );}
}
}
});}(jQuery));(function($,undefined ) {$.widget("ui.sortable",$.ui.mouse,{version:"1.9.2",widgetEventPrefix:"sort",ready:false,options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:'auto',cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:'> *',opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000
},_create:function() {var o =this.options;this.containerCache ={};this.element.addClass("ui-sortable");this.refresh();this.floating =this.items.length ?o.axis ==='x'||(/left|right/).test(this.items[0].item.css('float')) || (/inline|table-cell/).test(this.items[0].item.css('display')) : false;

this.offset =this.element.offset();this._mouseInit();this.ready =true
},_destroy:function() {this.element
.removeClass("ui-sortable ui-sortable-disabled");this._mouseDestroy();for (var i =this.items.length - 1;i >=0;i-- )
this.items[i].item.removeData(this.widgetName + "-item");return this;},_setOption:function(key,value){if (key ==="disabled") {this.options[key ] =value;this.widget().toggleClass("ui-sortable-disabled",!!value );} else {$.Widget.prototype._setOption.apply(this,arguments);}
},_mouseCapture:function(event,overrideHandle) {var that =this;if (this.reverting) {return false;}
if(this.options.disabled ||this.options.type =='static') return false;this._refreshItems(event);var currentItem =null,nodes =$(event.target).parents().each(function() {if($.data(this,that.widgetName + '-item') ==that) {currentItem =$(this);return false;}
});if($.data(event.target,that.widgetName + '-item') ==that) currentItem =$(event.target);if(!currentItem) return false;if(this.options.handle &&!overrideHandle) {var validHandle =false;$(this.options.handle,currentItem).find("*").andSelf().each(function() {if(this ==event.target) validHandle =true;});if(!validHandle) return false;}
this.currentItem =currentItem;this._removeCurrentsFromItems();return true;},_mouseStart:function(event,overrideHandle,noActivation) {var o =this.options;this.currentContainer =this;this.refreshPositions();this.helper =this._createHelper(event);this._cacheHelperProportions();this._cacheMargins();this.scrollParent =this.helper.scrollParent();this.offset =this.currentItem.offset();this.offset ={top:this.offset.top - this.margins.top,left:this.offset.left - this.margins.left
};$.extend(this.offset,{click:{left:event.pageX - this.offset.left,top:event.pageY - this.offset.top
},parent:this._getParentOffset(),relative:this._getRelativeOffset() });this.helper.css("position","absolute");this.cssPosition =this.helper.css("position");this.originalPosition =this._generatePosition(event);this.originalPageX =event.pageX;this.originalPageY =event.pageY;(o.cursorAt &&this._adjustOffsetFromHelper(o.cursorAt));this.domPosition ={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0] };if(this.helper[0] !=this.currentItem[0]) {this.currentItem.hide();}
this._createPlaceholder();if(o.containment)
this._setContainment();if(o.cursor) {if ($('body').css("cursor")) this._storedCursor =$('body').css("cursor");$('body').css("cursor",o.cursor);}
if(o.opacity) {if (this.helper.css("opacity")) this._storedOpacity =this.helper.css("opacity");this.helper.css("opacity",o.opacity);}
if(o.zIndex) {if (this.helper.css("zIndex")) this._storedZIndex =this.helper.css("zIndex");this.helper.css("zIndex",o.zIndex);}
if(this.scrollParent[0] !=document &&this.scrollParent[0].tagName !='HTML')
this.overflowOffset =this.scrollParent.offset();this._trigger("start",event,this._uiHash());if(!this._preserveHelperProportions)
this._cacheHelperProportions();if(!noActivation) {for (var i =this.containers.length - 1;i >=0;i--) {this.containers[i]._trigger("activate",event,this._uiHash(this));}
}
if($.ui.ddmanager)
$.ui.ddmanager.current =this;if ($.ui.ddmanager &&!o.dropBehaviour)
$.ui.ddmanager.prepareOffsets(this,event);this.dragging =true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(event);return true;},_mouseDrag:function(event) {this.position =this._generatePosition(event);this.positionAbs =this._convertPositionTo("absolute");if (!this.lastPositionAbs) {this.lastPositionAbs =this.positionAbs;}
if(this.options.scroll) {var o =this.options,scrolled =false;if(this.scrollParent[0] !=document &&this.scrollParent[0].tagName !='HTML') {if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
this.scrollParent[0].scrollTop =scrolled =this.scrollParent[0].scrollTop + o.scrollSpeed;else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
this.scrollParent[0].scrollTop =scrolled =this.scrollParent[0].scrollTop - o.scrollSpeed;if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
this.scrollParent[0].scrollLeft =scrolled =this.scrollParent[0].scrollLeft + o.scrollSpeed;else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
this.scrollParent[0].scrollLeft =scrolled =this.scrollParent[0].scrollLeft - o.scrollSpeed;} else {if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
scrolled =$(document).scrollTop($(document).scrollTop() - o.scrollSpeed);else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
scrolled =$(document).scrollTop($(document).scrollTop() + o.scrollSpeed);if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
scrolled =$(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
scrolled =$(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);}
if(scrolled !==false &&$.ui.ddmanager &&!o.dropBehaviour)
$.ui.ddmanager.prepareOffsets(this,event);}
this.positionAbs =this._convertPositionTo("absolute");if(!this.options.axis ||this.options.axis !="y") this.helper[0].style.left =this.position.left+'px';if(!this.options.axis ||this.options.axis !="x") this.helper[0].style.top =this.position.top+'px';for (var i =this.items.length - 1;i >=0;i--) {var item =this.items[i],itemElement =item.item[0],intersection =this._intersectsWithPointer(item);if (!intersection) continue;if (item.instance !==this.currentContainer) continue;if (itemElement !=this.currentItem[0] &&this.placeholder[intersection ==1 ?"next":"prev"]()[0] !=itemElement &&!$.contains(this.placeholder[0],itemElement) &&(this.options.type =='semi-dynamic'?!$.contains(this.element[0],itemElement) :true)
) {this.direction =intersection ==1 ?"down":"up";if (this.options.tolerance =="pointer"||this._intersectsWithSides(item)) {this._rearrange(event,item);} else {break;}
this._trigger("change",event,this._uiHash());break;}
}
this._contactContainers(event);if($.ui.ddmanager) $.ui.ddmanager.drag(this,event);this._trigger('sort',event,this._uiHash());this.lastPositionAbs =this.positionAbs;return false;},_mouseStop:function(event,noPropagation) {if(!event) return;if ($.ui.ddmanager &&!this.options.dropBehaviour)
$.ui.ddmanager.drop(this,event);if(this.options.revert) {var that =this;var cur =this.placeholder.offset();this.reverting =true;$(this.helper).animate({left:cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] ==document.body ?0 :this.offsetParent[0].scrollLeft),top:cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] ==document.body ?0 :this.offsetParent[0].scrollTop)
},parseInt(this.options.revert,10) ||500,function() {that._clear(event);});} else {this._clear(event,noPropagation);}
return false;},cancel:function() {if(this.dragging) {this._mouseUp({target:null });if(this.options.helper =="original")
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");else
this.currentItem.show();for (var i =this.containers.length - 1;i >=0;i--){this.containers[i]._trigger("deactivate",null,this._uiHash(this));if(this.containers[i].containerCache.over) {this.containers[i]._trigger("out",null,this._uiHash(this));this.containers[i].containerCache.over =0;}
}
}
if (this.placeholder) {if(this.placeholder[0].parentNode) this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.options.helper !="original"&&this.helper &&this.helper[0].parentNode) this.helper.remove();$.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null
});if(this.domPosition.prev) {$(this.domPosition.prev).after(this.currentItem);} else {$(this.domPosition.parent).prepend(this.currentItem);}
}
return this;},serialize:function(o) {var items =this._getItemsAsjQuery(o &&o.connected);var str =[];o =o ||{};$(items).each(function() {var res =($(o.item ||this).attr(o.attribute ||'id') ||'').match(o.expression ||(/(.+)[-=_](.+)/));
if(res) str.push((o.key ||res[1]+'[]')+'='+(o.key &&o.expression ?res[1] :res[2]));});if(!str.length &&o.key) {str.push(o.key + '=');}
return str.join('&');},toArray:function(o) {var items =this._getItemsAsjQuery(o &&o.connected);var ret =[];o =o ||{};items.each(function() {ret.push($(o.item ||this).attr(o.attribute ||'id') ||'');});return ret;},_intersectsWith:function(item) {var x1 =this.positionAbs.left,x2 =x1 + this.helperProportions.width,y1 =this.positionAbs.top,y2 =y1 + this.helperProportions.height;var l =item.left,r =l + item.width,t =item.top,b =t + item.height;var dyClick =this.offset.click.top,dxClick =this.offset.click.left;var isOverElement =(y1 + dyClick) > t &&(y1 + dyClick) < b &&(x1 + dxClick) > l &&(x1 + dxClick) < r;if(this.options.tolerance =="pointer"||this.options.forcePointerForContainers
||(this.options.tolerance !="pointer"&&this.helperProportions[this.floating ?'width':'height'] > item[this.floating ?'width':'height'])
) {return isOverElement;} else {return (l < x1 + (this.helperProportions.width / 2) &&x2 - (this.helperProportions.width / 2) < r &&t < y1 + (this.helperProportions.height / 2) &&y2 - (this.helperProportions.height / 2) < b );}
},_intersectsWithPointer:function(item) {var isOverElementHeight =(this.options.axis ==='x') ||$.ui.isOverAxis(this.positionAbs.top + this.offset.click.top,item.top,item.height),isOverElementWidth =(this.options.axis ==='y') ||$.ui.isOverAxis(this.positionAbs.left + this.offset.click.left,item.left,item.width),isOverElement =isOverElementHeight &&isOverElementWidth,verticalDirection =this._getDragVerticalDirection(),horizontalDirection =this._getDragHorizontalDirection();if (!isOverElement)
return false;return this.floating ?(((horizontalDirection &&horizontalDirection =="right") ||verticalDirection =="down") ?2 :1 )
:(verticalDirection &&(verticalDirection =="down"?2 :1) );},_intersectsWithSides:function(item) {var isOverBottomHalf =$.ui.isOverAxis(this.positionAbs.top + this.offset.click.top,item.top + (item.height/2),item.height),isOverRightHalf =$.ui.isOverAxis(this.positionAbs.left + this.offset.click.left,item.left + (item.width/2),item.width),verticalDirection =this._getDragVerticalDirection(),horizontalDirection =this._getDragHorizontalDirection();if (this.floating &&horizontalDirection) {return ((horizontalDirection =="right"&&isOverRightHalf) ||(horizontalDirection =="left"&&!isOverRightHalf));} else {return verticalDirection &&((verticalDirection =="down"&&isOverBottomHalf) ||(verticalDirection =="up"&&!isOverBottomHalf));}
},_getDragVerticalDirection:function() {var delta =this.positionAbs.top - this.lastPositionAbs.top;return delta !=0 &&(delta > 0 ?"down":"up");},_getDragHorizontalDirection:function() {var delta =this.positionAbs.left - this.lastPositionAbs.left;return delta !=0 &&(delta > 0 ?"right":"left");},refresh:function(event) {this._refreshItems(event);this.refreshPositions();return this;},_connectWith:function() {var options =this.options;return options.connectWith.constructor ==String
?[options.connectWith]
:options.connectWith;},_getItemsAsjQuery:function(connected) {var items =[];var queries =[];var connectWith =this._connectWith();if(connectWith &&connected) {for (var i =connectWith.length - 1;i >=0;i--){var cur =$(connectWith[i]);for (var j =cur.length - 1;j >=0;j--){var inst =$.data(cur[j],this.widgetName);if(inst &&inst !=this &&!inst.options.disabled) {queries.push([$.isFunction(inst.options.items) ?inst.options.items.call(inst.element) :$(inst.options.items,inst.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'),inst]);}
};};}
queries.push([$.isFunction(this.options.items) ?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem }) :$(this.options.items,this.element).not(".ui-sortable-helper").not('.ui-sortable-placeholder'),this]);for (var i =queries.length - 1;i >=0;i--){queries[i][0].each(function() {items.push(this);});};return $(items);},_removeCurrentsFromItems:function() {var list =this.currentItem.find(":data("+ this.widgetName + "-item)");this.items =$.grep(this.items,function (item) {for (var j=0;j < list.length;j++) {if(list[j] ==item.item[0])
return false;};return true;});},_refreshItems:function(event) {this.items =[];this.containers =[this];var items =this.items;var queries =[[$.isFunction(this.options.items) ?this.options.items.call(this.element[0],event,{item:this.currentItem }) :$(this.options.items,this.element),this]];var connectWith =this._connectWith();if(connectWith &&this.ready) {for (var i =connectWith.length - 1;i >=0;i--){var cur =$(connectWith[i]);for (var j =cur.length - 1;j >=0;j--){var inst =$.data(cur[j],this.widgetName);if(inst &&inst !=this &&!inst.options.disabled) {queries.push([$.isFunction(inst.options.items) ?inst.options.items.call(inst.element[0],event,{item:this.currentItem }) :$(inst.options.items,inst.element),inst]);this.containers.push(inst);}
};};}
for (var i =queries.length - 1;i >=0;i--) {var targetData =queries[i][1];var _queries =queries[i][0];for (var j=0,queriesLength =_queries.length;j < queriesLength;j++) {var item =$(_queries[j]);item.data(this.widgetName + '-item',targetData);items.push({item:item,instance:targetData,width:0,height:0,left:0,top:0
});};};},refreshPositions:function(fast) {if(this.offsetParent &&this.helper) {this.offset.parent =this._getParentOffset();}
for (var i =this.items.length - 1;i >=0;i--){var item =this.items[i];if(item.instance !=this.currentContainer &&this.currentContainer &&item.item[0] !=this.currentItem[0])
continue;var t =this.options.toleranceElement ?$(this.options.toleranceElement,item.item) :item.item;if (!fast) {item.width =t.outerWidth();item.height =t.outerHeight();}
var p =t.offset();item.left =p.left;item.top =p.top;};if(this.options.custom &&this.options.custom.refreshContainers) {this.options.custom.refreshContainers.call(this);} else {for (var i =this.containers.length - 1;i >=0;i--){var p =this.containers[i].element.offset();this.containers[i].containerCache.left =p.left;this.containers[i].containerCache.top =p.top;this.containers[i].containerCache.width=this.containers[i].element.outerWidth();this.containers[i].containerCache.height =this.containers[i].element.outerHeight();};}
return this;},_createPlaceholder:function(that) {that =that ||this;var o =that.options;if(!o.placeholder ||o.placeholder.constructor ==String) {var className =o.placeholder;o.placeholder ={element:function() {var el =$(document.createElement(that.currentItem[0].nodeName))
.addClass(className ||that.currentItem[0].className+" ui-sortable-placeholder")
.removeClass("ui-sortable-helper")[0];if(!className)
el.style.visibility ="hidden";return el;},update:function(container,p) {if(className &&!o.forcePlaceholderSize) return;if(!p.height()) {p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css('paddingTop')||0,10) - parseInt(that.currentItem.css('paddingBottom')||0,10));};if(!p.width()) {p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css('paddingLeft')||0,10) - parseInt(that.currentItem.css('paddingRight')||0,10));};}
};}
that.placeholder =$(o.placeholder.element.call(that.element,that.currentItem));that.currentItem.after(that.placeholder);o.placeholder.update(that,that.placeholder);},_contactContainers:function(event) {var innermostContainer =null,innermostIndex =null;for (var i =this.containers.length - 1;i >=0;i--){if($.contains(this.currentItem[0],this.containers[i].element[0]))
continue;if(this._intersectsWith(this.containers[i].containerCache)) {if(innermostContainer &&$.contains(this.containers[i].element[0],innermostContainer.element[0]))
continue;innermostContainer =this.containers[i];innermostIndex =i;} else {if(this.containers[i].containerCache.over) {this.containers[i]._trigger("out",event,this._uiHash(this));this.containers[i].containerCache.over =0;}
}
}
if(!innermostContainer) return;if(this.containers.length ===1) {this.containers[innermostIndex]._trigger("over",event,this._uiHash(this));this.containers[innermostIndex].containerCache.over =1;} else {var dist =10000;var itemWithLeastDistance =null;var posProperty =this.containers[innermostIndex].floating ?'left':'top';var sizeProperty =this.containers[innermostIndex].floating ?'width':'height';var base =this.positionAbs[posProperty] + this.offset.click[posProperty];for (var j =this.items.length - 1;j >=0;j--) {if(!$.contains(this.containers[innermostIndex].element[0],this.items[j].item[0])) continue;if(this.items[j].item[0] ==this.currentItem[0]) continue;var cur =this.items[j].item.offset()[posProperty];var nearBottom =false;if(Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)){nearBottom =true;cur +=this.items[j][sizeProperty];}
if(Math.abs(cur - base) < dist) {dist =Math.abs(cur - base);itemWithLeastDistance =this.items[j];this.direction =nearBottom ?"up":"down";}
}
if(!itemWithLeastDistance &&!this.options.dropOnEmpty) return;this.currentContainer =this.containers[innermostIndex];itemWithLeastDistance ?this._rearrange(event,itemWithLeastDistance,null,true) :this._rearrange(event,null,this.containers[innermostIndex].element,true);this._trigger("change",event,this._uiHash());this.containers[innermostIndex]._trigger("change",event,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[innermostIndex]._trigger("over",event,this._uiHash(this));this.containers[innermostIndex].containerCache.over =1;}
},_createHelper:function(event) {var o =this.options;var helper =$.isFunction(o.helper) ?$(o.helper.apply(this.element[0],[event,this.currentItem])) :(o.helper =='clone'?this.currentItem.clone() :this.currentItem);if(!helper.parents('body').length) $(o.appendTo !='parent'?o.appendTo :this.currentItem[0].parentNode)[0].appendChild(helper[0]);if(helper[0] ==this.currentItem[0])
this._storedCSS ={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left") };if(helper[0].style.width ==''||o.forceHelperSize) helper.width(this.currentItem.width());if(helper[0].style.height ==''||o.forceHelperSize) helper.height(this.currentItem.height());return helper;},_adjustOffsetFromHelper:function(obj) {if (typeof obj =='string') {obj =obj.split(' ');}
if ($.isArray(obj)) {obj ={left:+obj[0],top:+obj[1] ||0};}
if ('left'in obj) {this.offset.click.left =obj.left + this.margins.left;}
if ('right'in obj) {this.offset.click.left =this.helperProportions.width - obj.right + this.margins.left;}
if ('top'in obj) {this.offset.click.top =obj.top + this.margins.top;}
if ('bottom'in obj) {this.offset.click.top =this.helperProportions.height - obj.bottom + this.margins.top;}
},_getParentOffset:function() {this.offsetParent =this.helper.offsetParent();var po =this.offsetParent.offset();if(this.cssPosition =='absolute'&&this.scrollParent[0] !=document &&$.contains(this.scrollParent[0],this.offsetParent[0])) {po.left +=this.scrollParent.scrollLeft();po.top +=this.scrollParent.scrollTop();}
if((this.offsetParent[0] ==document.body) ||(this.offsetParent[0].tagName &&this.offsetParent[0].tagName.toLowerCase() =='html'&&$.ui.ie)) po ={top:0,left:0 };return {top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) ||0),left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) ||0)
};},_getRelativeOffset:function() {if(this.cssPosition =="relative") {var p =this.currentItem.position();return {top:p.top - (parseInt(this.helper.css("top"),10) ||0) + this.scrollParent.scrollTop(),left:p.left - (parseInt(this.helper.css("left"),10) ||0) + this.scrollParent.scrollLeft()
};} else {return {top:0,left:0 };}
},_cacheMargins:function() {this.margins ={left:(parseInt(this.currentItem.css("marginLeft"),10) ||0),top:(parseInt(this.currentItem.css("marginTop"),10) ||0)
};},_cacheHelperProportions:function() {this.helperProportions ={width:this.helper.outerWidth(),height:this.helper.outerHeight()
};},_setContainment:function() {var o =this.options;if(o.containment =='parent') o.containment =this.helper[0].parentNode;if(o.containment =='document'||o.containment =='window') this.containment =[0 - this.offset.relative.left - this.offset.parent.left,0 - this.offset.relative.top - this.offset.parent.top,$(o.containment =='document'?document :window).width() - this.helperProportions.width - this.margins.left,($(o.containment =='document'?document :window).height() ||document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
];if(!(/^(document|window|parent)$/).test(o.containment)) {
var ce =$(o.containment)[0];var co =$(o.containment).offset();var over =($(ce).css("overflow") !='hidden');this.containment =[co.left + (parseInt($(ce).css("borderLeftWidth"),10) ||0) + (parseInt($(ce).css("paddingLeft"),10) ||0) - this.margins.left,co.top + (parseInt($(ce).css("borderTopWidth"),10) ||0) + (parseInt($(ce).css("paddingTop"),10) ||0) - this.margins.top,co.left+(over ?Math.max(ce.scrollWidth,ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) ||0) - (parseInt($(ce).css("paddingRight"),10) ||0) - this.helperProportions.width - this.margins.left,co.top+(over ?Math.max(ce.scrollHeight,ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) ||0) - (parseInt($(ce).css("paddingBottom"),10) ||0) - this.helperProportions.height - this.margins.top
];}
},_convertPositionTo:function(d,pos) {if(!pos) pos =this.position;var mod =d =="absolute"?1 :-1;var o =this.options,scroll =this.cssPosition =='absolute'&&!(this.scrollParent[0] !=document &&$.contains(this.scrollParent[0],this.offsetParent[0])) ?this.offsetParent :this.scrollParent,scrollIsRootNode =(/(html|body)/i).test(scroll[0].tagName);

return {top:(pos.top+ this.offset.relative.top * mod+ this.offset.parent.top * mod- ((this.cssPosition =='fixed'?-this.scrollParent.scrollTop() :(scrollIsRootNode ?0 :scroll.scrollTop() ) ) * mod)
),left:(pos.left+ this.offset.relative.left * mod+ this.offset.parent.left * mod- ((this.cssPosition =='fixed'?-this.scrollParent.scrollLeft() :scrollIsRootNode ?0 :scroll.scrollLeft() ) * mod)
)
};},_generatePosition:function(event) {var o =this.options,scroll =this.cssPosition =='absolute'&&!(this.scrollParent[0] !=document &&$.contains(this.scrollParent[0],this.offsetParent[0])) ?this.offsetParent :this.scrollParent,scrollIsRootNode =(/(html|body)/i).test(scroll[0].tagName);

if(this.cssPosition =='relative'&&!(this.scrollParent[0] !=document &&this.scrollParent[0] !=this.offsetParent[0])) {this.offset.relative =this._getRelativeOffset();}
var pageX =event.pageX;var pageY =event.pageY;if(this.originalPosition) {if(this.containment) {if(event.pageX - this.offset.click.left < this.containment[0]) pageX =this.containment[0] + this.offset.click.left;if(event.pageY - this.offset.click.top < this.containment[1]) pageY =this.containment[1] + this.offset.click.top;if(event.pageX - this.offset.click.left > this.containment[2]) pageX =this.containment[2] + this.offset.click.left;if(event.pageY - this.offset.click.top > this.containment[3]) pageY =this.containment[3] + this.offset.click.top;}
if(o.grid) {var top =this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];pageY =this.containment ?(!(top - this.offset.click.top < this.containment[1] ||top - this.offset.click.top > this.containment[3]) ?top :(!(top - this.offset.click.top < this.containment[1]) ?top - o.grid[1] :top + o.grid[1])) :top;var left =this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];pageX =this.containment ?(!(left - this.offset.click.left < this.containment[0] ||left - this.offset.click.left > this.containment[2]) ?left :(!(left - this.offset.click.left < this.containment[0]) ?left - o.grid[0] :left + o.grid[0])) :left;}
}
return {top:(pageY- this.offset.click.top- this.offset.relative.top- this.offset.parent.top+ ((this.cssPosition =='fixed'?-this.scrollParent.scrollTop() :(scrollIsRootNode ?0 :scroll.scrollTop() ) ))
),left:(pageX- this.offset.click.left- this.offset.relative.left- this.offset.parent.left+ ((this.cssPosition =='fixed'?-this.scrollParent.scrollLeft() :scrollIsRootNode ?0 :scroll.scrollLeft() ))
)
};},_rearrange:function(event,i,a,hardRefresh) {a ?a[0].appendChild(this.placeholder[0]) :i.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction =='down'?i.item[0] :i.item[0].nextSibling));this.counter =this.counter ?++this.counter :1;var counter =this.counter;this._delay(function() {if(counter ==this.counter) this.refreshPositions(!hardRefresh);});},_clear:function(event,noPropagation) {this.reverting =false;var delayedTriggers =[];if(!this._noFinalSort &&this.currentItem.parent().length) this.placeholder.before(this.currentItem);this._noFinalSort =null;if(this.helper[0] ==this.currentItem[0]) {for(var i in this._storedCSS) {if(this._storedCSS[i] =='auto'||this._storedCSS[i] =='static') this._storedCSS[i] ='';}
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");} else {this.currentItem.show();}
if(this.fromOutside &&!noPropagation) delayedTriggers.push(function(event) {this._trigger("receive",event,this._uiHash(this.fromOutside));});if((this.fromOutside ||this.domPosition.prev !=this.currentItem.prev().not(".ui-sortable-helper")[0] ||this.domPosition.parent !=this.currentItem.parent()[0]) &&!noPropagation) delayedTriggers.push(function(event) {this._trigger("update",event,this._uiHash());});if (this !==this.currentContainer) {if(!noPropagation) {delayedTriggers.push(function(event) {this._trigger("remove",event,this._uiHash());});delayedTriggers.push((function(c) {return function(event) {c._trigger("receive",event,this._uiHash(this));};}).call(this,this.currentContainer));delayedTriggers.push((function(c) {return function(event) {c._trigger("update",event,this._uiHash(this));};}).call(this,this.currentContainer));}
}
for (var i =this.containers.length - 1;i >=0;i--){if(!noPropagation) delayedTriggers.push((function(c) {return function(event) {c._trigger("deactivate",event,this._uiHash(this));};}).call(this,this.containers[i]));if(this.containers[i].containerCache.over) {delayedTriggers.push((function(c) {return function(event) {c._trigger("out",event,this._uiHash(this));};}).call(this,this.containers[i]));this.containers[i].containerCache.over =0;}
}
if(this._storedCursor) $('body').css("cursor",this._storedCursor);if(this._storedOpacity) this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex) this.helper.css("zIndex",this._storedZIndex =='auto'?'':this._storedZIndex);this.dragging =false;if(this.cancelHelperRemoval) {if(!noPropagation) {this._trigger("beforeStop",event,this._uiHash());for (var i=0;i < delayedTriggers.length;i++) {delayedTriggers[i].call(this,event);};this._trigger("stop",event,this._uiHash());}
this.fromOutside =false;return false;}
if(!noPropagation) this._trigger("beforeStop",event,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0] !=this.currentItem[0]) this.helper.remove();this.helper =null;if(!noPropagation) {for (var i=0;i < delayedTriggers.length;i++) {delayedTriggers[i].call(this,event);};this._trigger("stop",event,this._uiHash());}
this.fromOutside =false;return true;},_trigger:function() {if ($.Widget.prototype._trigger.apply(this,arguments) ===false) {this.cancel();}
},_uiHash:function(_inst) {var inst =_inst ||this;return {helper:inst.helper,placeholder:inst.placeholder ||$([]),position:inst.position,originalPosition:inst.originalPosition,offset:inst.positionAbs,item:inst.currentItem,sender:_inst ?_inst.element :null
};}
});})(jQuery);(function($ ) {function modifier(fn ) {return function() {var previous =this.element.val();fn.apply(this,arguments );this._refresh();if (previous !==this.element.val() ) {this._trigger("change");}
};}
$.widget("ui.spinner",{version:"1.9.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:true,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null
},_create:function() {this._setOption("max",this.options.max );this._setOption("min",this.options.min );this._setOption("step",this.options.step );this._value(this.element.val(),true );this._draw();this._on(this._events );this._refresh();this._on(this.window,{beforeunload:function() {this.element.removeAttr("autocomplete");}
});},_getCreateOptions:function() {var options ={},element =this.element;$.each(["min","max","step"],function(i,option ) {var value =element.attr(option );if (value !==undefined &&value.length ) {options[option ] =value;}
});return options;},_events:{keydown:function(event ) {if (this._start(event ) &&this._keydown(event ) ) {event.preventDefault();}
},keyup:"_stop",focus:function() {this.previous =this.element.val();},blur:function(event ) {if (this.cancelBlur ) {delete this.cancelBlur;return;}
this._refresh();if (this.previous !==this.element.val() ) {this._trigger("change",event );}
},mousewheel:function(event,delta ) {if (!delta ) {return;}
if (!this.spinning &&!this._start(event ) ) {return false;}
this._spin((delta > 0 ?1 :-1) * this.options.step,event );clearTimeout(this.mousewheelTimer );this.mousewheelTimer =this._delay(function() {if (this.spinning ) {this._stop(event );}
},100 );event.preventDefault();},"mousedown .ui-spinner-button":function(event ) {var previous;previous =this.element[0] ===this.document[0].activeElement ?this.previous :this.element.val();function checkFocus() {var isActive =this.element[0] ===this.document[0].activeElement;if (!isActive ) {this.element.focus();this.previous =previous;this._delay(function() {this.previous =previous;});}
}
event.preventDefault();checkFocus.call(this );this.cancelBlur =true;this._delay(function() {delete this.cancelBlur;checkFocus.call(this );});if (this._start(event ) ===false ) {return;}
this._repeat(null,$(event.currentTarget ).hasClass("ui-spinner-up") ?1 :-1,event );},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(event ) {if (!$(event.currentTarget ).hasClass("ui-state-active") ) {return;}
if (this._start(event ) ===false ) {return false;}
this._repeat(null,$(event.currentTarget ).hasClass("ui-spinner-up") ?1 :-1,event );},"mouseleave .ui-spinner-button":"_stop"},_draw:function() {var uiSpinner =this.uiSpinner =this.element
.addClass("ui-spinner-input")
.attr("autocomplete","off")
.wrap(this._uiSpinnerHtml() )
.parent()
.append(this._buttonHtml() );this.element.attr("role","spinbutton");this.buttons =uiSpinner.find(".ui-spinner-button")
.attr("tabIndex",-1 )
.button()
.removeClass("ui-corner-all");if (this.buttons.height() > Math.ceil(uiSpinner.height() * 0.5 ) &&uiSpinner.height() > 0 ) {uiSpinner.height(uiSpinner.height() );}
if (this.options.disabled ) {this.disable();}
},_keydown:function(event ) {var options =this.options,keyCode =$.ui.keyCode;switch (event.keyCode ) {case keyCode.UP:this._repeat(null,1,event );return true;case keyCode.DOWN:this._repeat(null,-1,event );return true;case keyCode.PAGE_UP:this._repeat(null,options.page,event );return true;case keyCode.PAGE_DOWN:this._repeat(null,-options.page,event );return true;}
return false;},_uiSpinnerHtml:function() {return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";},_buttonHtml:function() {return ""+
"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>"+
"<span class='ui-icon "+ this.options.icons.up + "'>&#9650;</span>"+
"</a>"+
"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+
"<span class='ui-icon "+ this.options.icons.down + "'>&#9660;</span>"+
"</a>";},_start:function(event ) {if (!this.spinning &&this._trigger("start",event ) ===false ) {return false;}
if (!this.counter ) {this.counter =1;}
this.spinning =true;return true;},_repeat:function(i,steps,event ) {i =i ||500;clearTimeout(this.timer );this.timer =this._delay(function() {this._repeat(40,steps,event );},i );this._spin(steps * this.options.step,event );},_spin:function(step,event ) {var value =this.value() ||0;if (!this.counter ) {this.counter =1;}
value =this._adjustValue(value + step * this._increment(this.counter ) );if (!this.spinning ||this._trigger("spin",event,{value:value } ) !==false) {this._value(value );this.counter++;}
},_increment:function(i ) {var incremental =this.options.incremental;if (incremental ) {return $.isFunction(incremental ) ?incremental(i ) :Math.floor(i*i*i/50000 - i*i/500 + 17*i/200 + 1 );}
return 1;},_precision:function() {var precision =this._precisionOf(this.options.step );if (this.options.min !==null ) {precision =Math.max(precision,this._precisionOf(this.options.min ) );}
return precision;},_precisionOf:function(num ) {var str =num.toString(),decimal =str.indexOf(".");return decimal ===-1 ?0 :str.length - decimal - 1;},_adjustValue:function(value ) {var base,aboveMin,options =this.options;base =options.min !==null ?options.min :0;aboveMin =value - base;aboveMin =Math.round(aboveMin / options.step) * options.step;value =base + aboveMin;value =parseFloat(value.toFixed(this._precision() ) );if (options.max !==null &&value > options.max) {return options.max;}
if (options.min !==null &&value < options.min ) {return options.min;}
return value;},_stop:function(event ) {if (!this.spinning ) {return;}
clearTimeout(this.timer );clearTimeout(this.mousewheelTimer );this.counter =0;this.spinning =false;this._trigger("stop",event );},_setOption:function(key,value ) {if (key ==="culture"||key ==="numberFormat") {var prevValue =this._parse(this.element.val() );this.options[key ] =value;this.element.val(this._format(prevValue ) );return;}
if (key ==="max"||key ==="min"||key ==="step") {if (typeof value ==="string") {value =this._parse(value );}
}
this._super(key,value );if (key ==="disabled") {if (value ) {this.element.prop("disabled",true );this.buttons.button("disable");} else {this.element.prop("disabled",false );this.buttons.button("enable");}
}
},_setOptions:modifier(function(options ) {this._super(options );this._value(this.element.val() );}),_parse:function(val ) {if (typeof val ==="string"&&val !=="") {val =window.Globalize &&this.options.numberFormat ?Globalize.parseFloat(val,10,this.options.culture ) :+val;}
return val ===""||isNaN(val ) ?null :val;},_format:function(value ) {if (value ==="") {return "";}
return window.Globalize &&this.options.numberFormat ?Globalize.format(value,this.options.numberFormat,this.options.culture ) :value;},_refresh:function() {this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val() )
});},_value:function(value,allowAny ) {var parsed;if (value !=="") {parsed =this._parse(value );if (parsed !==null ) {if (!allowAny ) {parsed =this._adjustValue(parsed );}
value =this._format(parsed );}
}
this.element.val(value );this._refresh();},_destroy:function() {this.element
.removeClass("ui-spinner-input")
.prop("disabled",false )
.removeAttr("autocomplete")
.removeAttr("role")
.removeAttr("aria-valuemin")
.removeAttr("aria-valuemax")
.removeAttr("aria-valuenow");this.uiSpinner.replaceWith(this.element );},stepUp:modifier(function(steps ) {this._stepUp(steps );}),_stepUp:function(steps ) {this._spin((steps ||1) * this.options.step );},stepDown:modifier(function(steps ) {this._stepDown(steps );}),_stepDown:function(steps ) {this._spin((steps ||1) * -this.options.step );},pageUp:modifier(function(pages ) {this._stepUp((pages ||1) * this.options.page );}),pageDown:modifier(function(pages ) {this._stepDown((pages ||1) * this.options.page );}),value:function(newVal ) {if (!arguments.length ) {return this._parse(this.element.val() );}
modifier(this._value ).call(this,newVal );},widget:function() {return this.uiSpinner;}
});}(jQuery ) );(function($,undefined ) {var tabId =0,rhash =/#.*$/;

function getNextTabId() {return ++tabId;}
function isLocal(anchor ) {return anchor.hash.length > 1 &&anchor.href.replace(rhash,"") ===location.href.replace(rhash,"")
.replace(/\s/g, "%20" );
}
$.widget("ui.tabs",{version:"1.9.2",delay:300,options:{active:null,collapsible:false,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null
},_create:function() {var that =this,options =this.options,active =options.active,locationHash =location.hash.substring(1 );this.running =false;this.element
.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
.toggleClass("ui-tabs-collapsible",options.collapsible )
.delegate(".ui-tabs-nav > li","mousedown"+ this.eventNamespace,function(event ) {if ($(this ).is(".ui-state-disabled") ) {event.preventDefault();}
})
.delegate(".ui-tabs-anchor","focus"+ this.eventNamespace,function() {if ($(this ).closest("li").is(".ui-state-disabled") ) {this.blur();}
});this._processTabs();if (active ===null ) {if (locationHash ) {this.tabs.each(function(i,tab ) {if ($(tab ).attr("aria-controls") ===locationHash ) {active =i;return false;}
});}
if (active ===null ) {active =this.tabs.index(this.tabs.filter(".ui-tabs-active") );}
if (active ===null ||active ===-1 ) {active =this.tabs.length ?0 :false;}
}
if (active !==false ) {active =this.tabs.index(this.tabs.eq(active ) );if (active ===-1 ) {active =options.collapsible ?false :0;}
}
options.active =active;if (!options.collapsible &&options.active ===false &&this.anchors.length ) {options.active =0;}
if ($.isArray(options.disabled ) ) {options.disabled =$.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"),function(li ) {return that.tabs.index(li );})
) ).sort();}
if (this.options.active !==false &&this.anchors.length ) {this.active =this._findActive(this.options.active );} else {this.active =$();}
this._refresh();if (this.active.length ) {this.load(options.active );}
},_getCreateEventData:function() {return {tab:this.active,panel:!this.active.length ?$() :this._getPanelForTab(this.active )
};},_tabKeydown:function(event ) {var focusedTab =$(this.document[0].activeElement ).closest("li"),selectedIndex =this.tabs.index(focusedTab ),goingForward =true;if (this._handlePageNav(event ) ) {return;}
switch (event.keyCode ) {case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:selectedIndex++;break;case $.ui.keyCode.UP:case $.ui.keyCode.LEFT:goingForward =false;selectedIndex--;break;case $.ui.keyCode.END:selectedIndex =this.anchors.length - 1;break;case $.ui.keyCode.HOME:selectedIndex =0;break;case $.ui.keyCode.SPACE:event.preventDefault();clearTimeout(this.activating );this._activate(selectedIndex );return;case $.ui.keyCode.ENTER:event.preventDefault();clearTimeout(this.activating );this._activate(selectedIndex ===this.options.active ?false :selectedIndex );return;default:return;}
event.preventDefault();clearTimeout(this.activating );selectedIndex =this._focusNextTab(selectedIndex,goingForward );if (!event.ctrlKey ) {focusedTab.attr("aria-selected","false");this.tabs.eq(selectedIndex ).attr("aria-selected","true");this.activating =this._delay(function() {this.option("active",selectedIndex );},this.delay );}
},_panelKeydown:function(event ) {if (this._handlePageNav(event ) ) {return;}
if (event.ctrlKey &&event.keyCode ===$.ui.keyCode.UP ) {event.preventDefault();this.active.focus();}
},_handlePageNav:function(event ) {if (event.altKey &&event.keyCode ===$.ui.keyCode.PAGE_UP ) {this._activate(this._focusNextTab(this.options.active - 1,false ) );return true;}
if (event.altKey &&event.keyCode ===$.ui.keyCode.PAGE_DOWN ) {this._activate(this._focusNextTab(this.options.active + 1,true ) );return true;}
},_findNextTab:function(index,goingForward ) {var lastTabIndex =this.tabs.length - 1;function constrain() {if (index > lastTabIndex ) {index =0;}
if (index < 0 ) {index =lastTabIndex;}
return index;}
while ($.inArray(constrain(),this.options.disabled ) !==-1 ) {index =goingForward ?index + 1 :index - 1;}
return index;},_focusNextTab:function(index,goingForward ) {index =this._findNextTab(index,goingForward );this.tabs.eq(index ).focus();return index;},_setOption:function(key,value ) {if (key ==="active") {this._activate(value );return;}
if (key ==="disabled") {this._setupDisabled(value );return;}
this._super(key,value);if (key ==="collapsible") {this.element.toggleClass("ui-tabs-collapsible",value );if (!value &&this.options.active ===false ) {this._activate(0 );}
}
if (key ==="event") {this._setupEvents(value );}
if (key ==="heightStyle") {this._setupHeightStyle(value );}
},_tabId:function(tab ) {return tab.attr("aria-controls") ||"ui-tabs-"+ getNextTabId();},_sanitizeSelector:function(hash ) {return hash ?hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
},refresh:function() {var options =this.options,lis =this.tablist.children(":has(a[href])");options.disabled =$.map(lis.filter(".ui-state-disabled"),function(tab ) {return lis.index(tab );});this._processTabs();if (options.active ===false ||!this.anchors.length ) {options.active =false;this.active =$();} else if (this.active.length &&!$.contains(this.tablist[0 ],this.active[0 ] ) ) {if (this.tabs.length ===options.disabled.length ) {options.active =false;this.active =$();} else {this._activate(this._findNextTab(Math.max(0,options.active - 1 ),false ) );}
} else {options.active =this.tabs.index(this.active );}
this._refresh();},_refresh:function() {this._setupDisabled(this.options.disabled );this._setupEvents(this.options.event );this._setupHeightStyle(this.options.heightStyle );this.tabs.not(this.active ).attr({"aria-selected":"false",tabIndex:-1
});this.panels.not(this._getPanelForTab(this.active ) )
.hide()
.attr({"aria-expanded":"false","aria-hidden":"true"});if (!this.active.length ) {this.tabs.eq(0 ).attr("tabIndex",0 );} else {this.active
.addClass("ui-tabs-active ui-state-active")
.attr({"aria-selected":"true",tabIndex:0
});this._getPanelForTab(this.active )
.show()
.attr({"aria-expanded":"true","aria-hidden":"false"});}
},_processTabs:function() {var that =this;this.tablist =this._getList()
.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all")
.attr("role","tablist");this.tabs =this.tablist.find("> li:has(a[href])")
.addClass("ui-state-default ui-corner-top")
.attr({role:"tab",tabIndex:-1
});this.anchors =this.tabs.map(function() {return $("a",this )[0 ];})
.addClass("ui-tabs-anchor")
.attr({role:"presentation",tabIndex:-1
});this.panels =$();this.anchors.each(function(i,anchor ) {var selector,panel,panelId,anchorId =$(anchor ).uniqueId().attr("id"),tab =$(anchor ).closest("li"),originalAriaControls =tab.attr("aria-controls");if (isLocal(anchor ) ) {selector =anchor.hash;panel =that.element.find(that._sanitizeSelector(selector ) );} else {panelId =that._tabId(tab );selector ="#"+ panelId;panel =that.element.find(selector );if (!panel.length ) {panel =that._createPanel(panelId );panel.insertAfter(that.panels[i - 1 ] ||that.tablist );}
panel.attr("aria-live","polite");}
if (panel.length) {that.panels =that.panels.add(panel );}
if (originalAriaControls ) {tab.data("ui-tabs-aria-controls",originalAriaControls );}
tab.attr({"aria-controls":selector.substring(1 ),"aria-labelledby":anchorId
});panel.attr("aria-labelledby",anchorId );});this.panels
.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
.attr("role","tabpanel");},_getList:function() {return this.element.find("ol,ul").eq(0 );},_createPanel:function(id ) {return $("<div>")
.attr("id",id )
.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
.data("ui-tabs-destroy",true );},_setupDisabled:function(disabled ) {if ($.isArray(disabled ) ) {if (!disabled.length ) {disabled =false;} else if (disabled.length ===this.anchors.length ) {disabled =true;}
}
for (var i =0,li;(li =this.tabs[i ] );i++ ) {if (disabled ===true ||$.inArray(i,disabled ) !==-1 ) {$(li )
.addClass("ui-state-disabled")
.attr("aria-disabled","true");} else {$(li )
.removeClass("ui-state-disabled")
.removeAttr("aria-disabled");}
}
this.options.disabled =disabled;},_setupEvents:function(event ) {var events ={click:function(event ) {event.preventDefault();}
};if (event ) {$.each(event.split(" "),function(index,eventName ) {events[eventName ] ="_eventHandler";});}
this._off(this.anchors.add(this.tabs ).add(this.panels ) );this._on(this.anchors,events );this._on(this.tabs,{keydown:"_tabKeydown"} );this._on(this.panels,{keydown:"_panelKeydown"} );this._focusable(this.tabs );this._hoverable(this.tabs );},_setupHeightStyle:function(heightStyle ) {var maxHeight,overflow,parent =this.element.parent();if (heightStyle ==="fill") {if (!$.support.minHeight ) {overflow =parent.css("overflow");parent.css("overflow","hidden");}
maxHeight =parent.height();this.element.siblings(":visible").each(function() {var elem =$(this ),position =elem.css("position");if (position ==="absolute"||position ==="fixed") {return;}
maxHeight -=elem.outerHeight(true );});if (overflow ) {parent.css("overflow",overflow );}
this.element.children().not(this.panels ).each(function() {maxHeight -=$(this ).outerHeight(true );});this.panels.each(function() {$(this ).height(Math.max(0,maxHeight -
$(this ).innerHeight() + $(this ).height() ) );})
.css("overflow","auto");} else if (heightStyle ==="auto") {maxHeight =0;this.panels.each(function() {maxHeight =Math.max(maxHeight,$(this ).height("").height() );}).height(maxHeight );}
},_eventHandler:function(event ) {var options =this.options,active =this.active,anchor =$(event.currentTarget ),tab =anchor.closest("li"),clickedIsActive =tab[0 ] ===active[0 ],collapsing =clickedIsActive &&options.collapsible,toShow =collapsing ?$() :this._getPanelForTab(tab ),toHide =!active.length ?$() :this._getPanelForTab(active ),eventData ={oldTab:active,oldPanel:toHide,newTab:collapsing ?$() :tab,newPanel:toShow
};event.preventDefault();if (tab.hasClass("ui-state-disabled") ||tab.hasClass("ui-tabs-loading") ||this.running ||(clickedIsActive &&!options.collapsible ) ||(this._trigger("beforeActivate",event,eventData ) ===false ) ) {return;}
options.active =collapsing ?false :this.tabs.index(tab );this.active =clickedIsActive ?$() :tab;if (this.xhr ) {this.xhr.abort();}
if (!toHide.length &&!toShow.length ) {$.error("jQuery UI Tabs: Mismatching fragment identifier.");}
if (toShow.length ) {this.load(this.tabs.index(tab ),event );}
this._toggle(event,eventData );},_toggle:function(event,eventData ) {var that =this,toShow =eventData.newPanel,toHide =eventData.oldPanel;this.running =true;function complete() {that.running =false;that._trigger("activate",event,eventData );}
function show() {eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active");if (toShow.length &&that.options.show ) {that._show(toShow,that.options.show,complete );} else {toShow.show();complete();}
}
if (toHide.length &&this.options.hide ) {this._hide(toHide,this.options.hide,function() {eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");show();});} else {eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");toHide.hide();show();}
toHide.attr({"aria-expanded":"false","aria-hidden":"true"});eventData.oldTab.attr("aria-selected","false");if (toShow.length &&toHide.length ) {eventData.oldTab.attr("tabIndex",-1 );} else if (toShow.length ) {this.tabs.filter(function() {return $(this ).attr("tabIndex") ===0;})
.attr("tabIndex",-1 );}
toShow.attr({"aria-expanded":"true","aria-hidden":"false"});eventData.newTab.attr({"aria-selected":"true",tabIndex:0
});},_activate:function(index ) {var anchor,active =this._findActive(index );if (active[0 ] ===this.active[0 ] ) {return;}
if (!active.length ) {active =this.active;}
anchor =active.find(".ui-tabs-anchor")[0 ];this._eventHandler({target:anchor,currentTarget:anchor,preventDefault:$.noop
});},_findActive:function(index ) {return index ===false ?$() :this.tabs.eq(index );},_getIndex:function(index ) {if (typeof index ==="string") {index =this.anchors.index(this.anchors.filter("[href$='"+ index + "']") );}
return index;},_destroy:function() {if (this.xhr ) {this.xhr.abort();}
this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");this.tablist
.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all")
.removeAttr("role");this.anchors
.removeClass("ui-tabs-anchor")
.removeAttr("role")
.removeAttr("tabIndex")
.removeData("href.tabs")
.removeData("load.tabs")
.removeUniqueId();this.tabs.add(this.panels ).each(function() {if ($.data(this,"ui-tabs-destroy") ) {$(this ).remove();} else {$(this )
.removeClass("ui-state-default ui-state-active ui-state-disabled "+
"ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel")
.removeAttr("tabIndex")
.removeAttr("aria-live")
.removeAttr("aria-busy")
.removeAttr("aria-selected")
.removeAttr("aria-labelledby")
.removeAttr("aria-hidden")
.removeAttr("aria-expanded")
.removeAttr("role");}
});this.tabs.each(function() {var li =$(this ),prev =li.data("ui-tabs-aria-controls");if (prev ) {li.attr("aria-controls",prev );} else {li.removeAttr("aria-controls");}
});this.panels.show();if (this.options.heightStyle !=="content") {this.panels.css("height","");}
},enable:function(index ) {var disabled =this.options.disabled;if (disabled ===false ) {return;}
if (index ===undefined ) {disabled =false;} else {index =this._getIndex(index );if ($.isArray(disabled ) ) {disabled =$.map(disabled,function(num ) {return num !==index ?num :null;});} else {disabled =$.map(this.tabs,function(li,num ) {return num !==index ?num :null;});}
}
this._setupDisabled(disabled );},disable:function(index ) {var disabled =this.options.disabled;if (disabled ===true ) {return;}
if (index ===undefined ) {disabled =true;} else {index =this._getIndex(index );if ($.inArray(index,disabled ) !==-1 ) {return;}
if ($.isArray(disabled ) ) {disabled =$.merge([index ],disabled ).sort();} else {disabled =[index ];}
}
this._setupDisabled(disabled );},load:function(index,event ) {index =this._getIndex(index );var that =this,tab =this.tabs.eq(index ),anchor =tab.find(".ui-tabs-anchor"),panel =this._getPanelForTab(tab ),eventData ={tab:tab,panel:panel
};if (isLocal(anchor[0 ] ) ) {return;}
this.xhr =$.ajax(this._ajaxSettings(anchor,event,eventData ) );if (this.xhr &&this.xhr.statusText !=="canceled") {tab.addClass("ui-tabs-loading");panel.attr("aria-busy","true");this.xhr
.success(function(response ) {setTimeout(function() {panel.html(response );that._trigger("load",event,eventData );},1 );})
.complete(function(jqXHR,status ) {setTimeout(function() {if (status ==="abort") {that.panels.stop(false,true );}
tab.removeClass("ui-tabs-loading");panel.removeAttr("aria-busy");if (jqXHR ===that.xhr ) {delete that.xhr;}
},1 );});}
},_ajaxSettings:function(anchor,event,eventData ) {var that =this;return {url:anchor.attr("href"),beforeSend:function(jqXHR,settings ) {return that._trigger("beforeLoad",event,$.extend({jqXHR :jqXHR,ajaxSettings:settings },eventData ) );}
};},_getPanelForTab:function(tab ) {var id =$(tab ).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+ id ) );}
});if ($.uiBackCompat !==false ) {$.ui.tabs.prototype._ui =function(tab,panel ) {return {tab:tab,panel:panel,index:this.anchors.index(tab )
};};$.widget("ui.tabs",$.ui.tabs,{url:function(index,url ) {this.anchors.eq(index ).attr("href",url );}
});$.widget("ui.tabs",$.ui.tabs,{options:{ajaxOptions:null,cache:false
},_create:function() {this._super();var that =this;this._on({tabsbeforeload:function(event,ui ) {if ($.data(ui.tab[0 ],"cache.tabs") ) {event.preventDefault();return;}
ui.jqXHR.success(function() {if (that.options.cache ) {$.data(ui.tab[0 ],"cache.tabs",true );}
});}});},_ajaxSettings:function(anchor,event,ui ) {var ajaxOptions =this.options.ajaxOptions;return $.extend({},ajaxOptions,{error:function(xhr,status ) {try {ajaxOptions.error(xhr,status,ui.tab.closest("li").index(),ui.tab[0 ] );}
catch (error ) {}
}
},this._superApply(arguments ) );},_setOption:function(key,value ) {if (key ==="cache"&&value ===false ) {this.anchors.removeData("cache.tabs");}
this._super(key,value );},_destroy:function() {this.anchors.removeData("cache.tabs");this._super();},url:function(index ){this.anchors.eq(index ).removeData("cache.tabs");this._superApply(arguments );}
});$.widget("ui.tabs",$.ui.tabs,{abort:function() {if (this.xhr ) {this.xhr.abort();}
}
});$.widget("ui.tabs",$.ui.tabs,{options:{spinner:"<em>Loading&#8230;</em>"},_create:function() {this._super();this._on({tabsbeforeload:function(event,ui ) {if (event.target !==this.element[0 ] ||!this.options.spinner ) {return;}
var span =ui.tab.find("span"),html =span.html();span.html(this.options.spinner );ui.jqXHR.complete(function() {span.html(html );});}
});}
});$.widget("ui.tabs",$.ui.tabs,{options:{enable:null,disable:null
},enable:function(index ) {var options =this.options,trigger;if (index &&options.disabled ===true ||($.isArray(options.disabled ) &&$.inArray(index,options.disabled ) !==-1 ) ) {trigger =true;}
this._superApply(arguments );if (trigger ) {this._trigger("enable",null,this._ui(this.anchors[index ],this.panels[index ] ) );}
},disable:function(index ) {var options =this.options,trigger;if (index &&options.disabled ===false ||($.isArray(options.disabled ) &&$.inArray(index,options.disabled ) ===-1 ) ) {trigger =true;}
this._superApply(arguments );if (trigger ) {this._trigger("disable",null,this._ui(this.anchors[index ],this.panels[index ] ) );}
}
});$.widget("ui.tabs",$.ui.tabs,{options:{add:null,remove:null,tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},add:function(url,label,index ) {if (index ===undefined ) {index =this.anchors.length;}
var doInsertAfter,panel,options =this.options,li =$(options.tabTemplate
.replace(/#\{href\}/g, url )
.replace(/#\{label\}/g, label ) ),
id =!url.indexOf("#") ?url.replace("#","") :this._tabId(li );li.addClass("ui-state-default ui-corner-top").data("ui-tabs-destroy",true );li.attr("aria-controls",id );doInsertAfter =index >=this.tabs.length;panel =this.element.find("#"+ id );if (!panel.length ) {panel =this._createPanel(id );if (doInsertAfter ) {if (index > 0 ) {panel.insertAfter(this.panels.eq(-1 ) );} else {panel.appendTo(this.element );}
} else {panel.insertBefore(this.panels[index ] );}
}
panel.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").hide();if (doInsertAfter ) {li.appendTo(this.tablist );} else {li.insertBefore(this.tabs[index ] );}
options.disabled =$.map(options.disabled,function(n ) {return n >=index ?++n :n;});this.refresh();if (this.tabs.length ===1 &&options.active ===false ) {this.option("active",0 );}
this._trigger("add",null,this._ui(this.anchors[index ],this.panels[index ] ) );return this;},remove:function(index ) {index =this._getIndex(index );var options =this.options,tab =this.tabs.eq(index ).remove(),panel =this._getPanelForTab(tab ).remove();if (tab.hasClass("ui-tabs-active") &&this.anchors.length > 2 ) {this._activate(index + (index + 1 < this.anchors.length ?1 :-1 ) );}
options.disabled =$.map($.grep(options.disabled,function(n ) {return n !==index;}),function(n ) {return n >=index ?--n :n;});this.refresh();this._trigger("remove",null,this._ui(tab.find("a")[0 ],panel[0 ] ) );return this;}
});$.widget("ui.tabs",$.ui.tabs,{length:function() {return this.anchors.length;}
});$.widget("ui.tabs",$.ui.tabs,{options:{idPrefix:"ui-tabs-"},_tabId:function(tab ) {var a =tab.is("li") ?tab.find("a[href]") :tab;a =a[0];return $(a ).closest("li").attr("aria-controls") ||a.title &&a.title.replace(/\s/g, "_" ).replace( /[^\w\u00c0-\uFFFF\-]/g, "" ) ||
this.options.idPrefix + getNextTabId();}
});$.widget("ui.tabs",$.ui.tabs,{options:{panelTemplate:"<div></div>"},_createPanel:function(id ) {return $(this.options.panelTemplate )
.attr("id",id )
.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
.data("ui-tabs-destroy",true );}
});$.widget("ui.tabs",$.ui.tabs,{_create:function() {var options =this.options;if (options.active ===null &&options.selected !==undefined ) {options.active =options.selected ===-1 ?false :options.selected;}
this._super();options.selected =options.active;if (options.selected ===false ) {options.selected =-1;}
},_setOption:function(key,value ) {if (key !=="selected") {return this._super(key,value );}
var options =this.options;this._super("active",value ===-1 ?false :value );options.selected =options.active;if (options.selected ===false ) {options.selected =-1;}
},_eventHandler:function() {this._superApply(arguments );this.options.selected =this.options.active;if (this.options.selected ===false ) {this.options.selected =-1;}
}
});$.widget("ui.tabs",$.ui.tabs,{options:{show:null,select:null
},_create:function() {this._super();if (this.options.active !==false ) {this._trigger("show",null,this._ui(this.active.find(".ui-tabs-anchor")[0 ],this._getPanelForTab(this.active )[0 ] ) );}
},_trigger:function(type,event,data ) {var tab,panel,ret =this._superApply(arguments );if (!ret ) {return false;}
if (type ==="beforeActivate") {tab =data.newTab.length ?data.newTab :data.oldTab;panel =data.newPanel.length ?data.newPanel :data.oldPanel;ret =this._super("select",event,{tab:tab.find(".ui-tabs-anchor")[0],panel:panel[0 ],index:tab.closest("li").index()
});} else if (type ==="activate"&&data.newTab.length ) {ret =this._super("show",event,{tab:data.newTab.find(".ui-tabs-anchor")[0 ],panel:data.newPanel[0 ],index:data.newTab.closest("li").index()
});}
return ret;}
});$.widget("ui.tabs",$.ui.tabs,{select:function(index ) {index =this._getIndex(index );if (index ===-1 ) {if (this.options.collapsible &&this.options.selected !==-1 ) {index =this.options.selected;} else {return;}
}
this.anchors.eq(index ).trigger(this.options.event + this.eventNamespace );}
});(function() {var listId =0;$.widget("ui.tabs",$.ui.tabs,{options:{cookie:null },_create:function() {var options =this.options,active;if (options.active ==null &&options.cookie ) {active =parseInt(this._cookie(),10 );if (active ===-1 ) {active =false;}
options.active =active;}
this._super();},_cookie:function(active ) {var cookie =[this.cookie ||(this.cookie =this.options.cookie.name ||"ui-tabs-"+ (++listId) ) ];if (arguments.length ) {cookie.push(active ===false ?-1 :active );cookie.push(this.options.cookie );}
return $.cookie.apply(null,cookie );},_refresh:function() {this._super();if (this.options.cookie ) {this._cookie(this.options.active,this.options.cookie );}
},_eventHandler:function() {this._superApply(arguments );if (this.options.cookie ) {this._cookie(this.options.active,this.options.cookie );}
},_destroy:function() {this._super();if (this.options.cookie ) {this._cookie(null,this.options.cookie );}
}
});})();$.widget("ui.tabs",$.ui.tabs,{_trigger:function(type,event,data ) {var _data =$.extend({},data );if (type ==="load") {_data.panel =_data.panel[0 ];_data.tab =_data.tab.find(".ui-tabs-anchor")[0 ];}
return this._super(type,event,_data );}
});$.widget("ui.tabs",$.ui.tabs,{options:{fx:null },_getFx:function() {var hide,show,fx =this.options.fx;if (fx ) {if ($.isArray(fx ) ) {hide =fx[0 ];show =fx[1 ];} else {hide =show =fx;}
}
return fx ?{show:show,hide:hide } :null;},_toggle:function(event,eventData ) {var that =this,toShow =eventData.newPanel,toHide =eventData.oldPanel,fx =this._getFx();if (!fx ) {return this._super(event,eventData );}
that.running =true;function complete() {that.running =false;that._trigger("activate",event,eventData );}
function show() {eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active");if (toShow.length &&fx.show ) {toShow
.animate(fx.show,fx.show.duration,function() {complete();});} else {toShow.show();complete();}
}
if (toHide.length &&fx.hide ) {toHide.animate(fx.hide,fx.hide.duration,function() {eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");show();});} else {eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");toHide.hide();show();}
}
});}
})(jQuery );(function($ ) {var increments =0;function addDescribedBy(elem,id ) {var describedby =(elem.attr("aria-describedby") ||"").split(/\s+/ );
describedby.push(id );elem
.data("ui-tooltip-id",id )
.attr("aria-describedby",$.trim(describedby.join(" ") ) );}
function removeDescribedBy(elem ) {var id =elem.data("ui-tooltip-id"),describedby =(elem.attr("aria-describedby") ||"").split(/\s+/ ),
index =$.inArray(id,describedby );if (index !==-1 ) {describedby.splice(index,1 );}
elem.removeData("ui-tooltip-id");describedby =$.trim(describedby.join(" ") );if (describedby ) {elem.attr("aria-describedby",describedby );} else {elem.removeAttr("aria-describedby");}
}
$.widget("ui.tooltip",{version:"1.9.2",options:{content:function() {return $(this ).attr("title");},hide:true,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:true,tooltipClass:null,track:false,close:null,open:null
},_create:function() {this._on({mouseover:"open",focusin:"open"});this.tooltips ={};this.parents ={};if (this.options.disabled ) {this._disable();}
},_setOption:function(key,value ) {var that =this;if (key ==="disabled") {this[value ?"_disable":"_enable"]();this.options[key ] =value;return;}
this._super(key,value );if (key ==="content") {$.each(this.tooltips,function(id,element ) {that._updateContent(element );});}
},_disable:function() {var that =this;$.each(this.tooltips,function(id,element ) {var event =$.Event("blur");event.target =event.currentTarget =element[0];that.close(event,true );});this.element.find(this.options.items ).andSelf().each(function() {var element =$(this );if (element.is("[title]") ) {element
.data("ui-tooltip-title",element.attr("title") )
.attr("title","");}
});},_enable:function() {this.element.find(this.options.items ).andSelf().each(function() {var element =$(this );if (element.data("ui-tooltip-title") ) {element.attr("title",element.data("ui-tooltip-title") );}
});},open:function(event ) {var that =this,target =$(event ?event.target :this.element )
.closest(this.options.items );if (!target.length ||target.data("ui-tooltip-id") ) {return;}
if (target.attr("title") ) {target.data("ui-tooltip-title",target.attr("title") );}
target.data("ui-tooltip-open",true );if (event &&event.type ==="mouseover") {target.parents().each(function() {var parent =$(this ),blurEvent;if (parent.data("ui-tooltip-open") ) {blurEvent =$.Event("blur");blurEvent.target =blurEvent.currentTarget =this;that.close(blurEvent,true );}
if (parent.attr("title") ) {parent.uniqueId();that.parents[this.id ] ={element:this,title:parent.attr("title")
};parent.attr("title","");}
});}
this._updateContent(target,event );},_updateContent:function(target,event ) {var content,contentOption =this.options.content,that =this,eventType =event ?event.type :null;if (typeof contentOption ==="string") {return this._open(event,target,contentOption );}
content =contentOption.call(target[0],function(response ) {if (!target.data("ui-tooltip-open") ) {return;}
that._delay(function() {if (event ) {event.type =eventType;}
this._open(event,target,response );});});if (content ) {this._open(event,target,content );}
},_open:function(event,target,content ) {var tooltip,events,delayedShow,positionOption =$.extend({},this.options.position );if (!content ) {return;}
tooltip =this._find(target );if (tooltip.length ) {tooltip.find(".ui-tooltip-content").html(content );return;}
if (target.is("[title]") ) {if (event &&event.type ==="mouseover") {target.attr("title","");} else {target.removeAttr("title");}
}
tooltip =this._tooltip(target );addDescribedBy(target,tooltip.attr("id") );tooltip.find(".ui-tooltip-content").html(content );function position(event ) {positionOption.of =event;if (tooltip.is(":hidden") ) {return;}
tooltip.position(positionOption );}
if (this.options.track &&event &&/^mouse/.test( event.type ) ) {
this._on(this.document,{mousemove:position
});position(event );} else {tooltip.position($.extend({of:target
},this.options.position ) );}
tooltip.hide();this._show(tooltip,this.options.show );if (this.options.show &&this.options.show.delay ) {delayedShow =setInterval(function() {if (tooltip.is(":visible") ) {position(positionOption.of );clearInterval(delayedShow );}
},$.fx.interval );}
this._trigger("open",event,{tooltip:tooltip } );events ={keyup:function(event ) {if (event.keyCode ===$.ui.keyCode.ESCAPE ) {var fakeEvent =$.Event(event);fakeEvent.currentTarget =target[0];this.close(fakeEvent,true );}
},remove:function() {this._removeTooltip(tooltip );}
};if (!event ||event.type ==="mouseover") {events.mouseleave ="close";}
if (!event ||event.type ==="focusin") {events.focusout ="close";}
this._on(true,target,events );},close:function(event ) {var that =this,target =$(event ?event.currentTarget :this.element ),tooltip =this._find(target );if (this.closing ) {return;}
if (target.data("ui-tooltip-title") ) {target.attr("title",target.data("ui-tooltip-title") );}
removeDescribedBy(target );tooltip.stop(true );this._hide(tooltip,this.options.hide,function() {that._removeTooltip($(this ) );});target.removeData("ui-tooltip-open");this._off(target,"mouseleave focusout keyup");if (target[0] !==this.element[0] ) {this._off(target,"remove");}
this._off(this.document,"mousemove");if (event &&event.type ==="mouseleave") {$.each(this.parents,function(id,parent ) {$(parent.element ).attr("title",parent.title );delete that.parents[id ];});}
this.closing =true;this._trigger("close",event,{tooltip:tooltip } );this.closing =false;},_tooltip:function(element ) {var id ="ui-tooltip-"+ increments++,tooltip =$("<div>")
.attr({id:id,role:"tooltip"})
.addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+
(this.options.tooltipClass ||"") );$("<div>")
.addClass("ui-tooltip-content")
.appendTo(tooltip );tooltip.appendTo(this.document[0].body );if ($.fn.bgiframe ) {tooltip.bgiframe();}
this.tooltips[id ] =element;return tooltip;},_find:function(target ) {var id =target.data("ui-tooltip-id");return id ?$("#"+ id ) :$();},_removeTooltip:function(tooltip ) {tooltip.remove();delete this.tooltips[tooltip.attr("id") ];},_destroy:function() {var that =this;$.each(this.tooltips,function(id,element ) {var event =$.Event("blur");event.target =event.currentTarget =element[0];that.close(event,true );$("#"+ id ).remove();if (element.data("ui-tooltip-title") ) {element.attr("title",element.data("ui-tooltip-title") );element.removeData("ui-tooltip-title");}
});}
});}(jQuery ) );(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip=this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext=g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this,c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0},get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)),c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g):this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<=this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&&!this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)};this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped=!1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext),this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState=a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!==null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")},dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments,1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
;(function($) {"use strict";var feature ={};feature.fileapi =$("<input type='file'/>").get(0).files !==undefined;feature.formdata =window.FormData !==undefined;$.fn.ajaxSubmit =function(options) {if (!this.length) {log('ajaxSubmit: skipping submit process - no element selected');return this;}
 var method,action,url,$form =this;if (typeof options =='function') {options ={success:options };}
 method =this.attr('method');action =this.attr('action');url =(typeof action ==='string') ?$.trim(action) :'';url =url ||window.location.href ||'';if (url) {url =(url.match(/^([^#]+)/)||[])[1];
 }
 options =$.extend(true,{url:url,success:$.ajaxSettings.success,type:method ||'GET',iframeSrc:/^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
 },options);var veto ={};this.trigger('form-pre-serialize',[this,options,veto]);if (veto.veto) {log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
 if (options.beforeSerialize &&options.beforeSerialize(this,options) ===false) {log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
 var traditional =options.traditional;if (traditional ===undefined ) {traditional =$.ajaxSettings.traditional;}
 var elements =[];var qx,a =this.formToArray(options.semantic,elements);if (options.data) {options.extraData =options.data;qx =$.param(options.data,traditional);}
 if (options.beforeSubmit &&options.beforeSubmit(a,this,options) ===false) {log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
 this.trigger('form-submit-validate',[a,this,options,veto]);if (veto.veto) {log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
 var q =$.param(a,traditional);if (qx) {q =(q ?(q + '&'+ qx) :qx );} if (options.type.toUpperCase() =='GET') {options.url +=(options.url.indexOf('?') >=0 ?'&':'?') + q;options.data =null;}
 else {options.data =q;}
 var callbacks =[];if (options.resetForm) {callbacks.push(function() {$form.resetForm();});}
 if (options.clearForm) {callbacks.push(function() {$form.clearForm(options.includeHidden);});}
 if (!options.dataType &&options.target) {var oldSuccess =options.success ||function(){};callbacks.push(function(data) {var fn =options.replaceTarget ?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
 else if (options.success) {callbacks.push(options.success);}
 options.success =function(data,status,xhr) {var context =options.context ||options;for (var i=0,max=callbacks.length;i < max;i++) {callbacks[i].apply(context,[data,status,xhr ||$form,$form]);}
 };var fileInputs =$('input:file:enabled[value]',this);var hasFileInputs =fileInputs.length > 0;var mp ='multipart/form-data';var multipart =($form.attr('enctype') ==mp ||$form.attr('encoding') ==mp);var fileAPI =feature.fileapi &&feature.formdata;log("fileAPI :"+ fileAPI);var shouldUseFrame =(hasFileInputs ||multipart) &&!fileAPI;if (options.iframe !==false &&(options.iframe ||shouldUseFrame)) {if (options.closeKeepAlive) {$.get(options.closeKeepAlive,function() {fileUploadIframe(a);});}
 else {fileUploadIframe(a);}
 }
 else if ((hasFileInputs ||multipart) &&fileAPI) {fileUploadXhr(a);}
 else {$.ajax(options);}
 for (var k=0;k < elements.length;k++)
 elements[k] =null;this.trigger('form-submit-notify',[this,options]);return this;function fileUploadXhr(a) {var formdata =new FormData();for (var i=0;i < a.length;i++) {formdata.append(a[i].name,a[i].value);}
 if (options.extraData) {for (var p in options.extraData)
 if (options.extraData.hasOwnProperty(p))
 formdata.append(p,options.extraData[p]);}
 options.data =null;var s =$.extend(true,{},$.ajaxSettings,options,{contentType:false,processData:false,cache:false,type:'POST'});if (options.uploadProgress) {s.xhr =function() {var xhr =jQuery.ajaxSettings.xhr();if (xhr.upload) {xhr.upload.onprogress =function(event) {var percent =0;var position =event.loaded ||event.position;var total =event.total;if (event.lengthComputable) {percent =Math.ceil(position / total * 100);}
 options.uploadProgress(event,position,total,percent);};}
 return xhr;};}
 s.data =null;var beforeSend =s.beforeSend;s.beforeSend =function(xhr,o) {o.data =formdata;if(beforeSend)
 beforeSend.call(o,xhr,options);};$.ajax(s);}
 function fileUploadIframe(a) {var form =$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var useProp =!!$.fn.prop;if ($(':input[name=submit],:input[id=submit]',form).length) {alert('Error: Form elements must not have name or id of "submit".');return;}
 if (a) {for (i=0;i < elements.length;i++) {el =$(elements[i]);if (useProp )
 el.prop('disabled',false);else
 el.removeAttr('disabled');}
 }
 s =$.extend(true,{},$.ajaxSettings,options);s.context =s.context ||s;id ='jqFormIO'+ (new Date().getTime());if (s.iframeTarget) {$io =$(s.iframeTarget);n =$io.attr('name');if (!n)
 $io.attr('name',id);else
 id =n;}
 else {$io =$('<iframe name="'+ id + '" src="'+ s.iframeSrc +'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
 io =$io[0];xhr ={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function() {},getResponseHeader:function() {},setRequestHeader:function() {},abort:function(status) {var e =(status ==='timeout'?'timeout':'aborted');log('aborting upload... '+ e);this.aborted =1;$io.attr('src',s.iframeSrc);xhr.error =e;if (s.error)
 s.error.call(s.context,xhr,e,status);if (g)
 $.event.trigger("ajaxError",[xhr,s,e]);if (s.complete)
 s.complete.call(s.context,xhr,e);}
 };g =s.global;if (g &&0 ===$.active++) {$.event.trigger("ajaxStart");}
 if (g) {$.event.trigger("ajaxSend",[xhr,s]);}
 if (s.beforeSend &&s.beforeSend.call(s.context,xhr,s) ===false) {if (s.global) {$.active--;}
 return;}
 if (xhr.aborted) {return;}
 sub =form.clk;if (sub) {n =sub.name;if (n &&!sub.disabled) {s.extraData =s.extraData ||{};s.extraData[n] =sub.value;if (sub.type =="image") {s.extraData[n+'.x'] =form.clk_x;s.extraData[n+'.y'] =form.clk_y;}
 }
 }
 var CLIENT_TIMEOUT_ABORT =1;var SERVER_ABORT =2;function getDoc(frame) {var doc =frame.contentWindow ?frame.contentWindow.document :frame.contentDocument ?frame.contentDocument :frame.document;return doc;}
 var csrf_token =$('meta[name=csrf-token]').attr('content');var csrf_param =$('meta[name=csrf-param]').attr('content');if (csrf_param &&csrf_token) {s.extraData =s.extraData ||{};s.extraData[csrf_param] =csrf_token;}
 function doSubmit() {var t =$form.attr('target'),a =$form.attr('action');form.setAttribute('target',id);if (!method) {form.setAttribute('method','POST');}
 if (a !=s.url) {form.setAttribute('action',s.url);}
 if (!s.skipEncodingOverride &&(!method ||/post/i.test(method))) {
 $form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
 if (s.timeout) {timeoutHandle =setTimeout(function() {timedOut =true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
 function checkState() {try {var state =getDoc(io).readyState;log('state = '+ state);if (state &&state.toLowerCase() =='uninitialized')
 setTimeout(checkState,50);}
 catch(e) {log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);if (timeoutHandle)
 clearTimeout(timeoutHandle);timeoutHandle =undefined;}
 }
 var extraInputs =[];try {if (s.extraData) {for (var n in s.extraData) {if (s.extraData.hasOwnProperty(n)) {extraInputs.push($('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n])
 .appendTo(form)[0]);}
 }
 }
 if (!s.iframeTarget) {$io.appendTo('body');if (io.attachEvent)
 io.attachEvent('onload',cb);else
 io.addEventListener('load',cb,false);}
 setTimeout(checkState,15);form.submit();}
 finally {form.setAttribute('action',a);if(t) {form.setAttribute('target',t);} else {$form.removeAttr('target');}
 $(extraInputs).remove();}
 }
 if (s.forceSync) {doSubmit();}
 else {setTimeout(doSubmit,10);}
 var data,doc,domCheckCount =50,callbackProcessed;function cb(e) {if (xhr.aborted ||callbackProcessed) {return;}
 try {doc =getDoc(io);}
 catch(ex) {log('cannot access response document: ',ex);e =SERVER_ABORT;}
 if (e ===CLIENT_TIMEOUT_ABORT &&xhr) {xhr.abort('timeout');return;}
 else if (e ==SERVER_ABORT &&xhr) {xhr.abort('server abort');return;}
 if (!doc ||doc.location.href ==s.iframeSrc) {if (!timedOut)
 return;}
 if (io.detachEvent)
 io.detachEvent('onload',cb);else io.removeEventListener('load',cb,false);var status ='success',errMsg;try {if (timedOut) {throw 'timeout';}
 var isXml =s.dataType =='xml'||doc.XMLDocument ||$.isXMLDoc(doc);log('isXml='+isXml);if (!isXml &&window.opera &&(doc.body ===null ||!doc.body.innerHTML)) {if (--domCheckCount) {log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}
 }
 var docRoot =doc.body ?doc.body :doc.documentElement;xhr.responseText =docRoot ?docRoot.innerHTML :null;xhr.responseXML =doc.XMLDocument ?doc.XMLDocument :doc;if (isXml)
 s.dataType ='xml';xhr.getResponseHeader =function(header){var headers ={'content-type':s.dataType};return headers[header];};if (docRoot) {xhr.status =Number(docRoot.getAttribute('status') ) ||xhr.status;xhr.statusText =docRoot.getAttribute('statusText') ||xhr.statusText;}
 var dt =(s.dataType ||'').toLowerCase();var scr =/(json|script|text)/.test(dt);
 if (scr ||s.textarea) {var ta =doc.getElementsByTagName('textarea')[0];if (ta) {xhr.responseText =ta.value;xhr.status =Number(ta.getAttribute('status') ) ||xhr.status;xhr.statusText =ta.getAttribute('statusText') ||xhr.statusText;}
 else if (scr) {var pre =doc.getElementsByTagName('pre')[0];var b =doc.getElementsByTagName('body')[0];if (pre) {xhr.responseText =pre.textContent ?pre.textContent :pre.innerText;}
 else if (b) {xhr.responseText =b.textContent ?b.textContent :b.innerText;}
 }
 }
 else if (dt =='xml'&&!xhr.responseXML &&xhr.responseText) {xhr.responseXML =toXml(xhr.responseText);}
 try {data =httpData(xhr,dt,s);}
 catch (e) {status ='parsererror';xhr.error =errMsg =(e ||status);}
 }
 catch (e) {log('error caught: ',e);status ='error';xhr.error =errMsg =(e ||status);}
 if (xhr.aborted) {log('upload aborted');status =null;}
 if (xhr.status) {status =(xhr.status >=200 &&xhr.status < 300 ||xhr.status ===304) ?'success':'error';}
 if (status ==='success') {if (s.success)
 s.success.call(s.context,data,'success',xhr);if (g)
 $.event.trigger("ajaxSuccess",[xhr,s]);}
 else if (status) {if (errMsg ===undefined)
 errMsg =xhr.statusText;if (s.error)
 s.error.call(s.context,xhr,status,errMsg);if (g)
 $.event.trigger("ajaxError",[xhr,s,errMsg]);}
 if (g)
 $.event.trigger("ajaxComplete",[xhr,s]);if (g &&!--$.active) {$.event.trigger("ajaxStop");}
 if (s.complete)
 s.complete.call(s.context,xhr,status);callbackProcessed =true;if (s.timeout)
 clearTimeout(timeoutHandle);setTimeout(function() {if (!s.iframeTarget)
 $io.remove();xhr.responseXML =null;},100);}
 var toXml =$.parseXML ||function(s,doc) {if (window.ActiveXObject) {doc =new ActiveXObject('Microsoft.XMLDOM');doc.async ='false';doc.loadXML(s);}
 else {doc =(new DOMParser()).parseFromString(s,'text/xml');}
 return (doc &&doc.documentElement &&doc.documentElement.nodeName !='parsererror') ?doc :null;};var parseJSON =$.parseJSON ||function(s) {return window['eval']('('+ s + ')');};var httpData =function(xhr,type,s ) {var ct =xhr.getResponseHeader('content-type') ||'',xml =type ==='xml'||!type &&ct.indexOf('xml') >=0,data =xml ?xhr.responseXML :xhr.responseText;if (xml &&data.documentElement.nodeName ==='parsererror') {if ($.error)
 $.error('parsererror');}
 if (s &&s.dataFilter) {data =s.dataFilter(data,type);}
 if (typeof data ==='string') {if (type ==='json'||!type &&ct.indexOf('json') >=0) {data =parseJSON(data);} else if (type ==="script"||!type &&ct.indexOf("javascript") >=0) {$.globalEval(data);}
 }
 return data;};}
};$.fn.ajaxForm =function(options) {options =options ||{};options.delegation =options.delegation &&$.isFunction($.fn.on);if (!options.delegation &&this.length ===0) {var o ={s:this.selector,c:this.context };if (!$.isReady &&o.s) {log('DOM not ready, queuing ajaxForm');$(function() {$(o.s,o.c).ajaxForm(options);});return this;}
 log('terminating; zero elements found by selector'+ ($.isReady ?'':' (DOM not ready)'));return this;}
 if (options.delegation ) {$(document)
 .off('submit.form-plugin',this.selector,doAjaxSubmit)
 .off('click.form-plugin',this.selector,captureSubmittingElement)
 .on('submit.form-plugin',this.selector,options,doAjaxSubmit)
 .on('click.form-plugin',this.selector,options,captureSubmittingElement);return this;}
 return this.ajaxFormUnbind()
 .bind('submit.form-plugin',options,doAjaxSubmit)
 .bind('click.form-plugin',options,captureSubmittingElement);};function doAjaxSubmit(e) {var options =e.data;if (!e.isDefaultPrevented()) {e.preventDefault();$(this).ajaxSubmit(options);}
}
 function captureSubmittingElement(e) {var target =e.target;var $el =$(target);if (!($el.is(":submit,input:image"))) {var t =$el.closest(':submit');if (t.length ===0) {return;}
 target =t[0];}
 var form =this;form.clk =target;if (target.type =='image') {if (e.offsetX !==undefined) {form.clk_x =e.offsetX;form.clk_y =e.offsetY;} else if (typeof $.fn.offset =='function') {var offset =$el.offset();form.clk_x =e.pageX - offset.left;form.clk_y =e.pageY - offset.top;} else {form.clk_x =e.pageX - target.offsetLeft;form.clk_y =e.pageY - target.offsetTop;}
 }
 setTimeout(function() {form.clk =form.clk_x =form.clk_y =null;},100);}
$.fn.ajaxFormUnbind =function() {return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray =function(semantic,elements) {var a =[];if (this.length ===0) {return a;}
 var form =this[0];var els =semantic ?form.getElementsByTagName('*') :form.elements;if (!els) {return a;}
 var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i < max;i++) {el =els[i];n =el.name;if (!n) {continue;}
 if (semantic &&form.clk &&el.type =="image") {if(!el.disabled &&form.clk ==el) {a.push({name:n,value:$(el).val(),type:el.type });a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
 continue;}
 v =$.fieldValue(el,true);if (v &&v.constructor ==Array) {if (elements) elements.push(el);for(j=0,jmax=v.length;j < jmax;j++) {a.push({name:n,value:v[j]});}
 }
 else if (feature.fileapi &&el.type =='file'&&!el.disabled) {if (elements) elements.push(el);var files =el.files;if (files.length) {for (j=0;j < files.length;j++) {a.push({name:n,value:files[j],type:el.type});}
 }
 else {a.push({name:n,value:'',type:el.type });}
 }
 else if (v !==null &&typeof v !='undefined') {if (elements) elements.push(el);a.push({name:n,value:v,type:el.type,required:el.required});}
 }
 if (!semantic &&form.clk) {var $input =$(form.clk),input =$input[0];n =input.name;if (n &&!input.disabled &&input.type =='image') {a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
 }
 return a;};$.fn.formSerialize =function(semantic) {return $.param(this.formToArray(semantic));};$.fn.fieldSerialize =function(successful) {var a =[];this.each(function() {var n =this.name;if (!n) {return;}
 var v =$.fieldValue(this,successful);if (v &&v.constructor ==Array) {for (var i=0,max=v.length;i < max;i++) {a.push({name:n,value:v[i]});}
 }
 else if (v !==null &&typeof v !='undefined') {a.push({name:this.name,value:v});}
 });return $.param(a);};$.fn.fieldValue =function(successful) {for (var val=[],i=0,max=this.length;i < max;i++) {var el =this[i];var v =$.fieldValue(el,successful);if (v ===null ||typeof v =='undefined'||(v.constructor ==Array &&!v.length)) {continue;}
 if (v.constructor ==Array)
 $.merge(val,v);else
 val.push(v);}
 return val;};$.fieldValue =function(el,successful) {var n =el.name,t =el.type,tag =el.tagName.toLowerCase();if (successful ===undefined) {successful =true;}
 if (successful &&(!n ||el.disabled ||t =='reset'||t =='button'||(t =='checkbox'||t =='radio') &&!el.checked ||(t =='submit'||t =='image') &&el.form &&el.form.clk !=el ||tag =='select'&&el.selectedIndex ==-1)) {return null;}
 if (tag =='select') {var index =el.selectedIndex;if (index < 0) {return null;}
 var a =[],ops =el.options;var one =(t =='select-one');var max =(one ?index+1 :ops.length);for(var i=(one ?index :0);i < max;i++) {var op =ops[i];if (op.selected) {var v =op.value;if (!v) {v =(op.attributes &&op.attributes['value'] &&!(op.attributes['value'].specified)) ?op.text :op.value;}
 if (one) {return v;}
 a.push(v);}
 }
 return a;}
 return $(el).val();};$.fn.clearForm =function(includeHidden) {return this.each(function() {$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields =$.fn.clearInputs =function(includeHidden) {var re =/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
 return this.each(function() {var t =this.type,tag =this.tagName.toLowerCase();if (re.test(t) ||tag =='textarea') {this.value ='';}
 else if (t =='checkbox'||t =='radio') {this.checked =false;}
 else if (tag =='select') {this.selectedIndex =-1;}
 else if (includeHidden) {if ((includeHidden ===true &&/hidden/.test(t)) ||
 (typeof includeHidden =='string'&&$(this).is(includeHidden)) )
 this.value ='';}
 });};$.fn.resetForm =function() {return this.each(function() {if (typeof this.reset =='function'||(typeof this.reset =='object'&&!this.reset.nodeType)) {this.reset();}
 });};$.fn.enable =function(b) {if (b ===undefined) {b =true;}
 return this.each(function() {this.disabled =!b;});};$.fn.selected =function(select) {if (select ===undefined) {select =true;}
 return this.each(function() {var t =this.type;if (t =='checkbox'||t =='radio') {this.checked =select;}
 else if (this.tagName.toLowerCase() =='option') {var $sel =$(this).parent('select');if (select &&$sel[0] &&$sel[0].type =='select-one') {$sel.find('option').selected(false);}
 this.selected =select;}
 });};$.fn.ajaxSubmit.debug =false;function log() {if (!$.fn.ajaxSubmit.debug) return;var msg ='[jquery.form] '+ Array.prototype.join.call(arguments,'');if (window.console &&window.console.log) {window.console.log(msg);}
 else if (window.opera &&window.opera.postError) {window.opera.postError(msg);}
}
})(jQuery);!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});
ACC.articlecode ={bindAll:function ()
{this.bindEditArticleCodeButton();this.bindArticleCodeChanged();this.bindRemoveArticleCode();this.bindCSVDownload();},bindCSVDownload:function ()
{$('#csv-download-btn').on("click",function()
 {$.fileDownload(articleCodeDownloadUrl,{type:'GET'})
 .done(function (url) {alert('SUCESS with URL  '+ url);})
 .fail(function (data,url) {alert('Download failed. Please contact your support.'+ data + ' URL '+ url);});});},bindRemoveArticleCode:function ()
{$('.removeArticleCode').on("click",function ()
 {var productCode =$(this).attr('id').split('--');productCode =productCode[1];var articleCode ='';$.ajax({url:changeArticleCodeUrl,type:'POST',dataType:'json',data:{productCode:productCode,articleCode:articleCode},success:function (data)
 {$('#form-page').val($('#current-page').val());$('#items-sort-form').submit();},error:function (xht,textStatus,ex)
 {alert("Failed to set article code. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
 });return false;});},bindArticleCodeChanged:function ()
{$('.articleCodeChanged').on("change",function ()
 {var productCode =$(this).attr('id').split('--');productCode =productCode[1];var articleCode =$(this).val();$.ajax({url:changeArticleCodeUrl,type:'POST',dataType:'json',data:{productCode:productCode,articleCode:articleCode},success:function (data)
 {$('#form-page').val($('#current-page').val());$('#items-sort-form').submit();},error:function (xht,textStatus,ex)
 {alert("Failed to set article code. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
 });return false;});},bindEditArticleCodeButton:function ()
{$('div #save-article-code').on("click",function ()
{var articleCode =$('#article-code-input').val();$.ajax({url:setArticleCodeUrl,type:'POST',dataType:'json',data:{articleCode:articleCode},success:function (data)
{$('#create-article-code').show();$('#edit-article-code').hide();$('#create-article-code-link').hide();$('#edit-article-code-link').show();$('#product-article-code').replaceWith("<small class='text-upcase text-bold' id='product-article-code'>"+data+"</small>");originalArticleCode =data;if (data.length <=0) {$('#create-article-code-link').removeClass('hide');$('#edit-article-code-link').addClass('hide');$('#create-article-code-link').show();} else {$('#edit-article-code-link').removeClass('hide');$('#create-article-code-link').addClass('hide');$('#edit-article-code-link').show();}
},error:function (xht,textStatus,ex)
{alert("Failed to set article code. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});$('div #cancel-article-code').on("click",function ()
 {$('#article-code-input').val(originalArticleCode);$('#create-article-code').show();$('#edit-article-code').hide();return false;});}
};$(document).ready(function ()
{ACC.articlecode.bindAll();});ACC.articlelist ={bindAll:function ()
{this.bindAddToArticleListButton();this.bindAddToArticleListFromPLPButton();this.bindAssignArticleList();this.bindSortArticleList();this.bindRemoveArticleList();this.bindRemoveItem();this.bindRemoveService();this.bindCreateNewArticleList();this.bindAllItemsSelectionChange();this.bindItemQuantityChange();this.bindItemAddToCartClicked();this.bindALCSVDownload();},bindALCSVDownload:function ()
{$('.csv-al-download-btn').on("click",function()
 {var listInfo =$(this).attr('id').split("//");var listName =listInfo[1];var listPK =$('#listPK').val();$.fileDownload(articleListDownloadUrl,{type:'GET',data:{n:listName,listPK:listPK}
 })
 .done(function (url) {alert('SUCCESS with URL  '+ url);})
 .fail(function (data,url) {alert('Download failed. Please contact your support.'+ data + ' URL '+ url);});});},bindItemAddToCartClicked:function ()
 {$('.addItemsToCartBtn').on('click',function()
 {showSuccessMessageOnButton($(this));var $allProducts =$('.js-product');var _eventCollection =[];$.each($allProducts,function() {if ($(this).find('.js-product-list-checkbox').prop('checked')) {var productCode =$(this).find('.js-product-code').data('product-code');var productNameDe =$(this).find('.js-product-name').data('product-name-de');data ={"productCode":productCode,"productFixedLocaleName":$(this).find('.js-product-name').data('product-name-de'),"productPrice":parseFloat(($(this).find('.js-product-price').data('product-price'))),"productCatalog":$(this).find('.js-product-name').data('product-assortment'),"trackingCategoryPath":$(this).find('.js-product-name').data('product-category'),"productFixedLocaleName":productNameDe,"quantity":$(this).find('.item-quantity-sel').attr('value'),"productVar2":$(this).find('.js-product-manufacturer').data('product-manufacturer'),"productVar3":productCode.split('-')[0]
 };console.log("js-desktop-template-econda",data);econdaPrepareAddToCart(data);}
 });econdaAddToCart();$('#addItemsToCartForm').submit();});$('#addItemsToCartForm').on('submit',function(event)
 {$.ajax({url:'/article-list/add/entries',type:'GET',dataType:'text',data:$(this).serialize(),success:function (data)
 {$('.entrySelectedCheckbox').removeAttr('checked');$('#allItems').removeAttr('checked');if(data){$('#globalMessages').html(JSON.parse(data).articleListGlobalMessagesHtml);}
 $('html, body').animate({scrollTop:0
 },"slow");refreshMiniCart();},error:function (xht,textStatus,ex)
 {alert("Failed to add product to cart. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "].");location.reload();}
 });event.preventDefault();});$('.item-add-to-cart').on('click',function()
 {var itemInfo =$(this).attr('id').split("//");var listPK =$('#listPK').val();var entryNumber =itemInfo[2];var emospro =window.emospro;var wayIntoCart =$('#wayIntoCart').val();var $productContainer =$(this).closest('.js-product');var productCode =$($productContainer).find('.js-product-code').data('product-code');var productNameDe =$($productContainer).find('.js-product-name').data('product-name');data ={"productCode":productCode,"productFixedLocaleName":$(this).find('.js-product-name').data('product-name-de'),"productPrice":parseFloat(($($productContainer).find('.js-product-price').data('product-price'))),"productCatalog":$($productContainer).find('.js-product-name').data('product-assortment'),"trackingCategoryPath":$($productContainer).find('.js-product-name').data('product-category'),"productFixedLocaleName":productNameDe,"quantity":$($productContainer).find('.item-quantity-sel').attr('value'),"productVar2":$($productContainer).find('.js-product-manufacturer').data('product-manufacturer'),"productVar3":productCode.split('-')[0]
 };console.log("js-desktop-template-econda",data);econdaPrepareAddToCart(data);econdaAddToCart();$.ajax({url:addEntryToCartAction,type:'POST',dataType:'text',data:{listPK:listPK,entryNumber:entryNumber,wayIntoCart:wayIntoCart},success:function (data)
 {if (data) {$('#globalMessages').html("<div class='alert alert-danger text-center animated shake'><i class='icon-warning'></i>"+data+"</div>");} else {$('#globalMessages').html("");refreshMiniCart();}
 },error:function (xht,textStatus,ex)
 {alert("Failed to add product to article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "].");location.reload();}
 });});},bindItemQuantityChange:function ()
 {$('.item-quantity-sel').on('change',function()
 {var itemInfo =$(this).attr('id').split("--");var listPK =itemInfo[1];var entryNumber =itemInfo[2];var qty =$(this).val();$.ajax({url:updateEntryQuantityFormAction,type:'POST',dataType:'json',data:{listPK:listPK,entryNumber:entryNumber,quantity:qty},success:function (data)
 {location.reload();},error:function (xht,textStatus,ex)
 {alert("Failed to add product to article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "].");location.reload();}
 });});},bindRemoveItem:function ()
 {$('.submitRemoveItem').on('click',function()
 {var itemInfo =$(this).attr('id').split("//");var listPK =$('#listPK').val();var entryNumber =itemInfo[2];var qty =0;$.ajax({url:updateEntryQuantityFormAction,type:'POST',dataType:'json',data:{listPK:listPK,entryNumber:entryNumber,quantity:qty},success:function (data)
 {location.reload();},error:function (xht,textStatus,ex)
 {alert("Failed to add product to article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "].");location.reload();}
 });});},bindRemoveService:function ()
 {$('.cbListService').on('change',function()
 {var itemInfo =$(this).attr('id').split("--");var listPK =$('#listPK').val();var entryNumber =itemInfo[2];var qty =0;$.ajax({url:listUpdateEntryServiceAction,type:'POST',dataType:'json',data:{listPK:listPK,entryNumber:entryNumber,quantity:qty},success:function (data)
 {location.reload();},error:function (xht,textStatus,ex)
 {alert("Failed to add product to article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "].");location.reload();}
 });});},bindAllItemsSelectionChange:function ()
 {$('#allItems').on('change',function()
 {$('.entrySelectedCheckbox').prop('checked',$(this).is(':checked'));});$('.entrySelectedCheckbox').on('change',function()
 {if (!$(this).is(':checked'))
 {$('#allItems').removeAttr('checked');}
 });},bindAssignArticleList:function ()
 {$('.assignList').on('change',function()
 {var articleListName =$(this ).attr('id').split('//');articleListName =articleListName[1];var userNameList =$(this ).val();if (userNameList ==null)
 {userNameList =[""];}
 $.ajax({url:assignArticleListUrl,type:'POST',dataType:'json',data:{articleListName:articleListName,userNameList:userNameList},success:function (data)
 {if (data.length > 0)
 {$('#message').val(data);}
 $('#sort-form').submit();},error:function (xht,textStatus,ex)
 {location.reload();location.reload(true);alert("Failed to assign user to article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]. Try again.");}
 });return false;});},bindRemoveArticleList:function ()
 {$('.removeList').on('click',function(e) {return Confirm.onConfirm(function(element,e) {var listPK =$(element ).attr('id').split('--');listPK =listPK[1];$.ajax({url:removeArticleListUrl,type:'POST',dataType:'json',data:{listPK:listPK},success:function (data)
 {location.reload(true);},error:function (xht,textStatus,ex)
 {alert("Failed to remove article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]. Try again.");location.reload();}
 });},$(this),e);});},bindCreateNewArticleList:function ()
 {$('.save-new-article-list').on('click',function()
 {var articleListName =$('#new-article-list-name').val();if (articleListName.length ==0)
 {articleListName ='?';}
 $.ajax({url:createArticleListUrl,type:'POST',dataType:'json',data:{articleListName:articleListName},success:function (data)
 {$('#new-list-toggle').click();$('#new-article-list-name').val('');if (data) {$('#globalMessages').html("<div class='alert alert-danger text-center animated shake'><i class='icon-warning'></i>"+data+"</div>");} else {location.reload(true);}
 },error:function (xht,textStatus,ex)
 {alert("Failed to create new article list. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "].");$('#new-article-list-name').val('');}
 });return false;});},bindSortArticleList:function ()
 {$('#article-list-sort').on('change',function()
 {$('#sort-form').submit();return false;});$('#list-items-sort-code').on('change',function()
 {$('#list-items-sort-form').submit();return false;});},bindAddToArticleListFromPLPButton:function ()
{$('.add-to-wishlist').off('click');$('.add-to-wishlist').on("click",function ()
{var productId =$(this).attr('id').split('--');productId =productId[1];var articleListName =$('#newList--'+productId ).val();var articleListNameOut =$('#newList--'+productId ).val();var existingOrNew =$('input[name=wishlist-selection--'+productId+']:checked','#wishlist-flyout--'+productId).attr('id');if (existingOrNew !='wishlist-selection-2--'+productId) {articleListName =$('#oldList--'+productId ).val();articleListNameOut =$('#oldList--'+productId+' option:selected').text();}else{if(articleListName =='')
 {if($('#nameRequiredError-'+productId).length ==0)
 {ACC.articlelist.displayErrorMessage('#newList--'+productId,'nameRequiredError-'+productId);}
 return false;}
 }
 $('#articleListName--'+productId ).val(articleListName);$('#addToWishlist--'+productId ).val('true');$(this).closest('form').submit();$('#addToWishlist--'+productId ).val('false');$('#articleListName--'+productId ).val('');if (existingOrNew !='wishlist-selection-1--'+productId) {$('.plp-article-list-select').append($('<option></option>').val(articleListName).html(articleListName));}
 $('#newList--'+productId ).val('');$('#wishlist-toggle--'+productId).click();$('.addedToALInfoMsg').hide();$('#alName--'+productId ).html(articleListNameOut);$('#addedToALInfoMsg--'+productId ).show();return false;});},displayErrorMessage:function(inputFieldId,errorMessageId)
{$(inputFieldId ).parent().addClass('input-error');$(inputFieldId ).parent().append('<span class="form-errors" id="'+errorMessageId+'">'+ $.validator.messages.required + '</span>')
},bindAddToArticleListButton:function ()
{$('#add-to-article-list').on('blur',function()
 {$('#article-list-name').attr('style','border-color:light-grey');});$('div #add-to-article-list').on("click",function ()
{var articleListName =$('#article-list-name').val();var articleListNameOut =$('#article-list-name').val();var existingOrNew =$('input[name=wishlist-selection]:checked','#wishlist-flyout').attr('id');if (existingOrNew !='wishlist-selection-2') {articleListName =$('#article-list-select').val();articleListNameOut =$('#article-list-select option:selected').text();}
 if (articleListName.length ==0) {if($('#nameRequiredError').length ==0)
 {ACC.articlelist.displayErrorMessage('#article-list-name','nameRequiredError');}
 return false;}
 $('#added-to-wishlist').hide();$('#articleListName').val(articleListName);$('#addToWishlist').val('true');$('#addToCartForm').submit();$('#addToWishlist').val('false');$('#articleListName').val('');if (existingOrNew !='wishlist-selection-1') {$('#article-list-select').append($('<option></option>').val(articleListName).html(articleListName));}
 $('#article-list-name').val('');$('.not-visible-btn').click();$('#article-list-name').attr('style','border-color:light-grey');$('#added-to-wishlist').show();$('#wishlist-name').html(articleListNameOut);return false;});}
};$(document).ready(function ()
{ACC.articlelist.bindAll();});ACC.common ={currentPath:window.location.pathname,currentCurrency:"EUR",$page:$("#page"),$globalMessages:$("#globalMessages"),setCurrentCurrency:function() {ACC.common.currentCurrency =ACC.common.$page.data("currencyIsoCode");},refreshScreenReaderBuffer:function() {$('#accesibility_refreshScreenReaderBufferField').attr('value',new Date().getTime());},bindAll:function() {},bindToUiCarouselLink:function() {$("ul.carousel > li a.popup").colorbox({onComplete:function() {ACC.common.refreshScreenReaderBuffer();},onClosed:function() {ACC.common.refreshScreenReaderBuffer();}
});},processingMessage:$("<img src='"+ ACC.config.commonResourcePath + "/images/spinner.gif'/>"),bindShowProcessingMessageToSubmitButton :function () {$(':submit.show_processing_message').each(function(){$(this).on("click",ACC.common.showProcessingMessageAndBlockForm);});},showProcessingMessageAndBlockForm:function () {var form =$(this).parents('form:first');form.block({message:ACC.common.processingMessage });},blockFormAndShowProcessingMessage:function (submitButton) {var form =submitButton.parents('form:first');form.block({message:ACC.common.processingMessage });},showSpinner:function(message) {$('.spinner-wrapper').show();$('#spinnerMessage').html(message);},showSpinnerById:function(id) {$('#'+id).show();},hideSpinner:function() {$('.spinner-wrapper').hide();$('#spinnerMessage').html("");},hideSpinnerById:function(id) {$('#'+id).hide();},enableOrDisableCheckout:function(error_msg_id) {if (error_msg_id =="error-orderNo-mandatory")
{if(ACC.common.checkIfOrderNumberMissing() )
{$('#'+error_msg_id).show();mandatoryFieldsMissing=true;}
else if (ACC.common.checkIfAddressLinesMissing() ||ACC.common.checkIfCommentsMissing())
{$('#'+error_msg_id).hide();mandatoryFieldsMissing=true;}
else
{$('#'+error_msg_id).hide();mandatoryFieldsMissing=false;}
$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));}
if (error_msg_id =="error-addressLines-mandatory")
{if(ACC.common.checkIfAddressLinesMissing())
{$('#'+error_msg_id).show();mandatoryFieldsMissing=true;}
else if(ACC.common.checkIfCommentsMissing() ||ACC.common.checkIfOrderNumberMissing())
{$('#'+error_msg_id).hide();mandatoryFieldsMissing=true;}
else
{$('#'+error_msg_id).hide();mandatoryFieldsMissing=false;}
$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));}
if(error_msg_id =="error-orderComment-mandatory")
{if(ACC.common.checkIfCommentsMissing())
{$('#'+error_msg_id).show();mandatoryFieldsMissing=true;}
else if(ACC.common.checkIfAddressLinesMissing() ||ACC.common.checkIfOrderNumberMissing())
{$('#'+error_msg_id).hide();mandatoryFieldsMissing=true;}
else
{$('#'+error_msg_id).hide();mandatoryFieldsMissing=false;}
$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));}
},checkIfOrderNumberMissing :function()
{var orderNumberRequired =$("#checkout_section_deliverymode").data("required");var myReqNo =$.trim($('#delivery-reqno').html());if(orderNumberRequired &&(myReqNo =='-'||myReqNo ==''))
{return true;}
else
{return false;}
},checkIfAddressLinesMissing :function()
{var addressLinesRequired =$("#checkout_section_deliveryaddress").data("required");var addressLines123 =$.trim($('#address-lines').text());if(addressLinesRequired &&addressLines123.length ==0)
{return true;}
else
{return false;}
},checkIfCommentsMissing :function()
{var commentRequired =$("#checkout_section_ordercomment").data("required");var myReqInfo =$.trim($('#delivery-reqinfo-input').val());if(commentRequired &&myReqInfo =='')
{return true;}
else
{return false;}
},ensureAtleastDefaultAttributeSet:function(options,attribute,dafaultValue) {options =options ||{};options[attribute] =options[attribute] ||dafaultValue;return options;}
};$(document).ready(function() {ACC.common.setCurrentCurrency();ACC.common.bindAll();ACC.common.bindShowProcessingMessageToSubmitButton();});jQuery.extend({postJSON:function (url,data,callback)
{return jQuery.post(url,data,callback,"json");}
});$.ajaxPrefilter(function (options,originalOptions,jqXHR)
{if (options.type ==="post"||options.type ==="POST")
{var noData =(typeof options.data ==="undefined");if (noData ||options.data.indexOf("CSRFToken") ===-1)
{options.data =(!noData ?options.data + "&":"") + "CSRFToken="+ ACC.config.CSRFToken;}
}
});ACC.product ={$cartPopup:$('#cart_popup'),$addToCartButton:$(':submit.add_to_cart_button'),$addToCartOrderForm:$('.add_to_cart_order_form'),$addToCartForm:$('.add_to_cart_form'),addToCartFormSelector:'.add_to_cart_form',bindToAddToCartForm:function (options) {options =ACC.common.ensureAtleastDefaultAttributeSet(options,'enforce',false);var wayIntoCart =ACC.product.$addToCartForm.first().data("wayIntoCart");if (options.enforce) {ACC.product.$addToCartForm =$(ACC.product.addToCartFormSelector);}
 ACC.product.$addToCartForm.ajaxForm({beforeSubmit:function(){this.url =this.url + '.json';},dataType:"text",success:ACC.product.displayAddToCartPopup ,data:{wayIntoCart:wayIntoCart}
 });},bindToAddToCartButton:function (e) {ACC.product.$addToCartButton.removeAttr("disabled");},bindToAddToCartOrderForm:function () {ACC.product.$addToCartOrderForm.ajaxForm({dataType :"text",success:ACC.product.displayAddToCartPopup
 });},displayAddToCartPopup:function (responseObject,statusText,xhr,formElement) {var cartResult =JSON.parse(responseObject);var productCode =$('[name=productCodePost]',formElement).val();var quantityField =$('[name=qty]',formElement).val();var quantity =1;if (quantityField !=undefined) {quantity =quantityField;}
 ACC.common.$globalMessages.html(cartResult.cartGlobalMessagesHtml);if (cartResult.missingPSpecException !=undefined) {var emptyPspecs=cartResult.missingPSpecException.pspec;emptyPspecs =emptyPspecs.replace('[','');emptyPspecs =emptyPspecs.replace(']','');emptyPspecs =emptyPspecs.split(",");$('input.error').removeClass('error');for(i=0;i<emptyPspecs.length;i++){var errorElement ='#pspec_'+emptyPspecs[i];errorElement =errorElement.replace(' ','');$(errorElement).addClass('error');}
 }
 if (cartResult.cartGlobalMessagesHtml.indexOf("alert-general") > -1) {$('html, body').animate({scrollTop:0
 },700);}
 if (typeof refreshMiniCart =='function'&&!cartResult.cartData.addedToWishlist) {refreshMiniCart();}
 $("#minicart_data").data("js-desktop-template-econda",cartResult.jsDesktopTemplateEconda).trigger("change");ACC.product.$cartPopup.hide();ACC.product.$cartPopup.html(cartResult.cartPopupHtml);$('#add_to_cart_close').click(function (event) {event.preventDefault();ACC.product.$cartPopup.hide();});ACC.product.$cartPopup.fadeIn();if (typeof timeoutId !='undefined') {clearTimeout(timeoutId);}
 timeoutId =setTimeout(function () {ACC.product.$cartPopup.fadeOut();},5000);},zoomImage:function () {$(".noaction").click(function (e) {e.preventDefault();});},bindQuantitySelector:function () {if (window['prodInfo'] ==undefined)
 return;$('.product-quantity-sel').off('change');$('.product-quantity-sel').change(function () {var pcode =prodInfo.pcode;var newQuantity =$(this).val();if (newQuantity > prodInfo.maxq) {$('#price').html(prodInfo.price2);} else {$('#price').html(prodInfo.price1);}
 return false;});var pcode =prodInfo.pcode;var qty =$('#qty').val();if (qty > prodInfo.maxq) {$('#price').html(prodInfo.price2);} else {$('#price').html(prodInfo.price1);}
 },bindAll:function () {ACC.product.bindToAddToCartForm();ACC.product.bindToAddToCartButton();ACC.product.bindToAddToCartOrderForm();ACC.product.bindQuantitySelector();$('#carousel_modal').jcarousel({vertical:true,itemFallbackDimension:512
 });$(".noaction").click(function (e) {e.preventDefault();});}
};$(document).ready(function () {ACC.product.bindAll();});ACC.autocomplete ={bindAll:function ()
{this.bindSearchAutocomplete();},bindSearchAutocomplete:function ()
{var $search =$("#search");var option =$search.data("options");var cache ={};if (option)
{$search.autocomplete({minLength:option.minCharactersBeforeRequest,delay:option.waitTimeBeforeRequest,messages:{noResults:'',results:function() {}
 },appendTo:".js-search-suggestions",source:function(request,response) {var term =request.term.toLowerCase();if (term in cache) {return response(cache[term]);}
 if ($("#search").attr("switchFlag") =="0")
 {$.ajax({dataType:"text",url:option.autocompleteUrl,data:{term:request.term},success:function(responseValue) {if(responseValue){var data =JSON.parse(responseValue);var autoSearchData =[];if(data.suggestions !=null){$.each(data.suggestions,function (i,obj)
 {autoSearchData.push({value:obj.term,url:ACC.config.contextPath + "/search?text="+ obj.term,type:"autoSuggestion"});});}
 if(data.products !=null){$.each(data.products,function (i,obj)
 {autoSearchData.push({value:obj.name,code:obj.code,desc:obj.description,manufacturer:obj.manufacturer,url:ACC.config.contextPath + obj.url,type:"productResult",image:obj.images[0].url});});}
 if(data.contentPages !=null){$.each(data.contentPages,function (i,obj)
 {autoSearchData.push({title:obj.title,url:ACC.config.contextPath + obj.url,type:"contentResult"});});}
 cache[term] =autoSearchData;return response(autoSearchData);}
 }
 });}
 },focus:function (event,ui)
 {return false;},select:function (event,ui)
 {console.log(ui);window.location.href =ui.item.url;}
 }).data("autocomplete")._renderMenu =function (ul,items)
 {hasSuggestions =false;hasProducts =false;hasContents =false;$.each(items,function(idx,item){if (item.type =="autoSuggestion")
 {hasSuggestions =true;ul.append($('#autoSuggestTemplate').tmpl(item ));}
 if (item.type =="productResult")
 {hasProducts =true;ul.append($('#productSuggestTemplate').tmpl(item ));}
 if (item.type =="contentResult")
 {hasContents =true;ul.append($('#contentSuggestTemplate').tmpl(item ));}
 });if(hasSuggestions){$('#autoSuggestHeadlineTemplate').tmpl().insertBefore(ul.find("li[type=suggest]").first());}
 if(hasProducts){$('#productSuggestHeadlineTemplate').tmpl().insertBefore(ul.find("li[type=product]").first());}
 if(hasContents){$('#contentSuggestHeadlineTemplate').tmpl().insertBefore(ul.find("li[type=content]").first());}
 };}
}
};$(document).ready(function ()
{ACC.autocomplete.bindAll();});ACC.productfilter ={bindAll:function()
{this.bindCategoryChanged();this.bindSubcategoryChanged();},bindSubcategoryChanged:function()
{$('#subcategory_selector').off('change');$('#subcategory_selector').on('change',function() {var category =$(this).val();$.ajax({url:getProductsUrl,type:'POST',dataType:'text',data:{category:category},success:function (data) {$('#products').html(data);},error:function (xht,textStatus,ex) {}
 });});},bindCategoryChanged:function()
{$('#category_selector').on('change',function() {var category =$(this).val();$.ajax({url:getSubcategoriesUrl,type:'POST',dataType:'text',data:{category:category},success:function (data) {$('#sub-categories').html(data);$('#product_selector').children().remove();ACC.productfilter.bindSubcategoryChanged();},error:function (xht,textStatus,ex) {}
 });});}
};$(document).ready(function() {ACC.productfilter.bindAll();});ACC.deliverymode ={bindAll:function ()
{this.bindEditDeliveryMethodButton();this.bindUseThisDeliveryModeButton();},initialRefreshAll:function ()
{$('._js_acc_deliverymode_initial_refresh').each(ACC.deliverymode.initialRefreshDeliveryMode);},initialRefreshDeliveryMode:function (index,elem)
{var data =$.parseJSON($(elem).attr('data-js-acc-deliverymode-initial-refresh') ||'{}');ACC.deliverymode.refreshDeliveryMethodSection(data);},bindCancelDeliveryMethodButton:function ()
{$(document).on('click','#checkout_section_deliverymode #section-cancel',function()
{$.ajax({url:getDeliveryModesUrl,type:'GET',dataType:'json',success:function (data)
{ACC.deliverymode.refreshDeliveryMethodSection(data);ACC.common.enableOrDisableCheckout('error-orderNo-mandatory');},error:function (xht,textStatus,ex)
{alert("Failed to get delivery modes. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});},bindEditDeliveryMethodButton:function ()
{$(document).on('click','#checkout_section_deliverymode #section-edit',function()
{$.ajax({url:getDeliveryModesUrl,type:'GET',dataType:'json',success:function (data)
{ACC.deliverymode.editDeliveryMethodSection(data);ACC.deliverymode.bindCancelDeliveryMethodButton();ACC.deliverymode.bindDeliveryModeChanged();},error:function (xht,textStatus,ex)
{alert("Failed to get delivery modes. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});},bindUseThisDeliveryModeButton:function ()
{$(document).on('click','#checkout_section_deliverymode #section-save',function()
{var selectedCode =$('#delivery-mode-select').val();var wldat =$('#delivery-date-input').val();var myReqNo =$.trim($('#delivery-reqno').val());var requiredOrNot =$("#checkout_section_deliverymode").data("required");if(requiredOrNot &&myReqNo =='')
{$("#delivery-reqno").addClass("error");return false;}
if (selectedCode)
{$.ajax({url:setDeliveryOptionsUrl,type:'POST',dataType:'json',data:{modeCode:selectedCode,wldat:wldat,myReqNo:myReqNo},beforeSend:function ()
{},success:function (data)
{if (data !=null)
{ACC.deliverymode.refreshDeliveryMethodSection(data);ACC.common.enableOrDisableCheckout('error-orderNo-mandatory');HOFFMANN.refresh.refreshCartItems(data);}
else
{alert("Failed to set delivery mode");}
},error:function (xht,textStatus,ex)
{alert("Ajax call failed while trying to set delivery mode. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");},complete:function ()
{}
});}
return false;});},bindDeliveryModeChanged:function()
 {$(document).on('change','#checkout_section_deliverymode #delivery-mode-select',function()
 {var selectedDeliveryMode =$(this).val();if((selectedDeliveryMode.indexOf("standard") >=0)) {applyAD=true;$("#delivery-date-input").datepicker("destroy");$('#delivery-date-input').datepicker(ACC.deliverymode.datepickerOptions);$('#delivery-date-input').datepicker("refresh");}
 else {applyAD=false;$('#delivery-date-input').datepicker("destroy");$('#delivery-date-input').datepicker(ACC.deliverymode.datepickerOptions);$('#delivery-date-input').datepicker("refresh");}
 });},datepickerOptions:{format:'dd.mm.yyyy',daysOfWeekDisabled:'0',autoclose:true,todayHighlight:true,beforeShowDay:function(date) {var ad =$("#delivery-date-input").data("additionaldays");var disabledSpecificDays =[];for(var j=1;j<=ad;j++) {var tmp =new Date();tmp.setDate(tmp.getDate() + j);var formattedDate =(tmp.getMonth() + 1) + '-'+ (tmp.getDate()) + '-'+ (tmp.getFullYear());disabledSpecificDays.push(formattedDate);}
 var m =date.getMonth();var d =date.getDate();var y =date.getFullYear();for (var i =0;i < disabledSpecificDays.length;i++) {if ($.inArray((m + 1) + '-'+ d + '-'+ y,disabledSpecificDays) !=-1 &&applyAD) {return {enabled:false
 };}
 }
 return {enabled:true
 };}
},editDeliveryMethodSection:function (data)
{$('#checkout_section_deliverymode').replaceWith($('#deliveryModeEditTemplate').tmpl({deliveryOptionDataForm:data}));$('#delivery-date-input').datepicker(ACC.deliverymode.datepickerOptions);},refreshDeliveryMethodSection:function (data)
{$('#checkout_section_deliverymode').replaceWith($('#deliveryModeSummaryTemplate').tmpl({abstractOrder:data}));$('#delivery_tax_costs').load('summary #delivery_tax_costs',function(){window.Tooltip.attachTo($('div'));});var deliverMode =$(document).find('#checkout_section_deliverymode #js-delivery-option').html();if(deliverMode !=null &&(deliverMode.indexOf("standard") >=0)) {applyAD=true;} else {applyAD=false;}
$('#delivery-date-input').datepicker(ACC.deliverymode.datepickerOptions);}
};$(document).ready(function ()
{ACC.deliverymode.bindAll();ACC.deliverymode.initialRefreshAll();});$(document).ready(function() {jQuery.validator.setDefaults({errorPlacement:function(error,element) {error.appendTo(element.parent().find('div.myErrors'));}
 });$('#newsletter_form').validate({rules:{'E-Mail-Adresse':{required:true,email:true
 },'datenschutz':{required:true
 },'kundenart':{required:true
 }
 }
 });$("#newsletter_form").submit(function() {var formdata =$('#newsletter_form');if($("#newsletter_form").valid())
 {$.ajax({type:'post',url:'https://landingpages.hoffmann-group.com/newsletter/',data:formdata.serialize(),success:function (data) {},error:function(jqXHR,textStatus,errorThrown){},complete:function (xhr,status) {console.log("Newsletter ajax completed: "+ status);$('#main_container_id').hide();$('#confirm_message_id').show();econdaMarker("Newsletter-Anmeldung");$("html, body").animate({scrollTop:0},800);}
 });}
 return false;});});$(document).ready(function() {jQuery.validator.setDefaults({errorPlacement:function(error,element) {error.appendTo(element.parent().find('div.myErrors'));}
 });$('#contact_form').validate({rules:{'subject':{required:true
 },'email':{required:true,email:true
 },'datenschutz':{required:true
 }
 }
 });$("#contact_form").submit(function() {var rc =false;var formdata =$('#contact_form');if ($("#contact_form").valid())
 {rc =true
 }
 return rc;});});var checkoutPaymentType;var checkoutPaymentTypeName;ACC.payment ={bindAll:function ()
{this.bindEditPaymentButton();this.bindSavePaymentButton();},bindEditPaymentButton:function()
{$(document).on('click','#checkout_section_payment #section-edit',function()
{ACC.payment.editPaymentSection();return false;});},bindSavePaymentButton:function()
{$(document).on('click','#checkout_section_payment #section-save',function()
{ACC.payment.refreshPaymentSection();return false;});},editPaymentSection:function()
{$.ajax({url:getPaymentOptionsUrl,type:'POST',data:{cardPaymentInactive:cardPaymentDisabled},beforeSend:function ()
 {},success:function (data)
 {if (data !=null)
 {var parsedData =JSON.parse(data);$("#checkout_section_payment").html(parsedData.paymentEditor);}
 else
 {alert("Failed to set payment option");}
 if(checkoutPaymentType !=""){$("input[name='radio_paymenttype'][value='"+checkoutPaymentType.toLowerCase()+"']").prop('checked',true);}
 else {$("input[name='radio_paymenttype']:first").prop('checked',true);}
 },error:function (xht,textStatus,ex)
 {alert("Ajax call failed while trying to set payment option. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");},complete:function ()
 {}
 });},refreshSummaryFormSection:function (cartData)
{$('#delivery_tax_costs').load('summary #delivery_tax_costs');},refreshPaymentSection:function()
{var checkedRadiobutton =$("input[name='radio_paymenttype']:checked");$.ajax({url:setPaymentOptionUrl,type:'POST',dataType:'json',data:{paymentType:checkedRadiobutton.val()},beforeSend:function ()
 {},success:function (data)
 {if (data !=null)
 {ACC.payment.refreshSummaryFormSection(data);}
 else
 {alert("Failed to set payment option");}
 checkoutPaymentType =data.paymentType.code;checkoutPaymentTypeName =data.paymentType.displayName;$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));$('#checkout_section_payment').replaceWith($('#paymentSummaryTemplate').tmpl({selectedPaymentType:checkoutPaymentTypeName}));},error:function (xht,textStatus,ex)
 {alert("Ajax call failed while trying to set payment option. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");},complete:function ()
 {}
 });},bindMandatoryAttributes:function () {ACC.common.enableOrDisableCheckout('error-addressLines-mandatory');ACC.common.enableOrDisableCheckout('error-orderNo-mandatory');ACC.common.enableOrDisableCheckout('error-orderComment-mandatory');}
};$(document).ready(function()
{ACC.payment.bindAll();$('#checkout_section_payment').replaceWith($('#paymentSummaryTemplate').tmpl({selectedPaymentType:checkoutPaymentTypeName}));ACC.payment.bindMandatoryAttributes();$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));});ACC.approval ={submitApprovalDecision:function (desictionCode)
{$('#approverSelectedDecision').attr("value",desictionCode);$('#customerOrderNumber').attr("value",$('#orderNumber').val());$("#approvalDecisionForm").submit();},bindInitialPageLoad:function()
{var customerOrderNumber =$.trim($('#orderNumber').val());var requiredOrNot =$("#purchase-order-number").data('required');if(requiredOrNot &&customerOrderNumber =='')
{$("#orderNumber").addClass("error");$("#approverDecisionApprove").attr("disabled","");$("#approverDecisionReject").attr("disabled","");$("#error-approval-orderNo-mandatory").show();}
else
{$("#orderNumber").removeClass("error");$("#approverDecisionApprove").removeAttr("disabled");$("#approverDecisionReject").removeAttr("disabled");$("#error-approval-orderNo-mandatory").hide();}
},bindToApproverDecisionButton:function ()
{$('#orderNumber').on('blur',function()
{ACC.approval.bindInitialPageLoad();});$('.approverDecisionButton').click(function()
{ACC.approval.submitApprovalDecision($(this).data("decision"));});}
};$(document).ready(function ()
{ACC.approval.bindInitialPageLoad();ACC.approval.bindToApproverDecisionButton();});var HOFFMANN =HOFFMANN ||{};HOFFMANN.productlistbaseproductvariants ={bindAjaxTriggeringInputs:function ()
{$(document).on('change','.productlist_baseproductvariants_trigger',function (event) {var $container =$(event.target).closest('.productlist_baseproductvariants_ajaxcontainer');var $inputs =$container.find(':input');var url =$container.attr('data-productlist-baseproductvariants-ajaxcontainer-url');window.console.log($container.length,$inputs.length,url);$container.addClass('block-fill');if (url.length ==0)
 {url =url+'?text='+$(this).val();location.href =url;} else {$.ajax({url:url,data:$inputs.serialize(),type:"GET"})
 .done(function(data,textStatus,jqXHR) {$container.html("").html(data);$('.item-add-to-cart, .js-show-success').click(function() {showSuccessMessageOnButton(this);});$('.js-btn-add-to-cart').click(function() {pulseAddToCart();showSuccessMessageOnButton(this);});})
 .always(function() {$container.removeClass('block-fill');});}
});},bindAll:function()
{this.bindAjaxTriggeringInputs();}
};$(document).ready(function() {HOFFMANN.productlistbaseproductvariants.bindAll();});var HOFFMANN =HOFFMANN ||{};HOFFMANN.cartentryupdate ={timer :true,oldVal :null,element :null,form :null,loading :function () {$(".quantity_onchange").prop("readonly",true).attr("readonly",true);if($("#loading_page").length < 1) {$('<div id="loading_page" class="spinner_loading_page" style="display:none;"><span id="spinnerMessage"></span><img src="/_ui/desktop/common/images/spinner.gif" style="align: center; vertical-align: middle" /></div>').appendTo("body");}
$("#loading_page").fadeIn(250);},loaded:function () {$("#loading_page").stop().fadeOut(250);$(".quantity_onchange").prop("readonly",false).attr("readonly",false);},bindCostCenterSelectorForAllEntries :function() {$('.cart_costcenter_forallentries select').change(function() {$.ajax({url :setCartAllEntriesCostCenterUrl,data :$(this).serialize(),dataType :'json',type :"POST",success :function(data) {if (data !="") {$('#checkoutbutton').attr('disabled',true);$('.errormessages').html(data);$('.errormessages').show();} else {location.reload();}
}
})
});},bindCostCenterSelectorForEntry :function() {$('.cart_costcenter_forentry select').change(function() {var data ={};data[$(this).attr("cart_costcenter_selector_name")] =$(this).val();$.ajax({url :setCartEntryCostCenterUrl,data :data,dataType :'json',type :"POST",success :function(data) {HOFFMANN.cartentryupdate.updateCartPage(data);}
})
});},bindDeleteCart :function() {$('.submitDeleteCart').click(function(e) {return Confirm.onConfirm(function(element,e) {$('#deleteCartForm').submit();},$(this),e);});},addEnablePromoForm :function() {$("#enable-promo").removeClass("lostPromo");$("#submitpromo").unbind("click").click(function(){$(this).closest("form").submit();});},bindCartRemoveProduct :function() {$('.submitRemoveProduct').click(function(e) {element =this;var prodid =$(element).attr('id').replace("RemoveProduct_","");if (!$(element).closest('form').is($('#updateCartForm'+ prodid))) {e.preventDefault();}
var productCode =$('#updateQuantityForm'+ prodid).get(0).productCode.value;var initialCartQuantity =$('#updateQuantityForm'+ prodid).get(0).initialQuantity.value;});$('.updateQuantityProduct').click(function() {var prodid =$(this).attr('id').replace("updateQuantityProduct_","");var productCode =$('#updateQuantityForm'+ prodid).get(0).productCode.value;var initialCartQuantity =$('#updateQuantityForm'+ prodid).get(0).initialQuantity.value;var newCartQuantity =$('#updateQuantityForm'+ prodid).get(0).quantity.value;$('#updateQuantityForm'+ prodid).get(0).submit();});$('.cbService').change(function() {var entrySuffix =$(this).attr('id').replace("cb-service_","");var serviceEnabled =$(this).prop('checked');var element =$(this);$.ajax({url :cartUpdateEntryServiceAction,type :'POST',dataType :'json',data :{entrySuffix :entrySuffix,serviceEnabled :serviceEnabled
},beforeSend :function() {},success :function(data) {HOFFMANN.cartentryupdate.updateCartPage(data);},error :function(xht,textStatus,ex) {alert("Ajax call failed while trying to set delivery mode. Error details ["+ xht
+ ", "+ textStatus
+ ", "+ ex + "]");},complete :function() {}
});return false;});},bindUpdateOnChange :function() {var lastVal ="";$('.cartentryupdate_onchange').on('focus',function(e) {$(this).attr('cartentryupdate_onchange',$(this).val());});$('.comment_onchange').on('focus',function(e) {lastVal =$(this).val();});$('.quantity_onchange').on('focus',function(e) {lastVal =$(this).val();});$('.costCenter_onchange').on('focus',function(e) {lastVal =$(this).val();});$('.list-products-btn-remove').on('click',function(e) {$(this).closest('li').hide();if($(this).closest("ul").find("li:visible").not("li.readdpromo").length < 1) {$("#enable-promo").addClass("lostPromo");}
var entrySuffix =$(this).attr('id').replace("RemoveProduct_","");$.ajax({url :setOrderEntryQuantityUrl,type :'POST',dataType :'JSON',data :{form :$(this).closest('form').serialize(),entrySuffix :entrySuffix,quantity :0,},beforeSend :function() {},success :function(data) {HOFFMANN.cartentryupdate.updateCartPage(data);},error :function(xht,textStatus,ex) {},complete :function() {}
});});$('.quantity_onchange').on('change',function(e) {clearInterval(HOFFMANN.cartentryupdate.timer);HOFFMANN.cartentryupdate.oldVal =$(this).val();HOFFMANN.cartentryupdate.element =$(this).closest('li');HOFFMANN.cartentryupdate.form =$(this).closest('form').serialize(),HOFFMANN.cartentryupdate.timer =setTimeout(function(){HOFFMANN.cartentryupdate.loading();$.ajax({url :setOrderEntryQuantityUrl,type :'POST',dataType :'JSON',data :HOFFMANN.cartentryupdate.form,beforeSend :function() {},success :function(data) {$('#baseprice'+ data.entrySuffix).html(data.basePrice);$('#totalprice'+ data.entrySuffix).html(data.totalPrice);$('#totalecotax'+ data.entrySuffix).html(data.totalEcoTax);HOFFMANN.cartentryupdate.updateCartPage(data);if (HOFFMANN.cartentryupdate.oldVal <=0) {HOFFMANN.cartentryupdate.element.remove();}
HOFFMANN.cartentryupdate.loaded();},error :function(xht,textStatus,ex) {HOFFMANN.cartentryupdate.loaded();},complete :function() {}
});},500);});$('.costCenter_onchange').on('input',function(e) {if ($(this).val() !=lastVal) {$.ajax({url :setOrderEntryCostCentertUrl,type :'POST',dataType :'json',data :$(this).closest('form').serialize(),beforeSend :function() {},success :function(data) {HOFFMANN.cartentryupdate.updateCartPage(data);},error :function(xht,textStatus,ex) {},complete :function() {}
});}
});$('.comment_onchange').on('blur',function(e) {if ($(this).val() !=lastVal) {$.ajax({url :setOrderEntryCommentUrl,type :'POST',dataType :'json',data :$(this).closest('form').serialize(),beforeSend :function() {},success :function(data) {},error :function(xht,textStatus,ex) {},complete :function() {}
});}
});$('.comment_onchange').on('keypress',function(e) {if (e.keyCode ==13) {e.preventDefault();}
});$('.quantity_onchange').on('keypress',function(e) {if (e.keyCode ==13) {e.preventDefault();}
});},bindUpdateVariantOnChange :function() {$('.article-list-variant-selector').on('change',function(e) {alert($(this).attr('id') + ' '+ $(this).val());});},bindRemovePromoProduct :function() {$('.remove-promo-article').click(function(event) {$(this).closest('li').hide();event.preventDefault();$.ajax({url :disablePromoUrl,type :'POST',dataType :'JSON',success :function(data) {HOFFMANN.cartentryupdate.addEnablePromoForm();$('#minicart_data').html(data);},error :function(xht,textStatus,ex) {},complete :function() {}
});});},updateCartPage :function(data) {$('#minicart_data').html(data.customTotalAmount + " / "+ data.subTotal);$('#subtotal').html(data.subTotal);$('#subtotalecotax').html(data.subTotalEcoTax);$('#li_cb_service_'+ data.entrySuffix).hide();$('#checkoutbutton').attr('disabled',data.disableCheckButton);if (data.errorMessages !="") {$('.errormessages').html(data.errorMessages);$('.errormessages').show();} else {$('.errormessages').hide();}
if (data.infoMessages !="") {$('#infoMessages').html(data.infoMessages);$('#infoMessages').show();} else {$('#infoMessages').hide();}
if (data.confMessages !="") {$('#confMessages').html(data.confMessages);$('#confMessages').show();} else {$('#confMessages').hide();}
$(".list-products .promoArticle").remove();if (data.promo !==undefined) {var tmp =data.promo;$("#promo-article-template").tmpl(tmp).appendTo(".list-products");this.bindRemovePromoProduct();}
},bindAll :function() {this.bindCostCenterSelectorForAllEntries();this.bindCostCenterSelectorForEntry();this.bindUpdateOnChange();this.bindRemovePromoProduct();this.bindUpdateVariantOnChange();if (typeof cartRemoveItem !='undefined'&&cartRemoveItem) {this.bindCartRemoveProduct();}
if (typeof cartDeleteCart !='undefined'&&cartDeleteCart) {this.bindDeleteCart();}
if (typeof showEnablePromoLink !='undefined'&&showEnablePromoLink) {HOFFMANN.cartentryupdate.addEnablePromoForm();}
}
};$(document).ready(function() {HOFFMANN.cartentryupdate.bindAll();});HOFFMANN.ordercomment ={bindAll:function ()
{this.bindUpdateOrderComment();},bindUpdateOrderComment:function ()
{$('#delivery-reqinfo-input').on('blur',function()
{var myReqInfo =$.trim($('#delivery-reqinfo-input').val());ACC.common.enableOrDisableCheckout('error-orderComment-mandatory');$.ajax({url:setOrderCommentUrl,type:'POST',dataType:'json',data:{myReqInfo:myReqInfo},beforeSend:function ()
 {},success:function (data)
 {},error:function (xht,textStatus,ex)
 {},complete:function ()
 {}
 });return false;});}
};$(document).ready(function ()
{HOFFMANN.ordercomment.bindAll();});var HOFFMANN =HOFFMANN ||{};HOFFMANN.cartdirectadd ={$logname:"js.hoffmann.cartdirectadd",$default_invisible_indicator:"._js_hoffmann_cartdirectadd_hide_by_default",$submit_delimiter:":",$submit_form:"._js_hoffmann_cartdirectadd_form",$list_pk:"._js_hoffmann_cartdirectadd_input_listpk",$cache:{},$row_div:"._js_hoffmann_cartdirectadd_row",$row_code_field:"._js_hoffmann_cartdirectadd_input",$row_variants_select:"._js_hoffmann_cartdirectadd_input_variants",$row_costcenters_select:"._js_hoffmann_cartdirectadd_input_costcenters",$row_amount_field:"._js_hoffmann_cartdirectadd_input_amount",$row_code_suggestions_div:"._js_hoffmann_cartdirectadd_results",$row_allinfo_hidden_field:"._js_hoffmann_cartdirectadd_input_hidden",$row_submit_possible_field:"._js_hoffmann_cartdirectadd_input_submit",$row_product_url:"._js_hoffmann_cartdirectadd_product_url",$row_product_pspecs:"._js_hoffmann_cartdirectadd_product_pspecs",$row_product_details_div:"._js_hoffmann_cartdirectadd_details",$row_original_row :"data-js-hoffmann-cartdirectadd-original-row",$row_status_has_variant :"data-js-hoffmann-cartdirectadd-status-has-variant",$row_status_has_term :"data-js-hoffmann-cartdirectadd-status-has-term",updateAll:function()
 {var $form =$(this.$submit_form);if ($form.length > 1) {window.console.error(this.$logname,"update all","invalid number of forms",$form.length);return;}
 var $row =$(this.$row_div,$form);if ($form.length ===1 &&$row.length !==1) {window.console.error(this.$logname,"update all","invalid number of rows",$form.length);return;}
 if ($form.length !==1) {return;}
 $form.data(HOFFMANN.cartdirectadd.$row_original_row,$row.detach());this.updateRows($form);},updateRows:function($form)
 {var $rows_all =$(this.$row_div,$form);var $rows_pristine =$rows_all
 .not("["+ HOFFMANN.cartdirectadd.$row_status_has_variant + "=1]")
 .not("["+ HOFFMANN.cartdirectadd.$row_status_has_term + "=1]")
 ;window.console.log(this.$logname,"updateRows",$rows_all.length,$rows_pristine.length);if ($rows_pristine.length ===0) {var $new_row =$form.data(HOFFMANN.cartdirectadd.$row_original_row).clone();$new_row.insertBefore($("._js_hoffmann_cartdirectadd_last_row",$form));var $originalVariantsOption =$("._js_hoffmann_cartdirectadd_input_variants > option",$new_row).first();$new_row.data("data-js-hoffmann-cartdirectadd-input-variant-original-option",$originalVariantsOption.detach());var identifier =this.$row_code_suggestions_div.substring(2) + "_"+ $rows_all.length;var resultDiv =$(this.$row_code_suggestions_div,$new_row);resultDiv.attr("id",identifier);this.switchToDefaultVisibility($new_row);this.bindSearchAutocomplete($new_row,"#"+ identifier);$new_row.show();} if ($rows_pristine.length > 1) {var $rows_purge =$rows_pristine.not(":first");$rows_purge.remove();}
 },bindSearchAutocomplete:function ($row,$appendToElement) {var $search =$(this.$row_code_field,$row);var option =$search.data("options");if (option) {var $waitIndicator =$("._js_hoffmann_cartdirectadd_indicator_waiting",$row);$search.autocomplete({minLength:option.minCharactersBeforeRequest,delay:option.waitTimeBeforeRequest,autoFocus:true,messages:{noResults:'',results:function () {}
 },appendTo:$appendToElement,source:function (request,response) {HOFFMANN.cartdirectadd.switchToDefaultVisibility($row);$waitIndicator.show();var term =request.term;if(term.indexOf(" ") > -1){term =term.replace(" ","-");}
 $.ajax({contentType:"text/html",dataType:"text",url:option.autocompleteUrl,data:{q:term},success:function (data,xhr,textStatus) {var returnData =HOFFMANN.cartdirectadd.handleAjaxResult(data,xhr,textStatus,term,$row);if(returnData.length ==0){$(this.$row_code_suggestions_div,$row).hide();}
 return response(returnData);},error:function (xhr,textStatus,errorThrown) {window.console.log(HOFFMANN.cartdirectadd.$logname,"query failure",textStatus,errorThrown);}
 });},open:function(event,ui){$waitIndicator.hide();}
 });$search.on("autocompleteselect",function (event,ui) {console.log(ui);var selection =ui.item;HOFFMANN.cartdirectadd.updateAfterSelection($row,selection);});$search.data("autocomplete")._renderItem =function(ul,item ) {var imageItem =$("<img/>");var link =$("<a>");imageItem.attr('src',item.image);imageItem.appendTo(link);var span =$("<span>").html(item.name);span.appendTo(link);return $("<li>").append(link).appendTo(ul);}
 $search.data("autocomplete")._resizeMenu =function () {this.menu.element.outerWidth(800 );};}
 },handleAjaxResult:function(response,xhr,textStatus,term,$row){if(response) {var data =JSON.parse(response);window.console.log(HOFFMANN.cartdirectadd.$logname,"query results",data.length,data);var returnData =[];var productList =[];if (data.length > 0) {$.each(data,function (i,obj) {$.each(obj.baseProductVariantsNamesByCode,function (key,value) {var product =HOFFMANN.cartdirectadd.getPreparedProductData(obj,value,false);if (key ==obj.code) {returnData.push(product);var realCode =obj.baseProductCode + " "+ value;productList[realCode] =product;}
 });});$(HOFFMANN.cartdirectadd.$row_code_suggestions_div,$row).show();}
 else {window.console.log(HOFFMANN.cartdirectadd.$logname,"no results");$("._js_hoffmann_cartdirectadd_indicator_waiting",$row).hide();$("._js_hoffmann_cartdirectadd_indicator_error",$row).show();$("._js_hoffmann_cartdirectadd_results_none",$row).show();}
 }
 else {window.console.log(HOFFMANN.cartdirectadd.$logname,"Response could not be parsed");$("._js_hoffmann_cartdirectadd_indicator_waiting",$row).hide();$("._js_hoffmann_cartdirectadd_indicator_error",$row).show();$("._js_hoffmann_cartdirectadd_results_none",$row).show();}
 $row.data("data-js-hoffmann-cartdirectadd-query-results-as-product-list",productList);return returnData;},updateAfterSelection:function($row,selection){$row.data("data-js-hoffmann-cartdirectadd-selection",selection);$(this.$row_code_suggestions_div,$row).hide();if (HOFFMANN.cartdirectadd.updateVariantsChooser(selection,$row)) {HOFFMANN.cartdirectadd.updateSelection($row);}
 var resultDiv =$(this.$row_code_suggestions_div,$row);resultDiv.find("ul").css("display","none");window.console.log(HOFFMANN.cartdirectadd.$logname,"maybe chosen product",selection.code);HOFFMANN.cartdirectadd.updateRows($(HOFFMANN.cartdirectadd.$submit_form));},updateVariantsChooser:function (selection,current_row) {var returnBool =false;var $variants =$(this.$row_variants_select,current_row);var counter =0;var disableDropDown =false;$.each(selection.sizeVariants,function (code,variant) {var selectValue =selection.baseProductCode + " "+ variant;var $option =$("<option>").attr("value",selectValue).text(variant);if (selectValue ===selection.code ||selection.selectFirstVariant &&counter ==0) {$option.attr("selected","selected");returnBool =true;}
 if (variant ===""){disableDropDown =true;}
 counter++;$variants.append($option);});if (disableDropDown){this.disableField($variants);} else {this.enableField($variants);}
 return returnBool;},updateSelection:function ($row){var isCartPage =$(this.$list_pk).val().length ==0;var currentAmountField =$(this.$row_amount_field,$row);var currentErrorIndicator =$("._js_hoffmann_cartdirectadd_indicator_error",$row);var currentSuccessIndicator =$("._js_hoffmann_cartdirectadd_indicator_success",$row);var detailsDiv =$(this.$row_product_details_div,$row);var imgField =$("._js_hoffmann_cartdirectadd_detail_img",$row);var nameField =$("._js_hoffmann_cartdirectadd_detail_name",$row);var priceField =$("._js_hoffmann_cartdirectadd_detail_price",$row);var selectedProduct =$row.data("data-js-hoffmann-cartdirectadd-selection");var selectedVariant =$(this.$row_variants_select,$row).find(":selected").val();var changeVariantUrl =$row.data("js-cartdirectadd-change-variant-url");console.log("the value you selected: "+ selectedVariant);$.ajax({type:"GET",url:changeVariantUrl,data:{productCodePost:selectedVariant
 },error:function(xhr,textStatus,errorThrown) {window.console.log(HOFFMANN.cartdirectadd.$logname,"variant change post event failed",textStatus,errorThrown);},async:false,success:function(response,textStatus,xhr) {if(response){selectedProduct =JSON.parse(response);}
 }
 });if (typeof selectedProduct !=="undefined"&&selectedProduct !==null) {$(this.$row_code_field,$row).val(selectedProduct.baseProductCode);imgField.attr("src",selectedProduct.baseProductImage.url);nameField.html(selectedProduct.name);priceField.html(selectedProduct.price ?selectedProduct.price.formattedValue :"-");detailsDiv.show();currentAmountField.attr("min",1);if(selectedProduct.volumePrices !=null &&selectedProduct.volumePrices.length > 0 &&selectedProduct.volumePrices[1]){currentAmountField.attr("value",selectedProduct.volumePrices[1].minQuantity);}
 if (selectedProduct.hasPspecs) {currentErrorIndicator.show();$(this.$row_product_url,$row).attr("href",selectedProduct.url);$(this.$row_product_pspecs,$row).show();}
 else if (selectedProduct.addToCartDisabledReasonKey =="addToCart.disabled.articlecode") {currentErrorIndicator.show();$("._js_hoffmann_cartdirectadd_results_not_purchasable",$row).show();}
 else if (selectedProduct.addToCartDisabledReasonKey =="addToCart.disabled.productfilter") {currentErrorIndicator.show();$("._js_hoffmann_cartdirectadd_results_not_purchasable_productfilter",$row).show();}
 else {if (isCartPage) {if (selectedProduct.addToCartDisabledReasonKey =="addToCart.disabled.noprice"||!selectedProduct.price ||selectedProduct.price.value ==0) {currentErrorIndicator.show();$("._js_hoffmann_cartdirectadd_results_no_price",$row).show();}
 }
 if (currentAmountField.val() ==0) {currentAmountField.attr("value",1);}
 if (currentErrorIndicator.css('display') =='none') {this.enableField(currentAmountField);this.enableField($(this.$row_costcenters_select,$row));if (selectedProduct.stock !=null) {if (selectedProduct.stock.stockLevelStatus.code =="inStock") {$("._js_hoffmann_cartdirectadd_availability_available",$row).show();currentSuccessIndicator.show();}
 if (selectedProduct.stock.stockLevelStatus.code =="outOfStock") {$("._js_hoffmann_cartdirectadd_availability_none",$row).show();currentSuccessIndicator.show();}
 if (selectedProduct.stock.stockLevelStatus.code =="manufacturerDelivery") {currentSuccessIndicator.show();$("._js_hoffmann_cartdirectadd_availability_manufacturer",$row).show();}
 } else {$("._js_hoffmann_cartdirectadd_availability_none",$row).show();currentSuccessIndicator.show();}
 $(this.$row_submit_possible_field,$row).val(1);}
 }
 }
 this.updateInfoForSubmit($row);this.updateUserStatus($row);},updateInfoForSubmit:function($row)
{var qty =$(this.$row_amount_field,$row).val() ||0;var code =$(this.$row_variants_select,$row).val() ||0;var submit =$(this.$row_submit_possible_field,$row).val() ?1 :0;var costcenter =$(this.$row_costcenters_select,$row).val() ||0;window.console.log(this.$logname,"do update hidden",submit + this.$submit_delimiter + qty + this.$submit_delimiter + code);$(this.$row_allinfo_hidden_field,$row).val(submit + this.$submit_delimiter + qty + this.$submit_delimiter + code + this.$submit_delimiter + costcenter );$(this.$row_allinfo_hidden_field,$row).attr("data-js-hoffmann-cartdirectadd-submit",submit);},updateUserStatus:function($row)
{var input =$(this.$row_code_field,$row).val();var code =$(this.$row_variants_select,$row).val();input =(typeof input !=="undefined"&&input !==null) ?input :"";code =(typeof code !=="undefined"&&code !==null) ?code :"";var has_variant =code.length !==0 ?1 :0;var has_term =input.length !==0 ?1 :0;window.console.log(this.$logname,"do update user status",has_variant,has_term);$row.attr(HOFFMANN.cartdirectadd.$row_status_has_term,has_term);$row.attr(HOFFMANN.cartdirectadd.$row_status_has_variant,has_variant);},bindInputImmediate:function()
 {$(this.$submit_form).on("change",this.$row_code_field,function(e) {if ($(e.target).val() =="") {var row =$(e.target).closest('._js_hoffmann_cartdirectadd_row');row.remove();HOFFMANN.cartdirectadd.updateRows($(HOFFMANN.cartdirectadd.$submit_form));}
 });$(this.$submit_form).on("keypress",this.$row_code_field,function(e) {if (e.keyCode =="13") {e.preventDefault();}
 });},bindVariantChooser:function()
 {$(this.$submit_form).on("change",this.$row_variants_select,function(e) {var row =$(e.target).closest(HOFFMANN.cartdirectadd.$row_div);var productList =row.data("data-js-hoffmann-cartdirectadd-query-results-as-product-list");row.data("data-js-hoffmann-cartdirectadd-selection",productList[e.target.value]);HOFFMANN.cartdirectadd.updateSelection(row);});$(this.$submit_form).on("keyup",this.$row_variants_select,function(e) {if (e.which ==38 ||e.which ==40) {var row =$(e.target).closest(HOFFMANN.cartdirectadd.$row_div);var productList =row.data("data-js-hoffmann-cartdirectadd-query-results-as-product-list");row.data("data-js-hoffmann-cartdirectadd-selection",productList[e.target.value]);HOFFMANN.cartdirectadd.updateSelection(row);}
 });},bindCostCenterChooser:function()
 {$(this.$submit_form).on("change",this.$row_costcenters_select,function(e) {HOFFMANN.cartdirectadd.updateInfoForSubmit($(e.target).closest(HOFFMANN.cartdirectadd.$row_div));});},bindAmountChooser:function()
 {$(this.$submit_form).on("change",this.$row_amount_field,function(e) {HOFFMANN.cartdirectadd.updateInfoForSubmit($(e.target).closest(HOFFMANN.cartdirectadd.$row_div));});$(this.$submit_form).on("keyup",this.$row_amount_field,function(e) {HOFFMANN.cartdirectadd.updateInfoForSubmit($(e.target).closest(HOFFMANN.cartdirectadd.$row_div));});},bindHidden:function()
 {$(this.$submit_form).on("change",this.$row_allinfo_hidden_field,function(e) {var $form =$(e.delegateTarget);var $submittable =$(this.$row_allinfo_hidden_field + "[data-js-hoffmann-cartdirectadd-submit=1]",$form);window.console.log(this.$logname,"do update dom submit",$submittable.length);if ($submittable.length !==0) {this.enableField($("._js_hoffmann_cartdirectadd_submit",$form));}
 else {this.disableField($("._js_hoffmann_cartdirectadd_submit",$form));}
 });},bindSubmit:function()
 {$(this.$submit_form).on("submit",function(e) {e.preventDefault();var submitData =$(HOFFMANN.cartdirectadd.$row_allinfo_hidden_field,this).serialize();$.ajax({type:"POST",dataType:"text",url:this.getAttribute("data-js-hoffmann-cartdirectadd-add-url"),data:submitData,error:function(xhr,textStatus,errorThrown) {window.console.log(HOFFMANN.cartdirectadd.$logname,"add failure",textStatus,errorThrown);},success:function(data,textStatus,xhr) {var toUrl =window.location.href;toUrl =toUrl.replace("?wayIntoCart=ArticleListCsv","");toUrl =toUrl.replace("?wayIntoCart=BarcodeScanImport","");toUrl =toUrl.replace("?wayIntoCart=OrderForm","");window.location.href =toUrl;}
 });});},switchToDefaultVisibility:function ($row){$(this.$row_product_details_div,$row).hide();$(this.$default_invisible_indicator,$row).hide();$(this.$row_code_suggestions_div,$row).hide();$(this.$row_variants_select,$row).empty();this.disableField($(this.$row_variants_select,$row));this.disableField($(this.$row_costcenters_select,$row));this.disableField($(this.$row_amount_field,$row));$(this.$row_amount_field,$row).attr("min",0);$(this.$row_amount_field,$row).attr("value",0);$(this.$row_product_url,$row).attr("href","");$(this.$row_product_pspecs,$row).hide();$(this.$row_allinfo_hidden_field,$row).val("");$(this.$row_submit_possible_field,$row).val("");},disableField:function($field){$field.attr("disabled","disabled").css({opacity:0.25});},enableField:function($field){$field.removeProp("disabled").css({opacity:1.0});},getPreparedProductData:function (product,variant,selectFirstVariant){var productId =product.baseProductCode;var defaultVariant =product.code.replace(product.baseProductCode + "-","");var productName =product.name;if(!selectFirstVariant){productName =productName;productId =product.baseProductCode + " "+ variant;}
 return {value:product.baseProductCode,sizeVariants:product.baseProductVariantsNamesByCode,name:productName,code:product.baseProductCode + " "+ variant,baseProductCode:product.baseProductCode,hasPspecs:product.hasPspecs,addToCartDisabledReasonKey:product.addToCartDisabledReasonKey,stock:product.stock,volumePrices:product.volumePrices,type:"productResult",image:product.baseProductImage.url,price:product.price,selectFirstVariant:selectFirstVariant
 };},firstValue:function (obj) {for (var a in obj) return obj[a];},reloadPage:function()
 {$.ajax({url:"",context:document.body,success:function(data) {$(this).html(data);}
 });}
};$(document).ready(function() {with (HOFFMANN.cartdirectadd){bindInputImmediate();bindVariantChooser();bindCostCenterChooser();bindAmountChooser();bindSubmit();bindHidden();updateAll()
 }
});HOFFMANN.deliveryaddress ={bindAll:function ()
{this.bindEditDeliveryAddressButton();this.bindLoadThisDeliveryAddressChooser();},initialRefreshAll:function ()
{$('._js_hoffmann_deliveryaddress_initial_refresh').each(HOFFMANN.deliveryaddress.initialRefreshDeliveryAddress);},initialRefreshDeliveryAddress:function (index,elem)
{var quotedAddress =$(elem).attr('data-js-hoffmann-deliveryaddress-initial-refresh').replace(/&quot;/g, "'");;

var data =$.parseJSON(quotedAddress ||'{}');HOFFMANN.deliveryaddress.refreshDeliveryAddressSection(data);var addressLinesRequired =$("#checkout_section_deliveryaddress").data("required");var addressLines123 =$.trim($('#address-lines').text());if (addressLinesRequired &&addressLines123.length ==0)
{$("#error-addressLines-mandatory").show();mandatoryFieldsMissing=true;$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));}
 else
 {$("#error-addressLines-mandatory").hide();}
},bindCancelDeliveryAddressButton:function ()
{$(document).on('click','#checkout_section_deliveryaddress #section-cancel',function()
{$.ajax({url:hoffmann_deliveryaddress_get_addresses_url,type:'GET',dataType:'json',success:function (data)
{HOFFMANN.deliveryaddress.refreshDeliveryAddressSection(data.js_hoffmann_hoffmannaddress_context_cart.deliveryAddress);ACC.common.enableOrDisableCheckout('error-addressLines-mandatory');},error:function (xht,textStatus,ex)
{alert("Failed to get delivery address. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});},bindEditDeliveryAddressButton:function ()
{$(document).on('click','#checkout_section_deliveryaddress #section-edit',function()
{$.ajax({url:hoffmann_deliveryaddress_get_addresses_url,type:'GET',dataType:'json',success:function (data)
{HOFFMANN.deliveryaddress.editDeliveryAddressSection(data);HOFFMANN.deliveryaddress.bindCancelDeliveryAddressButton();},error:function (xht,textStatus,ex)
{alert("Failed to get delivery address. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});},saveDeliveryAddress:function(form)
 {var selectedCode =true;if (selectedCode)
 {$.ajax({url:hoffmann_deliveryaddress_set_addresses_url,type:'POST',dataType:'json',data:$(form).serialize(),beforeSend:function ()
 {},success:function (data)
 {if (data !=null)
 {HOFFMANN.deliveryaddress.refreshDeliveryAddressSection(data.js_hoffmann_hoffmannaddress_context_cart.deliveryAddress);skipAddressCheck=true;$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));if ($(document).find('#checkout_section_deliverymode #section-edit').is(':disabled')) {$(document).find('#checkout_section_deliverymode #section-edit').removeAttr('disabled');}
ACC.common.enableOrDisableCheckout('error-addressLines-mandatory');}
 else
 {alert("Failed to set delivery address");}
 },error:function (xht,textStatus,ex)
 {alert("Ajax call failed while trying to set delivery address. Error details ["+ xht.getResponseHeader('com.hoffmann.oneshop.AjaxError') + ", "+ textStatus + ", "+ ex + "]");},complete:function ()
 {}
 });}
 return false;},bindLoadThisDeliveryAddressChooser:function()
{$(document).on('change','#checkout_section_deliveryaddress #address\\.address',function() {var $form =$(this).closest('form');var $chooser =$(this);var addresses =$.parseJSON($form.attr('data-js-hoffmann-deliveryaddress-address-map') ||'{}');var address =addresses[$chooser.val()] ||{};$.each(address,function(fieldName,fieldValue) {var $field =$('[name="'+ fieldName + '"]',$form);if ($field.length < 1) {return true;}
if ($field.length > 1) {window.console.warn('Failed to load delivery address, too many fields matching name',fieldName);return true;}
if ($field.is($chooser)) {return true;}
if($field[0].type =="checkbox"){$field.prop("checked",$.parseJSON(fieldValue))
 }
 else {$field.val(fieldValue);}
});});},editDeliveryAddressSection:function (data)
{$('#checkout_section_deliveryaddress').replaceWith($('#deliveryAddressEditTemplate').tmpl(data));$('#checkout_section_deliveryaddress').validate({submitHandler:function(form) {HOFFMANN.deliveryaddress.saveDeliveryAddress(form);}
 });},refreshDeliveryAddressSection:function (data)
{if (data ==null ||data =="undefined"){$('#checkout_section_deliveryaddress').replaceWith($('#deliveryAddressSummaryEmptyTemplate').tmpl());}
 else {$('#checkout_section_deliveryaddress').replaceWith($('#deliveryAddressSummaryTemplate').tmpl(data));}
}
};$(document).ready(function ()
{HOFFMANN.deliveryaddress.bindAll();HOFFMANN.deliveryaddress.initialRefreshAll();});HOFFMANN.billingaddress ={bindAll:function ()
{this.bindEditBillingAddressButton();this.bindLoadThisBillingAddressChooser();},initialRefreshAll:function ()
{$('._js_hoffmann_billingaddress_initial_refresh').each(HOFFMANN.billingaddress.initialRefreshBillingAddress);},initialRefreshBillingAddress:function (index,elem)
{var data =$.parseJSON($(elem).attr('data-js-hoffmann-billingaddress-initial-refresh') ||'{}');HOFFMANN.billingaddress.refreshBillingAddressSection(data);},bindCancelBillingAddressButton:function ()
{$(document).on('click','#checkout_section_billingaddress #section-cancel',function()
{$.ajax({url:hoffmann_billingaddress_get_addresses_url,type:'GET',dataType:'json',success:function (data)
{HOFFMANN.billingaddress.refreshBillingAddressSection(data.js_hoffmann_hoffmannaddress_context_cart.billingAddress);},error:function (xht,textStatus,ex)
{alert("Failed to get billing address. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});},bindEditBillingAddressButton:function ()
{$(document).on('click','#checkout_section_billingaddress #section-edit',function()
{$.ajax({url:hoffmann_billingaddress_get_addresses_url,type:'GET',dataType:'json',success:function (data)
{HOFFMANN.billingaddress.editBillingAddressSection(data);HOFFMANN.billingaddress.bindCancelBillingAddressButton();},error:function (xht,textStatus,ex)
{alert("Failed to get billing address. Error details ["+ xht + ", "+ textStatus + ", "+ ex + "]");}
});return false;});},saveBillingAddress:function(form)
 {var selectedCode =true;if (selectedCode)
 {$.ajax({url:hoffmann_billingaddress_set_addresses_url,type:'POST',dataType:'json',data:$(form).serialize(),beforeSend:function ()
 {},success:function (data)
 {if (data !=null)
 {HOFFMANN.billingaddress.refreshBillingAddressSection(data.js_hoffmann_hoffmannaddress_context_cart.billingAddress);skipAddressCheck=true;$('#placeOrderDiv').replaceWith($('#placeOrderTemplate').tmpl({selectedPaymentType:checkoutPaymentType,selectedPaymentTypeName:checkoutPaymentTypeName}));}
 else
 {alert("Failed to set billing address");}
 },error:function (xht,textStatus,ex)
 {alert("Ajax call failed while trying to set billing address. Error details ["+ xht.getResponseHeader('com.hoffmann.oneshop.AjaxError') + ", "+ textStatus + ", "+ ex + "]");},complete:function ()
 {}
 });}
 return false;},bindLoadThisBillingAddressChooser:function()
{$(document).on('change','#checkout_section_billingaddress #address\\.address',function() {var $form =$(this).closest('form');var $chooser =$(this);var addresses =$.parseJSON($form.attr('data-js-hoffmann-billingaddress-address-map') ||'{}');var address =addresses[$chooser.val()] ||{};$.each(address,function(fieldName,fieldValue) {var $field =$('[name="'+ fieldName + '"]',$form);if ($field.length < 1) {return true;}
if ($field.length > 1) {window.console.warn('Failed to load billing address, too many fields matching name',fieldName);return true;}
if ($field.is($chooser)) {return true;}
if($field[0].type =="checkbox"){$field.prop("checked",$.parseJSON(fieldValue))
 }
 else {$field.val(fieldValue);}
});});},editBillingAddressSection:function (data)
{$('#checkout_section_billingaddress').replaceWith($('#billingAddressEditTemplate').tmpl(data));$('#checkout_section_billingaddress').validate({submitHandler:function(form) {HOFFMANN.billingaddress.saveBillingAddress(form);}
 });},refreshBillingAddressSection:function (data)
{if (data ==null ||data =="undefined"){$('#checkout_section_billingaddress').replaceWith($('#billingAddressSummaryEmptyTemplate').tmpl());}
 else {$('#checkout_section_billingaddress').replaceWith($('#billingAddressSummaryTemplate').tmpl(data));}
}
};$(document).ready(function ()
{HOFFMANN.billingaddress.bindAll();HOFFMANN.billingaddress.initialRefreshAll();});function doYes(id){window.location.href=id;}
function CustomConfirm(){this.onConfirm =function(callback,t,e){var winW =window.innerWidth;var winH =window.innerHeight;var dialogoverlay =document.getElementById('dialogoverlay');var dialogbox =document.getElementById('dialogbox');dialogoverlay.style.display ="block";dialogbox.style.display ="block";$('#confirm_yes').off('click');$('#confirm_yes').on('click',function()
 {callback(t,e);document.getElementById('dialogbox').style.display ="none";document.getElementById('dialogoverlay').style.display ="none";});$('#confirm_no').off('click');$('#confirm_no').on('click',function()
 {Confirm.no();});return false;}
 this.render =function(id){var winW =window.innerWidth;var winH =window.innerHeight;$('#dialogoverlay').fadeIn(100);$('#dialogbox').fadeIn(100);$('#confirm_yes').off('click');$('#confirm_yes').on('click',function()
 {Confirm.yes(id);});$('#confirm_no').off('click');$('#confirm_no').on('click',function()
 {Confirm.no();});$('#dialogoverlay').off('click');$('#dialogoverlay').on('click',function()
 {Confirm.no();});return false;}
 this.no =function(){$('#dialogoverlay').fadeOut(100);$('#dialogbox').fadeOut(100);}
 this.yes =function(id){doYes(id);$('#dialogoverlay').fadeOut(100);$('#dialogbox').fadeOut(100);}
}
var Confirm =new CustomConfirm();var HOFFMANN =HOFFMANN ||{};HOFFMANN.collectiveorder ={bindDeliveryAddressSelector:function()
{$('._js_hoffmann_collectiveorder_deliveryaddress').change(function() {$(this).closest('form').submit();});},bindAll:function()
{this.bindDeliveryAddressSelector();}
};$(document).ready(function() {HOFFMANN.collectiveorder.bindAll();});(function($,window){var htmlSpecialCharsRegEx =/[<>&\r\n"']/gm;
var htmlSpecialCharsPlaceHolders ={'<':'lt;','>':'gt;','&':'amp;','\r':"#13;",'\n':"#10;",'"':'quot;',"'":'#39;'
};

$.extend({
    //
    //$.fileDownload('/path/to/url/',options)
 fileDownload:function (fileUrl,options) {var settings =$.extend({preparingMessageHtml:null,failMessageHtml:null,androidPostUnsupportedMessageHtml:"Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",dialogOptions:{modal:true },prepareCallback:function (url) {},successCallback:function (url) {},failCallback:function (responseHtml,url) {},httpMethod:"GET",data:null,checkInterval:100,cookieName:"fileDownload",cookieValue:"true",cookiePath:"/",cookieDomain:null,popupWindowTitle:"Initiating file download...",encodeHTMLEntities:true
 },options);var deferred =new $.Deferred();var userAgent =(navigator.userAgent ||navigator.vendor ||window.opera).toLowerCase();var isIos;var isAndroid;var isOtherMobileBrowser;if (/ip(ad|hone|od)/.test(userAgent)) {

 isIos =true;} else if (userAgent.indexOf('android') !==-1) {isAndroid =true;} else {isOtherMobileBrowser =/avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));

 }
 var httpMethodUpper =settings.httpMethod.toUpperCase();if (isAndroid &&httpMethodUpper !=="GET") {if ($().dialog) {$("<div>").html(settings.androidPostUnsupportedMessageHtml).dialog(settings.dialogOptions);} else {alert(settings.androidPostUnsupportedMessageHtml);}
 return deferred.reject();}
 var $preparingDialog =null;var internalCallbacks ={onPrepare:function (url) {if (settings.preparingMessageHtml) {$preparingDialog =$("<div>").html(settings.preparingMessageHtml).dialog(settings.dialogOptions);} else if (settings.prepareCallback) {settings.prepareCallback(url);}
 },onSuccess:function (url) {if ($preparingDialog) {$preparingDialog.dialog('close');};settings.successCallback(url);deferred.resolve(url);},onFail:function (responseHtml,url) {if ($preparingDialog) {$preparingDialog.dialog('close');};if (settings.failMessageHtml) {$("<div>").html(settings.failMessageHtml).dialog(settings.dialogOptions);}
 settings.failCallback(responseHtml,url);deferred.reject(responseHtml,url);}
 };internalCallbacks.onPrepare(fileUrl);if (settings.data !==null &&typeof settings.data !=="string") {settings.data =$.param(settings.data);}
 var $iframe,downloadWindow,formDoc,$form;if (httpMethodUpper ==="GET") {if (settings.data !==null) {var qsStart =fileUrl.indexOf('?');if (qsStart !==-1) {if (fileUrl.substring(fileUrl.length - 1) !=="&") {fileUrl =fileUrl + "&";}
 } else {fileUrl =fileUrl + "?";}
 fileUrl =fileUrl + settings.data;}
 if (isIos ||isAndroid) {downloadWindow =window.open(fileUrl);downloadWindow.document.title =settings.popupWindowTitle;window.focus();} else if (isOtherMobileBrowser) {window.location(fileUrl);} else {$iframe =$("<iframe>")
 .hide()
 .prop("src",fileUrl)
 .appendTo("body");}
 } else {var formInnerHtml ="";if (settings.data !==null) {$.each(settings.data.replace(/\+/g, ' ').split("&"), function () {

 var kvp =this.split("=");var key =settings.encodeHTMLEntities ?htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[0])) :decodeURIComponent(kvp[0]);if (key) {var value =settings.encodeHTMLEntities ?htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[1])) :decodeURIComponent(kvp[1]);formInnerHtml +='<input type="hidden" name="'+ key + '" value="'+ value + '" />';}
 });}
 if (isOtherMobileBrowser) {$form =$("<form>").appendTo("body");$form.hide()
 .prop('method',settings.httpMethod)
 .prop('action',fileUrl)
 .html(formInnerHtml);} else {if (isIos) {downloadWindow =window.open("about:blank");downloadWindow.document.title =settings.popupWindowTitle;formDoc =downloadWindow.document;window.focus();} else {$iframe =$("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body");formDoc =getiframeDocument($iframe);}
 formDoc.write("<html><head></head><body><form method='"+ settings.httpMethod + "' action='"+ fileUrl + "'>"+ formInnerHtml + "</form>"+ settings.popupWindowTitle + "</body></html>");$form =$(formDoc).find('form');}
 $form.submit();}
 setTimeout(checkFileDownloadComplete,settings.checkInterval);function checkFileDownloadComplete() {if (document.cookie.indexOf(settings.cookieName + "="+ settings.cookieValue) !=-1) {internalCallbacks.onSuccess(fileUrl);var cookieData =settings.cookieName + "=; path="+ settings.cookiePath + "; expires="+ new Date(0).toUTCString() + ";";if (settings.cookieDomain) cookieData +=" domain="+ settings.cookieDomain + ";";document.cookie =cookieData;cleanUp(false);return;}
 if (downloadWindow ||$iframe) {try {var formDoc =downloadWindow ?downloadWindow.document :getiframeDocument($iframe);if (formDoc &&formDoc.body !=null &&formDoc.body.innerHTML.length) {var isFailure =true;if ($form &&$form.length) {var $contents =$(formDoc.body).contents().first();try {if ($contents.length &&$contents[0] ===$form[0]) {isFailure =false;}
 } catch (e) {if (e &&e.number ==-2146828218) {isFailure =true;} else {throw e;}
 } }
 if (isFailure) {setTimeout(function () {internalCallbacks.onFail(formDoc.body.innerHTML,fileUrl);cleanUp(true);},100);return;}
 }
 }
 catch (err) {internalCallbacks.onFail('',fileUrl);cleanUp(true);return;}
 }
 setTimeout(checkFileDownloadComplete,settings.checkInterval);}
 function getiframeDocument($iframe) {var iframeDoc =$iframe[0].contentWindow ||$iframe[0].contentDocument;if (iframeDoc.document) {iframeDoc =iframeDoc.document;}
 return iframeDoc;}
 function cleanUp(isFailure) {setTimeout(function() {if (downloadWindow) {if (isAndroid) {downloadWindow.close();}
 if (isIos) {if (downloadWindow.focus) {downloadWindow.focus();if (isFailure) {downloadWindow.close();}
 }
 }
 }
 },0);}
 function htmlSpecialCharsEntityEncode(str) {return str.replace(htmlSpecialCharsRegEx,function(match) {return '&'+ htmlSpecialCharsPlaceHolders[match];});}
 return deferred.promise();}
});})(jQuery,this);HOFFMANN.productcaddata ={bindAll:function ()
{this.bindUseThisProductCADDataButton();this.bindEnableDownloadButton();this.bindUseThisProductCADHide();this.bindUseThisProductCADShow();this.bindInitialHideCADData();},bindUseThisProductCADDataButton:function ()
{$(document).on('click','._js_hoffmann_productcaddata_form ._js_hoffmann_productcaddata_submit',function()
{$(this).closest('._js_hoffmann_productcaddata_form').find("input:checked").not("#ob-terms").each(function(){econdaDownload("CAD/single/"+$(this).val()+"/"+$(this).attr("id")+".zip");});$.fileDownload(hoffmann_productcaddata_download_url + '?'+ $(this).closest('._js_hoffmann_productcaddata_form').find(':input').serialize(),{type:'GET'})
.done(function (url) {alert('SUCESS with URL  '+ url);})
.fail(function (data,url) {alert('Download failed. Please contact your support.'+ data + ' URL '+ url);});});},bindEnableDownloadButton:function ()
 {$(document).on('click','._js_hoffmann_productcaddata_form #ob-terms, .check',function()
 {if ($('#ob-terms:checked').length>0 &&$('.check:checked').length>0) {$(document).find('._js_hoffmann_productcaddata_form ._js_hoffmann_productcaddata_submit').removeAttr('disabled');}
 else {$(document).find('._js_hoffmann_productcaddata_form ._js_hoffmann_productcaddata_submit').attr('disabled','disabled');}
 });},bindUseThisProductCADHide:function ()
 {$(document).on('click','._js_hoffmann_productcaddata_form #cad-data-close',function()
 {$(document).find('._js_hoffmann_productcaddata_form').css('display','none');});},bindUseThisProductCADShow:function ()
 {$(document).on('click','#cad-data-show',function()
 {$(document).find('._js_hoffmann_productcaddata_form').css('display','');});},bindInitialHideCADData:function () {$(document).find('._js_hoffmann_productcaddata_form').css('display','none');}
};$(document).ready(function ()
{HOFFMANN.productcaddata.bindAll();});var HOFFMANN =HOFFMANN ||{};HOFFMANN.country ={reloadPage:function()
{$.ajax({url:"",context:document.body,success:function(data,textStatus,jqXHR ) {location =jqXHR.getResponseHeader('X-Oneshop-Location');}
});},bindCountrySelector:function()
{$('#js-language-selector-button').bind("click",function() {var data ={};data['countryCode'] =$('.country_selector select').val();$.ajax({url:getCountrySelectionURL,data:data,type:'POST'})
.always(HOFFMANN.country.reloadPage);return false;});},bindAll:function()
{this.bindCountrySelector();}
};$(document).ready(function() {HOFFMANN.country.bindAll();});HOFFMANN.mycompany ={bindAll:function ()
{this.bindUseThisSortSelect();this.bindAllowTheseCostCenters();this.bindDatePickerSelector();},applyAll:function ()
{this.applyAllowTheseCostCenters();},applyAllowTheseCostCenters:function ()
{$('._js_hoffmann_mycompany_costcenters :checkbox',document).trigger('change');},bindAllowTheseCostCenters:function ()
{$(document).on('change','._js_hoffmann_mycompany_costcenters :checkbox',function(e)
{var $select=$('._js_hoffmann_mycompany_defaultcostcenter');var $option =$('option[value="'+ $(e.target).attr('value') + '"]',$select);window.console.log('_js_hoffmann_mycompany_costcenters, bind, ',$(e.target).is(':checked'));if ($(e.target).is(':checked')) {$option.removeAttr('disabled');$option.removeProp('disabled');}
else {$option.attr('disabled','disabled');$option.prop('disabled',true);if ($select.val() ==$(e.target).attr('value')) {$select.val('').trigger('change');}
}
});},bindUseThisSortSelect:function ()
{$(document).on('change','#_js_hoffmann_mycompany_users_sorting',function()
{$(location).attr('href',$(this).val());});},bindDatePickerSelector:function()
{$('#date1').change(function(){$('select#maxAgeInDays').val(-1);});$('#date2').change(function(){$('select#maxAgeInDays').val(-1);});}
};$(document).ready(function ()
{HOFFMANN.mycompany.bindAll();HOFFMANN.mycompany.applyAll();});var HOFFMANN =HOFFMANN ||{};HOFFMANN.costcenter ={bindBudgetUpdate:function()
{$('._js_hoffmann_company').change(function() {$(this).closest('form').submit();});},bindAll:function()
{this.bindBudgetUpdate();}
};$(document).ready(function() {HOFFMANN.costcenter.bindAll();});var HOFFMANN =HOFFMANN ||{};HOFFMANN.generic ={bindPlugin:function()
{$('._js_hoffmann_generic_datepickerplugin').datepicker();},bindOnDocumentReady:function()
{$(document).ready(function() {$('._js_hoffmann_generic_clickondocumentready').trigger('click');});},bindOnChange:function()
{$(document).on('change','._js_hoffmann_generic_submitonchange',function(e) {$(e.target).closest('form').submit();});},bindAll:function()
{this.bindPlugin();this.bindOnDocumentReady();this.bindOnChange();}
};$(document).ready(function() {HOFFMANN.generic.bindAll();});function refreshMiniCart() {$.get(refreshMiniCartUrl+ Math.floor(Math.random()*101) * (new Date().getTime()),function(result) {$('#minicart_data').html(result);});pulseAddToCart();showSuccessMessageOnButton($('#addToCartButton') );}
HOFFMANN.refresh ={refreshCartItems:function(checkoutCartData)
{$('#cart_items_tbody').html($('#entriesTemplate').tmpl(checkoutCartData,{deliveryMode:checkoutCartData.deliveryMode }));}
};$(document).ready(function ()
{});HOFFMANN.printorder ={bindAll:function ()
{this.printDiv();},printDiv:function ()
{$('#printOrderButton').on("click",function ()
{var printContents =document.getElementById('printableArea').innerHTML;var originalContents =document.body.innerHTML;document.body.innerHTML =printContents;window.print();document.body.innerHTML =originalContents;});}
};$(document).ready(function ()
{HOFFMANN.printorder.bindAll();});;var videoSlider ={data:[],init:function() {if($(window).width() > 600 &&$("html").hasClass("no-touch")) {$(".play").click(function(e) {e.stopPropagation();e.preventDefault();var embedUrl ='//www.youtube.com/embed/'+$(this).data("videoId")+'?rel=0&showinfo=0&hl='+$(this).data("videoLang")+'&autoplay=1';econdaDownload('youtube/'+ $(this).attr("data-youtube"));videoSlider.openOverlay(embedUrl);});$(".col,.ratio_inner").click(function(e) {$(this).find(".play").trigger("click");});} else {$(".play").click(function(e) {econdaDownload('youtube/'+ $(this).attr("data-youtube"));});}
},openOverlay:function(url) {var overlay =$('<div id="lbbackground"></div><div id="lbforeground"><div class="lbf_area"><div class="lbf_closer"><button class="btn-icon btn-primary js-closelb list-products-btn-remove"><i class="icon-remove-product"></i></button></div><div class="lbf_content lb_layer"></div><div class="lbf_loader"></div></div></div>');overlay.find('.lbf_content').html('<iframe width="560" height="315" src="'+url+'" frameborder="0" onload="videoSlider.showIframe();" allowfullscreen="true"></iframe>');$("body").append(overlay);$('#lbbackground,#lbforeground').fadeIn(250,function() {});overlay.find(".js-closelb").click(function() {$('#lbbackground,#lbforeground').fadeOut(250,function() {overlay.remove();});});},showIframe:function() {$(".lbf_area").animate({'width':'80%'},250,function() {$(".lbf_content").addClass("visible");$(".lbf_closer").show();});}
}
if($(".videoSlider,.ratio_inner").length > 0) {videoSlider.init();}
;(function($ ) {var div =document.createElement('div'),all =div.getElementsByTagName('i'),$doc =$(document.documentElement );div.innerHTML ='<!--[if lte IE 8]><i></i><![endif]-->';if(all[0 ] ) {$doc.addClass('ie-lte8');}
if(!('querySelector'in document ) ||(window.blackberry &&!window.WebKitPoint ) ||window.operamini ) {return;} else {$doc.addClass('tablesaw-enhanced');$(function(){$(document ).trigger("enhance.tablesaw");});}
})(jQuery );if(typeof Tablesaw ==="undefined") {Tablesaw ={i18n:{modes:['Stack','Swipe','Toggle'],columns:'Col<span class=\"a11y-sm\">umn</span>s',columnBtnText:'Columns',columnsDialogError:'No eligible columns.',sort:'Sort'}
};}
if(!Tablesaw.config ) {Tablesaw.config ={};}
;(function($ ) {var pluginName ="table",classes ={toolbar:"tablesaw-bar"},events ={create:"tablesawcreate",destroy:"tablesawdestroy",refresh:"tablesawrefresh"},defaultMode ="stack",initSelector ="table[data-tablesaw-mode],table[data-tablesaw-sortable]";var Table =function(element ) {if(!element ) {throw new Error("Tablesaw requires an element.");}
this.table =element;this.$table =$(element );this.mode =this.$table.attr("data-tablesaw-mode") ||defaultMode;this.init();};Table.prototype.init =function() {if (!this.$table.attr("id") ) {this.$table.attr("id",pluginName + "-"+ Math.round(Math.random() * 10000 ) );}
this.createToolbar();var colstart =this._initCells();this.$table.trigger(events.create,[this,colstart ] );};Table.prototype._initCells =function() {var colstart,thrs =this.table.querySelectorAll("thead tr"),self =this;$(thrs ).each(function(){var coltally =0;$(this ).children().each(function(){var span =parseInt(this.getAttribute("colspan"),10 ),sel =":nth-child("+ (coltally + 1 ) + ")";colstart =coltally + 1;if(span ){for(var k =0;k < span - 1;k++ ){coltally++;sel +=", :nth-child("+ (coltally + 1 ) + ")";}
}
this.cells =self.$table.find("tr").not($(thrs ).eq(0 ) ).not(this ).children(sel );coltally++;});});return colstart;};Table.prototype.refresh =function() {this._initCells();this.$table.trigger(events.refresh );};Table.prototype.createToolbar =function() {var $toolbar =this.$table.prev('.'+ classes.toolbar );if(!$toolbar.length ) {$toolbar =$('<div>')
.addClass(classes.toolbar )
.insertBefore(this.$table );}
this.$toolbar =$toolbar;if(this.mode ) {this.$toolbar.addClass('mode-'+ this.mode );}
};Table.prototype.destroy =function() {this.$table.prev('.'+ classes.toolbar ).each(function() {this.className =this.className.replace(/\bmode\-\w*\b/gi, '' );
});var tableId =this.$table.attr('id');$(document ).unbind("."+ tableId );$(window ).unbind("."+ tableId );this.$table.trigger(events.destroy,[this ] );this.$table.removeAttr('data-tablesaw-mode');this.$table.removeData(pluginName );};$.fn[pluginName ] =function() {return this.each(function() {var $t =$(this );if($t.data(pluginName ) ){return;}
var table =new Table(this );$t.data(pluginName,table );});};$(document ).on("enhance.tablesaw",function(e ) {$(e.target ).find(initSelector )[pluginName ]();});}(jQuery ));;(function(win,$,undefined ){var classes ={stackTable:'tablesaw-stack',cellLabels:'tablesaw-cell-label',cellContentLabels:'tablesaw-cell-content'};var data ={obj:'tablesaw-stack'};var attrs ={labelless:'data-tablesaw-no-labels',hideempty:'data-tablesaw-hide-empty'};var Stack =function(element ) {this.$table =$(element );this.labelless =this.$table.is('['+ attrs.labelless + ']');this.hideempty =this.$table.is('['+ attrs.hideempty + ']');if(!this.labelless ) {this.allHeaders =this.$table.find("th");}
this.$table.data(data.obj,this );};Stack.prototype.init =function(colstart ) {this.$table.addClass(classes.stackTable );if(this.labelless ) {return;}
var reverseHeaders =$(this.allHeaders );var hideempty =this.hideempty;reverseHeaders.each(function(){var $t =$(this ),$cells =$(this.cells ).filter(function() {return !$(this ).parent().is("["+ attrs.labelless + "]") &&(!hideempty ||!$(this ).is(":empty") );}),hierarchyClass =$cells.not(this ).filter("thead th").length &&" tablesaw-cell-label-top",$sortableButton =$t.find(".tablesaw-sortable-btn"),html =$sortableButton.length ?$sortableButton.html() :$t.html();if(html !==""){if(hierarchyClass ){var iteration =parseInt($(this ).attr("colspan"),10 ),filter ="";if(iteration ){filter ="td:nth-child("+ iteration +"n + "+ (colstart ) +")";}
$cells.filter(filter ).prepend("<b class='"+ classes.cellLabels + hierarchyClass + "'>"+ html + "</b>");} else {$cells.wrapInner("<span class='"+ classes.cellContentLabels + "'></span>");$cells.prepend("<b class='"+ classes.cellLabels + "'>"+ html + "</b>");}
}
});};Stack.prototype.destroy =function() {this.$table.removeClass(classes.stackTable );this.$table.find('.'+ classes.cellLabels ).remove();this.$table.find('.'+ classes.cellContentLabels ).each(function() {$(this ).replaceWith(this.childNodes );});};$(document ).on("tablesawcreate",function(e,Tablesaw,colstart ){if(Tablesaw.mode ==='stack'){var table =new Stack(Tablesaw.table );table.init(colstart );}
} );$(document ).on("tablesawdestroy",function(e,Tablesaw ){if(Tablesaw.mode ==='stack'){$(Tablesaw.table ).data(data.obj ).destroy();}
} );}(this,jQuery ));;(function($ ) {var pluginName ="tablesawbtn",initSelector =".btn",methods ={_create:function(){return $(this ).each(function() {$(this )
.trigger("beforecreate."+ pluginName )
[pluginName ]("_init")
.trigger("create."+ pluginName );});},_init:function(){var oEl =$(this ),sel =this.getElementsByTagName("select")[0 ];if(sel ) {$(this )
.addClass("btn-select")
[pluginName ]("_select",sel );}
return oEl;},_select:function(sel ) {var update =function(oEl,sel ) {var opts =$(sel ).find("option"),label,el,children;opts.each(function() {var opt =this;if(opt.selected ) {label =document.createTextNode(opt.text );}
});children =oEl.childNodes;if(opts.length > 0 ){for(var i =0,l =children.length;i < l;i++ ) {el =children[i ];if(el &&el.nodeType ===3 ) {oEl.replaceChild(label,el );}
}
}
};update(this,sel );$(this ).bind("change refresh",function() {update(this,sel );});}
};$.fn[pluginName ] =function(arrg,a,b,c ) {return this.each(function() {if(arrg &&typeof(arrg ) ==="string"){return $.fn[pluginName ].prototype[arrg ].call(this,a,b,c );}
if($(this ).data(pluginName + "active") ){return $(this );}
$(this ).data(pluginName + "active",true );$.fn[pluginName ].prototype._create.call(this );});};$.extend($.fn[pluginName ].prototype,methods );$(document ).on("enhance",function(e ) {$(initSelector,e.target )[pluginName ]();});}(jQuery ));;(function(win,$,undefined ){var ColumnToggle =function(element ) {this.$table =$(element );this.classes ={columnToggleTable:'tablesaw-columntoggle',columnBtnContain:'tablesaw-columntoggle-btnwrap tablesaw-advance',columnBtn:'tablesaw-columntoggle-btn tablesaw-nav-btn down',popup:'tablesaw-columntoggle-popup',priorityPrefix:'tablesaw-priority-',toolbar:'tablesaw-bar'};this.headers =this.$table.find('tr:first > th');this.$table.data('tablesaw-coltoggle',this );};ColumnToggle.prototype.init =function() {var tableId,id,$menuButton,$popup,$menu,$btnContain,self =this;this.$table.addClass(this.classes.columnToggleTable );tableId =this.$table.attr("id");id =tableId + "-popup";$btnContain =$("<div class='"+ this.classes.columnBtnContain + "'></div>");$menuButton =$("<a href='#"+ id + "' class='btn btn-micro "+ this.classes.columnBtn +"' data-popup-link>"+
"<span>"+ Tablesaw.i18n.columnBtnText + "</span></a>");$popup =$("<div class='dialog-table-coltoggle "+ this.classes.popup + "' id='"+ id + "'></div>");$menu =$("<div class='btn-group'></div>");var hasNonPersistentHeaders =false;$(this.headers ).not("td").each(function() {var $this =$(this ),priority =$this.attr("data-tablesaw-priority"),$cells =$this.add(this.cells );if(priority &&priority !=="persist") {$cells.addClass(self.classes.priorityPrefix + priority );$("<label><input type='checkbox' checked>"+ $this.text() + "</label>")
.appendTo($menu )
.children(0 )
.data("cells",$cells );hasNonPersistentHeaders =true;}
});if(!hasNonPersistentHeaders ) {$menu.append('<label>'+ Tablesaw.i18n.columnsDialogError + '</label>');}
$menu.appendTo($popup );$menu.find('input[type="checkbox"]').on("change",function(e) {var checked =e.target.checked;$(e.target ).data("cells")
.toggleClass("tablesaw-cell-hidden",!checked )
.toggleClass("tablesaw-cell-visible",checked );self.$table.trigger('tablesawcolumns');});$menuButton.appendTo($btnContain );$btnContain.appendTo(this.$table.prev('.'+ this.classes.toolbar ) );var closeTimeout;function openPopup() {$btnContain.addClass('visible');$menuButton.removeClass('down').addClass('up');$(document ).unbind('click.'+ tableId,closePopup );window.clearTimeout(closeTimeout );closeTimeout =window.setTimeout(function() {$(document ).one('click.'+ tableId,closePopup );},15 );}
function closePopup(event ) {if(event &&$(event.target ).closest("."+ self.classes.popup ).length ) {return;}
$(document ).unbind('click.'+ tableId );$menuButton.removeClass('up').addClass('down');$btnContain.removeClass('visible');}
$menuButton.on("click.tablesaw",function(event ) {event.preventDefault();if(!$btnContain.is(".visible") ) {openPopup();} else {closePopup();}
});$popup.appendTo($btnContain );this.$menu =$menu;$(window).on("resize."+ tableId,function(){self.refreshToggle();});this.refreshToggle();};ColumnToggle.prototype.refreshToggle =function() {this.$menu.find("input").each(function() {var $this =$(this );this.checked =$this.data("cells").eq(0 ).css("display") ==="table-cell";});};ColumnToggle.prototype.refreshPriority =function(){var self =this;$(this.headers).not("td").each(function() {var $this =$(this ),priority =$this.attr("data-tablesaw-priority"),$cells =$this.add(this.cells );if(priority &&priority !=="persist") {$cells.addClass(self.classes.priorityPrefix + priority );}
});};ColumnToggle.prototype.destroy =function() {this.$table.removeClass(this.classes.columnToggleTable );this.$table.find('th, td').each(function() {var $cell =$(this );$cell.removeClass('tablesaw-cell-hidden')
.removeClass('tablesaw-cell-visible');this.className =this.className.replace(/\bui\-table\-priority\-\d\b/g, '' );
});};$(document ).on("tablesawcreate",function(e,Tablesaw ){if(Tablesaw.mode ==='columntoggle'){var table =new ColumnToggle(Tablesaw.table );table.init();}
} );$(document ).on("tablesawdestroy",function(e,Tablesaw ){if(Tablesaw.mode ==='columntoggle'){$(Tablesaw.table ).data('tablesaw-coltoggle').destroy();}
} );}(this,jQuery ));;(function(win,$,undefined ){$.extend(Tablesaw.config,{swipe:{horizontalThreshold:15,verticalThreshold:30
}
});function createSwipeTable($table ){var $btns =$("<div class='tablesaw-advance'></div>"),$prevBtn =$('<a class="tablesaw-nav-btn btn btn-small btn-primary left" href="#"><i class="icon-arrow-flipped" title="Next"></i></a>').appendTo($btns ),$nextBtn =$('<a class="tablesaw-nav-btn btn btn-small btn-primary right" href="#"><i class="icon-arrow" title="Next"></i></a>').appendTo($btns ),hideBtn ='disabled',persistWidths ='tablesaw-fix-persist',$headerCells =$table.find("thead th"),$headerCellsNoPersist =$headerCells.not('[data-tablesaw-priority="persist"]'),headerWidths =[],$head =$(document.head ||'head'),tableId =$table.attr('id'),isIE8 =$('html').is('.ie-lte8');if(!$headerCells.length ) {throw new Error("tablesaw swipe: no header cells found. Are you using <th> inside of <thead>?");}
$table.css('width','auto');$headerCells.each(function() {headerWidths.push($(this ).outerWidth() );});$table.css('width','');$btns.appendTo($table.prev('.tablesaw-bar') );$table.addClass("tablesaw-swipe");if(!tableId ) {tableId ='tableswipe-'+ Math.round(Math.random() * 10000 );$table.attr('id',tableId );}
function $getCells(headerCell ) {return $(headerCell.cells ).add(headerCell );}
function showColumn(headerCell ) {$getCells(headerCell ).removeClass('tablesaw-cell-hidden');}
function hideColumn(headerCell ) {$getCells(headerCell ).addClass('tablesaw-cell-hidden');}
function persistColumn(headerCell ) {$getCells(headerCell ).addClass('tablesaw-cell-persist');}
function isPersistent(headerCell ) {return $(headerCell ).is('[data-tablesaw-priority="persist"]');}
function unmaintainWidths() {$table.removeClass(persistWidths );$('#'+ tableId + '-persist').remove();}
function maintainWidths() {var prefix ='#'+ tableId + '.tablesaw-swipe ',styles =[],tableWidth =$table.width(),hash =[],newHash;$headerCells.each(function(index ) {var width;if(isPersistent(this ) ) {width =$(this ).outerWidth();if(width < tableWidth * 0.75 ) {hash.push(index + '-'+ width );styles.push(prefix + ' .tablesaw-cell-persist:nth-child('+ (index + 1 ) + ') { width: '+ width + 'px; }');}
}
});newHash =hash.join('_');$table.addClass(persistWidths );var $style =$('#'+ tableId + '-persist');if(!$style.length ||$style.data('hash') !==newHash ) {$style.remove();if(styles.length ) {$('<style>'+ styles.join("\n") + '</style>')
.attr('id',tableId + '-persist')
.data('hash',newHash )
.appendTo($head );}
}
}
function getNext(){var next =[],checkFound;$headerCellsNoPersist.each(function(i ) {var $t =$(this ),isHidden =$t.css("display") ==="none"||$t.is(".tablesaw-cell-hidden");if(!isHidden &&!checkFound ) {checkFound =true;next[0 ] =i;} else if(isHidden &&checkFound ) {next[1 ] =i;return false;}
});return next;}
function getPrev(){var next =getNext();return [next[1 ] - 1 ,next[0 ] - 1 ];}
function nextpair(fwd ){return fwd ?getNext() :getPrev();}
function canAdvance(pair ){return pair[1 ] > -1 &&pair[1 ] < $headerCellsNoPersist.length;}
function matchesMedia() {var matchMedia =$table.attr("data-tablesaw-swipe-media");return !matchMedia ||("matchMedia"in win ) &&win.matchMedia(matchMedia ).matches;}
function fakeBreakpoints() {if(!matchesMedia() ) {return;}
var extraPaddingPixels =20,containerWidth =$table.parent().width(),persist =[],sum =0,sums =[],visibleNonPersistantCount =$headerCells.length;$headerCells.each(function(index ) {var $t =$(this ),isPersist =$t.is('[data-tablesaw-priority="persist"]');persist.push(isPersist );sum +=headerWidths[index ] + (isPersist ?0 :extraPaddingPixels );sums.push(sum );if(isPersist ||sum > containerWidth ) {visibleNonPersistantCount--;}
});var needsNonPersistentColumn =visibleNonPersistantCount ===0;$headerCells.each(function(index ) {if(persist[index ] ) {persistColumn(this );return;}
if(sums[index ] <=containerWidth ||needsNonPersistentColumn ) {needsNonPersistentColumn =false;showColumn(this );} else {hideColumn(this );}
});if(!isIE8 ) {unmaintainWidths();}
$table.trigger('tablesawcolumns');}
function advance(fwd ){var pair =nextpair(fwd );if(canAdvance(pair ) ){if(isNaN(pair[0 ] ) ){if(fwd ){pair[0] =0;}
else {pair[0] =$headerCellsNoPersist.length - 1;}
}
if(!isIE8 ) {maintainWidths();}
hideColumn($headerCellsNoPersist.get(pair[0 ] ) );showColumn($headerCellsNoPersist.get(pair[1 ] ) );$table.trigger('tablesawcolumns');}
}
$prevBtn.add($nextBtn ).click(function(e ){advance(!!$(e.target ).closest($nextBtn ).length );e.preventDefault();});function getCoord(event,key ) {return (event.touches ||event.originalEvent.touches )[0 ][key ];}
$table
.bind("touchstart.swipetoggle",function(e ){var originX =getCoord(e,'pageX'),originY =getCoord(e,'pageY'),x,y;$(win ).off("resize",fakeBreakpoints );$(this )
.bind("touchmove",function(e ){x =getCoord(e,'pageX');y =getCoord(e,'pageY');var cfg =Tablesaw.config.swipe;if(Math.abs(x - originX ) > cfg.horizontalThreshold &&Math.abs(y - originY ) < cfg.verticalThreshold ) {e.preventDefault();}
})
.bind("touchend.swipetoggle",function(){var cfg =Tablesaw.config.swipe;if(Math.abs(y - originY ) < cfg.verticalThreshold ) {if(x - originX < -1 * cfg.horizontalThreshold ){advance(true );}
if(x - originX > cfg.horizontalThreshold ){advance(false );}
}
window.setTimeout(function() {$(win ).on("resize",fakeBreakpoints );},300);$(this ).unbind("touchmove touchend");});})
.bind("tablesawcolumns.swipetoggle",function(){$prevBtn[canAdvance(getPrev() ) ?"removeClass":"addClass"](hideBtn );$nextBtn[canAdvance(getNext() ) ?"removeClass":"addClass"](hideBtn );})
.bind("tablesawnext.swipetoggle",function(){advance(true );} )
.bind("tablesawprev.swipetoggle",function(){advance(false );} )
.bind("tablesawdestroy.swipetoggle",function(){var $t =$(this );$t.removeClass('tablesaw-swipe');$t.prev('.tablesaw-bar').find('.tablesaw-advance').remove();$(win ).off("resize",fakeBreakpoints );$t.unbind(".swipetoggle");});fakeBreakpoints();$(win ).on("resize",fakeBreakpoints );}
$(document ).on("tablesawcreate",function(e,Tablesaw ){if(Tablesaw.mode ==='swipe'){createSwipeTable(Tablesaw.$table );}
} );}(this,jQuery ));;(function($ ) {function getSortValue(cell ) {return $.map(cell.childNodes,function(el ) {var $el =$(el );if($el.is('input, select') ) {return $el.val();} else if($el.hasClass('tablesaw-cell-label') ) {return;}
return $.trim($el.text() );}).join('');}
var pluginName ="tablesaw-sortable",initSelector ="table[data-"+ pluginName + "]",sortableSwitchSelector ="[data-"+ pluginName + "-switch]",attrs ={defaultCol:"data-tablesaw-sortable-default-col"},classes ={head:pluginName + "-head",ascend:pluginName + "-ascending",descend:pluginName + "-descending",switcher:pluginName + "-switch",tableToolbar:'tablesaw-toolbar',sortButton:pluginName + "-btn"},methods ={_create:function(o ){return $(this ).each(function() {var init =$(this ).data("init"+ pluginName );if(init ) {return false;}
$(this )
.data("init"+ pluginName,true )
.trigger("beforecreate."+ pluginName )
[pluginName ]("_init",o )
.trigger("create."+ pluginName );});},_init:function(){var el =$(this ),heads,$switcher;var addClassToTable =function(){el.addClass(pluginName );},addClassToHeads =function(h ){$.each(h ,function(i ,v ){$(v ).addClass(classes.head );});},makeHeadsActionable =function(h ,fn ){$.each(h ,function(i ,v ){var b =$("<button class='"+ classes.sortButton + "'/>");b.bind("click",{col:v } ,fn );$(v ).wrapInner(b );});},clearOthers =function(sibs ){$.each(sibs ,function(i ,v ){var col =$(v );col.removeAttr(attrs.defaultCol );col.removeClass(classes.ascend );col.removeClass(classes.descend );});},headsOnAction =function(e ){if($(e.target ).is('a[href]') ) {return;}
e.stopPropagation();var head =$(this ).parent(),v =e.data.col,newSortValue =heads.index(head );clearOthers(head.siblings() );if(head.hasClass(classes.descend ) ){el[pluginName ]("sortBy",v ,true);newSortValue +='_asc';} else {el[pluginName ]("sortBy",v );newSortValue +='_desc';}
if($switcher ) {$switcher.find('select').val(newSortValue ).trigger('refresh');}
e.preventDefault();},handleDefault =function(heads ){$.each(heads ,function(idx ,el ){var $el =$(el );if($el.is("["+ attrs.defaultCol + "]") ){if(!$el.hasClass(classes.descend ) ) {$el.addClass(classes.ascend );}
}
});},addSwitcher =function(heads ){$switcher =$('<div>').addClass(classes.switcher ).addClass(classes.tableToolbar ).html(function() {var html =['<label>'+ Tablesaw.i18n.sort + ':'];html.push('<span class="btn btn-small">&#160;<select>');heads.each(function(j ) {var $t =$(this ),isDefaultCol =$t.is("["+ attrs.defaultCol + "]"),isDescending =$t.hasClass(classes.descend ),isNumeric =false;$(this.cells ).slice(0,3 ).each(function() {if(!isNaN(parseInt(getSortValue(this ),10 ) ) ) {isNumeric =true;return false;}
});html.push('<option'+ (isDefaultCol &&!isDescending ?' selected':'') + ' value="'+ j + '_asc">'+ $t.text() + ' '+ (isNumeric ?'↑':'(A-Z)') + '</option>');html.push('<option'+ (isDefaultCol &&isDescending ?' selected':'') + ' value="'+ j + '_desc">'+ $t.text() + ' '+ (isNumeric ?'↓':'(Z-A)') + '</option>');});html.push('</select></span></label>');return html.join('');});var $toolbar =el.prev('.tablesaw-bar'),$firstChild =$toolbar.children().eq(0 );if($firstChild.length ) {$switcher.insertBefore($firstChild );} else {$switcher.appendTo($toolbar );}
$switcher.find('.btn').tablesawbtn();$switcher.find('select').on('change',function() {var val =$(this ).val().split('_'),head =heads.eq(val[0 ] );clearOthers(head.siblings() );el[pluginName ]('sortBy',head.get(0 ),val[1 ] ==='asc');});};addClassToTable();heads =el.find("thead th[data-"+ pluginName + "-col]");addClassToHeads(heads );makeHeadsActionable(heads ,headsOnAction );handleDefault(heads );if(el.is(sortableSwitchSelector ) ) {addSwitcher(heads,el.find('tbody tr:nth-child(-n+3)') );}
},getColumnNumber:function(col ){return $(col ).prevAll().length;},getTableRows:function(){return $(this ).find("tbody tr");},sortRows:function(rows ,colNum ,ascending,col ){var cells,fn,sorted;var getCells =function(rows ){var cells =[];$.each(rows ,function(i ,r ){cells.push({cell:getSortValue($(r ).children().get(colNum ) ),rowNum:i
});});return cells;},getSortFxn =function(ascending,forceNumeric ){var fn,regex =/[^\-\+\d\.]/g;
if(ascending ){fn =function(a ,b ){if(forceNumeric ||!isNaN(parseFloat(a.cell ) ) ) {return parseFloat(a.cell.replace(regex,'') ) - parseFloat(b.cell.replace(regex,'') );} else {return a.cell.toLowerCase() > b.cell.toLowerCase() ?1 :-1;}
};} else {fn =function(a ,b ){if(forceNumeric ||!isNaN(parseFloat(a.cell ) ) ) {return parseFloat(b.cell.replace(regex,'') ) - parseFloat(a.cell.replace(regex,'') );} else {return a.cell.toLowerCase() < b.cell.toLowerCase() ?1 :-1;}
};}
return fn;},applyToRows =function(sorted ,rows ){var newRows =[],i,l,cur;for(i =0,l =sorted.length ;i < l ;i++ ){cur =sorted[i ].rowNum;newRows.push(rows[cur] );}
return newRows;};cells =getCells(rows );var customFn =$(col ).data('tablesaw-sort');fn =(customFn &&typeof customFn ==="function"?customFn(ascending ) :false ) ||getSortFxn(ascending,$(col ).is('[data-sortable-numeric]') );sorted =cells.sort(fn );rows =applyToRows(sorted ,rows );return rows;},replaceTableRows:function(rows ){var el =$(this ),body =el.find("tbody");body.html(rows );},makeColDefault:function(col ,a ){var c =$(col );c.attr(attrs.defaultCol ,"true");if(a ){c.removeClass(classes.descend );c.addClass(classes.ascend );} else {c.removeClass(classes.ascend );c.addClass(classes.descend );}
},sortBy:function(col ,ascending ){var el =$(this ),colNum,rows;colNum =el[pluginName ]("getColumnNumber",col );rows =el[pluginName ]("getTableRows");rows =el[pluginName ]("sortRows",rows ,colNum ,ascending,col );el[pluginName ]("replaceTableRows",rows );el[pluginName ]("makeColDefault",col ,ascending );}
};$.fn[pluginName ] =function(arrg ) {var args =Array.prototype.slice.call(arguments ,1),returnVal;if(arrg &&typeof(arrg ) ==="string"){returnVal =$.fn[pluginName ].prototype[arrg ].apply(this[0],args );return (typeof returnVal !=="undefined")?returnVal:$(this);}
if(!$(this ).data(pluginName + "data") ){$(this ).data(pluginName + "active",true );$.fn[pluginName ].prototype._create.call(this ,arrg );}
return $(this);};$.extend($.fn[pluginName ].prototype,methods );$(document ).on("tablesawcreate",function(e,Tablesaw ) {if(Tablesaw.$table.is(initSelector ) ) {Tablesaw.$table[pluginName ]();}
});}(jQuery ));;(function(win,$,undefined ){var MM ={attr:{init:'data-tablesaw-minimap'}
};function createMiniMap($table ){var $btns =$('<div class="tablesaw-advance minimap">'),$dotNav =$('<ul class="tablesaw-advance-dots">').appendTo($btns ),hideDot ='tablesaw-advance-dots-hide',$headerCells =$table.find('thead th');$headerCells.each(function(){$dotNav.append('<li><i></i></li>');});$btns.appendTo($table.prev('.tablesaw-bar').find('.tablesaw-advance') );function showMinimap($table ) {var mq =$table.attr(MM.attr.init );return !mq ||win.matchMedia &&win.matchMedia(mq ).matches;}
function showHideNav(){if(!showMinimap($table ) ) {$btns.hide();return;}
$btns.show();var dots =$dotNav.find("li").removeClass(hideDot );$table.find("thead th").each(function(i){if($(this ).css("display") ==="none"){dots.eq(i ).addClass(hideDot );}
});}
showHideNav();$(win ).on("resize",showHideNav );$table
.bind("tablesawcolumns.minimap",function(){showHideNav();})
.bind("tablesawdestroy.minimap",function(){var $t =$(this );$t.prev('.tablesaw-bar').find('.tablesaw-advance').remove();$(win ).off("resize",showHideNav );$t.unbind(".minimap");});}
$(document ).on("tablesawcreate",function(e,Tablesaw ){if((Tablesaw.mode ==='swipe'||Tablesaw.mode ==='columntoggle') &&Tablesaw.$table.is('[ '+ MM.attr.init + ']') ){createMiniMap(Tablesaw.$table );}
} );}(this,jQuery ));var bqf ={step :[],amount :0,pleaseSelectText :$("#detailsText").html(),init :function() {$(".select-ajax").change(function(){if($(this).val() !=0) {var url =$(this).data("changeUrl");var res =$(this).val();var target =$(this).data("changeTarget");var implicitAction =$(this).data("implicitAction");var current ="#"+ $(this).attr("id");if(bqf.step.length > 0) {if(bqf.confirmChange(target,false) ===false) {return false;}
}
$("#loading_page").fadeIn(250);if($(this).find("option:selected").data("futterdetails")){bqf.showFutterDetails($(this).find("option:selected").data("futterdetails"));}
if($(this).data("changeType") =="html") {var $parentCategory =$($(this).data("parent"));var parameters ="?categoryCodes[]="+ res + "&categoryCodes[]="+ $parentCategory.val();bqf.searchResult(url,parameters,target);}
if($(this).data("changeType") =="json") {bqf.searchJson(url,res,target,implicitAction,res);$(target).find("option:first").data("textSave",$(this).find("option:first").text()).text($(target).find("option:first").data("activeVal"));}
}
});$("#restartSearch").click(function() {bqf.confirmChange(bqf.step[0],true);return false;});},activateStep :function(target,loaded) {bqf.step.push(target);if($(target).is("select")) {$(target).attr("disabled",false);$(target).removeClass("hidden");if (loaded) {bqf.loaded();}
} else {$(target).slideDown(750,function() {var position =$(target).offset();$("html, body").animate({scrollTop:position.top },250);$(target).trigger("enhance.tablesaw");if (loaded) {bqf.loaded();}
});}
if(target =="#bqf_type") {econdaMarker("BQF/Futterhersteller/"+(($("#bqf_producer").find("option:selected").text()).replace("/","-")));}
if(target =="#bqf_size") {econdaMarker("BQF/Futtertyp/"+(($("#bqf_type").find("option:selected").text()).replace("/","-")));}
if(target =="#detailsSelect") {econdaMarker("BQF/Futtergröße/"+(($("#bqf_size").find("option:selected").text()).replace("/","-")));}
if(target =="#bqf_searchResult") {if($("#detailsSelect").val() !=0) {econdaMarker("BQF/Futterdetails/"+(($("#detailsSelect").find("option:selected").text()).replace("/","-")));}
econdaContentLabel(pageCategory + "/Suchergebnis");}
},confirmChange :function(target,fullreset) {var returnTo =$.inArray(target,bqf.step);if($.inArray(target,bqf.step) > -1) {if(confirm($("#form_bqf").data("confirmMsg"))) {for(var i=bqf.step.length;i>=returnTo;i--) {if($(bqf.step[i]).is("select")) {$(bqf.step[i]).attr("disabled",true).find("option:first").nextAll().remove();$(bqf.step[i]).find("option").text($(bqf.step[i]).find("option").data("textSave"));}
if(bqf.step[i] =="#bqf_searchResult") {$(bqf.step[i]).slideUp(250);if($("#detailsText:visible").length > 0) {$("#detailsText").text(bqf.pleaseSelectText).addClass("disabled").show();$("#detailsSelect").hide();}
}
}
if(returnTo ===0) {bqf.step =[];} else {bqf.step.splice(returnTo);}
if(fullreset) {$("#bqf_producer").find("option:selected").attr("selected",false).prop("selected",false);$("#bqf_producer").find("option:first").attr("selected",true).prop("selected",true);$("#jsonerror").slideUp(250);}
return true;} else {return false;}
}
},loaded :function() {$("#loading_page").fadeOut(250);},searchResult :function (url,parameters,target) {$("#jsonerror").slideUp(250);$(target).load(url + parameters,function(response,status,xhr ) {if (status !="error") {bqf.activateStep(target,true);$(".product-quantity-sel").change(function(){console.log("change");bqf.sumup();});} else {$("#jsonerror").slideDown(250);bqf.loaded();}
});return true;},searchJson :function (url,para,target,implicitAction,selectedCategoryId) {$("#jsonerror").slideUp(250);$.getJSON(url+"?categoryId="+para,function(d) {if(d.success ==true) {var loaded =true;if (implicitAction) {bqf.handleSize(d,target,selectedCategoryId);loaded =false;}
var items =[];$.each(d.subCategoryList,function(key,subCategory ) {items.push("<option value='"+ encodeURI(subCategory.code) + "'>"+ subCategory.name + "</option>");});$(items).appendTo(target);bqf.activateStep(target,loaded);} else {$("#jsonerror").slideDown(250);bqf.loaded();}
}).error(function() {$("#jsonerror").slideDown(250);bqf.loaded();});},sumup :function() {bqf.amount=0;$(".product-quantity-sel").each(function(){bqf.amount=parseInt($(this).val())+bqf.amount;});if(bqf.amount > 0) {$("#bqfsubmit").attr("disabled",false);} else {$("#bqfsubmit").attr("disabled",true);}
},handleSize:function (data,target,selectedCategoryId) {data.subCategoryList =data.subCategoryList ||[];var $detailsText =$(target).siblings("#detailsText");var $detailsSelect =$(target);if (data.subCategoryList.length > 1) {$detailsText.hide();$detailsSelect.show();bqf.loaded();} else {var parameters ="?categoryCodes[]="+ selectedCategoryId;if (data.subCategoryList.length ==1) {$detailsText.show();$detailsText.html(data.subCategoryList[0].name);parameters +="&categoryCodes[]="+ data.subCategoryList[0].code;}
$detailsSelect.hide();var getProductsUrl =$detailsSelect.data("changeUrl");var productsTarget =$detailsSelect.data("changeTarget");bqf.searchResult(getProductsUrl,parameters,productsTarget);}
},showFutterDetails :function(str) {$("#futterDetails").data("textSave",$("#futterDetails").text()).text(str).removeClass("disabled");}
};$(document).ready(function() {if($("#form_bqf").length > 0) {bqf.init();}
});var EppingerQuickFinder =function() {var self =this;self.productsList =[];self.selectedProducts =[];self.resultsCount;self.numberOfProductsPerPage =20;self.getDropdownValuesUrl =$("#form_tbf").data("urlContext") + "/getDropdownValues";self.getCompanyMachinesUrl =$("#form_tbf").data("urlContext") + "/getCompanyMachines";self.getProductsUrl =$("#form_tbf").data("urlContext") + "/getProducts";self.getProductUrl =$("#form_tbf").data("urlContext") + "/getProduct";self.init =function() {self.bindEvent.onChangeFilter();self.getProductList();self.loading();$("#jsonerror").slideUp(250);};self.getProductList =function() {self.loading();$("#jsonerror").slideUp(250);var defaultFilters =self.getFilterValues();self.ajaxRequest(defaultFilters,self.getProductsUrl,function(data) {if (data.success) {self.productsList =data.products;self.resultsCount =self.productsList.length;if (self.resultsCount > 0) {$("#no-products-found").hide();$("#products-list").slideUp(250,function() {self.showProductList(1);self.loaded();$("#products-list").slideDown(250);});} else {$("#products-list").hide();$("#no-products-found").show();self.loaded();}
} else {$("#jsonerror").slideDown(250);self.loaded();}
});};self.showProductList =function(pageNumber) {var productsListToDisplay =[];var remainingPage =(self.productsList.length % self.numberOfProductsPerPage > 0) ?1 :0;var totalPages =Math.floor(self.productsList.length / self.numberOfProductsPerPage) + remainingPage;var leftIndexBound =pageNumber * self.numberOfProductsPerPage - self.numberOfProductsPerPage;var rightIndexBound =pageNumber * self.numberOfProductsPerPage - 1;for (var i =0;i < self.productsList.length;i++) {if(i >=leftIndexBound &&i <=rightIndexBound) {productsListToDisplay.push(self.productsList[i]);}
}
$("#products-list").html("");$("#products-list-template").tmpl({products:productsListToDisplay,previousPageNumber:pageNumber-1,currentPageNumber:pageNumber,nextPageNumber:pageNumber+1,totalPages:totalPages,itemsPerPage:self.numberOfProductsPerPage
}).appendTo("#products-list");self.bindEvent.clickProductDetails();self.bindEvent.autoselectQty();self.bindEvent.pagination();self.bindEvent.productsPerPage();};self.selectProduct =function(partnumber,qty,description,title,thumb) {var product;if (qty ==null ||(qty.length > 0 &&qty !=0)) {var updated =false;for (var i=0;i<self.selectedProducts.length;i++) {product =self.selectedProducts[i];if (product.partnumber ==partnumber) {product.qty =qty ==null ?product.qty :qty;updated =true;break;}
}
if (!updated) {self.selectedProducts.push({partnumber:partnumber,qty:qty ==null ?1 :qty,description:description,thumb:thumb,title:title
});}
} else {var indexToRemove =null;for (var i=0;i<self.selectedProducts.length;i++) {product =self.selectedProducts[i];if (product.partnumber ==partnumber) {indexToRemove =i;break;}
}
if (indexToRemove !==null) {self.selectedProducts.splice(indexToRemove,1);}
}
self.generatePriceRequestButton();};self.showProductDetails =function(partnumber,container) {self.loading();container.fadeIn(250);self.ajaxRequest({id:partnumber},self.getProductUrl,function(data) {if (data.success ==true) {container.html("");$("#part-details-template").tmpl(data).appendTo(container).slideDown(250);$("#adapters-list-template").tmpl(data).appendTo($("#adapters-list-template-target-"+data.productId));$("#machines-list-template").tmpl(data).appendTo($("#machines-list-template-target-"+data.productId));self.bindLightbox();$(".shouldBeHidden").hide();self.bindEvent.clickAdapterDetails();self.loaded();$("#jsonerror").slideUp(250);container.fadeIn(250);container.closest("li").find(".buttonarea").find('.openDetails').fadeOut(250,function() {container.closest("li").find(".buttonarea").find('.closeDetails').fadeIn(250);});self.bindEvent.clickCloseDetails();} else {$("#jsonerror").slideDown(250);self.loaded();}
});};self.showAdapterDetails =function(partnumber,$target,container) {self.loading();container.html("");self.ajaxRequest({id:partnumber},self.getProductUrl,function(data) {if (data.success ==true) {$("#back-button-template").tmpl({}).appendTo(container);if(data.product.partnumber_oem_2 !=""){data.product.partnumber =data.product.partnumber_oem_2;}else{if(data.product.partnumber_oem_1 !=""){data.product.partnumber =data.product.partnumber_oem_1;}
}
$("#adapter-details-template").tmpl(data).appendTo(container).slideDown(250);self.bindLightbox();self.bindEvent.clickBackOnAdapterDetails();self.bindEvent.autoselectQty();self.loaded();container.show();$target.closest(".shouldBeHidden").find("table").hide();} else {$("#jsonerror").slideDown(250);self.loaded();}
});};self.getFilterValues =function() {return {companyid:$("#companies").val(),machineid:$("#models").val(),p1:1,p4:$("#output-interface").val()
};};self.generatePriceRequestButton =function() {$("#productsSubmitFormPlaceholder").html("");$("#productsSubmitForm-template").tmpl({selectedProducts:self.selectedProducts}).appendTo("#productsSubmitFormPlaceholder");if(self.selectedProducts.length > 0) {$("#tbfsubmit").attr("disabled",false);} else {$("#tbfsubmit").attr("disabled",true);}
};self.bindEvent ={onChangeFilter:function() {$(".selectFilter").change(function () {var selectedValue =$(this).val();var id =$(this).attr("id");self.loading();if (id =="companies") {econdaMarker("TBF/Hersteller/"+$("#companies").find("option:selected").text());}
if (id =="models") {econdaMarker("TBF/Modell/"+$("#models").find("option:selected").text());}
if (id =="tool-holder") {econdaMarker("TBF/Werkzeughaltertyp/"+$("#tool-holder").find("option:selected").text());}
if (id =="output-interface") {econdaMarker("TBF/Schnittstellen Ausgang/"+$("#output-interface").find("option:selected").text());}
if (id =="companies") {$("#models").find("option:first").attr("selected",true).prop("selected",true);if (selectedValue) {var data ={companyId:selectedValue};self.ajaxRequest(data,self.getCompanyMachinesUrl,function (data) {if (data.success) {$("#models").html("");$("#machine-select-options").tmpl(data).appendTo("#models");$("#models").attr("disabled",false);} else {$("#jsonerror").slideDown(250);self.loaded();}
});}
else {$("#models").html("");$("#machine-select-options").tmpl({machines:[]}).appendTo("#models");$("#models").attr("disabled",true);}
}
self.getProductList();});},pagination:function() {$(".pagination").click(function() {var pageNumber =$(this).data("pagenumber");self.showProductList(pageNumber);return false;});},productsPerPage:function() {$(".productsPerPage").click(function() {self.numberOfProductsPerPage =$(this).html();self.showProductList(1);return false;});},autoselectQty:function() {$(".product-qty").focus(function() {$(this).select();}).change(function() {var value =$(this).val().trim();var description =$(this).data("description");var thumb =$(this).data("thumb");var title =$(this).data("title");var partnumber =$(this).data("partnumber");self.selectProduct(partnumber,value,description,title,thumb);});},clickProductDetails:function() {$('.part-detail-link').click(function(e) {var pagePartnumber =$(this).data("partnumber");var container =$(this).closest("li").find('.productDetailsTarget');if(container.find("div").length > 0) {container.fadeIn(250);$(this).closest(".buttonarea").find('.openDetails').fadeOut(250,function() {$(this).closest(".buttonarea").find('.closeDetails').fadeIn(250);});} else {self.showProductDetails(pagePartnumber,container);}
econdaMarker("TBF/Detailansicht/"+$(this).closest(".buttonarea").find("input").data("partnumber"));return false;});$("body").on('click','.js-scroll',function(e) {var offset =$($(this).attr("href")).offset();$("html,body").one().animate({scrollTop:offset.top-250
},200);$.fancybox.close();return false;});},clickAdapterDetails:function() {$('.adapter-detail-link').click(function(e) {var pagePartnumber =$(this).data("partnumber");var container =$(this).closest("div.shouldBeHidden").find('.adapterDetailsTarget');self.showAdapterDetails(pagePartnumber,$(this),container);return false;});},clickBackOnAdapterDetails:function() {$('.back-button-adapter-details').click(function(e) {$(this).closest(".shouldBeHidden").find(".adapterDetailsTarget").hide();$(this).closest(".shouldBeHidden").find("table").show();return false;});},clickCloseDetails:function() {$('.part-detail-link-close').click(function(e) {$(this).closest("li").find('.productDetailsTarget').fadeOut(250);$(this).closest(".buttonarea").find('.closeDetails').fadeOut(250,function() {$(this).closest(".buttonarea").find('.openDetails').fadeIn(250);});return false;});}
};self.ajaxRequest =function (data,url,successCallback) {$.ajax({dataType:'json',method:"GET",url:url,data:data,success:successCallback,error:function() {$("#jsonerror").slideDown(250);self.loaded();}
});};self.bindLightbox =function() {$(".zoomlb").fancybox({openEffect:'elastic',closeEffect:'fade',maxWidth:'80%',maxHeight:'80%',helpers :{title :null
}
});$(".various").fancybox({openEffect:'elastic',closeEffect:'fade',maxWidth:'100%',maxHeight:'100%',fitToView:false,autoSize:false,width:575,helpers :{title :null
}
});};self.loading =function() {$("#loading_page").fadeIn(250);};self.loaded =function() {$("#loading_page").fadeOut(250);};self.openOverlay =function(url) {var overlay =$('<div id="lbbackground"></div><div id="lbforeground"><div class="lbf_area"><div class="lbf_closer"><button class="btn-icon btn-primary js-closelb list-products-btn-remove"><i class="icon-remove-product"></i></button></div><div class="lbf_content lb_layer"></div><div class="lbf_loader"></div></div></div>');overlay.find('.lbf_content').html('<img src="'+url+'" frameborder="0" onload="finder.showImage();" />');$("body").append(overlay);$('#lbbackground,#lbforeground').fadeIn(250,function() {});overlay.find(".js-closelb").click(function() {$('#lbbackground,#lbforeground').fadeOut(250,function() {overlay.remove();});});};self.showImage =function() {$(".lbf_area").animate({'width':'80%'},250,function() {$(".lbf_content").addClass("visible");$(".lbf_closer").show();});}
};if ($("#form_tbf").length > 0) {window.finder =new EppingerQuickFinder();window.finder.init();}
$().ready(function(){$(".brandshop_productslide,.brandshopteaserbanner.imagelink").hover(function(){$(this).find(".ps_button,.ps_headline,.btn").addClass("active");},function(){$(".ps_button,.ps_headline,.btn").removeClass("active");});$(".brandshop_productslide,.brandshopteaserbanner.imagelink").click(function(){if($(this).find(".ps_button,.btn").attr("target") =="_blank") {window.location.href =$(this).find(".ps_button,.btn").attr("href");} else {window.location.href =$(this).find(".ps_button,.btn").attr("href");}
});$(".ps_button,.brandshopteaserbanner .btn").click(function(e){e.stopPropagination();return false;})
})
var cinemaCodes ={vars :"",init :function() {cinemaCodes.loadJson();},loadJson :function() {cinemaCodes.loading();$.ajax({dataType:'json',method:"GET",url:"/cinema-codes/codes.json",success:function(data){$("#codeTemplate").tmpl(data).appendTo($("#cinemaCodes")).fadeIn(250,function(){$("#cinemaCodes").trigger("enhance.tablesaw");});cinemaCodes.loaded();},error:function() {$("#jsonerror").slideDown(250);cinemaCodes.loaded();}
});},loading :function() {$("#loading_page").fadeIn(250);},changeDate :function(str) {var tempDate =str.split("-");return tempDate[2]+"."+tempDate[1]+"."+tempDate[0];},loaded :function() {$("#loading_page").fadeOut(250);}
};$(document).ready(function() {if($("#cinemaCodes").length > 0) {cinemaCodes.init();}
});(function(Ea,Q,k){var P=function(h){function W(a){var b,c,e={};h.each(a,function(d){if((b=d.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=d.replace(b[0],b[2].toLowerCase()),e[c]=d,"o"===b[1]&&W(a[d])});a._hungarianMap=e}function H(a,b,c){a._hungarianMap||W(a);var e;h.each(b,function(d){e=a._hungarianMap[d];if(e!==k&&(c||b[e]===k))"o"===e.charAt(0)?(b[e]||(b[e]={}),h.extend(!0,b[e],b[d]),H(a[e],b[e],c)):b[e]=b[d]})}function P(a){var b=m.defaults.oLanguage,c=a.sZeroRecords;
!a.sEmptyTable&&(c&&"No data available in table"===b.sEmptyTable)&&E(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(c&&"Loading..."===b.sLoadingRecords)&&E(a,a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&db(a)}function eb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&H(m.models.oSearch,a[b])}function fb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;b&&!h.isArray(b)&&(a.aDataSort=[b])}function gb(a){var a=a.oBrowser,b=h("<div/>").css({position:"absolute",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(h('<div class="test"/>').css({width:"100%",height:10}))).appendTo("body"),c=b.find(".test");a.bScrollOversize=100===c[0].offsetWidth;a.bScrollbarLeft=1!==Math.round(c.offset().left);b.remove()}function hb(a,b,c,e,d,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;e!==d;)a.hasOwnProperty(e)&&(g=j?b(g,a[e],e,a):a[e],j=!0,e+=f);return g}function Fa(a,b){var c=m.defaults.column,e=a.aoColumns.length,c=h.extend({},m.models.oColumn,c,{nTh:b?b:Q.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[e],mData:c.mData?c.mData:e,idx:e});a.aoColumns.push(c);c=a.aoPreSearchCols;c[e]=h.extend({},m.models.oSearch,c[e]);ka(a,e,h(b).data())}function ka(a,b,c){var b=a.aoColumns[b],e=a.oClasses,d=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=d.attr("width")||null;var f=(d.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(fb(c),H(m.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&
(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),h.extend(b,c),E(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),E(b,c,"aDataSort"));var g=b.mData,j=R(g),i=b.mRender?R(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b.fnGetData=function(a,b,c){var e=j(a,b,k,c);return i&&b?i(e,b,a,c):e};b.fnSetData=function(a,b,c){return S(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,d.addClass(e.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=e.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=e.sSortableAsc,b.sSortingClassJUI=e.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=e.sSortableDesc,b.sSortingClassJUI=e.sSortJUIDescAllowed):(b.sSortingClass=e.sSortable,b.sSortingClassJUI=e.sSortJUI)}function X(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Ga(a);for(var c=0,e=b.length;c<e;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&Y(a);w(a,null,"column-sizing",[a])}function la(a,b){var c=Z(a,"bVisible");return"number"===typeof c[b]?c[b]:null}function $(a,b){var c=Z(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function aa(a){return Z(a,"bVisible").length}function Z(a,b){var c=[];h.map(a.aoColumns,function(a,d){a[b]&&c.push(d)});return c}function Ha(a){var b=a.aoColumns,c=a.aoData,e=m.ext.type.detect,d,f,g,j,i,h,l,q,n;d=0;for(f=b.length;d<f;d++)if(l=b[d],n=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=e.length;g<j;g++){i=0;for(h=c.length;i<h;i++){n[i]===k&&(n[i]=x(a,i,d,"type"));q=e[g](n[i],a);if(!q&&g!==e.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function ib(a,b,c,e){var d,f,g,j,i,o,l=a.aoColumns;if(b)for(d=b.length-1;0<=d;d--){o=b[d];var q=o.targets!==k?o.targets:o.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<
g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Fa(a);e(q[f],o)}else if("number"===typeof q[f]&&0>q[f])e(l.length+q[f],o);else if("string"===typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&e(j,o)}}if(c){d=0;for(a=c.length;d<a;d++)e(d,c[d])}}function K(a,b,c,e){var d=a.aoData.length,f=h.extend(!0,{},m.models.oRow,{src:c?"dom":"data"});f._aData=b;a.aoData.push(f);for(var b=a.aoColumns,f=0,g=b.length;f<g;f++)c&&Ia(a,d,f,x(a,d,f)),b[f].sType=null;a.aiDisplayMaster.push(d);(c||!a.oFeatures.bDeferRender)&&Ja(a,d,c,e);return d}function ma(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,d){c=na(a,d);return K(a,c.data,d,c.cells)})}function x(a,b,c,e){var d=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,c=f.fnGetData(g,e,{settings:a,row:b,col:c});if(c===k)return a.iDrawError!=d&&null===j&&(I(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b,4),a.iDrawError=d),j;if((c===g||null===c)&&null!==j)c=j;else if("function"===typeof c)return c.call(g);return null===c&&"display"==e?"":c}function Ia(a,b,c,e){a.aoColumns[c].fnSetData(a.aoData[b]._aData,e,{settings:a,row:b,col:c})}function Ka(a){return h.map(a.match(/(\\.|[^\.])+/g),function(a){return a.replace(/\\./g,".")})}function R(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=R(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,
c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ka(f);for(var i=0,h=j.length;i<h;i++){f=j[i].match(ba);g=j[i].match(T);if(f){j[i]=j[i].replace(ba,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");i=0;for(h=a.length;i<h;i++)g.push(c(a[i],b,j));a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(T,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,d){return c(b,d,a)}}return function(b){return b[a]}}function S(a){if(h.isPlainObject(a))return S(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,e,d){a(b,"set",e,d)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,e,d){var d=Ka(d),f;f=d[d.length-1];for(var g,j,i=0,h=d.length-1;i<h;i++){g=d[i].match(ba);j=d[i].match(T);if(g){d[i]=d[i].replace(ba,"");a[d[i]]=[];f=d.slice();f.splice(0,i+1);g=f.join(".");j=0;for(h=e.length;j<h;j++)f={},b(f,e[j],g),a[d[i]].push(f);return}j&&(d[i]=d[i].replace(T,""),a=a[d[i]](e));if(null===a[d[i]]||a[d[i]]===k)a[d[i]]={};a=a[d[i]]}if(f.match(T))a[f.replace(T,"")](e);else a[f.replace(ba,"")]=e};return function(c,e){return b(c,e,a)}}return function(b,e){b[a]=e}}function La(a){return D(a.aoData,"_aData")}function oa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0}function pa(a,b,c){for(var e=-1,d=0,f=a.length;d<
f;d++)a[d]==b?e=d:a[d]>b&&a[d]--;-1!=e&&c===k&&a.splice(e,1)}function ca(a,b,c,e){var d=a.aoData[b],f,g=function(c,f){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=x(a,b,f,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===d.src)d._aData=na(a,d,e,e===k?k:d._aData).data;else{var j=d.anCells;if(j)if(e!==k)g(j[e],e);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}d._aSortData=null;d._aFilterData=null;g=a.aoColumns;if(e!==k)g[e].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;Ma(d)}}function na(a,b,c,e){var d=[],f=b.firstChild,g,j=0,i,o=a.aoColumns,l=a._rowReadObject,e=e||l?{}:[],q=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),S(a)(e,b.getAttribute(c)))}},a=function(a){if(c===k||c===j)g=o[j],i=h.trim(a.innerHTML),g&&g._bAttrSrc?(S(g.mData._)(e,i),q(g.mData.sort,a),q(g.mData.type,a),q(g.mData.filter,a)):l?(g._setter||(g._setter=S(g.mData)),g._setter(e,i)):e[j]=i;j++};if(f)for(;f;){b=f.nodeName.toUpperCase();if("TD"==b||"TH"==b)a(f),d.push(f);f=f.nextSibling}else{d=b.anCells;f=0;for(b=d.length;f<b;f++)a(d[f])}return{data:e,cells:d}}function Ja(a,b,c,e){var d=a.aoData[b],f=d._aData,g=[],j,i,h,l,q;if(null===d.nTr){j=c||Q.createElement("tr");d.nTr=j;d.anCells=g;j._DT_RowIndex=b;Ma(d);l=0;for(q=a.aoColumns.length;l<q;l++){h=a.aoColumns[l];i=c?e[l]:Q.createElement(h.sCellType);g.push(i);if(!c||h.mRender||h.mData!==l)i.innerHTML=x(a,b,l,"display");h.sClass&&(i.className+=" "+h.sClass);h.bVisible&&!c?j.appendChild(i):!h.bVisible&&c&&i.parentNode.removeChild(i);h.fnCreatedCell&&h.fnCreatedCell.call(a.oInstance,i,x(a,b,l),f,b,l)}w(a,"aoRowCreatedCallback",null,[j,f,b])}d.nTr.setAttribute("role","row")}function Ma(a){var b=a.nTr,c=a._aData;if(b){c.DT_RowId&&(b.id=c.DT_RowId);if(c.DT_RowClass){var e=c.DT_RowClass.split(" ");a.__rowc=a.__rowc?Na(a.__rowc.concat(e)):e;h(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)}c.DT_RowAttr&&h(b).attr(c.DT_RowAttr);c.DT_RowData&&h(b).data(c.DT_RowData)}}function jb(a){var b,c,e,d,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,o=a.oClasses,l=a.aoColumns;i&&(d=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],e=h(f.nTh).addClass(f.sClass),i&&e.appendTo(d),a.oFeatures.bSort&&(e.addClass(f.sSortingClass),!1!==f.bSortable&&(e.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Oa(a,f.nTh,b))),f.sTitle!=e.html()&&e.html(f.sTitle),Pa(a,"header")(a,e,f,o);i&&da(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(o.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(o.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function ea(a,b,c){var e,d,f,g=[],j=[],i=a.aoColumns.length,o;if(b){c===k&&(c=!1);e=0;for(d=b.length;e<d;e++){g[e]=b[e].slice();g[e].nTr=b[e].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[e].splice(f,1);j.push([])}e=0;for(d=g.length;e<d;e++){if(a=g[e].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[e].length;f<b;f++)if(o=i=1,j[e][f]===k){a.appendChild(g[e][f].cell);for(j[e][f]=1;g[e+i]!==k&&g[e][f].cell==g[e+i][f].cell;)j[e+i][f]=1,i++;for(;g[e][f+o]!==k&&g[e][f].cell==g[e][f+o].cell;){for(c=0;c<i;c++)j[e+c][f+o]=1;o++}h(g[e][f].cell).attr("rowspan",i).attr("colspan",o)}}}}function M(a){var b=w(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,e=a.asStripeClasses,d=e.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==B(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,o=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!kb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:o;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ja(a,l);l=q.nTr;if(0!==d){var n=e[c%d];q._sRowStripe!=n&&(h(l).removeClass(q._sRowStripe).addClass(n),q._sRowStripe=n)}w(a,"aoRowCallback",null,[l,q._aData,c,j]);b.push(l);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==B(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":d?e[0]:""}).append(h("<td />",{valign:"top",colSpan:aa(a),"class":a.oClasses.sRowEmpty}).html(c))[0];w(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],La(a),g,o,i]);w(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],La(a),g,o,i]);e=h(a.nTBody);e.children().detach();e.append(h(b));w(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function N(a,b){var c=a.oFeatures,e=c.bFilter;c.bSort&&lb(a);e?fa(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;M(a);a._drawHold=!1}function mb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),e=a.oFeatures,d=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=d[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,o,l,q,n=0;n<f.length;n++){g=null;j=f[n];if("<"==j){i=h("<div/>")[0];o=f[n+1];if("'"==o||'"'==o){l="";for(q=2;f[n+q]!=o;)l+=f[n+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(o=l.split("."),i.id=o[0].substr(1,o[0].length-1),i.className=o[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;n+=q}d.append(i);d=h(i)}else if(">"==j)d=d.parent();else if("l"==j&&e.bPaginate&&e.bLengthChange)g=nb(a);else if("f"==j&&e.bFilter)g=ob(a);else if("r"==j&&e.bProcessing)g=pb(a);else if("t"==j)g=qb(a);else if("i"==j&&e.bInfo)g=rb(a);else if("p"==j&&e.bPaginate)g=sb(a);else if(0!==m.ext.feature.length){i=m.ext.feature;q=0;for(o=i.length;q<o;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),d.append(g))}c.replaceWith(d)}function da(a,b){var c=h(b).children("tr"),e,d,f,g,j,i,o,l,q,n;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){e=c[f];for(d=e.firstChild;d;){if("TD"==d.nodeName.toUpperCase()||"TH"==d.nodeName.toUpperCase()){l=1*d.getAttribute("colspan");q=1*d.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;o=g;n=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][o+j]={cell:d,unique:n},a[f+g].nTr=e}d=d.nextSibling}}}function qa(a,b,c){var e=[];c||(c=a.aoHeader,b&&(c=[],da(c,b)));for(var b=0,d=c.length;b<d;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!e[f]||!a.bSortCellsTop))e[f]=c[b][f].cell;return e}function ra(a,b,c){w(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var e={},d=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(d);c?(c=c[0],e[c]||(e[c]=[]),e[c].push(b.value)):e[b.name]=b.value});b=e}var f,g=a.ajax,j=a.oInstance,i=function(b){w(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var o=h.isFunction(f)?f(b,a):f,b=h.isFunction(f)&&o?o:h.extend(!0,b,o);delete g.data}o={data:b,success:function(b){var c=b.error||b.sError;c&&I(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,
c){var f=w(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,f)&&("parsererror"==c?I(a,0,"Invalid JSON response",1):4===b.readyState&&I(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;w(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(o,{url:g||a.sAjaxSource})):h.isFunction(g)?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(o,g)),g.data=f)}function kb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,!0),ra(a,tb(a),function(b){ub(a,b)}),!1):!0}function tb(a){var b=a.aoColumns,c=b.length,e=a.oFeatures,d=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,o,l,q=U(a);g=a._iDisplayStart;i=!1!==e.bPaginate?a._iDisplayLength:-1;var n=function(a,b){j.push({name:a,value:b})};n("sEcho",a.iDraw);n("iColumns",c);n("sColumns",D(b,"sName").join(","));n("iDisplayStart",g);n("iDisplayLength",i);var k={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:d.sSearch,regex:d.bRegex}};for(g=0;g<c;g++)o=b[g],l=f[g],i="function"==typeof o.mData?"function":o.mData,k.columns.push({data:i,name:o.sName,searchable:o.bSearchable,orderable:o.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),n("mDataProp_"+g,i),e.bFilter&&(n("sSearch_"+g,l.sSearch),n("bRegex_"+g,l.bRegex),n("bSearchable_"+g,o.bSearchable)),e.bSort&&n("bSortable_"+g,o.bSortable);e.bFilter&&(n("sSearch",d.sSearch),n("bRegex",d.bRegex));e.bSort&&(h.each(q,function(a,b){k.order.push({column:b.col,dir:b.dir});n("iSortCol_"+a,b.col);n("sSortDir_"+a,b.dir)}),n("iSortingCols",q.length));b=m.ext.legacy.ajax;return null===b?a.sAjaxSource?j:k:b?j:k}function ub(a,b){var c=sa(a,b),e=b.sEcho!==k?b.sEcho:b.draw,d=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(e){if(1*e<a.iDraw)return;a.iDraw=1*e}oa(a);a._iRecordsTotal=parseInt(d,10);a._iRecordsDisplay=parseInt(f,10);e=0;for(d=c.length;e<d;e++)K(a,c[e]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;M(a);a._bInitComplete||ta(a,b);a.bAjaxDataGet=!0;C(a,!1)}function sa(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?R(c)(b):b}function ob(a){var b=a.oClasses,c=a.sTableId,e=a.oLanguage,d=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=e.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),
f=function(){var b=!this.value?"":this.value;b!=d.sSearch&&(fa(a,{sSearch:b,bRegex:d.bRegex,bSmart:d.bSmart,bCaseInsensitive:d.bCaseInsensitive}),a._iDisplayStart=0,M(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===B(a)?400:0,i=h("input",b).val(d.sSearch).attr("placeholder",e.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",g?ua(f,g):f).bind("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==Q.activeElement&&i.val(d.sSearch)}catch(f){}});return b[0]}function fa(a,b,c){var e=a.oPreviousSearch,d=a.aoPreSearchCols,f=function(a){e.sSearch=a.sSearch;e.bRegex=a.bRegex;e.bSmart=a.bSmart;e.bCaseInsensitive=a.bCaseInsensitive};Ha(a);if("ssp"!=B(a)){vb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<d.length;b++)wb(a,d[b].sSearch,b,d[b].bEscapeRegex!==k?!d[b].bEscapeRegex:d[b].bRegex,d[b].bSmart,d[b].bCaseInsensitive);xb(a)}else f(b);a.bFiltered=!0;w(a,null,"search",[a])}function xb(a){for(var b=m.ext.search,c=a.aiDisplay,e,d,f=0,g=b.length;f<g;f++){for(var j=[],i=0,h=c.length;i<h;i++)d=c[i],e=a.aoData[d],b[f](a,e._aFilterData,d,e._aData,i)&&j.push(d);c.length=0;c.push.apply(c,j)}}function wb(a,b,c,e,d,f){if(""!==b)for(var g=a.aiDisplay,e=Qa(b,e,d,f),d=g.length-1;0<=d;d--)b=a.aoData[g[d]]._aFilterData[c],e.test(b)||g.splice(d,1)}function vb(a,b,c,e,d,f){var e=Qa(b,e,d,f),d=a.oPreviousSearch.sSearch,f=a.aiDisplayMaster,g;0!==m.ext.search.length&&(c=!0);g=yb(a);if(0>=b.length)a.aiDisplay=f.slice();else{if(g||c||d.length>b.length||0!==b.indexOf(d)||a.bSorted)a.aiDisplay=f.slice();b=a.aiDisplay;for(c=b.length-1;0<=c;c--)e.test(a.aoData[b[c]]._sFilterRow)||b.splice(c,1)}}function Qa(a,b,c,e){a=b?a:va(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',"")}).join(")(?=.*?")+").*$");return RegExp(a,e?"i":"")}function va(a){return a.replace(Yb,"\\$1")}
function yb(a){var b=a.aoColumns,c,e,d,f,g,j,i,h,l=m.ext.type.search;c=!1;e=0;for(f=a.aoData.length;e<f;e++)if(h=a.aoData[e],!h._aFilterData){j=[];d=0;for(g=b.length;d<g;d++)c=b[d],c.bSearchable?(i=x(a,e,d,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(wa.innerHTML=i,i=Zb?wa.textContent:wa.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}
function zb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function Ab(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function rb(a){var b=a.sTableId,c=a.aanFeatures.i,e=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Bb,sName:"information"}),e.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return e[0]}function Bb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,e=a._iDisplayStart+1,d=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Cb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,e,d,f,g,j));h(b).html(j)}}function Cb(a,b){var c=a.fnFormatNumber,e=a._iDisplayStart+1,d=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===d;return b.replace(/_START_/g,c.call(a,e)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,
c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(e/d))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/d)))}function ga(a){var b,c,e=a.iInitDisplayStart,d=a.aoColumns,f;c=a.oFeatures;if(a.bInitialised){mb(a);jb(a);ea(a,a.aoHeader);ea(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Ga(a);b=0;for(c=d.length;b<c;b++)f=d[b],f.sWidth&&(f.nTh.style.width=s(f.sWidth));N(a);d=B(a);"ssp"!=d&&("ajax"==d?ra(a,[],function(c){var f=sa(a,c);for(b=0;b<f.length;b++)K(a,f[b]);
a.iInitDisplayStart=e;N(a);C(a,!1);ta(a,c)},a):(C(a,!1),ta(a)))}else setTimeout(function(){ga(a)},200)}function ta(a,b){a._bInitComplete=!0;b&&X(a);w(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);w(a,null,"length",[a,c])}function nb(a){for(var b=a.oClasses,c=a.sTableId,e=a.aLengthMenu,d=h.isArray(e[0]),f=d?e[0]:e,e=d?e[1]:e,d=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)d[0][g]=new Option(e[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",d[0].outerHTML));h("select",i).val(a._iDisplayLength).bind("change.DT",function(){Ra(a,h(this).val());M(a)});h(a.nTable).bind("length.dt.DT",function(b,c,f){a===c&&h("select",i).val(f)});return i[0]}function sb(a){var b=a.sPaginationType,c=m.ext.pager[b],e="function"===typeof c,d=function(a){M(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;e||c.fnInit(a,b,d);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(e){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),q,l=0;for(q=f.p.length;l<q;l++)Pa(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,d)},sName:"pagination"}));return b}function Ta(a,b,c){var e=a._iDisplayStart,d=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===d?e=0:"number"===typeof b?(e=b*d,e>f&&(e=0)):"first"==b?e=0:"previous"==b?(e=0<=d?e-d:0,0>e&&(e=0)):"next"==b?e+d<f&&(e+=d):"last"==b?e=Math.floor((f-1)/d)*d:I(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==e;a._iDisplayStart=e;b&&(w(a,null,"page",[a]),c&&M(a));return b}function pb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");w(a,null,"processing",[a,b])}function qb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var e=c.sX,d=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),o=h(b[0].cloneNode(!1)),l=b.children("tfoot");c.sX&&"100%"===b.attr("width")&&b.removeAttr("width");l.length||(l=null);c=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:e?!e?null:s(e):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({overflow:"auto",height:!d?null:s(d),width:!e?null:s(e)}).append(b));l&&c.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:e?!e?null:s(e):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(o.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=c.children(),q=b[0],f=b[1],n=l?b[2]:null;if(e)h(f).on("scroll.DT",function(){var a=this.scrollLeft;q.scrollLeft=a;l&&(n.scrollLeft=a)});a.nScrollHead=q;a.nScrollBody=f;a.nScrollFoot=n;a.aoDrawCallback.push({fn:Y,sName:"scrolling"});return c[0]}function Y(a){var b=a.oScroll,c=b.sX,e=b.sXInner,d=b.sY,f=b.iBarWidth,g=h(a.nScrollHead),j=g[0].style,i=g.children("div"),o=i[0].style,l=i.children("table"),i=a.nScrollBody,q=h(i),n=i.style,k=h(a.nScrollFoot).children("div"),p=k.children("table"),m=h(a.nTHead),r=h(a.nTable),t=r[0],O=t.style,L=a.nTFoot?h(a.nTFoot):null,ha=a.oBrowser,w=ha.bScrollOversize,v,u,y,x,z,A=[],B=[],C=[],D,E=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};r.children("thead, tfoot").remove();z=m.clone().prependTo(r);v=m.find("tr");y=z.find("tr");z.find("th, td").removeAttr("tabindex");L&&(x=L.clone().prependTo(r),u=L.find("tr"),x=x.find("tr"));c||(n.width="100%",g[0].style.width="100%");h.each(qa(a,z),function(b,c){D=la(a,b);c.style.width=a.aoColumns[D].sWidth});L&&G(function(a){a.style.width=""},x);b.bCollapse&&""!==d&&(n.height=q[0].offsetHeight+m[0].offsetHeight+"px");g=r.outerWidth();if(""===c){if(O.width="100%",w&&(r.find("tbody").height()>i.offsetHeight||"scroll"==q.css("overflow-y")))O.width=s(r.outerWidth()-f)}else""!==e?O.width=s(e):g==q.width()&&q.height()<r.height()?(O.width=s(g-f),r.outerWidth()>g-f&&(O.width=s(g))):O.width=s(g);g=r.outerWidth();G(E,y);G(function(a){C.push(a.innerHTML);A.push(s(h(a).css("width")))},y);G(function(a,b){a.style.width=A[b]},v);h(y).height(0);L&&(G(E,x),G(function(a){B.push(s(h(a).css("width")))},x),G(function(a,b){a.style.width=B[b]},u),h(x).height(0));G(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+C[b]+"</div>";a.style.width=A[b]},y);L&&G(function(a,b){a.innerHTML="";a.style.width=B[b]},x);if(r.outerWidth()<g){u=i.scrollHeight>i.offsetHeight||"scroll"==q.css("overflow-y")?g+f:g;if(w&&(i.scrollHeight>i.offsetHeight||"scroll"==q.css("overflow-y")))O.width=s(u-f);(""===c||""!==e)&&I(a,1,"Possible column misalignment",6)}else u="100%";n.width=s(u);j.width=s(u);L&&(a.nScrollFoot.style.width=s(u));!d&&w&&(n.height=s(t.offsetHeight+f));d&&b.bCollapse&&(n.height=s(d),b=c&&t.offsetWidth>i.offsetWidth?f:0,t.offsetHeight<i.offsetHeight&&(n.height=s(t.offsetHeight+b)));b=r.outerWidth();l[0].style.width=s(b);o.width=s(b);l=r.height()>i.clientHeight||"scroll"==q.css("overflow-y");ha="padding"+(ha.bScrollbarLeft?"Left":"Right");o[ha]=l?f+"px":"0px";L&&(p[0].style.width=s(b),k[0].style.width=s(b),k[0].style[ha]=l?f+"px":"0px");q.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)i.scrollTop=0}function G(a,b,c){for(var e=0,d=0,f=b.length,g,j;d<f;){g=b[d].firstChild;for(j=c?c[d].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,e):a(g,e),e++),g=g.nextSibling,j=c?j.nextSibling:null;d++}}function Ga(a){var b=a.nTable,c=a.aoColumns,e=a.oScroll,d=e.sY,f=e.sX,g=e.sXInner,j=c.length,e=Z(a,"bVisible"),i=h("th",a.nTHead),o=b.getAttribute("width"),l=b.parentNode,k=!1,n,m;(n=b.style.width)&&-1!==n.indexOf("%")&&(o=n);for(n=0;n<e.length;n++)m=c[e[n]],null!==m.sWidth&&(m.sWidth=Db(m.sWidthOrig,l),k=!0);if(!k&&!f&&!d&&j==aa(a)&&j==i.length)for(n=0;n<j;n++)c[n].sWidth=s(i.eq(n).width());else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var p=h("<tr/>").appendTo(j.find("tbody"));j.find("tfoot th, tfoot td").css("width","");i=qa(a,j.find("thead")[0]);for(n=0;n<e.length;n++)m=c[e[n]],i[n].style.width=null!==m.sWidthOrig&&""!==m.sWidthOrig?s(m.sWidthOrig):"";if(a.aoData.length)for(n=0;n<e.length;n++)k=e[n],m=c[k],h(Eb(a,k)).clone(!1).append(m.sContentPadding).appendTo(p);j.appendTo(l);f&&g?j.width(g):f?(j.css("width","auto"),j.width()<l.offsetWidth&&j.width(l.offsetWidth)):d?j.width(l.offsetWidth):o&&j.width(o);Fb(a,j[0]);if(f){for(n=g=0;n<e.length;n++)m=c[e[n]],d=h(i[n]).outerWidth(),g+=null===m.sWidthOrig?d:parseInt(m.sWidth,10)+d-h(i[n]).width();j.width(s(g));b.style.width=s(g)}for(n=0;n<e.length;n++)if(m=c[e[n]],d=h(i[n]).width())m.sWidth=s(d);b.style.width=s(j.css("width"));j.remove()}o&&(b.style.width=s(o));if((o||f)&&!a._reszEvt)b=function(){h(Ea).bind("resize.DT-"+a.sInstance,ua(function(){X(a)}))},a.oBrowser.bScrollOversize?setTimeout(b,1E3):b(),a._reszEvt=!0}function ua(a,b){var c=b!==k?b:200,e,d;return function(){var b=this,g=+new Date,j=arguments;e&&g<e+c?(clearTimeout(d),d=setTimeout(function(){e=k;a.apply(b,j)},c)):(e=g,a.apply(b,j))}}function Db(a,b){if(!a)return 0;var c=h("<div/>").css("width",s(a)).appendTo(b||Q.body),e=c[0].offsetWidth;c.remove();return e}function Fb(a,b){var c=a.oScroll;if(c.sX||c.sY)c=!c.sX?c.iBarWidth:0,b.style.width=s(h(b).outerWidth()-c)}function Eb(a,b){var c=Gb(a,b);if(0>c)return null;var e=a.aoData[c];return!e.nTr?h("<td/>").html(x(a,c,b,"display"))[0]:e.anCells[b]}function Gb(a,b){for(var c,e=-1,d=-1,f=0,g=a.aoData.length;f<g;f++)c=x(a,f,b,"display")+"",c=c.replace($b,""),c.length>e&&(e=c.length,d=f);return d}function s(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function Hb(){var a=m.__scrollbarWidth;if(a===k){var b=h("<p/>").css({position:"absolute",top:0,left:0,width:"100%",height:150,padding:0,overflow:"scroll",visibility:"hidden"}).appendTo("body"),a=b[0].offsetWidth-b[0].clientWidth;m.__scrollbarWidth=a;b.remove()}return a}function U(a){var b,c,e=[],d=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var o=[];
f=function(a){a.length&&!h.isArray(a[0])?o.push(a):o.push.apply(o,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<o.length;a++){i=o[a][0];f=d[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=d[g].sType||"string",o[a]._idx===k&&(o[a]._idx=h.inArray(o[a][1],d[g].asSorting)),e.push({src:i,col:g,dir:o[a][1],index:o[a]._idx,type:j,formatter:m.ext.type.order[j+"-pre"]})}return e}function lb(a){var b,c,e=[],d=m.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ha(a);h=U(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Ib(a,j.col);if("ssp"!=B(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)e[i[b]]=b;g===h.length?i.sort(function(a,b){var c,d,g,j,i=h.length,k=f[a]._aSortData,m=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],d=m[j.col],c=c<d?-1:c>d?1:0,0!==c)return"asc"===j.dir?c:-c;c=e[a];d=e[b];return c<d?-1:c>d?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,m=f[a]._aSortData,r=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=m[i.col],g=r[i.col],i=d[i.type+
"-"+i.dir]||d["string-"+i.dir],c=i(c,g),0!==c)return c;c=e[a];g=e[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Jb(a){for(var b,c,e=a.aoColumns,d=U(a),a=a.oLanguage.oAria,f=0,g=e.length;f<g;f++){c=e[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<d.length&&d[0].col==f?(i.setAttribute("aria-sort","asc"==d[0].dir?"ascending":"descending"),c=j[d[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",
b)}}function Ua(a,b,c,e){var d=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof d[0]&&(d=a.aaSorting=[d]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,D(d,"0")),-1!==c?(b=g(d[c],!0),null===b&&1===d.length&&(b=0),null===b?d.splice(c,1):(d[c][1]=f[b],d[c]._idx=b)):(d.push([b,f[0],0]),d[d.length-1]._idx=0)):d.length&&d[0][0]==b?(b=g(d[0]),d.length=1,d[0][1]=f[b],d[0]._idx=b):(d.length=0,d.push([b,f[0]]),d[0]._idx=0);N(a);"function"==typeof e&&e(a)}function Oa(a,b,c,e){var d=a.aoColumns[c];Va(b,{},function(b){!1!==d.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Ua(a,c,b.shiftKey,e);"ssp"!==B(a)&&C(a,!1)},0)):Ua(a,c,b.shiftKey,e))})}function xa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,e=U(a),d=a.oFeatures,f,g;if(d.bSort&&d.bSortClasses){d=0;for(f=b.length;d<f;d++)g=b[d].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>d?d+1:3));d=0;for(f=e.length;d<f;d++)g=e[d].src,h(D(a.aoData,"anCells",g)).addClass(c+(2>d?d+1:3))}a.aLastSort=e}function Ib(a,b){var c=a.aoColumns[b],e=m.ext.order[c.sSortDataType],d;e&&(d=e.call(a.oInstance,a,b,$(a,b)));for(var f,g=m.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||e)f=e?d[j]:x(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function ya(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:zb(a.oPreviousSearch),columns:h.map(a.aoColumns,function(b,e){return{visible:b.bVisible,search:zb(a.aoPreSearchCols[e])}})};w(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Kb(a){var b,c,e=a.aoColumns;if(a.oFeatures.bStateSave){var d=a.fnStateLoadCallback.call(a.oInstance,a);if(d&&d.time&&(b=w(a,"aoStateLoadParams","stateLoadParams",[a,d]),-1===h.inArray(!1,b)&&(b=a.iStateDuration,!(0<b&&d.time<+new Date-1E3*b)&&e.length===d.columns.length))){a.oLoadedState=h.extend(!0,{},d);d.start!==k&&(a._iDisplayStart=d.start,a.iInitDisplayStart=d.start);d.length!==k&&(a._iDisplayLength=d.length);d.order!==k&&(a.aaSorting=[],h.each(d.order,function(b,c){a.aaSorting.push(c[0]>=e.length?[0,c[1]]:c)}));d.search!==k&&h.extend(a.oPreviousSearch,Ab(d.search));b=0;for(c=d.columns.length;b<c;b++){var f=d.columns[b];f.visible!==k&&(e[b].bVisible=f.visible);f.search!==k&&h.extend(a.aoPreSearchCols[b],Ab(f.search))}w(a,"aoStateLoaded","stateLoaded",[a,d])}}}function za(a){var b=m.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function I(a,b,c,e){c="DataTables warning: "+(null!==a?"table id="+a.sTableId+" - ":"")+c;e&&(c+=". For more information about this error, please see http://datatables.net/tn/"+e);if(b)Ea.console&&console.log&&console.log(c);else if(b=m.ext,b=b.sErrMode||b.errMode,w(a,null,"error",[a,e,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==typeof b&&b(a,e,c)}}function E(a,b,c,e){h.isArray(c)?h.each(c,function(c,f){h.isArray(f)?E(a,b,f[0],f[1]):E(a,b,f)}):(e===k&&(e=c),b[c]!==k&&(a[e]=b[c]))}function Lb(a,b,c){var e,d;for(d in b)b.hasOwnProperty(d)&&(e=b[d],h.isPlainObject(e)?(h.isPlainObject(a[d])||(a[d]={}),h.extend(!0,a[d],e)):a[d]=c&&"data"!==d&&"aaData"!==d&&h.isArray(e)?e.slice():e);return a}function Va(a,b,c){h(a).bind("click.DT",b,function(b){a.blur();c(b)}).bind("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).bind("selectstart.DT",function(){return!1})}function z(a,b,c,e){c&&a[b].push({fn:c,sName:e})}function w(a,b,c,e){var d=[];b&&(d=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,e)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,e),d.push(b.result));return d}function Sa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),e=a._iDisplayLength;b>=c&&(b=c-e);b-=b%e;if(-1===e||0>b)b=0;a._iDisplayStart=b}function Pa(a,b){var c=a.renderer,e=m.ext.renderer[b];return h.isPlainObject(c)&&c[b]?e[c[b]]||e._:"string"===typeof c?e[c]||e._:e._}function B(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function Wa(a,b){var c=[],c=Mb.numbers_length,e=Math.floor(c/2);b<=c?c=V(0,b):a<=e?(c=V(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-e?c=V(b-(c-2),b):(c=V(a-e+2,a+e-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function db(a){h.each({num:function(b){return Aa(b,a)},"num-fmt":function(b){return Aa(b,a,Xa)},"html-num":function(b){return Aa(b,a,Ba)},"html-num-fmt":function(b){return Aa(b,a,Ba,Xa)}},function(b,c){u.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(u.type.search[b+a]=u.type.search.html)})}function Nb(a){return function(){var b=[za(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return m.ext.internal[a].apply(this,b)}}var m,u,t,r,v,Ya={},Ob=/[\r\n]/g,Ba=/<.*?>/g,ac=/^[\w\+\-]/,bc=/[\w\+\-]$/,Yb=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Xa=/[',$\u00a3\u20ac\u00a5%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,J=function(a){return!a||!0===a||
"-"===a?!0:!1},Pb=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},Qb=function(a,b){Ya[b]||(Ya[b]=RegExp(va(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace(Ya[b],"."):a},Za=function(a,b,c){var e="string"===typeof a;if(J(a))return!0;b&&e&&(a=Qb(a,b));c&&e&&(a=a.replace(Xa,""));return!isNaN(parseFloat(a))&&isFinite(a)},Rb=function(a,b,c){return J(a)?!0:!(J(a)||"string"===typeof a)?null:Za(a.replace(Ba,""),b,c)?!0:null},D=function(a,b,c){var e=[],d=0,f=a.length;
if(c!==k)for(;d<f;d++)a[d]&&a[d][b]&&e.push(a[d][b][c]);else for(;d<f;d++)a[d]&&e.push(a[d][b]);return e},ia=function(a,b,c,e){var d=[],f=0,g=b.length;if(e!==k)for(;f<g;f++)a[b[f]][c]&&d.push(a[b[f]][c][e]);else for(;f<g;f++)d.push(a[b[f]][c]);return d},V=function(a,b){var c=[],e;b===k?(b=0,e=a):(e=b,b=a);for(var d=b;d<e;d++)c.push(d);return c},Sb=function(a){for(var b=[],c=0,e=a.length;c<e;c++)a[c]&&b.push(a[c]);return b},Na=function(a){var b=[],c,e,d=a.length,f,g=0;e=0;a:for(;e<d;e++){c=a[e];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b},A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ba=/\[.*?\]$/,T=/\(\)$/,wa=h("<div>")[0],Zb=wa.textContent!==k,$b=/<.*?>/g;m=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new t(za(this[u.iApiIndex])):new t(this)};this.fnAddData=function(a,b){var c=this.api(!0),e=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===
k||b)&&c.draw();return e.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],e=c.oScroll;a===k||a?b.draw(!1):(""!==e.sX||""!==e.sY)&&Y(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var e=this.api(!0),a=e.rows(a),d=a.settings()[0],h=d.aoData[a[0][0]];a.remove();b&&b.call(this,d,h);(c===k||c)&&e.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,e,d,h){d=this.api(!0);null===b||b===k?d.search(a,c,e,h):d.column(b).search(a,c,e,h);d.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var e=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==e||"th"==e?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return za(this[u.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,e,d){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(d===k||d)&&h.columns.adjust();(e===k||e)&&h.draw();return 0};this.fnVersionCheck=u.fnVersionCheck;var b=this,c=a===k,e=this.length;c&&(a={});this.oApi=this.internal=u.internal;for(var d in m.ext.internal)d&&(this[d]=Nb(d));this.each(function(){var d={},d=1<e?Lb(d,a,!0):a,g=0,j,i=this.getAttribute("id"),o=!1,l=m.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())I(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{eb(l);fb(l.column);H(l,l,!0);H(l.column,l.column,!0);H(l,h.extend(d,q.data()));var n=m.settings,g=0;for(j=n.length;g<j;g++){var r=n[g];if(r.nTable==this||r.nTHead.parentNode==this||r.nTFoot&&r.nTFoot.parentNode==this){g=d.bRetrieve!==k?d.bRetrieve:l.bRetrieve;if(c||g)return r.oInstance;if(d.bDestroy!==k?d.bDestroy:l.bDestroy){r.oInstance.fnDestroy();break}else{I(r,0,"Cannot reinitialise DataTable",3);return}}if(r.sTableId==this.id){n.splice(g,1);break}}if(null===i||""===i)this.id=i="DataTables_Table_"+m.ext._unique++;var p=h.extend(!0,{},m.models.oSettings,{sDestroyWidth:q[0].style.width,sInstance:i,sTableId:i});p.nTable=this;p.oApi=b.internal;p.oInit=d;n.push(p);p.oInstance=1===b.length?b:q.dataTable();eb(d);d.oLanguage&&P(d.oLanguage);d.aLengthMenu&&!d.iDisplayLength&&(d.iDisplayLength=h.isArray(d.aLengthMenu[0])?d.aLengthMenu[0][0]:d.aLengthMenu[0]);d=Lb(h.extend(!0,{},l),d);E(p.oFeatures,d,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));E(p,d,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);E(p.oScroll,d,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);E(p.oLanguage,d,"fnInfoCallback");z(p,"aoDrawCallback",d.fnDrawCallback,"user");z(p,"aoServerParams",d.fnServerParams,"user");z(p,"aoStateSaveParams",d.fnStateSaveParams,"user");z(p,"aoStateLoadParams",d.fnStateLoadParams,"user");z(p,"aoStateLoaded",d.fnStateLoaded,"user");z(p,"aoRowCallback",d.fnRowCallback,"user");z(p,"aoRowCreatedCallback",d.fnCreatedRow,"user");z(p,"aoHeaderCallback",d.fnHeaderCallback,"user");z(p,"aoFooterCallback",d.fnFooterCallback,"user");z(p,"aoInitComplete",d.fnInitComplete,"user");z(p,"aoPreDrawCallback",d.fnPreDrawCallback,"user");i=p.oClasses;d.bJQueryUI?(h.extend(i,m.ext.oJUIClasses,d.oClasses),d.sDom===l.sDom&&"lfrtip"===l.sDom&&(p.sDom='<"H"lfr>t<"F"ip>'),p.renderer)?h.isPlainObject(p.renderer)&&!p.renderer.header&&(p.renderer.header="jqueryui"):p.renderer="jqueryui":h.extend(i,m.ext.classes,d.oClasses);q.addClass(i.sTable);if(""!==p.oScroll.sX||""!==p.oScroll.sY)p.oScroll.iBarWidth=Hb();!0===p.oScroll.sX&&(p.oScroll.sX="100%");p.iInitDisplayStart===k&&(p.iInitDisplayStart=d.iDisplayStart,p._iDisplayStart=d.iDisplayStart);null!==d.iDeferLoading&&(p.bDeferLoading=!0,g=h.isArray(d.iDeferLoading),p._iRecordsDisplay=g?d.iDeferLoading[0]:d.iDeferLoading,p._iRecordsTotal=g?d.iDeferLoading[1]:d.iDeferLoading);var t=p.oLanguage;h.extend(!0,t,d.oLanguage);""!==t.sUrl&&(h.ajax({dataType:"json",url:t.sUrl,success:function(a){P(a);H(l.oLanguage,a);h.extend(true,t,a);ga(p)},error:function(){ga(p)}}),o=!0);null===d.asStripeClasses&&(p.asStripeClasses=[i.sStripeOdd,i.sStripeEven]);var g=p.asStripeClasses,s=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(g,function(a){return s.hasClass(a)}))&&(h("tbody tr",this).removeClass(g.join(" ")),p.asDestroyStripes=g.slice());n=[];g=this.getElementsByTagName("thead");0!==g.length&&(da(p.aoHeader,g[0]),n=qa(p));if(null===d.aoColumns){r=[];g=0;for(j=n.length;g<j;g++)r.push(null)}else r=d.aoColumns;g=0;for(j=r.length;g<j;g++)Fa(p,n?n[g]:null);ib(p,d.aoColumnDefs,r,function(a,b){ka(p,a,b)});if(s.length){var u=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h.each(na(p,s[0]).cells,function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=u(b,"sort")||u(b,"order"),e=u(b,"filter")||u(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ka(p,a)}}})}var v=p.oFeatures;d.bStateSave&&(v.bStateSave=!0,Kb(p,d),z(p,"aoDrawCallback",ya,"state_save"));if(d.aaSorting===k){n=p.aaSorting;g=0;for(j=n.length;g<j;g++)n[g][1]=p.aoColumns[g].asSorting[0]}xa(p);v.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=U(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});w(p,null,"order",[p,a,b]);Jb(p)}});z(p,"aoDrawCallback",function(){(p.bSorted||B(p)==="ssp"||v.bDeferRender)&&xa(p)},"sc");gb(p);g=q.children("caption").each(function(){this._captionSide=q.css("caption-side")});j=q.children("thead");0===j.length&&(j=h("<thead/>").appendTo(this));p.nTHead=j[0];j=q.children("tbody");0===j.length&&(j=h("<tbody/>").appendTo(this));p.nTBody=j[0];j=q.children("tfoot");if(0===j.length&&0<g.length&&(""!==p.oScroll.sX||""!==p.oScroll.sY))j=h("<tfoot/>").appendTo(this);0===j.length||0===j.children().length?q.addClass(i.sNoFooter):0<j.length&&(p.nTFoot=j[0],da(p.aoFooter,p.nTFoot));if(d.aaData)for(g=0;g<d.aaData.length;g++)K(p,d.aaData[g]);else(p.bDeferLoading||"dom"==B(p))&&ma(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();p.bInitialised=!0;!1===o&&ga(p)}});b=null;return this};var Tb=[],y=Array.prototype,cc=function(a){var b,c,e=m.settings,d=h.map(e,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,d),-1!==b?[e[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,d);return-1!==b?e[b]:null}).toArray()};t=function(a,b){if(!(this instanceof t))return new t(a,b);var c=[],e=function(a){(a=cc(a))&&c.push.apply(c,a)};if(h.isArray(a))for(var d=0,f=a.length;d<f;d++)e(a[d]);else e(a);this.context=Na(c);b&&this.push.apply(this,b.toArray?b.toArray():b);this.selector={rows:null,cols:null,opts:null};t.extend(this,this,Tb)};m.Api=t;t.prototype={any:function(){return 0!==this.flatten().length},concat:y.concat,context:[],each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=this.context;return b.length>a?new t(b[a],this[a]):null},filter:function(a){var b=[];if(y.filter)b=y.filter.call(this,a,this);else for(var c=0,e=this.length;c<e;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new t(this.context,b)},flatten:function(){var a=[];return new t(this.context,a.concat.apply(a,this.toArray()))},join:y.join,indexOf:y.indexOf||function(a,b){for(var c=b||0,e=this.length;c<e;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,e){var d=[],f,g,h,i,o,l=this.context,q,n,m=this.selector;"string"===typeof a&&(e=c,c=b,b=a,a=!1);g=0;for(h=l.length;g<h;g++){var p=new t(l[g]);if("table"===b)f=c.call(p,l[g],g),f!==k&&d.push(f);else if("columns"===b||"rows"===b)f=c.call(p,l[g],this[g],g),f!==k&&d.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){n=this[g];"column-rows"===b&&(q=Ca(l[g],m.opts));i=0;for(o=n.length;i<o;i++)f=n[i],f="cell"===b?c.call(p,l[g],f.row,f.column,g,i):c.call(p,l[g],f,g,i,q),f!==k&&d.push(f)}}return d.length||e?(a=new t(l,a?d.concat.apply([],d):d),b=a.selector,b.rows=m.rows,b.cols=m.cols,b.opts=m.opts,a):this},lastIndexOf:y.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(y.map)b=y.map.call(this,a,this);else for(var c=0,e=this.length;c<e;c++)b.push(a.call(this,this[c],c));return new t(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:y.pop,push:y.push,reduce:y.reduce||function(a,b){return hb(this,a,b,0,this.length,1)},reduceRight:y.reduceRight||function(a,b){return hb(this,a,b,this.length-1,-1,-1)},reverse:y.reverse,selector:null,shift:y.shift,sort:y.sort,splice:y.splice,toArray:function(){return y.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new t(this.context,Na(this))},unshift:y.unshift};t.extend=function(a,b,c){if(c.length&&b&&(b instanceof t||b.__dt_wrapper)){var e,d,f,g=function(a,b,c){return function(){var d=b.apply(a,arguments);t.extend(d,d,c.methodExt);return d}};e=0;for(d=c.length;e<d;e++)f=c[e],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,t.extend(a,b[f.name],f.propExt)}};t.register=r=function(a,b){if(h.isArray(a))for(var c=0,e=a.length;c<
e;c++)t.register(a[c],b);else for(var d=a.split("."),f=Tb,g,j,c=0,e=d.length;c<e;c++){g=(j=-1!==d[c].indexOf("()"))?d[c].replace("()",""):d[c];var i;a:{i=0;for(var o=f.length;i<o;i++)if(f[i].name===g){i=f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===e-1?i.val=b:f=j?i.methodExt:i.propExt}};t.registerPlural=v=function(a,b,c){t.register(a,c);t.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof t?a.length?h.isArray(a[0])?new t(a.context,a[0]):a[0]:k:a})};r("tables()",function(a){var b;if(a){b=t;var c=this.context;if("number"===typeof a)a=[c[a]];else var e=h.map(c,function(a){return a.nTable}),a=h(e).filter(a).map(function(){var a=h.inArray(this,e);return c[a]}).toArray();b=new b(a)}else b=this;return b});r("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new t(b[0]):a});v("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});v("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});v("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});v("tables().footer()","table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});v("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});r("draw()",function(a){return this.iterator("table",function(b){N(b,!1===a)})});r("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});r("page.info()",function(){if(0===this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a._iDisplayLength,e=a.fnRecordsDisplay(),d=-1===c;return{page:d?0:Math.floor(b/c),pages:d?1:Math.ceil(e/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:e}});r("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Ub=function(a,b,c){if(c){var e=new t(a);e.one("draw",function(){c(e.ajax.json())})}"ssp"==B(a)?N(a,b):(C(a,!0),ra(a,[],function(c){oa(a);for(var c=sa(a,c),e=0,g=c.length;e<g;e++)K(a,c[e]);N(a,b);C(a,!1)}))};r("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});r("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});r("ajax.reload()",function(a,b){return this.iterator("table",function(c){Ub(c,!1===b,a)})});r("ajax.url()",function(a){var b=this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});r("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Ub(c,!1===b,a)})});var $a=function(a,b,c,e,d){var f=[],g,j,i,o,l,q;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(o=b.length;i<o;i++){j=b[i]&&b[i].split?b[i].split(","):[b[i]];l=0;for(q=j.length;l<q;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&f.push.apply(f,g)}a=u.selector[a];if(a.length){i=0;for(o=a.length;i<o;i++)f=a[i](e,d,f)}return f},ab=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},bb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ca=function(a,b){var c,e,d,f=[],g=a.aiDisplay;c=a.aiDisplayMaster;var j=b.search;e=b.order;d=b.page;if("ssp"==B(a))return"removed"===j?[]:V(0,c.length);if("current"==d){c=a._iDisplayStart;for(e=a.fnDisplayEnd();c<e;c++)f.push(g[c])}else if("current"==e||"applied"==e)f="none"==j?c.slice():"applied"==j?g.slice():h.map(c,function(a){return-1===h.inArray(a,g)?a:null});else if("index"==e||"original"==e){c=0;for(e=a.aoData.length;c<e;c++)"none"==j?f.push(c):(d=h.inArray(c,g),(-1===d&&"removed"==j||0<=d&&"applied"==j)&&f.push(c))}return f};r("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var d=b;return $a("row",a,function(a){var b=Pb(a);if(b!==null&&!d)return[b];var j=Ca(c,d);if(b!==null&&h.inArray(b,j)!==-1)return[b];if(!a)return j;if(typeof a==="function")return h.map(j,function(b){var d=c.aoData[b];return a(b,d._aData,d.nTr)?b:null});b=Sb(ia(c.aoData,j,"nTr"));return a.nodeName&&h.inArray(a,b)!==-1?[a._DT_RowIndex]:h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,d)},1);c.selector.rows=a;c.selector.opts=b;return c});r("rows().nodes()",function(){return this.iterator("row",function(a,b){return a.aoData[b].nTr||k},1)});r("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ia(a.aoData,b,"_aData")},1)});v("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var e=b.aoData[c];return"search"===a?e._aFilterData:e._aSortData},1)});v("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){ca(b,c,a)})});v("rows().indexes()","row().index()",function(){return this.iterator("row",function(a,b){return b},1)});v("rows().remove()","row().remove()",function(){var a=this;return this.iterator("row",function(b,c,e){var d=b.aoData;d.splice(c,1);for(var f=0,g=d.length;f<g;f++)null!==d[f].nTr&&(d[f].nTr._DT_RowIndex=f);h.inArray(c,b.aiDisplay);pa(b.aiDisplayMaster,c);pa(b.aiDisplay,c);pa(a[e],c,!1);Sa(b)})});r("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(ma(b,c)[0]):h.push(K(b,c));return h},1),c=this.rows(-1);c.pop();c.push.apply(c,b.toArray());return c});r("row()",function(a,b){return bb(this.rows(a,b))});r("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;b[0].aoData[this[0]]._aData=a;ca(b[0],this[0],"data");return this});r("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});r("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?ma(b,a)[0]:K(b,a)});return this.row(b[0])});var cb=function(a,b){var c=a.context;c.length&&(c=c[0].aoData[b!==k?b:a[0]],c._details&&(c._details.remove(),c._detailsShow=k,c._details=k))},Vb=function(a,b){var c=a.context;if(c.length&&a.length){var e=c[0].aoData[a[0]];if(e._details){(e._detailsShow=b)?e._details.insertAfter(e.nTr):e._details.detach();var d=c[0],f=new t(d),g=d.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){d===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(d===b)for(var c,e=aa(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",e)}),f.on("destroy.dt.DT_details",function(a,b){if(d===b)for(var c=0,e=g.length;c<e;c++)g[c]._details&&cb(f,c)}))}}};r("row().child()",function(a,b){var c=this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)cb(this);else if(c.length&&this.length){var e=c[0],c=c[0].aoData[this[0]],d=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?d.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=aa(e),d.push(c[0]))};f(a,b);c._details&&c._details.remove();c._details=h(d);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});r(["row().child.show()","row().child().show()"],function(){Vb(this,!0);return this});r(["row().child.hide()","row().child().hide()"],function(){Vb(this,!1);return this});r(["row().child.remove()","row().child().remove()"],function(){cb(this);return this});r("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var dc=/^(.+):(name|visIdx|visible)$/,Wb=function(a,b,c,e,d){for(var c=[],e=0,f=d.length;e<f;e++)c.push(x(a,d[e],b));return c};r("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=ab(b),c=this.iterator("table",function(c){var d=a,f=b,g=c.aoColumns,j=D(g,"sName"),i=D(g,"nTh");return $a("column",d,function(a){var b=Pb(a);if(a==="")return V(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var d=Ca(c,
f);return h.map(g,function(b,f){return a(f,Wb(c,f,0,0,d),i[f])?f:null})}var k=typeof a==="string"?a.match(dc):"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var m=h.map(g,function(a,b){return a.bVisible?b:null});return[m[m.length+b]]}return[la(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null})}else return h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray()},c,f)},1);c.selector.cols=a;c.selector.opts=b;return c});v("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});v("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});v("columns().data()","column().data()",function(){return this.iterator("column-rows",Wb,1)});v("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)});v("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,e,d,f){return ia(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});v("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,e,d){return ia(a.aoData,d,"anCells",b)},1)});v("columns().visible()","column().visible()",function(a,b){return this.iterator("column",function(c,e){if(a===k)return c.aoColumns[e].bVisible;var d=c.aoColumns,f=d[e],g=c.aoData,j,i,m;if(a!==k&&f.bVisible!==a){if(a){var l=h.inArray(!0,D(d,"bVisible"),e+1);j=0;for(i=g.length;j<i;j++)m=g[j].nTr,d=g[j].anCells,m&&m.insertBefore(d[e],d[l]||null)}else h(D(c.aoData,"anCells",e)).detach();f.bVisible=a;ea(c,c.aoHeader);ea(c,c.aoFooter);if(b===k||b)X(c),(c.oScroll.sX||c.oScroll.sY)&&Y(c);w(c,null,"column-visibility",[c,e,a]);ya(c)}})});v("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?$(b,c):c},1)});r("columns.adjust()",function(){return this.iterator("table",function(a){X(a)},1)});r("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return la(c,b);if("fromData"===a||"toVisible"===a)return $(c,b)}});r("column()",function(a,b){return bb(this.columns(a,b))});r("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=ab(c),f=b.aoData,g=Ca(b,e),i=Sb(ia(f,g,"anCells")),j=h([].concat.apply([],i)),l,m=b.aoColumns.length,o,r,t,s,u,v;return $a("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){o=[];r=0;for(t=g.length;r<t;r++){l=g[r];for(s=0;s<m;s++){u={row:l,column:s};if(c){v=b.aoData[l];a(u,x(b,l,s),v.anCells?v.anCells[s]:null)&&o.push(u)}else o.push(u)}}return o}return h.isPlainObject(a)?[a]:j.filter(a).map(function(a,b){l=b.parentNode._DT_RowIndex;return{row:l,column:h.inArray(b,f[l].anCells)}}).toArray()},b,e)});var e=this.columns(b,c),d=this.rows(a,c),f,g,j,i,m,l=this.iterator("table",function(a,b){f=[];g=0;for(j=d[b].length;g<j;g++){i=0;for(m=e[b].length;i<m;i++)f.push({row:d[b][g],column:e[b][i]})}return f},1);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});v("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b].anCells)?a[c]:k},1)});r("cells().data()",function(){return this.iterator("cell",function(a,b,c){return x(a,b,c)},1)});v("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,e){return b.aoData[c][a][e]},1)});v("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,e){return x(b,c,e,a)},1)});v("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:$(a,c)}},1)});v("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,e){ca(b,c,a,e)})});r("cell()",function(a,b,c){return bb(this.cells(a,b,c))});r("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?x(b[0],c[0].row,c[0].column):k;Ia(b[0],c[0].row,c[0].column,a);ca(b[0],c[0].row,"data",c[0].column);return this});r("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:h.isArray(a[0])||(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});r("order.listener()",function(a,b,c){return this.iterator("table",function(e){Oa(e,a,b,c)})});r(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,e){var d=[];h.each(b[e],function(b,c){d.push([c,a])});c.aaSorting=d})});r("search()",function(a,b,c,e){var d=this.context;return a===k?0!==d.length?d[0].oPreviousSearch.sSearch:k:this.iterator("table",function(d){d.oFeatures.bFilter&&fa(d,h.extend({},d.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===e?!0:e}),1)})});v("columns().search()","column().search()",function(a,b,c,e){return this.iterator("column",function(d,f){var g=d.aoPreSearchCols;if(a===k)return g[f].sSearch;d.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===e?!0:e}),fa(d,d.oPreviousSearch,1))})});r("state()",function(){return this.context.length?this.context[0].oSavedState:null});r("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});r("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});r("state.save()",function(){return this.iterator("table",function(a){ya(a)})});m.versionCheck=m.fnVersionCheck=function(a){for(var b=m.version.split("."),a=a.split("."),c,e,d=0,f=a.length;d<f;d++)if(c=parseInt(b[d],10)||0,e=parseInt(a[d],10)||0,c!==e)return c>e;return!0};m.isDataTable=m.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;h.each(m.settings,function(a,d){var f=d.nScrollHead?h("table",d.nScrollHead)[0]:null,g=d.nScrollFoot?h("table",d.nScrollFoot)[0]:null;if(d.nTable===b||f===b||g===b)c=!0});return c};m.tables=m.fnTables=function(a){return h.map(m.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable})};m.util={throttle:ua,escapeRegex:va};m.camelToHungarian=H;r("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){r(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0].match(/\.dt\b/)||(a[0]+=".dt");var e=h(this.tables().nodes());e[b].apply(e,a);return this})});r("clear()",function(){return this.iterator("table",function(a){oa(a)})});r("settings()",function(){return new t(this.context,this.context)});r("init()",function(){var a=this.context;return a.length?a[0].oInit:null});r("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});r("destroy()",
function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,e=b.oClasses,d=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(d),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),q;b.bDestroying=!0;w(b,"aoDestroyCallback","destroy",[b]);a||(new t(b)).columns().visible(!0);k.unbind(".DT").find(":not(tbody *)").unbind(".DT");h(Ea).unbind(".DT-"+b.sInstance);d!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&d!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));i.detach();k.detach();b.aaSorting=[];b.aaSortingFixed=[];xa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(e.sSortable+" "+e.sSortableAsc+" "+e.sSortableDesc+" "+e.sSortableNone);b.bJUI&&(h("th span."+e.sSortIcon+", td span."+e.sSortIcon,g).detach(),h("th, td",g).each(function(){var a=h("div."+e.sSortJUIWrapper,this);h(this).append(a.contents());a.detach()}));!a&&c&&c.insertBefore(d,b.nTableReinsertBefore);f.children().detach();f.append(l);i.css("width",b.sDestroyWidth).removeClass(e.sTable);(q=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%q])});c=h.inArray(b,m.settings);-1!==c&&m.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){r(b+"s().every()",function(a){return this.iterator(b,function(e,d,f){a.call((new t(e))[b](d,f))})})});r("i18n()",function(a,b,c){var e=this.context[0],a=R(a)(e.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:a._);return a.replace("%d",c)});m.version="1.10.7";m.settings=[];m.models={};m.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};m.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null};m.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};m.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,
fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},m.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null};W(m.defaults);m.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};W(m.defaults.column);m.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==B(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==B(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,e=this.aiDisplay.length,d=this.oFeatures,f=d.bPaginate;return d.bServerSide?!1===f||-1===a?b+e:Math.min(b+a,this._iRecordsDisplay):!f||c>e||-1===a?e:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{}};m.ext=u={buttons:{},classes:{},errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:m.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:m.version};h.extend(u,{afnFiltering:u.search,aTypes:u.type.detect,ofnSearch:u.type.search,oSort:u.type.order,afnSortData:u.order,aoFeatures:u.feature,oApi:u.internal,oStdClasses:u.classes,oPagination:u.pager});h.extend(m.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Da="",Da="",F=Da+"ui-state-default",ja=Da+"css_right ui-icon ui-icon-",Xb=Da+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";h.extend(m.ext.oJUIClasses,m.ext.classes,{sPageButton:"fg-button ui-button "+F,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:F+" sorting_asc",sSortDesc:F+" sorting_desc",sSortable:F+" sorting",sSortableAsc:F+" sorting_asc_disabled",sSortableDesc:F+" sorting_desc_disabled",sSortableNone:F+" sorting_disabled",sSortJUIAsc:ja+"triangle-1-n",sSortJUIDesc:ja+"triangle-1-s",sSortJUI:ja+"carat-2-n-s",sSortJUIAscAllowed:ja+"carat-1-n",sSortJUIDescAllowed:ja+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+F,sScrollFoot:"dataTables_scrollFoot "+F,sHeaderTH:F,sFooterTH:F,sJUIHeader:Xb+" ui-corner-tl ui-corner-tr",sJUIFooter:Xb+" ui-corner-bl ui-corner-br"});var Mb=m.ext.pager;h.extend(Mb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},simple_numbers:function(a,b){return["previous",Wa(a,b),"next"]},full_numbers:function(a,b){return["first","previous",Wa(a,b),"next","last"]},_numbers:Wa,numbers_length:7});h.extend(!0,m.ext.renderer,{pageButton:{_:function(a,b,c,e,d,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i,k,l=0,m=function(b,e){var n,r,t,s,u=function(b){Ta(a,b.data.action,true)};n=0;for(r=e.length;n<r;n++){s=e[n];if(h.isArray(s)){t=h("<"+(s.DT_el||"div")+"/>").appendTo(b);m(t,s)}else{k=i="";switch(s){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":i=j.sFirst;k=s+(d>0?"":" "+g.sPageButtonDisabled);break;case "previous":i=j.sPrevious;k=s+(d>0?"":" "+g.sPageButtonDisabled);break;case "next":i=j.sNext;k=s+(d<f-1?"":" "+g.sPageButtonDisabled);break;case "last":i=j.sLast;k=s+(d<f-1?"":" "+g.sPageButtonDisabled);break;default:i=s+1;k=d===s?g.sPageButtonActive:""}if(i){t=h("<a>",{"class":g.sPageButton+" "+k,"aria-controls":a.sTableId,"data-dt-idx":l,tabindex:a.iTabIndex,id:c===0&&typeof s==="string"?a.sTableId+"_"+s:null}).html(i).appendTo(b);Va(t,{action:s},u);l++}}}},n;try{n=h(Q.activeElement).data("dt-idx")}catch(r){}m(h(b).empty(),e);n&&h(b).find("[data-dt-idx="+n+"]").focus()}}});h.extend(m.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&(!ac.test(a)||!bc.test(a)))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||J(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return Za(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c,!0)?"html-num-fmt"+c:null},function(a){return J(a)||"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(m.ext.type.search,{html:function(a){return J(a)?a:"string"===typeof a?a.replace(Ob," ").replace(Ba,""):""},string:function(a){return J(a)?a:"string"===typeof a?a.replace(Ob," "):a}});var Aa=function(a,b,c,e){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Qb(a,b));a.replace&&(c&&(a=a.replace(c,"")),e&&(a=a.replace(e,"")));return 1*a};h.extend(u.type.order,{"date-pre":function(a){return Date.parse(a)||0},"html-pre":function(a){return J(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return J(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});db("");h.extend(!0,m.ext.renderer,{header:{_:function(a,b,c,e){h(a.nTable).on("order.dt.DT",function(d,
f,g,h){if(a===f){d=c.idx;b.removeClass(c.sSortingClass+" "+e.sSortAsc+" "+e.sSortDesc).addClass(h[d]=="asc"?e.sSortAsc:h[d]=="desc"?e.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,e){h("<div/>").addClass(e.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(e.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(d,f,g,h){if(a===f){d=c.idx;b.removeClass(e.sSortAsc+" "+e.sSortDesc).addClass(h[d]=="asc"?e.sSortAsc:h[d]=="desc"?e.sSortDesc:c.sSortingClass);b.find("span."+e.sSortIcon).removeClass(e.sSortJUIAsc+" "+e.sSortJUIDesc+" "+e.sSortJUI+" "+e.sSortJUIAscAllowed+" "+e.sSortJUIDescAllowed).addClass(h[d]=="asc"?e.sSortJUIAsc:h[d]=="desc"?e.sSortJUIDesc:c.sSortingClassJUI)}})}}});m.render={number:function(a,b,c,e){return{display:function(d){if("number"!==typeof d&&"string"!==typeof d)return d;var f=0>d?"-":"",d=Math.abs(parseFloat(d)),g=parseInt(d,10),d=c?b+(d-g).toFixed(c).substring(2):"";return f+(e||"")+g.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
a)+d}}}};h.extend(m.ext.internal,{_fnExternApiFunc:Nb,_fnBuildAjax:ra,_fnAjaxUpdate:kb,_fnAjaxParameters:tb,_fnAjaxUpdateDraw:ub,_fnAjaxDataSrc:sa,_fnAddColumn:Fa,_fnColumnOptions:ka,_fnAdjustColumnSizing:X,_fnVisibleToColumnIndex:la,_fnColumnIndexToVisible:$,_fnVisbleColumns:aa,_fnGetColumns:Z,_fnColumnTypes:Ha,_fnApplyColumnDefs:ib,_fnHungarianMap:W,_fnCamelToHungarian:H,_fnLanguageCompat:P,_fnBrowserDetect:gb,_fnAddData:K,_fnAddTr:ma,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:x,_fnSetCellData:Ia,_fnSplitObjNotation:Ka,_fnGetObjectDataFn:R,_fnSetObjectDataFn:S,_fnGetDataMaster:La,_fnClearTable:oa,_fnDeleteIndex:pa,_fnInvalidate:ca,_fnGetRowElements:na,_fnCreateTr:Ja,_fnBuildHead:jb,_fnDrawHead:ea,_fnDraw:M,_fnReDraw:N,_fnAddOptionsHtml:mb,_fnDetectHeader:da,_fnGetUniqueThs:qa,_fnFeatureHtmlFilter:ob,_fnFilterComplete:fa,_fnFilterCustom:xb,_fnFilterColumn:wb,_fnFilter:vb,_fnFilterCreateSearch:Qa,_fnEscapeRegex:va,_fnFilterData:yb,_fnFeatureHtmlInfo:rb,_fnUpdateInfo:Bb,_fnInfoMacros:Cb,_fnInitialise:ga,_fnInitComplete:ta,_fnLengthChange:Ra,_fnFeatureHtmlLength:nb,_fnFeatureHtmlPaginate:sb,_fnPageChange:Ta,_fnFeatureHtmlProcessing:pb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:qb,_fnScrollDraw:Y,_fnApplyToChildren:G,_fnCalculateColumnWidths:Ga,_fnThrottle:ua,_fnConvertToWidth:Db,_fnScrollingWidthAdjust:Fb,_fnGetWidestNode:Eb,_fnGetMaxLenString:Gb,_fnStringToCss:s,_fnScrollBarWidth:Hb,_fnSortFlatten:U,_fnSort:lb,_fnSortAria:Jb,_fnSortListener:Ua,_fnSortAttachListener:Oa,_fnSortingClasses:xa,_fnSortData:Ib,_fnSaveState:ya,_fnLoadState:Kb,_fnSettingsFromNode:za,_fnLog:I,_fnMap:E,_fnBindAction:Va,_fnCallbackReg:z,_fnCallbackFire:w,_fnLengthOverflow:Sa,_fnRenderer:Pa,_fnDataSource:B,_fnRowAttributes:Ma,_fnCalculateEnd:function(){}});h.fn.dataTable=m;h.fn.dataTableSettings=m.settings;h.fn.dataTableExt=m.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(m,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable};"function"===typeof define&&define.amd?define("datatables",["jquery"],P):"object"===typeof exports?module.exports=P(require("jquery")):jQuery&&!jQuery.fn.dataTable&&P(jQuery)})(window,document);$(document).ready(function(){var jobofferTable =$('.joboffer-table').DataTable({paging:true,pageLength:20,language:{paginate:{previous:"",next:""}
},order:[4,'desc'],columnDefs:[{orderable:false,targets:[0,1,2,3]}],dom:'tp',initComplete:function () {var api =this.api();api.columns('.select-filter').indexes().flatten().each(function (i ) {var column =api.column(i );var select =$('<select><option value=""></option></select>')
.appendTo($(column.header()) )
.on('change',function () {var val =$(this).val();column
.search(val ?'^'+val+'$':'',true,false )
.draw();} );column.data().unique().sort().each(function (d,j ) {if (d !='') {select.append('<option value="'+d+'">'+d+'</option>')
}
} );} );}
});});$(document).ready(function(){var locationsTable =$('.locations-table').DataTable({paging:false,language:{paginate:{previous:"",next:""},search:'Suche'},order:[0,'asc'],columnDefs:[{orderable:false,type:"international",targets:[0,1]}],dom:'ft',fnDrawCallback:function() {$(".locations-table thead").remove();}
});});jQuery.extend(jQuery.fn.dataTableExt.oSort,{"international-pre":function (a) {a =a.replace(/<.*?>/g, ""); 
a =a.toLowerCase();a =a.replace(/ä/g, "ae"); 
a =a.replace(/ö/g, "oe");
a =a.replace(/ü/g, "ue");
a =a.replace(/ß/g, "ss");
return(a);},"international-asc":function (a,b) {return (a ==b) ?0 :(a > b) ?1 :-1;},"international-desc":function (a,b) {return (a ==b) ?0 :(a > b) ?-1 :1;}
});$(document).ready(function() {if ($('.twitter-timeline').length > 0) {function getTwitter(d,s,id) {var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
if (!d.getElementById(id)) {js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}
};getTwitter(document,"script","twitter-wjs");}
});jQuery.fn.timelinr =function(options){settings =jQuery.extend({orientation:'horizontal',containerDiv:'#timeline',datesDiv:'#dates',datesSelectedClass:'selected',datesSpeed:'normal',issuesDiv:'#issues',issuesSelectedClass:'selected',issuesSpeed:'fast',issuesTransparency:0.2,issuesTransparencySpeed:500,prevButton:'#prev',nextButton:'#next',arrowKeys:'false',startAt:1,autoPlay:'false',autoPlayDirection:'forward',autoPlayPause:2000},options);$(function(){var howManyDates =$(settings.datesDiv+' li').length;var howManyIssues =$(settings.issuesDiv+' li').length;var currentDate =$(settings.datesDiv).find('a.'+settings.datesSelectedClass);var currentIssue =$(settings.issuesDiv).find('li.'+settings.issuesSelectedClass);var widthContainer =$(settings.containerDiv).width();var heightContainer =$(settings.containerDiv).height();var widthIssues =$(settings.issuesDiv).width();var heightIssues =$(settings.issuesDiv).height();var widthIssue =$(settings.issuesDiv+' li').width();var heightIssue =$(settings.issuesDiv+' li').height();var widthDates =$(settings.datesDiv).width();var heightDates =$(settings.datesDiv).height();var widthDate =$(settings.datesDiv+' li').width();var heightDate =$(settings.datesDiv+' li').height();if(settings.orientation =='horizontal') {$(settings.issuesDiv).width(widthIssue*howManyIssues);$(settings.datesDiv).width(widthDate*howManyDates).css('marginLeft',widthContainer/2-widthDate/2);var defaultPositionDates =parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));} else if(settings.orientation =='vertical') {$(settings.issuesDiv).height(heightIssue*howManyIssues);$(settings.datesDiv).height(heightDate*howManyDates).css('marginTop',heightContainer/2-heightDate/2);var defaultPositionDates =parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));}
$(settings.datesDiv+' a').click(function(event){event.preventDefault();var whichIssue =$(this).text();var currentIndex =$(this).parent().prevAll().length;if(settings.orientation =='horizontal') {$(settings.issuesDiv).animate({'marginLeft':-widthIssue*currentIndex},{queue:false,duration:settings.issuesSpeed});} else if(settings.orientation =='vertical') {$(settings.issuesDiv).animate({'marginTop':-heightIssue*currentIndex},{queue:false,duration:settings.issuesSpeed});}
$(settings.issuesDiv+' li').animate({'opacity':settings.issuesTransparency},{queue:false,duration:settings.issuesSpeed}).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed,1);if(howManyDates ==1) {$(settings.prevButton+','+settings.nextButton).fadeOut('fast');} else if(howManyDates ==2) {if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {$(settings.prevButton).fadeOut('fast');$(settings.nextButton).fadeIn('fast');} else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {$(settings.nextButton).fadeOut('fast');$(settings.prevButton).fadeIn('fast');}
} else {if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {$(settings.nextButton).fadeIn('fast');$(settings.prevButton).fadeOut('fast');} else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {$(settings.prevButton).fadeIn('fast');$(settings.nextButton).fadeOut('fast');}
else {$(settings.nextButton+','+settings.prevButton).fadeIn('slow');}
}
$(settings.datesDiv+' a').removeClass(settings.datesSelectedClass);$(this).addClass(settings.datesSelectedClass);if(settings.orientation =='horizontal') {$(settings.datesDiv).animate({'marginLeft':defaultPositionDates-(widthDate*currentIndex)},{queue:false,duration:'settings.datesSpeed'});} else if(settings.orientation =='vertical') {$(settings.datesDiv).animate({'marginTop':defaultPositionDates-(heightDate*currentIndex)},{queue:false,duration:'settings.datesSpeed'});}
});$(settings.nextButton).bind('click',function(event){event.preventDefault();var currentIndex =$(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();if(settings.orientation =='horizontal') {var currentPositionIssues =parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));var currentIssueIndex =currentPositionIssues/widthIssue;var currentPositionDates =parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));var currentIssueDate =currentPositionDates-widthDate;if(currentPositionIssues <=-(widthIssue*howManyIssues-(widthIssue))) {$(settings.issuesDiv).stop();$(settings.datesDiv+' li:last-child a').click();} else {if (!$(settings.issuesDiv).is(':animated')) {$(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');}
}
} else if(settings.orientation =='vertical') {var currentPositionIssues =parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));var currentIssueIndex =currentPositionIssues/heightIssue;var currentPositionDates =parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));var currentIssueDate =currentPositionDates-heightDate;if(currentPositionIssues <=-(heightIssue*howManyIssues-(heightIssue))) {$(settings.issuesDiv).stop();$(settings.datesDiv+' li:last-child a').click();} else {if (!$(settings.issuesDiv).is(':animated')) {$(settings.datesDiv+' li').eq(currentIndex+1).find('a').trigger('click');}
}
}
if(howManyDates ==1) {$(settings.prevButton+','+settings.nextButton).fadeOut('fast');} else if(howManyDates ==2) {if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {$(settings.prevButton).fadeOut('fast');$(settings.nextButton).fadeIn('fast');} else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {$(settings.nextButton).fadeOut('fast');$(settings.prevButton).fadeIn('fast');}
} else {if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {$(settings.prevButton).fadeOut('fast');} else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {$(settings.nextButton).fadeOut('fast');}
else {$(settings.nextButton+','+settings.prevButton).fadeIn('slow');}
}
});$(settings.prevButton).click(function(event){event.preventDefault();var currentIndex =$(settings.issuesDiv).find('li.'+settings.issuesSelectedClass).index();if(settings.orientation =='horizontal') {var currentPositionIssues =parseInt($(settings.issuesDiv).css('marginLeft').substring(0,$(settings.issuesDiv).css('marginLeft').indexOf('px')));var currentIssueIndex =currentPositionIssues/widthIssue;var currentPositionDates =parseInt($(settings.datesDiv).css('marginLeft').substring(0,$(settings.datesDiv).css('marginLeft').indexOf('px')));var currentIssueDate =currentPositionDates+widthDate;if(currentPositionIssues >=0) {$(settings.issuesDiv).stop();$(settings.datesDiv+' li:first-child a').click();} else {if (!$(settings.issuesDiv).is(':animated')) {$(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');}
}
} else if(settings.orientation =='vertical') {var currentPositionIssues =parseInt($(settings.issuesDiv).css('marginTop').substring(0,$(settings.issuesDiv).css('marginTop').indexOf('px')));var currentIssueIndex =currentPositionIssues/heightIssue;var currentPositionDates =parseInt($(settings.datesDiv).css('marginTop').substring(0,$(settings.datesDiv).css('marginTop').indexOf('px')));var currentIssueDate =currentPositionDates+heightDate;if(currentPositionIssues >=0) {$(settings.issuesDiv).stop();$(settings.datesDiv+' li:first-child a').click();} else {if (!$(settings.issuesDiv).is(':animated')) {$(settings.datesDiv+' li').eq(currentIndex-1).find('a').trigger('click');}
}
}
if(howManyDates ==1) {$(settings.prevButton+','+settings.nextButton).fadeOut('fast');} else if(howManyDates ==2) {if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass)) {$(settings.prevButton).fadeOut('fast');$(settings.nextButton).fadeIn('fast');} else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass)) {$(settings.nextButton).fadeOut('fast');$(settings.prevButton).fadeIn('fast');}
} else {if($(settings.issuesDiv+' li:first-child').hasClass(settings.issuesSelectedClass) ) {$(settings.prevButton).fadeOut('fast');} else if($(settings.issuesDiv+' li:last-child').hasClass(settings.issuesSelectedClass) ) {$(settings.nextButton).fadeOut('fast');}
else {$(settings.nextButton+','+settings.prevButton).fadeIn('slow');}
}
});if(settings.arrowKeys=='true') {if(settings.orientation=='horizontal') {$(document).keydown(function(event){if (event.keyCode ==39) {$(settings.nextButton).click();}
if (event.keyCode ==37) {$(settings.prevButton).click();}
});} else if(settings.orientation=='vertical') {$(document).keydown(function(event){if (event.keyCode ==40) {$(settings.nextButton).click();}
if (event.keyCode ==38) {$(settings.prevButton).click();}
});}
}
$(settings.datesDiv+' li').eq(settings.startAt-1).find('a').trigger('click');if(settings.autoPlay =='true') {setInterval("autoPlay()",settings.autoPlayPause);}
});};function autoPlay(){var currentDate =$(settings.datesDiv).find('a.'+settings.datesSelectedClass);if(settings.autoPlayDirection =='forward') {if(currentDate.parent().is('li:last-child')) {$(settings.datesDiv+' li:first-child').find('a').trigger('click');} else {currentDate.parent().next().find('a').trigger('click');}
} else if(settings.autoPlayDirection =='backward') {if(currentDate.parent().is('li:first-child')) {$(settings.datesDiv+' li:last-child').find('a').trigger('click');} else {currentDate.parent().prev().find('a').trigger('click');}
}
}
$(document).ready(function() {if ($('#timeline').length > 0) {var startYear =1;if ($('#dates li').length > 2 &&$('#dates li')[2].innerText =="1919")
{startYear =3;}
$().timelinr({arrowKeys :'true',startAt:startYear
});}
});window.emosTrackVersion =2;(function(be,t){var EMOS_VERSION='cm50.6',bR="emos3",m=be[bR],TRACK_VERSION=(typeof(window.emosTrackVersion)=="number")?window.emosTrackVersion:1;if(!m){be[bR]=m={}}else{TRACK_VERSION=3}if(!m.config){m.config={}}if(!m.defaults){m.defaults={}}var DFLTS={siteid:'0'};var bG=l("JUNK_SIZE",1600),V=l("CLIENT_COOKIE_LIFETIME",30),Y=l("COOKIENAME_SESSION_ID","emos_jcsid"),bj=l("COOKIENAME_VISITOR_ID","emos_jcvid"),aF=l("COOKIENAME_CAMPAIGN","emos_jckamp"),x=l("COOKIENAME_CROSS","emos_jccross"),u=l("COOKIENAME_POSTVIEWCAMPAIGN","emos_postview"),D=l("COOKIENAME_POSTVIEW",null),aq=l("COOKIE_DOMAIN",null),bK=l("TRACK_FIRSTPARTY",true),aw=l("TRACK_POSTCONVERSION",true),bC=l("CLIENT_KEY",window.emosClientKey?window.emosClientKey:'00001c14-915b7f95-11df-3ea8-bdc9-01cdc25a01ae'),h=l("TRACK_THIRD_PARTY",true),w=l("SAMPLING_RATE",1),ac=l("BEST_PRODUCTS_COOKIE",false),bf=l("PRODUCT_ID_IN_EC_EVENT",1),B=l("COOKIENAME_BEST_PRODUCTS","emos_best_products"),aO=l("BEST_PRODUCTS_COOKIE_LIFETIME",2592000),a5=l("PMAP",{}),ap=l("P_MAP",{}),Z=l("PARAM_TO_PROP",{'emosmarker':'marker','ecmUid':'newsuid','incpc':'incpc'}),bU=l("MC_COOKIE",{kw:30,cp:30,nl:30}),o=l("ADD_COOKIE_PARAMS",{all:["empid","empcode","empcode2"]}),d=l("ADD_COOKIE_PROPS",{}),bH=l("TIMEOUT",6000),bc=l("DO_NOT_TRACK",false),bd=l("JSID",false),aY=l("SEO_BLACK",[]),bk=l("GCLID",true),G=l("VCLT",1095),aS=l("PAGEID_FROM_URL",false),bA=l("SAMPLING_MODE_CLICKONLY",true),bF=l("CAPTURE_CLICKS",typeof be.emosTrackClicks!="undefined"?be.emosTrackClicks:true),a6=l("SCROLL",-1),y="www.econda-monitor.de",p="emos_clickmonitor",bq="https://monitor.econda-monitor.de/click",aL=0,af=null,E=0,a3=0,a4=0,aP=0,aG,aa,bQ=0,J,bh=[],L=true,aZ=null,aR={},z=false;try{if(be.sessionStorage&&be.sessionStorage.length>=0){z=true}}catch(bp){}var az=true,bP,av,am=null;function P(i){var e=ag(i);if(e){am=e.substring(0,254);i.pageId=am}if(i.pageid){delete i.pageid}}function ag(e){if(e.pageId){return e.pageId}if(e.pageid){return e.pageid}if(be.emosPageId){return be.emosPageId}if(am){return am}if(aS){var i=(be.clickmonitor)?be.clickmonitor.location:be.location;return i.protocol+"//"+i.host+i.pathname}return null}function au(){if(!bC&&be.emos_kdnr){var i=be.emos_kdnr-723;var e=(i%673===0)?(i/673-100):0;var b0=e.toString(16);while(b0.length<8){b0="0"+b0}aj("xtc");bC=b0+"-xtc~"+be.emos_kdnr}}function l(e,b0){var i=m.config[e];return(typeof i!="undefined")?i:b0}var bg=(be.encodeURIComponent)?be.encodeURIComponent:be.escape;function bV(i){try{if(be.decodeURIComponent){try{return be.decodeURIComponent(i.replace(/\+/g,"%20"))}catch(b1){return be.unescape(i)}}else{return be.unescape(i)}}catch(b0){return i}}function br(b1,b0,i){if(b1.addEventListener){b1.addEventListener(b0,i,true)}else{if(b1.attachEvent){b1.attachEvent("on"+b0,i)}else{var e=b1["on"+b0];if(!e){b1["on"+b0]=i}else{b1["on"+b0]=function(b2){i(b2);e(b2)}}}}}function aN(b7,b6,b1){var b0=b6.cookie;var e=null;var b8=null;if(b0){if(b6.emcl){e=parseInt(b6.emcl)}if(!e){e=V}e=e*86400;b8=a2(b0)}aW(b7);var b4=c(bv(ae(q(b7))));var b5=Math.floor(b4.length/bG)+1;var b2=[];for(var b3=0;b3<b5;b3++){b2[b3]={};b2[b3].v="4";b2[b3].emrid=b1;if(bK){b2[b3].emsid=E;b2[b3].emvid=a4}if(b3===0&&h&&aw){if(b0){b2[b3].emcl=e;b2[b3].emcc=b8}}b2[b3].emnc=b5;b2[b3].emtn=b3+1;b2[b3].emhost=location.hostname;if(h){b2[b3].tpct=1;if(G!==1095){b2[b3].vclt=G}}b2[b3].d=b4.substr(b3*bG,bG)}return b2}function aC(){if(be.emosDoNotTrack){return}if(bc){return}var i=bs();var e={};a7(i,e);aA(i,e)}function a7(i,e){C(i,e);if(be.emosBillingPageArray){bo(be.emosBillingPageArray,i)}if(be.emosECPageArray){a8(be.emosECPageArray,i)}bB(i);if(be.emosBasketPageArray){al(be.emosBasketPageArray,i)}aE(i)}function ao(b4){if(!ac){return}var b2=b4.ec_Event;if(!aB(b2)||b2.length===0){return}var b1=[];for(var b3=0;b3<b2.length&&b1.length<5;b3++){var b5=b2[b3];if(b5!==null&&typeof b5==="object"){var b0=(S(b5))?b5[bf]:b5.pid;if(b0){b1.push(bg(b0))}}}if(b1.length===0){return}if(b1.length<5){var e=R();if(e){for(var b3=0;b3<e.length&&b1.length<5;b3++){b1.push(e[b3])}}}bY(B,b1.join(":"),aO)}function R(){var e=bS(B);if(e&&e.length>0){return e.split(":")}return null}function C(b0,i){var b1=bx(i);by(b0);aX(b0,i,b1);var e=M();if(e){b0.pvdata=e}U(b0,b1,i);if(TRACK_VERSION===1){j(b0)}if(!b0.content){b0.content="HTML-Title/"+t.title}}function N(i){if(typeof i.customReferrer!="undefined"){return i.customReferrer}if(typeof be.emosReferrer!="undefined"){aj("ref");return be.emosReferrer}try{return top.document.referrer}catch(b0){return t.referrer}}var I=null;try{I=top.location.search}catch(bp){I=location.search}function bx(i){if(i.customParam){return i.customParam}var b2=ax(I,true);for(var e in a5){var b1=a5[e];var b0=b2[b1];if(b0){b2[e]=b0;delete b2[b1]}else{delete b2[e]}}for(var b1 in ap){var e=ap[b1];if(e){var b0=b2[b1];if(b0){b2[e]=b0}}else{if(e===null){delete b2[b1]}}}return b2}function by(i){var b1=screen.width+"x"+screen.height;var e=be.devicePixelRatio;if(typeof e==="number"&&e>1){b1=b1+"|"+Math.round(e*100)/100}var b0=be.orientation;if(typeof b0==="number"&&b0!==0){b1=b1+"o"+b0}i.swsh=b1;i.tz=new Date().getTimezoneOffset()/60;if(TRACK_VERSION!==3){aj("tv"+TRACK_VERSION)}}function ak(b5,b2){try{if(b5===null||b5.length===0){return"http://unknown"}if(b5.substr(0,4)!="http"){b5="http://"+b5}if(b2>=0){var b1=b5.split("/");if(b1.length<b2){b2=b1.length}b5="";for(var b0=0;b0<b2;b0++){if(b0!==0){b5=b5+"/"}b5=b5+b1[b0]}}var b6=b5.indexOf("?");if(b6>=0){b5=b5.substring(0,b6)}var b4=b5.indexOf("#");if(b4>=0){b5=b5.substring(0,b4)}}catch(b3){}return b5.substring(0,127)}function r(b1){if(!am){return}if(!bC){return}if(bc){return}if(!az){return}if(!af){return}if(be.emosDoNotTrack){return}if(!b1){b1=be.event}var b2={};if((b1.which&&b1.which!=1)||(!b1.which&&b1.button!=1)){return}var cc=b1.pageX;var b3=b1.pageY;var b5=t.documentElement&&t.documentElement.clientHeight!==0?t.documentElement:t.body;if(isNaN(cc)||isNaN(b3)){cc=b1.clientX+((isNaN(be.pageXOffset)?b5.scrollLeft:be.pageXOffset));b3=b1.clientY+((isNaN(be.pageYOffset)?b5.scrollTop:be.pageYOffset))}var b8=b1.target?b1.target:b1.srcElement;if(!b8.nodeName){return}var ca=b8.nodeName.toLowerCase();if(ca=="base"){return}while(b8!==null&&b8.nodeType!==1){b8=b8.parentNode}if(ca=="map"){b8=bO(b8,cc,b3)}else{if(ca=="area"){b8=bO(b8.parentNode,cc,b3)}}if(ca=="option"){b8=b8.parentNode;if(b8.nodeName.toLowerCase()=="optgroup"){b8=b8.parentNode}}if(typeof b8.getBoundingClientRect=="function"){if(b8==t.body.parentNode){b8=t.body}}else{if(b8==t.body){b8=t.body.parentNode}}var b4=new Date().getTime();var b9=Math.floor((b4-av)/1000);var cd=Math.floor((b4-J)/1000);av=b4;if(t.body.parentNode==b8||t.body==b8){var b0,e;if(be.innerHeight){b0=be.innerWidth-17;e=be.innerHeight-17}else{b0=b5.clientWidth;e=b5.clientHeight}if(b0<b1.clientX||e<b1.clientY){return}}var b6=K(b8);if(!b6){return}var i=cc-b6[0];var ce=b3-b6[1];var cb=bP++;var b7=O(b8).toLowerCase();b2.click=[[cc,b3,cd,i,ce,cb,b9,b7,w]];b2.plReqId=af;b2.emosV=s();aT(b2);X(b2,{},aD())}var H=-1;var F=-1;var bJ=65536;var bI=65536;var bb=false;function aT(e){if(a6){A();if(bb){e.scroll=[bJ,bI,H,F];bb=false}}}function A(){var e,b2;if(be.pageXOffset!==undefined){e=be.pageXOffset;b2=be.pageYOffset}else{var i=t.compatMode!="BackCompat"?t.documentElement:t.body;e=i.scrollLeft;b2=i.scrollTop}var b1=e+be.innerWidth;var b0=b2+be.innerHeight;if(b1>H){H=b1;bb=true}if(b0>F){F=b0;bb=true}if(b2<bI){bI=b2;bb=true}if(e<bJ){bJ=e;bb=true}}function b(e){A();if(bb){bi({scroll:[bJ,bI,H,F]},{noimg:e});bb=false}}function O(i){var b0=i.parentNode;if(!b0||b0==t){return"/"+i.nodeName}var e=O(b0);return e+"/"+i.nodeName+"["+k(b0,i)+"]"}function k(b2,b1){var e=b2.childNodes;var b3=0;for(var b0=0;b0<e.length;b0++){if(e[b0]==b1){return b3}else{if(e[b0].nodeName==b1.nodeName){b3++}}}return -1}function bO(b3,e,b0){var b5="#"+b3.getAttribute("name");var b6=t.getElementsByTagName("img");for(var b2=0;b2<b6.length;b2++){var b1=b6[b2];if(b1.getAttribute("usemap")==b5){var b4=K(b1);if(b4){if(e>=b4[0]&&b0>=b4[1]&&e<=b4[0]+b1.clientWidth&&b0<=b4[1]+b1.clientHeight){return b1}}}}return t.body.parentNode}function aA(ca,b7){P(ca);try{if(ca.pageId&&top.ClickwatcherAccess){top.ClickwatcherAccess.setPageId(ca.pageId);L=false;az=false;return}}catch(b8){}var b4=location.search.indexOf("clickmonitor=econda")>=0||location.hash.indexOf("clickmonitor_econda")>=0;if(b4){bY(p,"true")}if((b4||bS(p)=="true")&&!be.emosClickmonitor){be.emosClickmonitor={pageId:ca.pageId,cookieName:p,cookieDomain:aq,urlClickmonitor:bq,ckey:bC};var cd=t.documentElement;var b1=cd.namespaceURI;var b6=cd.prefix;var b3=b6?b6+":head":"head";var b9=cd.childNodes;var cc=null;for(var b5=0;b5<b9.length;b5++){var cb=b9[b5];if(cb.nodeType==1&&cb.nodeName.toLowerCase()==b3){cc=cb;break}}if(!cc){cc=b1?t.createElementNS(b1,b3):t.createElement(b3);cd.insertBefore(cc,cd.firstChild)}var b0=b6?b6+":script":"script";var b2=b1?t.createElementNS(b1,b0):t.createElement(b0);b2.setAttribute("type","text/javascript");b2.setAttribute("src",bq+"/scripts/click.js");cc.appendChild(b2);L=false;az=false;return}if(b7.cookie){ah(d,ca,b7.cookie.source,b7.cookie)}J=new Date().getTime();af=aD();av=J;bP=0;bw(ca,b7);if(!L){return}ao(ca);ca.emosV=s();X(ca,b7,af)}function X(b4,e,b5){if(be.console&&be.console.log&&location.search.indexOf("emosdebug=yxcvbnm")>=0){be.console.log(b4)}var b3=aN(b4,e,b5);for(var b2=0;b2<b3.length;b2++){aL=aL+1;bL(b3[b2],e,aL)}if(e.delay){var b0=parseInt(e.delay);if(isFinite(b0)&&b0>0&&b0<1000){var b1=new Date().getTime()+b0;while(new Date().getTime()<b1){}}}}function K(b0){if(typeof b0.getBoundingClientRect=="function"){var i;var b2;if(typeof be.pageXOffset=="number"){i=be.pageXOffset;b2=be.pageYOffset}else{var e=t.compatMode!="BackCompat"?t.documentElement:t.body;i=e.scrollLeft;b2=e.scrollTop}var b1=b0.getBoundingClientRect();if(b1===null){return null}if(b1.top===0&&b1.right===0&&b1.bottom===0&&b1.left===0){return null}return[i+parseInt(b1.left),b2+parseInt(b1.top)]}return bN(b0)}function bN(e){if(e.offsetParent!==null){var b0=bN(e.offsetParent);if(!b0){return null}b0[0]+=e.offsetLeft;b0[1]+=e.offsetTop;return b0}else{var i=e.nodeName.toLowerCase();if(i=="html"||i=="body"){return[0,0]}else{return null}}}function n(){var i=bC.indexOf("-");var e;var b0;if(i===8){e=bC.substring(0,8);b0=bC.substring(9)}else{e="00000000";b0=bC}return((location.protocol=="http:")?"http://":"https://")+y+"/l/"+e+"/t/"+b0+"?"}var bW="emosTransmit";var bX="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function bL(b4,b2,b1){var i=a2(b4);var b6=bW+b1;if(z){try{var b7=be.sessionStorage;b7.setItem(b6,i)}catch(b3){}}else{bY(b6,i)}if(!b2.noimg){var b0=new Image();var b5=be.setTimeout(function(){b0.src=bX},bH);bh[b1]=b0;b0.onload=function(){bz(b6,b1,b5)};b0.src=n()+i}}function bz(b2,b1,i){try{if(z){be.sessionStorage.removeItem(b2)}else{g(b2)}}catch(b0){}bh[b1]=null;be.clearTimeout(i)}function a2(i){var b0="";for(var b1 in i){var e=typeof i[b1];if(e==="string"||e==="boolean"||e==="number"){if(b0!==""){b0+="&"}b0+=b1+"="+bg(i[b1])}}return b0}function at(b1){var b2=b1.split("&");var i={};for(var e=0;e<b2.length;e++){var b0=b2[e].split("=");i[b0[0]]=bV(b0[1])}return i}function S(e){return Object.prototype.toString.apply(e)==="[object Array]"}function aB(e){return e!==null&&typeof e==="object"&&S(e)}function aW(e){for(var b0 in e){var i=e[b0];if(aB(i)&&i.length>1){v(i,b0,e)}}}function v(b2,b3,b5){var b4={};var b6=false;for(var b1=0;b1<b2.length;b1++){var b7=b2[b1];if(typeof b7==="object"&&Object.prototype.toString.apply(b7)!="[object Array]"){bM(b7,b4);b6=true}else{if(b7===null){}else{return}}}if(!b6){return}for(var b1=0;b1<b2.length;b1++){var b7=b2[b1];if(b7!==null){bD(b7,b4)}}var e=q(b2).length;var b0=q(b4).length;if(b0<e){b5[b3]=b4}}function bM(e,i){for(var b0 in e){if(!i[b0]){i[b0]=[]}}}function bD(i,b0){for(var b2 in b0){var b1=i[b2];var e=b0[b2];if(b1===undefined){e.push(null)}else{e.push(b1)}}}function q(b4){switch(typeof b4){case"string":return ai(b4);case"number":return isFinite(b4)?String(b4):"null";case"boolean":case"null":return String(b4);case"object":if(!b4){return"null"}var b1=[];if(S(b4)){var b3=b4.length;for(var b2=0;b2<b3;b2++){b1[b2]=q(b4[b2])||"null"}return b1.length===0?"[]":"["+b1.join(",")+"]"}for(var b0 in b4){if(Object.prototype.hasOwnProperty.call(b4,b0)){var e=q(b4[b0]);if(e){b1.push(ai(b0)+":"+e)}}}return b1.length===0?"{}":"{"+b1.join(",")+"}"}return undefined}var ba=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,W={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function ai(e){if(ba.test(e)){return'"'+e.replace(ba,function(i){var b0=W[i];return typeof b0==="string"?b0:"\\u"+("0000"+i.charCodeAt(0).toString(16)).slice(-4)})+'"'}else{return'"'+e+'"'}}function bn(){var b3=bW.length;var ca=[];if(z){try{var b9=be.sessionStorage;for(var b4=0;b4<b9.length;b4++){var b7=b9.key(b4);if(b7.substr(0,b3)==bW){var b0=Number(b7.substr(b3));var b1=b9.getItem(b7);if(b1){if(b0>=aL){aL=b0+1}ca.push([b0,b1])}}}for(var b4=0;b4<ca.length;b4++){b9.removeItem(bW+ca[b4][0])}}catch(b5){}}else{var b8=t.cookie.split(";");for(var b4=0;b4<b8.length;b4++){var b2=b8[b4];if(b2.charAt(0)==" "){b2=b2.substr(1)}if(b2.substr(0,b3)==bW){var b6=b2.indexOf("=");if(b6<0){continue}var b0=Number(b2.substring(b3,b6));var b1=b2.substring(b6+1);g(bW+b0);if(b1){if(b0>=aL){aL=b0+1}ca.push([b0,b1])}}}}a9(ca)}function a9(b1){if(b1.length>0){var b0=b1.pop();var e=b0[0];var i=new Image();var b2=be.setTimeout(function(){i.onload=function(){};i.src=bX},bH);bh[e]=i;i.onload=function(){aU(e,b1,b2)};i.src=n()+b0[1]}}function aU(b0,e,i){bh[b0]=null;be.clearTimeout(i);a9(e)}function bw(b8,b6){if(!bK){return}var cc=0;if(b8.billing&&b8.billing.length>0&&b8.billing[0].length>3){var b4=Number(b8.billing[0][3]);if(!isNaN(b4)){cc=Math.round(b4*100)}}var cb=true;var b5=bS(Y);if(b5&&b5.length>0){var b9=b5.split(":");if(b9.length==4){E=b9[0];a3=parseInt(b9[1])+1;if(!isNaN(a3)){cb=false;bY(Y,E+":"+a3+":"+af+":"+J)}}}if(cb){var b0=aD();var i=b0+":1:"+af+":"+J;bY(Y,i);var b2=bS(Y);if(i==b2){E=b0;a3=1;cb=true}else{E="NULL";a3=-1;cb=false}}var cd=bS(bj);if(cd&&cd.length>0){var b9=cd.split(":");if(b9.length==5||b9.length==7){a4=b9[0];aP=parseInt(b9[1])+((cb)?1:0);var e=b9[2];var b3=parseInt(b9[3]);if(cb){aG=e;aa=J-b3;b3=J}else{aG=null;aa=null}bQ=cc;var b7=parseInt(b9[4]);if(b9.length==7){az=("true"==b9[5]);var b1=parseInt(b9[6]);if(b1!=w){az=Math.random()*w<=1}}else{az=Math.random()*w<=1}if(!bA){L=az}if(!isNaN(b7)){bQ+=b7}if(!isNaN(aP)&&a4&&a4!="undefined"){bY(bj,a4+":"+aP+":"+E+":"+b3+":"+bQ+":"+az+":"+w,G*86400);return}}}var ca;if(aZ){ca=aZ;b8.t=1}else{ca=E;if(bd&&!aK){b8.t=2}}bQ=cc;az=Math.random()*w<=1;if(!bA){L=az}var i=ca+":1:"+E+":"+J+":"+bQ+":"+az+":"+w;bY(bj,i,G*86400);var b2=bS(bj);if(i==b2){a4=ca;aP=1}else{a4="NULL";aP=-1}}function bS(b3){if(!b3){return null}var b0=t.cookie.split(";");for(var b2=0;b2<b0.length;b2++){var b1=b0[b2];if(b1.charAt(0)==" "){b1=b1.substr(1)}var e=b3+"=";if(b1.substr(0,e.length)==e){return b1.substring(e.length)}}return null}function bY(i,b1,e){var b0=i+"="+b1+";path=/;";if(aq){b0=b0+"domain="+aq+";"}if(e){b0=b0+"max-age="+e+";expires="+new Date(new Date().getTime()+e*1000).toGMTString()+";"}t.cookie=b0}function g(e){var i=e+"=;path=/;max-age=0;";if(aq){i=i+"domain="+aq+";"}t.cookie=i}function aD(){var b3=new Date().getTime();var b6=b3&4294967295;var b4=(b3/4294967296)&4294967295;var e=[];e.push(b4>>>8&255);e.push(b4&255);e.push(b6>>>24);e.push(b6>>>16&255);e.push(b6>>>8&255);e.push(b6&255);for(var b1=0;b1<9;b1++){var b2=65536*Math.random();e.push(b2>>>8&255);e.push(b2&255)}var b0=navigator.userAgent;if(b0){for(var b1=0;b1<b0.length;b1++){var b5=6+(b1%18);e[b5]=(e[b5]^b0.charCodeAt(b1))&255}}return c(e)}function bv(b2){var b1=0;var e=b2.length;for(var b0=0;b0<e;b0++){b1+=b2[b0]}b2.push((b1&65280)>>8);b2.push(b1&255);return b2}function ae(e){var i=[];for(var b1=0;b1<e.length;b1++){var b0=e.charCodeAt(b1);if(b0<128){if(b0>=32||b0==9){i.push(b0)}}else{if((b0>127)&&(b0<2048)){i.push((b0>>6)|192);i.push((b0&63)|128)}else{i.push((b0>>12)|224);i.push(((b0>>6)&63)|128);i.push((b0&63)|128)}}}return i}var ab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*_";function c(b4){var b1=ab,b2=[],b0=0,e=b4.length;if((e%3)==1){b4.push(0);b4.push(0)}else{if((e%3)==2){b4.push(0)}}var b3=b4.length;while(b0<b3){b2.push(b1.charAt(b4[b0]>>2));b2.push(b1.charAt(((b4[b0]&3)<<4)|(b4[b0+1]>>4)));b2.push(b1.charAt(((b4[b0+1]&15)<<2)|(b4[b0+2]>>6)));b2.push(b1.charAt(b4[b0+2]&63));b0+=3}if((e%3)==1){b2[b2.length-1]=b2[b2.length-2]=""}if((e%3)==2){b2[b2.length-1]=""}return b2.join("")}function ad(b6,b5,b3){var b8=N(b5);var b1=ak(b8,3);var i=ax(b8,false);b6.ref=b1;for(var b4 in Z){if(b3[b4]){b6[Z[b4]]=b3[b4]}}if(b5.cookie){return}var b9=b5.customCampaign;var b7=b5.customSource;if(!b9){b9=be.emos_campaignName;if(b9){aj("dcn")}}if(!b7){b7=be.emos_sourceId;if(b7){aj("ds")}}if(b3.refID){b9=b3.refID;if(b3.emsrc){b7=b3.emsrc}}if(b9){if(b7){if(b7=="kw"){b3.adword=b9}else{if(b7=="nl"){b3.newsletter=b9}else{b3.campaign=b9}}}else{b7="cp";b3.campaign=b9}}if(b3.campaign){var e=b7?b7:"cp";if(b7&&!bU[b7]){bU[b7]=bU.cp}var b0=aJ(b6,b5,b3,e);b6.campClick=b3.campaign;b0.campaign=b3.campaign;if(b3.efp){b0.efp=b3.efp}if(b3.efc){b0.efc=b3.efc}if(b3.efpn){b0.efpn=b3.efpn}if(b3.mktsp){b0.mktsp=b3.mktsp}b0.ref=b1;aI(i,b0);return}if(b3.newsletter||b3.ecmId){var b0=aJ(b6,b5,b3,"nl");if(b3.newsletter){b6.newsClick=b3.newsletter;b0.news=b3.newsletter}if(b3.ecmId){b0.newsmid=b3.ecmId}return}if(b3.adword||b3.amktid||(bk&&b3.gclid)){var b0=aJ(b6,b5,b3,"kw");var b2=b3.adword;if(b3.gclid){if(!b2){b2="google auto tagging"}b0.gclid=b3.gclid}if(b2){b6.adwordClick=b2;b0.adword=b2}if(b3.amktid){b6.amktidClick=b3.amktid;b0.amktid=b3.amktid}b0.ref=b1;aI(i,b0);a0(b0,null,true,b1,b3,i);return}if(b8===null||b8.length===0){if(f(b6)){return}aJ(b6,b5,b3,"direct");return}if(bu(b1)){if(f(b6)){return}b6.ref=ak(b8,-1);b6.source="intern";return}if(a0(b6,b5,false,b1,b3,i)){return}aJ(b6,b5,b3,"ref").ref=b1}function aI(b0,i){var e=b0.url?bV(b0.url).substring(0,127):null;if(e){i.refUrl=e}}function aJ(b0,e,b2,b1){if(bU[b1]){if(!e.cookie){e.cookie={}}var i=e.cookie;e.emcl=bU[b1];ah(o,b2,b1,i);i.source=b1;return i}else{b0.source=b1;return b0}}function ah(e,b0,b1,i){if(e.all){aM(e.all,b0,i)}if(e[b1]){aM(e[b1],b0,i)}}function aM(b3,b2,b1){for(var b0=0;b0<b3.length;b0++){var e=b2[b3[b0]];if(e){b1[b3[b0]]=e}}}function f(i){var e=bS(u);if(e&&e.length>0){i.source="cp";i.campaign=bV(e);return true}return false}function aX(b0,i,b2){ad(b0,i,b2);if(i.cookie&&!(h&&aw)){Q(b0,i.cookie);b0.postconv="0"}if(bK&&aw){if(i.cookie){var b3=null;if(i.emcl){b3=parseInt(i.emcl)}if(!b3){b3=V}b3=b3*86400;bY(aF,a2(i.cookie)+"&ccbt="+Math.floor(new Date().getTime()/1000),b3)}else{var b1=bS(aF);if(b1&&b1.length>0){var e=at(b1);b0.postconv="1";e.ccbtd=Math.floor(new Date().getTime()/1000)-parseInt(e.ccbt);delete e.ccbt;Q(b0,e)}}}}function M(){var b5=bS(D);if(b5&&b5.length>0){var b3=new Date().getTime();b5=bV(b5);var b0=[];var e=b5.split("@");for(var b1=0;b1<e.length;b1++){if(e[b1]){var b2=at(e[b1]);var b4=parseInt(b2.t);if(isFinite(b4)){b2.td=b3-b4;delete b2.t}b0.push(a2(b2))}}return b0.join("@")}return null}function bu(e){return(e.split("/")[2]==location.host)}var an=[["q",null,"ie","start",1],["p",null,null,"b",1],["su",null,null,"pageIndex",10],["query",null,null],["qry_str",null,null],["begriff",null,null],["words",null,null],["encquery",null,null],["qt",null,null],["terms",null,null],["text",/yandex\./g,null],["wd",/\.baidu\./g,null],["w",/\.soso\./g,null],[null,/www\.google\./g,null],[null,/search\.yahoo\.com/g,null]];function a0(b7,b5,b4,b1,cb,e){if(aY){for(var b3=0;b3<aY.length;b3++){if(b1.indexOf(aY[b3])>=0){return false}}}for(var b3=0;b3<an.length;b3++){var b2=an[b3];var b8=(b2[0])?e[b2[0]]:"not provided";if(b8){var b0=b2[1];if(b0===null||b1.search(b0)>=0){var b6=b4?b7:aJ(b7,b5,cb,"suma");var ca=b2[2];if(ca&&e[ca]){b6.smqpe=e[ca];b6.smqp=b8}else{b6.smqp=bV(b8)}if(b2.length==5&&e[b2[3]]){var b9=parseInt(e[b2[3]]);if(!isNaN(b9)){b6.smstart=b9*b2[4]}}if(!b4){b6.ref=b1}return true}}}return false}function U(ca,b2,b7){var b1=aH(b2,b7);if(b1&&!b1[3]){var b0=ca.ec_Event;if(aB(b0)&&b0.length>0){var cd=b0[0];if(cd!==null&&typeof cd==="object"){b1[3]=(S(cd))?cd[bf]:cd.pid}}}var b6=ay();if(b1){ca.crossData=[b1];var cc=[];for(var b5=0;b5<b1.length;b5++){if(b5==1){cc[b5]="previous_visit"}else{if(typeof b1[b5]!="undefined"){cc[b5]=bg(b1[b5])}else{cc[b5]="null"}}}var b9=cc.join(",");if(b6){var b4=[b9].concat(b6);if(b4.length>5){b4.length=5}b9=b4.join(":")}bY(x,b9,V*86400)}else{if(b6){var b8=[];for(var b5=0;b5<b6.length;b5++){var e=b6[b5].split(",");var cb=[];for(var b3=0;b3<e.length;b3++){cb.push(bV(e[b3]))}b8.push(cb)}ca.crossData=b8}}}function aH(b0,e){var i=e.crossData;if(aB(i)&&typeof i[0]=="string"){return i}if(e.emcs0){return[e.emcs0,e.emcs1,e.emcs2,e.emcs3]}if(be.emcs0){return[be.emcs0,be.emcs1,be.emcs2,be.emcs3]}if(b0.emcs0){return[b0.emcs0,b0.emcs1,b0.emcs2,b0.emcs3]}return null}function ay(){var e=bS(x);if(e&&e.length>0){return e.split(":")}else{return null}}function aj(e){aR[e]=e}function s(){var e=EMOS_VERSION;for(var i in aR){var b0=aR[i];if(typeof i=="string"&&b0===i){e+=("|"+i)}}return e}function j(b4){var b3=t.getElementsByName("emos_name");var b5=false;for(var b2=0;b2<b3.length;b2++){var e=b3[b2].title;var b1=b3[b2].rel;var b0=b3[b2].rev;if(e.length>0){if(b1.length>0){b5=true;if(b0.length>0){b4[e]=[[bV(b1),bV(b0)]]}else{b4[e]=bV(b1)}}}}if(b5){aj("tag")}}function a8(b3,b1){try{if(b3){if(b3.length&&b3.length>0){b1.ec_Event=[];for(var b0=0;b0<b3.length;b0++){b1.ec_Event[b1.ec_Event.length]=a1(b3[b0])}}else{b1.ec_Event=[a1(b3)]}aj("ecp")}}catch(b2){}}function a1(b0){var e=a(b0,"event");var i=a(b0,"id");var b4=a(b0,"name");var b7=a(b0,"preis");var b6=a(b0,"group");var b5=a(b0,"anzahl");var b3=a(b0,"var1");var b2=a(b0,"var2");var b1=a(b0,"var3");return[e,i,b4,b7,b6,b5,b3,b2,b1]}function a(i,e){return i[e]?bV(i[e]):"NULL"}function bB(i){try{if(be.emosCustomPageArray){i[bV(be.emosCustomPageArray[0])]=[bl(be.emosCustomPageArray.slice(1))];aj("cpa")}}catch(b0){}}function aE(b2){try{if(be.emosCustomMultiArray&&be.emosMultiArrayID){var b0=[];for(var b1=0;b1<be.emosCustomMultiArray.length;b1++){b0[b1]=bl(be.emosCustomMultiArray[b1])}b2[bV(be.emosMultiArrayID)]=b0;aj("cma")}}catch(b3){}}function bo(b1,i){try{if(b1){i.billing=[bl(b1)];aj("bill")}}catch(b0){}}function al(b0,b2){try{if(b0){b2.ec_Event=[];for(var i=0;i<b0.length;i++){var b1=["buy"];for(var b4=0;b4<b0[i].length;b4++){b1[b4+1]=bV(b0[i][b4])}b2.ec_Event[b2.ec_Event.length]=b1}aj("bpa")}}catch(b3){}}function aQ(b2,b0,b4){try{if(b0&&b2){var b1=[];for(var b3=0;b3<b0.length;b3++){b1[b3]=bl(b0[b3])}b4[bV(b2)]=b1;aj("free")}}catch(b5){}}function ar(){if(aq===null){var e=be.location.hostname.split(".");var b2=e[e.length-1];var b3=e[e.length-2];var b1=(b2=="uk"||b2=="tr"||b2=="br"||(b2=="at"&&b3=="co")||(b2=="jp"&&(b3=="co"||b3=="ac"||b3=="go"||b3=="ne"||b3=="or")))?3:2;if(isNaN(parseInt(b2))&&e.length>=b1){aq="";for(var b0=e.length-b1;b0<e.length;b0++){aq+=("."+e[b0])}}else{aq=be.location.hostname}}}function Q(b0,i){for(var e in i){b0[e]=i[e]}}function bi(i,e){if(!af){return}i.emosV=s();i.plReqId=af;X(i,e,aD())}function bs(){var e={};Q(e,DFLTS);if(be.emosGlobalProperties){aj("gp");Q(e,be.emosGlobalProperties)}if(m.defaults){Q(e,m.defaults)}return e}be.emos_ecEvent=function(b5,i,e,b7,b6,b3,b2,b1,b0){aj("ecE");var b4={};b4.ec_Event=[[b5,i,e,b7,b6,b3,b2,b1,b0]];return T(b4)};function bt(b6){if(be.emosDoNotTrack){return true}if(!bC){return true}if(bc){return true}var b0=b6.config;if(b0){delete b6.config}else{b0={}}aT(b6);if(aB(m.plugins)){var b1=m.plugins;for(var b3=0;b3<b1.length;b3++){try{b1[b3](b6,b0)}catch(b5){}}}if((b6.type&&b6.type=="event")||(b0.type&&b0.type=="event")){if(b6.type){delete b6.type}bi(b6,b0);return true}var b2=bs();Q(b2,b6);C(b2,b0);Q(b2,b6);aA(b2,b0);if(aB(b0.cb)){var b4=b0.cb;for(var b3=0;b3<b4.length;b3++){try{b4[b3]()}catch(b5){}}}return true}var T;if(!aB(m.stored)){m.stored=[]}var bE=t.getElementsByTagName("script");var bZ=bE[bE.length-1];var aK=("async" in bZ);if(!aZ&&bd&&aK&&!bS(bj)){T=function(e){m.stored.push(e)};var aV=t.createElement("script");aV.type="text/javascript";aV.async=true;m.initWithVid=function(b0){aZ=b0;T=bt;for(var e=0;e<m.stored.length;e++){T(m.stored[e])}};aV.src="https://"+y+"/jsid/"+bR;bZ.parentNode.insertBefore(aV,bZ)}else{T=bt;for(var bm=0;bm<m.stored.length;bm++){T(m.stored[bm])}}be.emosPropertiesEvent=function(e){aj("pE");return T(e)};m.send=function(e){return T(e)};be.emos_userEvent1=function(e,b0){aj("uE1");var i={};i[e]=b0;return T(i)};be.emos_userEvent2=function(e,b0,i){aj("uE2");var b1={};b1[e]=[[b0,i]];return T(b1)};be.emosTargetEvent=function(b1,b3,b2,b0){aj("tE");var e={};var i=0;if(typeof b2=="boolean"){if(b2){e.cGoal="1";i=1}}else{if(typeof b2=="number"){if(b2!==0){e.cGoal="1";i=b2}}else{if(typeof b2=="string"){if(b2!="0"){e.cGoal="1";i=b2}}}}if(typeof b0!="string"){b0="d"}e.Target=[[b1,b3,i,b0]];e.content="Target_"+b1+"_"+b3;return T(e)};be.emosLeadEvent=function(b1,b4,b2,b0,i,b3){aj("lE");var e={};e.LeadEvent=[[b1,b4,b2,b0,i]];if(b3){e.cGoal="1"}return T(e)};be.emosCustomEvent=function(b2,b1,e,i,b3){aj("cE");var b0={};b0[b2]=[[b1,e,i,b3]];return T(b0)};be.emosUserEvent=function(i,b1,b0){aj("uE");var e={};e.uEvent=[[i,b1,b0]];return T(e)};function bl(b0){var i=[];for(var e=0;e<b0.length;e++){i[e]=bV(b0[e])}return i}be.emosBuyEvent=function(b0,e){aj("bE");var i={};bo(b0,i);al(e,i);return T(i)};be.emosFreeEvent=function(i,e){aj("fE");var b0={};aQ(i,e,b0);return T(b0)};be.emos_submitFormData=function(b1){aj("sfd");var b0=t.forms[b1];if(!b0){return true}var i={};var e=[];for(var b2=0;b2<(b0.elements.length);b2++){if(b0.elements[b2].value!==""){e[b2]=[b0.elements[b2].name,b0.elements[b2].value]}}i.fName=b1;i.fData=[e];return T(i)};function ax(b6,b1){var b5={};if(!b6){return b5}var b4=b6.indexOf("?");if(b4>=0){b6=b6.substr(b4+1)}var b2=b6.split("&");for(var b0=0;b0<b2.length;b0++){var b3=b2[b0].split("=");var e=b3[0];if(e){if(b3[1]){if(b1){b5[e]=bV(b3[1])}else{b5[e]=b3[1]}}else{b5[e]=""}}}return b5}function bT(){ar();au();bn();if(TRACK_VERSION===1){aC()}if(TRACK_VERSION===1&&be.addEventListener){be.addEventListener("pageshow",function(e){if(e.persisted){aC()}},false)}if(bF){br(t,"mousedown",r)}if(a6){be.setInterval(A,1000);br(be,"unload",function(){b(true)});if(a6>0){be.setInterval(function(){b(false)},a6*1000)}}}bT()})(window,document);