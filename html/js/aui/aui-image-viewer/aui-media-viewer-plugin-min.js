AUI.add("aui-media-viewer-plugin",function(j){var e=j.Lang,m=j.Do,h=j.UA.ie,o="about:blank",p="body",c="href",i="iframe",n="image",l="loading",q="providers",r="src",f="mediaViewerPlugin",a="data-options",d={height:360,width:640,wmode:"embed"},g="https?://(?:www\\.)?{domain}",b="(?:[\\?&]|^){param}=([^&#]*)";var k=j.Component.create({NAME:f,NS:"media",ATTRS:{providers:{validator:e.isObject,value:{"flash":{container:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{media}" /><embed src="{media}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',matcher:/\b.swf\b/i,options:d,mediaRegex:/([^?&#]+)/},"youtube":{container:'<iframe width="{width}" height="{height}" src="http://www.youtube.com/embed/{media}" frameborder="0" allowfullscreen></iframe>',matcher:new RegExp(e.sub(g,{domain:"youtube.com"}),"i"),options:d,mediaRegex:/[\?&]v=([^&#]*)/i},"vimeo":{container:'<iframe src="http://player.vimeo.com/video/{media}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="{width}" height="{height}" frameborder="0"></iframe>',matcher:new RegExp(e.sub(g,{domain:"vimeo.com"}),"i"),options:d,mediaRegex:/\/(\d+)/}}}},EXTENDS:j.Plugin.Base,prototype:{initializer:function(t){var s=this;var u=s._handles;u.changeReqeust=s.afterHostMethod("_changeRequest",s._restoreMedia);u.close=s.beforeHostMethod("close",s.close);u.loadMedia=s.beforeHostMethod("loadImage",s.loadMedia);u.preloadImage=s.beforeHostMethod("preloadImage",s.preloadImage);},close:function(){var s=this;var u=s.get("host");var v=u.getCurrentLink();var t=s._getMediaType(v.attr("href"));if(t!=n){s._redirectIframe(o);u.setStdModContent(p,"");}},loadMedia:function(v){var y=this;var z=y.get("host");var A=y._getMediaType(v);var C=true;y._redirectIframe(o);if(A!=n){var w=y.get(q)[A];var s=z.getCurrentLink();var B=y._updateOptions(s,j.clone(w.options));var u=w.mediaRegex.exec(v);if(u){B.media=u[1];}var t=e.sub(w.container,B);z.setStdModContent(p,t);z._syncImageViewerUI();y._uiSetContainerSize(B.width,B.height);z._setAlignCenter(true);z.set(l,false);z.fire("load",{media:u});if(z.get("preloadNeighborImages")){var x=z.get("currentIndex");z.preloadImage(x+1);z.preloadImage(x-1);}C=new m.Prevent();}return C;},preloadImage:function(v){var t=this;var x=t.get("host");var w=x.getLink(v);var s=new m.Prevent();if(w){var y=w.attr(c);var u=t._getMediaType(y);if(u==n){s=true;}}return s;},_getMediaType:function(v){var s=this;var u=s.get(q);var t=n;j.some(u,function(x,w,y){return x.matcher.test(v)&&(t=w);});return t;},_redirectIframe:function(v){var s=this;var u=s.get("host.bodyNode");if(u){var t=u.one(i);if(t){t.attr(r,v);}}},_restoreMedia:function(w){var s=this;var v=s.get("host");var x=v.getCurrentLink();var u=x.attr("href");var t=s._getMediaType(u);if(t!=n&&!v.getStdModNode(p).html()){v._processChangeRequest();}},_uiSetContainerSize:function(v,t){var s=this;var w=s.get("host");var u=w.bodyNode;u.setStyles({height:t,width:v});},_updateOptions:function(t,s){var v=t.attr(a);var u=t.attr(c);j.each(s,function(z,y,A){var x=new RegExp(e.sub(b,{param:y}));var w=x.exec(v)||x.exec(u);if(w){s[y]=w[1];}});return s;},_handles:{}},DATA_OPTIONS:a,DEFAULT_OPTIONS:d,REGEX_DOMAIN:g,REGEX_PARAM:b});j.MediaViewerPlugin=k;j.MediaViewer=j.ImageViewer;},"1.5.0",{requires:["aui-image-viewer-base"],skinnable:false});