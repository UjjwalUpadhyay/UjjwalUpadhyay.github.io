var app = angular.module('app', ['ngAnimate', 'ui.router', 'angularUtils.directives.dirPagination']);
app.controller("adminController", function($scope, $state, $location) {
  var userObj = {};
  var userObjid = "admin";
  userObj[userObjid] = {
                        "password": "Admin123#",
                        "firstname": "admin",
                        "lastname": "admin"
                      };

  if (Object.keys(JSON.parse(localStorage.getItem('userObj'))).length===0) {
      localStorage.setItem('userObj', JSON.stringify(userObj));
  }
  $scope.userListObj = localStorage.getItem('userObj')?JSON.parse(localStorage.getItem('userObj')):{};
  $scope.userList = [];
  for (var key in $scope.userListObj) {
    $scope.userList.push({
        userid: key,
        password: $scope.userListObj[key].password,
        firstname: $scope.userListObj[key].firstname,
        lastname: $scope.userListObj[key].lastname
      });
  }
  $scope.invalidCreds = false;
  $scope.rememberMe = false;
  $scope.loginUserId = localStorage.getItem('username')?localStorage.getItem('username'):'';
  $scope.loginPassword = localStorage.getItem('password')?localStorage.getItem('password'):'';
  $scope.nextView1 = function(rememberMe, userid, password) {
    var usersLists = JSON.parse(localStorage.getItem('userObj'));

    /* Remember me code */
      if (rememberMe) {
        localStorage.username = userid;
        localStorage.password = password;
        $scope.loginUserId = localStorage.getItem('username');
        $scope.loginPassword = localStorage.getItem('password');
      }
    /* End of code */

    /* Redirect to addUser page if user is admin else redirect to myProfile page */
    if ('admin' in usersLists && userid === 'admin' && password===JSON.parse(localStorage.getItem("userObj")).admin.password) {
      $scope.invalidCreds = false;
      $state.go("adduser");
    } else if (usersLists) {
      if (userid in usersLists) {
        if(password===usersLists[userid].password) {
          $scope.userInfo.userid = userid;
          $scope.userInfo.password = usersLists[userid].password;
          $scope.userInfo.firstname = usersLists[userid].firstname;
          $scope.userInfo.lastname = usersLists[userid].lastname;
          $state.go("myprofile");
        } else {
            $scope.invalidUserMsg = false;
            $scope.invalidCreds = true;
        }
      } else {
        $scope.invalidCreds = false;
        $scope.invalidUserMsg = true;
      }
    }
    /* End of code */
  }
  $scope.userInfo = {};
  $scope.showDuplicateMssg=false;

  //Function called on addUser
  $scope.nextView2 = function(userInfo) {
    var duplicateUser=false; //Check for duplicate user id
    var userListObj = JSON.parse(localStorage.getItem('userObj'));
    if(userInfo.userid in userListObj) {
      $scope.showDuplicateMssg = true;
    } else {
      userListObj[userInfo.userid]={"password": userInfo.password, "firstname": userInfo.firstname, "lastname": userInfo.lastname};
      localStorage.setItem("userObj", JSON.stringify(userListObj));
      $scope.userList.push({
        userid: userInfo.userid,
        password: userInfo.password,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname
      });
      $state.go("viewuser");
    }
  }
  // Function for sorting table columns
  $scope.sort = function(keyname) {
       $scope.sortKey = keyname;   //set the sortKey to the param passed
       $scope.reverse = !$scope.reverse; //if true make it false and vice versa
   }
  // Function for updating the userInfo values
  $scope.update = function(userInfo) {
    var obj=JSON.parse(localStorage.getItem("userObj"));
    obj[userInfo.userid]={"password": userInfo.password, "firstname": userInfo.firstname, "lastname": userInfo.lastname};
    localStorage.setItem('userObj', JSON.stringify(obj));
    for (var i=0; i<$scope.userList.length; i++) {
      if ($scope.userList[i].userid===userInfo.userid) {
        $scope.userList[i].password = userInfo.password;
        $scope.userList[i].firstname = userInfo.firstname;
        $scope.userList[i].lastname = userInfo.lastname;
      }
    }
  }
  // Function to highlight the active tab
  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };
})
