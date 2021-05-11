module.exports = function (grunt) {
    const addMusicianDirPath = '/home/monstrillllo/ostis-example-app-0.5.0/interface/sc-web-extensions/addMusician/';

    const scWebDirPath = '/home/monstrillllo/ostis-example-app-0.5.0/ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            addMusician: {
                src: [addMusicianDirPath + 'src/*.js'],
                dest: addMusicianDirPath + 'static/js/addMusician.js'
            },
        },
        copy: {
            addMusicianJs: {
                cwd: addMusicianDirPath + 'static/js/',
                src: 'addMusician.js',
                dest: clientJsDirPath + 'addMusician/',
                expand: true,
                flatten: true
            },
            addMusicianCss: {
                cwd: addMusicianDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            addMusicianHtml: {
                cwd: addMusicianDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            
        },
        watch: {
            addMusicianJs: {
                files: addMusicianDirPath + 'src/**',
                tasks: ['concat:addMusician', 'copy:addMusicianJs'],
            },
            addMusicianCss: {
                files: addMusicianDirPath + 'static/css/**',
                tasks: ['copy:addMusicianCss'],
            },
            addMusicianHtml: {
                files: [addMusicianDirPath + 'static/html/**'],
                tasks: ['copy:addMusicianHtml'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};
