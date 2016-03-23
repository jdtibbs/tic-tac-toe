(function() {

    'use strict';

    var factory = {
        create: function() {
            var ref;

            return {
                ref: function() {
                    return ref || (ref = new Firebase("https://jdt-tic-tac-toe.firebaseio.com/"));
                }
            };
        }
    };

    module.exports = factory;
})();
