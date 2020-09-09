ethereal.export(function () {
  let nav = {};
  
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
    nav_url = [repo, nav_url].join('/');
  }
  
  //* fetch the list of nav-menu
  fetch(nav_url)
  .then(r => r.json(), e => alert(e.message))
  .then(items => { 
    items.forEach(item => { 
      let li = addList(item, false);
      lists.forEach(list => list.appendChild(li));
    }) 
  });
  
  //* add events on "ethereal"
  ethereal.on('auth.load', function () {
    let menu = {
      name: null,
      href: null
    };
    if (ethereal.components.auth.session()) {
      menu.name = "Log Out";
      menu.href = "login.html?logout=true";
    } else {
      menu.name = "Login";
      menu.href = "login.html"
    }
    
    let li = addList(menu, false);
    
    lists.forEach(list => list.appendChild(li));
  });
  
  return {
    nav
  };
});