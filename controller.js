var app = angular.module('app', ['ngAnimate', 'ui.router', 'angularUtils.directives.dirPagination']);
app.controller("adminController", function($scope, $state, $location) {
  $scope.userList = localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
  $scope.invalidCreds = false;
  $scope.rememberMe = false;
  $scope.loginUserId = localStorage.getItem('username')?localStorage.getItem('username'):'';
  $scope.loginPassword = localStorage.getItem('password')?localStorage.getItem('password'):'';
  $scope.nextView1 = function(rememberMe) {
    var userid = document.getElementById('userid').value;
    var password = document.getElementById('password').value;
    var usersLists = JSON.parse(localStorage.getItem('users'));

    /* Remember me code */
      if (rememberMe) {
        localStorage.username = document.getElementById('userid').value;
        localStorage.password = document.getElementById('password').value;
        $scope.loginUserId = localStorage.getItem('username');
        $scope.loginPassword = localStorage.getItem('password');
      }
    /* End of code */

    /* Redirect to addUser page if user is admin else redirect to myProfile page */
    if (userid==='admin' && password==='Admin123#') {
      $scope.invalidCreds = false;
      $state.go("adduser");
    } else if (usersLists) {
       for (var i=0; i<usersLists.length; i++) {
         if (usersLists[i].userid===userid && usersLists[i].password===password) {
           $scope.userInfo.userid=$scope.userInfo.userid?$scope.userInfo.userid:usersLists[i].userid;
           $scope.userInfo.password=$scope.userInfo.password?$scope.userInfo.password:usersLists[i].password;
           $scope.userInfo.firstname=$scope.userInfo.firstname?$scope.userInfo.firstname:usersLists[i].firstname;
           $scope.userInfo.lastname=$scope.userInfo.lastname?$scope.userInfo.lastname:usersLists[i].lastname;
           $scope.invalidCreds = false;
           $state.go("myprofile");
         }
       }
       if (i===usersLists.length) {
         $scope.invalidCreds = true;
       }
    }
    /* End of code */
  }
  $scope.userInfo = {};
  $scope.showDuplicateMssg=false;
  $scope.nextView2 = function(userInfo) {
    var duplicateUser=false; //Check for duplicate user id
    for (var i=0; i<$scope.userList.length; i++) {
      if ($scope.userList[i].userid===userInfo.userid) {
        duplicateUser = true;
        break;
      }
    }
    // Push to userList
    if (!duplicateUser) {
      $state.go("viewuser");
      $scope.userList.push({
        userid: userInfo.userid,
        password: userInfo.password,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname
      });
      localStorage.setItem('users', JSON.stringify($scope.userList));
    } else {
      $scope.showDuplicateMssg = true;
    }

  }
  // Function for sorting table columns
  $scope.sort = function(keyname) {
       $scope.sortKey = keyname;   //set the sortKey to the param passed
       $scope.reverse = !$scope.reverse; //if true make it false and vice versa
   }
  // Function for updating the userInfo values
  $scope.update = function(userInfo) {
    for (var i=0; i<$scope.userList.length; i++) {
      if ($scope.userList[i].userid===userInfo.userid) {
        $scope.userList[i].password = userInfo.password;
        $scope.userList[i].firstname = userInfo.firstname;
        $scope.userList[i].lastname = userInfo.lastname;
      }
    }
  }
  // Function to highlight the active table
  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };
})
