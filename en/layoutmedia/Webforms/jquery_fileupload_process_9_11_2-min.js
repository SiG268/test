(function(a){if(typeof define==="function"&&define.amd){define(["jquery","./jquery.fileupload"],a)}else{if(typeof exports==="object"){a(require("jquery"))}else{a(window.jQuery)}}}(function(a){var b=a.blueimp.fileupload.prototype.options.add;a.widget("blueimp.fileupload",a.blueimp.fileupload,{options:{processQueue:[],add:function(f,c){var d=a(this);c.process(function(){return d.fileupload("process",c)});b.call(this,f,c)}},processActions:{},_processFile:function(g,f){var e=this,c=a.Deferred().resolveWith(e,[g]),d=c.promise();this._trigger("process",null,g);a.each(g.processQueue,function(h,j){var k=function(i){if(f.errorThrown){return a.Deferred().rejectWith(e,[f]).promise()}return e.processActions[j.action].call(e,i,j)};d=d.pipe(k,j.always&&k)});d.done(function(){e._trigger("processdone",null,g);e._trigger("processalways",null,g)}).fail(function(){e._trigger("processfail",null,g);e._trigger("processalways",null,g)});return d},_transformProcessQueue:function(c){var d=[];a.each(c.processQueue,function(){var e={},g=this.action,f=this.prefix===true?g:this.prefix;a.each(this,function(h,i){if(a.type(i)==="string"&&i.charAt(0)==="@"){e[h]=c[i.slice(1)||(f?f+h.charAt(0).toUpperCase()+h.slice(1):h)]}else{e[h]=i}});d.push(e)});c.processQueue=d},processing:function(){return this._processing},process:function(e){var d=this,c=a.extend({},this.options,e);if(c.processQueue&&c.processQueue.length){this._transformProcessQueue(c);if(this._processing===0){this._trigger("processstart")}a.each(e.files,function(f){var h=f?a.extend({},c):c,g=function(){if(e.errorThrown){return a.Deferred().rejectWith(d,[e]).promise()}return d._processFile(h,e)};h.index=f;d._processing+=1;d._processingQueue=d._processingQueue.pipe(g,g).always(function(){d._processing-=1;if(d._processing===0){d._trigger("processstop")}})})}return this._processingQueue},_create:function(){this._super();this._processing=0;this._processingQueue=a.Deferred().resolveWith(this).promise()}})}));