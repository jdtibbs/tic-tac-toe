exports.config = {
    conventions: {
        ignored: [/.+\.test\.js/]
    },
    files: {
        javascripts: {
            joinTo: {
                "app.js": /^app/
            },
            order: {
                before: [/app.js/, /.+\.module.js/]
            }
        },

        stylesheets: {
            joinTo: {
                "common.css": /^app/
            },
            order: {
                before: [/^app/]
            }
        }
    },
    plugins: {
        autoReload: {
            enabled: true,
            port: [9485, 9486, 9487, 9488, 9489, 9490],
            delay: 200
        }
    }
};
