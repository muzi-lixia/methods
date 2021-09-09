
var WC = (function (global, factory){
    return factory.call(global);//_TOOL_
})(this, function(){
    var _TOOL_ = {};
    _TOOL_.registerComponet = function(tagName, document, callback){
        
        //第一步，获取对象
        var indexDoc = document;//document代表的是index的文档对象

        var currentDoc = indexDoc.currentScript.ownerDocument;

        var teml = currentDoc.querySelector("#"+tagName);

        //第二步，注册元素
        //创建一个新的元素原型，继承于HTMLELEMENT
        var usProto = Object.create(HTMLElement.prototype);

        //第三步，显示组件
        usProto.createdCallback = function(){
            //影子dom
            //创建影子DOM
            var　root = this.createShadowRoot();
            root.appendChild(indexDoc.importNode(teml.content, true));
            callback.call(this, root);
        }

        var us = indexDoc.registerComponet(tagName, {
            prototype : usProto
        });
    }
    return _TOOL_;
});
