ethereal.export(function () {
  let complier = {
    complie(el, obj) {
      if (! el instanceof HTMLElement) {
        throw TypeError
      }
      let cs = el.childNodes;
      
      if (! cs.length) {
        return;
      }
      
      let reparse = (html, data) => {
        var m = html.match(/\{(.+)\}/g);
        if (! m) {
          return html;
        }
        n = m.toString().replace(/(\{|\})/g, '');
        if (! n in data) {
          return html;
        }
        return html.replace(m, data[n]);
      };
      
      for (let i in cs) {
        var c = cs[i];
        var t = c.innerHTML;
        
        if (t) {
          c.innerHTML = reparse(t, obj);
        }
      }
    }
  };
  
  return {
    complier
  }
});