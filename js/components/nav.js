(function () { 
  let lists = document.querySelectorAll('[data-list=nav]');
  
  if (! lists) {
    return console.warn('could not find any element with "data-list=nav" attribute.');
  }
  
  let addList = ({name, href}, actived) => { 
    let anchor = document.createElement('a');
    let li = document.createElement('li');
    anchor.textContent = name;
    anchor.href = href; 
    actived && li.classList.add('active');
    li.appendChild(anchor);
    return li;
  }
  
  var nav_url = 'nav.json';
  
  if (location.hostname.includes('github.io')) {
    var repo = location.pathname.split('/')[0];
    nav_url = [location.hostname, repo, nav_url].join('/');
  }
  
  fetch(nav_url)
  .then(res => res.json())
  .then(items => { 
    items.forEach(item => { 
      let li = addList(item, false);
      lists.forEach(list => list.appendChild(li));
    }) 
  });
})();