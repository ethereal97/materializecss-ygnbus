/**
 * Ethereal Framework - by Ethereal
 * 
 * @version 0.1.0-alpha
 */

"use strict";

const ethereal = (function (W) {
  //* get directory of the current script
  let src = document.currentScript.src.split('/');
  src.pop();
  src = src.join('/');
  
  function ethereal(obj) {
    //* default properties
    this.AWAIT_COMPONENTS = 0;
    
    this.components = {
      resolved: [],
      rejected: [],
    };
    
    this.events = {};
    
    //* extracting properties from obj
    var keys = Object.keys(obj);
    
    for (let i in keys) {
      var n = keys[i];
      this[n] = obj[n];
    }
    
    this.basePath = src;
  }
  
  ethereal.prototype.import = function importComponent(name) {
    this.AWAIT_COMPONENTS && clearTimeout(this.AWAIT_COMPONENTS);
    
    var _path = this.path(`components/${name}.js`);
    var _script = document.createElement('script');
    var _self = this;
    
    _script.addEventListener('error', (e) => _self.addError(e));
   
    _script.addEventListener('load', (e) => _self.resolveComponent(e));

    _script.src = _path;
    
    document.body.append(_script);
    
    this.AWAIT_COMPONENTS = setTimeout(() => _self.init(), 730);
  }
  
  ethereal.prototype.export = function exportComponent(component) {
    let obj = component.call(this);
    
    if (typeof obj === "object") {
      var index = Object.keys(obj)[0];
      this.components[index] = this[index] = obj[index];
    }
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
    
    if (name.match(/.+\..+/)) {
      var name = name.split('.')[1];
    }      
    
    this.dispatch(name);
    this.components.resolved.push(name);
  };
  
  ethereal.prototype.on = function addEventListener(name, callback) {
    if (typeof callback !== "function") {
      throw TypeError;
    }
    
    if (! name in this.events || typeof this.events[name] !== "object") {
      this.events[name] = [];
    }
    
    this.events[name].push(callback);
  };
  
  ethereal.prototype.dispatch = function dispatchEvent(name) {
    if (! name in this.events || typeof this.events[name] !== "object") {
      return false;
    }
   
    this.events[name].forEach(callback => callback(event | W.event));
    this.events[name] = [];
   
    return true;
  };
  
  ethereal.prototype.init = function init() {
    for (let i in this.components.resolved) {
      var component = this.components.resolved[i];
      
      this.dispatch([component, 'load'].join('.'));
    }
    this.dispatch('load');
  };
  
  //* assign new Ethereal to global variable
  return new ethereal({});
})(window);
