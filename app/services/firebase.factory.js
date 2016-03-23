(function() {

    'use strict';

    var factory = {
        create: function() {
            var ref;

            function getRef() {
                return ref || (ref = new Firebase("https://jdt-tic-tac-toe.firebaseio.com/"));
            }
            return {
                authWithPassword: function(email, password, successCallback, errorCallback) {
                    getRef().authWithPassword({
                            email: email,
                            password: 'tictactoe'
                        },
                        function(error, authData) {
                            if (error) {
                                errorCallback(error);
                            } else {
                                successCallback();
                            }
                        });
                }
            };
        }
    };

    module.exports = factory;
})();
