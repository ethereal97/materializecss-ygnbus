/**
 * Ethereal Framework - by Ethereal
 * 
 * @version 0.1.0-alpha
 */

"use strict";

;(function (W) {
  //* get directory of the current script
  let src = document.currentScript.src.split('/');
  src.pop();
  src = src.join('/');
  
  function ethereal(obj) {
    //* default properties
    this.components = {
      resolved: [],
      rejected: []
    };
    
    //* extracting properties from obj
    var keys = Object.keys(obj);
    for (let i in keys) {
      var n = keys[i];
      this[n] = obj[n];
    }
    this.basePath = src;
  }
  
  ethereal.prototype.import = function importComponent(name) {
    var _path = this.path(`_components/${name}.js`);
    var _script = document.createElement('script');
    var _self = this;
    
    _script.addEventListener('error', (e) => _self.addError(e));
   
    _script.addEventListener('load', (e) => _self.resolveComponent(e));

    _script.src = _path;
    
    document.body.append(_script);
  }
  
  ethereal.prototype.path = function basePath(path) {
    if (! path) {
      return this.basePath;
    }
    return [this.basePath, path].join('/');
  };
  
  ethereal.prototype.dePath = function getPathName(path) {
    return path.replace(this.basePath, '').slice(1);
  };
  
  ethereal.prototype.addError = function addError(e) {
    var el = e.target;
    
    if (el instanceof HTMLScriptElement) {
      var src = this.dePath(el.src);
      var name = src.split('/').map((x) => x.split('.')[0]).join('.');
    
      this.components.rejected.push({
        name,
        el,
        src,
        type: e.type
      });
    } else {
      alert('Failed to add an error');
    }
  };  
  
  ethereal.prototype.resolveComponent = function resolveComponent(e) {
    var el = e.target;
    var src = this.dePath(el.src);
    var name = src.split('/').map((x) => x.split('.')[0]).join('.');
    
    this.components.resolved.push(name);
  };
  
  //* assign new Ethereal to global variable
  W.ethereal = new ethereal({});
})(window);