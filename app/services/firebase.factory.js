(function() {

    'use strict';

    var firebaseConstants = require('../firebase.constants');

    var factory = {
        create: function() {
            var ref;

            return {
                authWithPassword: function(email, password, successCallback, errorCallback) {
                    this.ref().authWithPassword({
                            email: email,
                            password: 'tictactoe'
                        },
                        function(error, authData) {
                            if (error) {
                                errorCallback(error);
                            } else {
                                successCallback(authData);
                            }
                        });
                },
                getAuth: function() {
                    return this.ref().getAuth();
                },
                ref: function() {
                    return ref || (ref = new Firebase(firebaseConstants.url));
                }
            };
        }
    };

    module.exports = factory;
})();
