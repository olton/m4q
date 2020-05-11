module.exports = function(grunt) {

    "use strict";

    var watching = grunt.option('watching');
    var tasks, time = new Date(), day = time.getDate(), month = time.getMonth()+1, year = time.getFullYear(), hour = time.getHours(), mins = time.getMinutes(), sec = time.getSeconds();
    var timestamp = (day < 10 ? "0"+day:day) + "/" + (month < 10 ? "0"+month:month) + "/" + (year) + " " + (hour<10?"0"+hour:hour) + ":" + (mins<10?"0"+mins:mins) + ":" + (sec<10?"0"+sec:sec);

    var source_files = [
        'src/mode.js',
        'src/func.js',

        'src/setimmediate.js',
        'src/promise.js',

        'src/core.js',
        'src/interval.js',
        'src/contains.js',
        'src/script.js',
        'src/prop.js',
        'src/each.js',
        'src/data.js',
        'src/utils.js',
        'src/events.js',
        'src/ajax.js',
        'src/css.js',
        'src/classes.js',
        'src/parser.js',
        'src/size.js',
        'src/position.js',
        'src/attr.js',
        'src/proxy.js',
        'src/manipulation.js',
        'src/animation.js',
        'src/visibility.js',
        'src/effects.js',
        'src/init.js',
        'src/populate.js'
    ];

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copyright: '/*\n' +
            ' * m4q v<%= pkg.version %>, (<%= pkg.repository.url %>)\n' +
            ' * Copyright 2018 - <%= grunt.template.today("yyyy") %> by <%= pkg.author.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n\n',

        banner: "" +
            "( function( global, factory ) {\n" +
            "\tif ( typeof module === \"object\" && typeof module.exports === \"object\" ) {\n" +
            "\n" +
            "\t\tmodule.exports = global.document ?\n" +
            "\t\t\tfactory( global, true ) :\n" +
            "\t\t\tfunction( w ) {\n" +
            "\t\t\t\tif ( !w.document ) {\n" +
            "\t\t\t\t\tthrow new Error( \"m4q requires a window with a document\" );\n" +
            "\t\t\t\t}\n" +
            "\t\t\t\treturn factory( w );\n" +
            "\t\t\t};\n" +
            "\t} else {\n" +
            "\t\tfactory( global );\n" +
            "\t}\n" +
            "} )( typeof window !== \"undefined\" ? window : this, function( window ) {\n"+
            "\t\n",

        footer: "\n\treturn m4q; \n});\n",

        banner2: "(function (global, undefined) {\n",
        footer2: "}(window));",

        clean: {
            build: ['build']
        },

        eslint: {
            target: ['src/**/*.js']
        },

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                laxbreak: true
            }
        },

        concat: {
            global: {
                options: {
                    // banner: '<%= copyright %>' + "\n" + "<%= banner %>\n",
                    banner: "<%= copyright %> <%= banner2 %>\n",
                    footer: "<%= footer2 %>\n",
                    stripBanners: true,
                    separator: "\n\n",
                    process: function(src, filePath){
                        return '// Source: ' + filePath + '\n\n' + src;
                    }
                },
                src: source_files,
                dest: 'build/m4q.js'
            }
        },

        removelogging: {
            dist: {
                src: "build/js/*.js",

                options: {
                    methods: ["log"]
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                preserveComments: true
            },
            global: {
                src: 'build/m4q.js',
                dest: 'build/m4q.min.js'
            }
        },

        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: 'VERSION',
                            replacement: "<%= pkg.version %>"
                        },
                        {
                            match: 'STATUS',
                            replacement: "<%= pkg.status %>"
                        },
                        {
                            match: 'TIME',
                            replacement: timestamp
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/*.js'], dest: 'build/'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['src/*.js', 'Gruntfile.js'],
                tasks: ['clean', 'eslint',  'concat', 'uglify', 'replace']
            }
        }
    });

    tasks = ['clean', 'eslint', 'concat', 'removelogging', 'uglify', 'replace'];

    if (watching) {
        tasks.push('watch');
    }

    grunt.registerTask('default', tasks);
};