app.config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: 'login.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html'
    })
    .state('adduser', {
      url: '/adduser',
      templateUrl: 'adduser.html'
    })
    .state('viewuser', {
      url: '/viewuser',
      templateUrl: 'viewuser.html'
    })
    .state('myprofile', {
      url: '/myprofile',
      templateUrl: 'profile.html'
    })
});
