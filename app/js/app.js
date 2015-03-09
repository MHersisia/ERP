var module = angular.module('app', []);

module.service('LoginService', function () {
    //to create unique login id
    var uid = 1;
    
    var logins = [];
    
    this.save = function (login) {
        if (login.id == null) {
            login.id = uid++;
            logins.push(login);
        } else {
            for (i in logins) {
                if (logins[i].id == login.id) {
                    logins[i] = login;
                }
            }
        }

    }

    this.get = function (id) {
        for (i in logins) {
            if (logins[i].id == id) {
                return logins[i];
            }
        }

    }

    this.delete = function (id) {
        for (i in logins) {
            if (logins[i].id == id) {
                logins.splice(i, 1);
            }
        }
    }

    this.list = function () {
        return logins;
    }
});

module.controller('LoginController', function ($scope, LoginService) {

    $scope.logins = LoginService.list();

    $scope.Login = function () {
        LoginService.save($scope.login);
        $scope.login = {};
    }


    $scope.delete = function (id) {

        LoginService.delete(id);
        if ($scope.login.id == id) $scope.login = {};
    }


    $scope.edit = function (id) {
        $scope.login = angular.copy(LoginService.get(id));
    }
})