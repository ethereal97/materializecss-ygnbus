ethereal.export(function (app) {
  // let AUTH_API = 'https://ethereal-auth.herokuapp.com';
 
  //* auth (core object)
  let auth = {
    api: 'api',
   
    dashboard: 'dashboard.html',
    
    storage: sessionStorage,
    
    session: currentSession,
    
    logout: destorySession,
    
    store: createSessionUser,
    
    login(user, pass, callback) {
      return sendAuthRequest('users.json').then(users => {
        var user_data = users.filter((user) => user.username)[0];
        if (! user_data) {
          return callback(-1);
        }
        if (user_data.password !== pass) {
          return callback(0);
        }
        return callback(user_data);
      });
    },
    
  };
  
  //* properties
  var is_session = 'is_session';
  var user_data = 'user_data';
  
  //* initialize (check current session)
  let user = currentSession();
  
  if (user) {
    //* check is user is "logout"
    let query = new URLSearchParams(window.location.search);

    if (query.has('logout')) {
      destorySession();
      return setTimeout(() => window.location.assign(window.location.pathname), 860);
    }
  }
  
  //* methods
  function sendAuthRequest(...path) {
    let url = [auth.api, ...path].join('/');
    
    return fetch(url).then(r => r.json());
  }
  
  function createSessionUser(user) {
    delete user.password;
    
    var json = JSON.stringify(user);
    
    auth.storage.setItem(is_session, '1');
    auth.storage.setItem(user_data, window.btoa(json));
  }
  
  function currentSession() {
    let sess = auth.storage.getItem(is_session);
    let data = auth.storage.getItem(user_data);

    // is not session user
    if (!sess || sess == 0) {
      return false;
    }
    
    // is there is no user data (optional validate)
    if (! data) {
      destorySession();
      return false;
    }
    
    return JSON.parse(window.atob(data));
  }
  
  function destorySession() {
    auth.storage.removeItem(is_session);
    auth.storage.removeItem(user_data);
  }

  return {
    auth
  };
});