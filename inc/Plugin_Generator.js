'use strict';
const fs = require('fs');
const File_Generator = require('./File_Generator.js');
const config = require('../Config.js');

module.exports = class Plugin_Generator {

    plugin_name         = '';

    plugin_directory    = '';
    lang_directory      = '';
    namespace           = '';
    plugin_slug         = '';
    constant_prefix     = '';
    core_function       = '';
    plugin_name         = '';

    header              = {};

    constructor( plugin_name, plugin_path = process.cwd() ){
        this.plugin_name        = plugin_name;
        this.plugin_slug        = plugin_name.replace( '/\s+/g', '-' );
        this.namespace          = plugin_name.split( ' ' ).map( word => word.charAt(0).toUpperCase() + word.slice(1) ).join( '' );
        this.constant_prefix    = plugin_name.toUpperCase().replace(/\s+/g, '_' );
        this.core_function      = plugin_name.toLowerCase().replace(/\s+/g, '_' );
        this.set_plugin_path( plugin_path + '/' + this.plugin_slug );
        console.log( this.plugin_slug )
    }

    set_plugin_path( path ){
        this.plugin_directory   = path.replace(/^\/|\/$/g, '') + '/';
        this.lang_directory     = this.plugin_directory + 'languages/';
        return this;
    }

    set_header( key, value ){
        this.header[key] = value;
    }

    path( path ){
        if( path ) {
            path = path.replace(/^\/|\/$/g, '') + '/';
        }
        return this.plugin_directory + path;
    }

    make_dir(){
        if( ! fs.existsSync( this.plugin_directory ) ){
            //fs.mkdirSync( this.plugin_directory, {recursive: true} );
            fs.mkdirSync( this.lang_directory, {recursive: true} );
            this.silent_index_to( '' );
            this.silent_index_to( 'languages' );
        }
    }

    silent_index_to( path = '' ){
        const index = new File_Generator();
        path        = this.path( path );
        console.log(path)
        index
            .set_file_name('index.php')
            .line('<?php //Silence is gold')
            .generate()
            .save_to( path )
    }

    relative_path( path ){
        return this.plugin_directory + path.replace(/^\/|\/$/g, '') + '/';
    }

    generate(){

        /**
         * Make plugin and lang directory
         */
        this.make_dir();

        /**
         * Make php file directories
         */
        this.silent_index_to( 'Core' )
        this.silent_index_to( 'Core/View' )
        this.silent_index_to( 'Core/Functions' )

        /**
         * Make assets directories
         */
        this.silent_index_to( 'assets' )
        this.silent_index_to( 'assets/image' )
        this.silent_index_to( 'assets/css' )
        this.silent_index_to( 'assets/js' )

        /**
         * Generate Composer json for autoload dump namespace
         */
        const composer_json = new File_Generator();
            composer_json
                .set_file_name('composer.json')
                .line('{')
                .line('"autoload": {', 1)
                .line('"psr-4": {', 2)
                .line('"' + this.namespace + '\\\\": "Core/"', 3 )
                .line('}', 2)
                .line('}', 1)
                .line('}')
                .generate()
                .save_to( this.plugin_directory );

        /**
         * Generate Constants php file as config file
         */
        const config = new File_Generator();
        config
            .set_file_name('Config.php')
            .line('<?php')
            .star_comment('Add plugin config here')
            .generate()
            .save_to(
                this.relative_path('Core')
            );

        const core_functions_loader = new File_Generator();
        core_functions_loader
            .line('<?php')
            .line('defined(\'ABSPATH\') || exit;')
            .line()
            .star_comment( 'Load all needed function files' )
            .line('require \'functions-core.php\';')
            .generate()
            .set_file_name('functions-loader.php')
            .save_to( this.relative_path('Core/Functions/' ) );

        const core_functions = new File_Generator();
        core_functions
            .line('<?php')
            .line('defined(\'ABSPATH\') || exit;')
            .line()
            .line(`if( ! function_exists( '${this.core_function}' ) ){`)
            .star_comment( `@return \\${this.namespace}\\Loader`, 1 )
            .line(`function ${this.core_function}(){`, 1)
            .line('return $GLOBALS[\'' + this.plugin_slug.replace(/-/g, '_') + '\'];', 2)
            .line("}", 1)
            .line('}')
            .generate()
            .set_file_name('functions-core.php')
            .save_to(this.relative_path( 'Core/Functions/' ) );



        this.set_header('Plugin Name', 'WPCreator For Daneshjooyar' );
        this.set_header('Plugin Author', 'Hamed Moodi' );
        this.set_header('Author URI', 'https://github.com/hamedmoody/' );

        const main_file = new File_Generator();
        main_file
            .line('<?php')
            .line( this.generate_headers() )
            .line()
            .star_comment('This plugin generated by Daneshjooyar WPCreator Version ' + config.Version )
            .line()
            .line(`use \\${this.namespace}\\Loader;`)
            .line()
            .line("defined('ABSPATH') || exit;")
            .line()

            /**
             * Set plugin Constants
             */
            .star_comment( 'Define plugin path constants' )
            .line( `define( '${this.constant_prefix}_DIR', plugin_dir_path( __FILE__ ) );` )
            .line( `define( '${this.constant_prefix}_CORE_DIR', ${this.constant_prefix}_DIR . 'Core/' );` )
            .line( `define( '${this.constant_prefix}_FUNCTIONS_DIR', ${this.constant_prefix}_DIR . 'Core/Functions/' );` )
            .line( `define( '${this.constant_prefix}_VIEW_DIR', ${this.constant_prefix}_DIR . 'Core/View/' );` )
            .line()

            .star_comment( 'Define plugin url constants' )
            .line( `define( '${this.constant_prefix}_URL', plugin_dir_url( __FILE__ ) );` )
            .line( `define( '${this.constant_prefix}_ASSETS_URL', ${this.constant_prefix}_URL . 'assets/' );` )
            .line( `define( '${this.constant_prefix}_CSS_URL', ${this.constant_prefix}_URL . 'assets/css/' );` )
            .line( `define( '${this.constant_prefix}_JS_URL', ${this.constant_prefix}_URL . 'assets/js/' );` )
            .line( `define( '${this.constant_prefix}_IMAGES_URL', ${this.constant_prefix}_URL . 'assets/images/' );` )
            .line()

            .star_comment( 'Require autoload for namespace and another dependencies' )
            .line('require \'vendor/autoload.php\';')
            .line()
            .line('$GLOBALS[\'' + this.plugin_slug.replace(/-/g, '_') + '\'] = new Loader();')
            .line('$GLOBALS[\'' + this.plugin_slug.replace(/-/g, '_') + '\']->run();')
            .line()

            .star_comment( 'Load plugin config as php constant' )
            .line(`require ${this.constant_prefix}_CORE_DIR . 'Config.php';`)
            .line()

            .star_comment( 'Load function loader' )
            .line(`require ${this.constant_prefix}_FUNCTIONS_DIR . 'functions-loader.php';`)


            .generate()
            .set_file_name('myplygin.php')
            .save_to( this.plugin_directory )



    }

    generate_headers(){
        let header = '/**\n';
        for( let key in this.header ){
            header += ' * ' + key + ': ' + this.header[key] + '\n';
        }
        header += ' */'
        return header;
    }

}

