(function() {

    'use strict';

    var gameFactory = require('firebase');


    function FirebaseService() {
        var ref;

        var service = {
            ref: function() {
                return ref || (ref = new Firebase("https://jdt-tic-tac-toe.firebaseio.com/"));
            }
        };

        return service;
    }
})();
