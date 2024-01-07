'use strict';
const fs                = require('fs');
const File_Generator    = require('./File_Generator.js');
const Class_Generator   = require('./Class_Generator.js');
const config            = require('../Config.js');

module.exports = class Plugin_Generator {

    plugin_name         = '';

    plugin_directory    = '';
    plugin_path         = '';
    lang_directory      = '';
    namespace           = '';
    plugin_slug         = '';
    constant_prefix     = '';
    core_function       = '';
    plugin_name         = '';

    /**
     * Use for header
     */
    plugin_uri          = '';
    description         = '';
    version             = '1.0.0';
    author              = '';
    min_php_version     = '';
    min_wp_version      = '';
    author_uri          = '';
    license             = '';
    license_uri         = '';
    update_uri          = '';
    text_domain         = '';
    domain_path         = '/languages';

    /**
     * Ajax Config
     */
    has_ajax            = true;
    ajax_prefix         = '';
    ajax_server_error   = true;

    header              = {};

    constructor( plugin_name, plugin_path = process.cwd() ){
        this.plugin_path        = plugin_path;
        this.plugin_name        = plugin_name;
        this.plugin_slug        = plugin_name.toLowerCase().replace( /\s+/g, '-' );
        this.namespace          = plugin_name.split( ' ' ).map( word => word.charAt(0).toUpperCase() + word.slice(1) ).join( '' );
        this.constant_prefix    = plugin_name.toUpperCase().replace(/\s+/g, '_' );
        this.core_function      = plugin_name.toLowerCase().replace(/\s+/g, '_' );
        this.text_domain        = plugin_name.toLowerCase().replace(/\s+/g, '_' );
        this.ajax_prefix        = this.text_domain;
        this.set_plugin_path( this.plugin_path + '/' + this.plugin_slug );
    }

    init( options ){

        if( options.description ){
            plugin.set_description( options.description );
        }

        if( options.uri ){
            plugin.set_plugin_uri( options.uri );
        }

        if( options.pluginVersion ){
            plugin.set_version( options.pluginVersion );
        }

        if( options.updateUri ){
            plugin.set_update_uri( options.updateUri );
        }

        if( options.licence ){
            plugin.set_license( options.licence );
        }

        if( options.textDomain ){
            plugin.set_text_domain( options.textDomain );
        }

        if( options.minWpVersion ){
            plugin.set_min_wp_version( options.minWpVersion );
        }

        if( options.minPhpVersion ){
            plugin.set_min_php_version( options.minPhpVersion );
        }

        if( options.author ){
            plugin.set_author( options.author );
        }

        if( options.coreFunction ){
            plugin.set_core_function( options.coreFunction );
        }

        if( options.authorUri ){
            plugin.set_author_uri( options.authorUri );
        }

        if( options.namespace ){
            plugin.set_namespace( options.namespace );
        }

        if( options.ajaxPrefix ){
            plugin.set_ajax_prefix( options.ajaxPrefix );
        }

        if( options.ajaxSoftError ){
            plugin.set_ajax_server_error( false );
        }

        return this;
    }

    set_has_ajax( has_ajax ){
        this.has_ajax = has_ajax;
        return this;
    }

    set_text_domain( text_domain ){
        this.text_domain = text_domain;
        return this;
    }

    set_ajax_prefix( prefix ){
        this.ajax_prefix = prefix;
        return this;
    }

    set_ajax_server_error( is_server_error ){
        this.ajax_server_error = is_server_error;
        return this;
    }

    set_plugin_uri( uri ){
        this.plugin_uri = uri;
        return this;
    }

    set_plugin_slug( slug ){
        this.plugin_slug = slug;
        this.set_plugin_path( this.plugin_path + '/' + this.plugin_slug );
        return this;
    }

    set_author( author ){
        this.author = author;
        return this;
    }

    set_min_php_version( version ){
        this.min_php_version = version;
        return this;
    }

    set_min_wp_version( version ){
        this.min_wp_version = version;
        return this;
    }

    set_description( description ){
        this.description = description;
        return this;
    }

    set_version( version ){
        this.version = version;
        return this;
    }

    set_license( license ){
        this.license = license;
        return this;
    }

    set_license_uri( license_uri ){
        this.license_uri = license_uri;
        return this;
    }

    set_update_uri( uri ){
        this.update_uri = uri;
        return this;
    }

    set_domain_path( path ){
        this.domain_path = path;
        return this;
    }

    set_author_uri( uri ){
        this.author_uri = uri;
        return this;
    }

    set_plugin_uri( uri ){
        this.plugin_uri = uri;
        return this;
    }


    set_namespace( ns ){
        this.namespace = ns;
        return this;
    }

    set_constant_prefix( prefix ){
        this.constant_prefix = prefix;
        return this;
    }

    set_core_function( function_name ){
        this.core_function = function_name;
        return this;
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
        console.log( 'Generated ' + path + 'index.php' )
        index
            .set_file_name('index.php')
            .line('<?php //Silence is gold')
            .generate()
            .save_to( path )
    }

    relative_path( path = '' ){
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
                .line('{')
                .line('"autoload": {', 1)
                .line('"psr-4": {', 2)
                .line('"' + this.namespace + '\\\\": "Core/"', 3 )
                .line('}', 2)
                .line('}', 1)
                .line('}')
                .generate()
                .set_file_name('composer.json')
                .save_to( this.plugin_directory );

        const git_ignore = new File_Generator();
        git_ignore
            .line('##### Composer')
            .line('/vendor/')
            .generate()
            .set_file_name('.gitignore')
            .save_to( this.relative_path() );

        const uninstall = new File_Generator();
        uninstall
            .line('<?php')
            .line('// if uninstall.php is not called by WordPress, die')
            .line('if ( ! defined( \'WP_UNINSTALL_PLUGIN\' ) ) {')
            .line('die;', 1 )
            .line('}')
            .generate()
            .set_file_name( 'uninstall.php' )
            .save_to( this.relative_path() );


        /**
         * Generate Constants php file as config file
         */
        const config = new File_Generator();
        config
            .line('<?php')
            .star_comment('Add plugin config here')
            .generate()
            .set_file_name('Config.php')
            .save_to(
                this.relative_path('Core')
            );

        /**
         * Generate Main core plugin file
         */
        const core_class = new Class_Generator('Core');
        core_class
            .set_type('class')
            .set_namespace( this.namespace )
            .line('/**', 1)
            .line(' * @var string', 1)
            .line(' */', 1)
            .line('public $version = \'' + this.version + '\';', 1)
            .line('')
            .star_comment(['Mange assets version for ignore cache in debug mode'], 1 )
            .line( 'public function assets_version(){', 1 )
            .line( 'return defined( \'WP_DEBUG\' ) && WP_DEBUG ? time() : $this->version;', 2 )
            .line('}', 1 )
            .line('', 1)
            .generate()
            .set_file_name('Core.php')
            .save_to( this.relative_path('Core' ) );


        /**
         * Generate Loader file
         */
        const loader_class = new Class_Generator('Loader');
        loader_class
            .set_namespace( this.namespace )
            .set_type('class')
            .set_extends('Core')
            .line('use Functions;', 1)
            .line()
            .star_comment(' * Run ' + this.plugin_name + ' Plugin Modules', 1)
            .line('public function run(){', 1)
            .line('', 1)
            .line('//Run your plugin modules here', 2)
            .line('', 2)

            .line('$this->translation();', 2 )
            .line('', 2);

        if( this.has_ajax ){
            this.generate_ajax();
            loader_class
                .line('//Run ajax handler', 2)
                .line('$ajax	    = new Ajax();', 2)
                .line('$ajax->listen();', 2)
                .line('', 2);
        }

        loader_class
            .line('//Enqueue styles and scripts', 2)
            .line('$enqueue	= new Enqueue();', 2)
            .line('$enqueue->register();', 2)
            .line('', 2)

            .line('', 1)
            .line('}', 1)

            .line('public function translation() {', 1)
            .line( 'add_action( \'plugins_loaded\', function(){', 2 )
            .line( 'load_plugin_textdomain(\'' + this.text_domain + '\', false, basename( ' + this.constant_prefix + '_DIR ) . \'/languages/\');', 3 )
            .line( '});', 2 )
            .line('}', 1)

            .generate()
            .set_file_name( 'Loader.php' )
            .save_to( this.relative_path( 'Core' ) );

        const functions_trait = new Class_Generator('Functions');
        functions_trait
            .set_namespace( this.namespace )
            .set_type('trait')

            .file_content( 'wordpress/method_db.txt' )
            .line('', 1)
            .line('', 1)

            .file_content( 'wordpress/method_table.txt' )
            .line('', 1)
            .line('', 1)

            .star_comment( ['Get view path in View directory',"@return string"], 1 )
            .line('public function view_path( $path ){', 1)
            .line( 'return ' + this.constant_prefix + '_VIEW_DIR . $path;', 2 )
            .line('}', 1)
            .line('', 1)

            .star_comment( ['Get Image url',"@return string"], 1 )
            .line('public function image( $path ){', 1)
            .line( 'return ' + this.constant_prefix + '_IMAGES_URL . $path;', 2 )
            .line('}', 1)
            .line('', 1)

            .star_comment( ['Get Js url',"@return string"], 1 )
            .line('public function js( $path ){', 1)
            .line( 'return ' + this.constant_prefix + '_JS_URL . $path;', 2 )
            .line('}', 1)
            .line('', 1)

            .star_comment( ['Get Css url',"@return string"], 1 )
            .line('public function css( $path ){', 1)
            .line( 'return ' + this.constant_prefix + '_CSS_URL . $path;', 2 )
            .line('}', 1)
            .line('', 1)

            .file_content( 'wordpress/function_upload_attachment.txt' )
            .line('', 1)
            .line('', 1)

            .generate()
            .set_file_name( 'Functions.php' )
            .save_to( this.relative_path( 'Core' ) );



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



        this.init_headers();

        this.generate_enqueue();

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

            .star_comment( 'define plugin version' )
            .line( `define( '${this.constant_prefix}_VERSION', '${this.version}' );` )
            .line()

            .star_comment( 'Require autoload for namespace and another dependencies' )
            .line('require \'vendor/autoload.php\';')
            .line()

            .star_comment( 'Load plugin config as php constant' )
            .line(`require ${this.constant_prefix}_CORE_DIR . 'Config.php';`)
            .line()

            .line('$GLOBALS[\'' + this.plugin_slug.replace(/-/g, '_') + '\'] = new Loader();')
            .line('$GLOBALS[\'' + this.plugin_slug.replace(/-/g, '_') + '\']->run();')
            .line()

            .star_comment( 'Load function loader' )
            .line(`require ${this.constant_prefix}_FUNCTIONS_DIR . 'functions-loader.php';`)


            .generate()
            .set_file_name( this.plugin_slug + '.php' )
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

    generate_ajax(){

        const ajax_manager = new Class_Generator( 'AjaxManager' );
        ajax_manager
            .set_namespace( this.namespace )
            .set_extends('Core')
            .set_type('class')
            .add_comments(['Ajax Request Manager'])

            .file_content( 'Wordpress/class_ajax_manager_methods.txt' )
            .line('', 1)

            .line('', 1)
            .star_comment( [
                'Send result as Json',
                '@return array if request not ajax send $this'
        ] , 1)
            .line('public function send(){', 1)
            .line('', 2)
            .star_comment( 'Uncomment below code for active ajax debug trace' , 2)
            .line('//$this->set_debug_trace();', 2)
            .line('', 2)
            .line("if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {", 2)
            .line( this.ajax_server_error ? 'wp_send_json( $this->data, $this->data[\'http_code\'] );' : 'wp_send_json( $this->data, 200 );', 3 )
            .line("}", 2)
            .line('', 2)
            .line('return $this->data;', 2)
            .line('', 2)
            .line('}', 1)
            .line('', 1)
            .generate()
            .set_file_name('AjaxManager.php')
            .save_to(this.relative_path( 'Core' ) );


        const ajax = new Class_Generator('Ajax');
        ajax
            .set_namespace( this.namespace )
            .set_extends('Core')
            .set_type('class')
            .add_comments( ['Manage Ajax actions'] )

            .star_comment( [
                'AjaxManager object for manage ajax result and message',
                '@var AjaxManager'
        ], 1 )
            .line('private $ajax;', 1)
            .line('', 1)

            .line('public function __construct(){', 1)
            .line('$this->ajax 		= new AjaxManager();', 2)
            .line('}', 1)
            .line('', 1)

            .star_comment([
            'Ajax request prefix For action',
            'Example: Use ' + this.ajax_prefix + 'my_function',
            'For call my_function method in this class',
            '@var string',
    ],1)
            .line(`private \$prefix = '${this.ajax_prefix}';`, 1)
            .line('', 1)

            .star_comment([
            'Listen to wordpress ajax with prefix \'' + this.ajax_prefix + '\' and trigger suffix method',
            '@throws ReflectionException'
    ], 1)

            .file_content('Wordpress/class_ajax_handler_methods.txt')

            .line('', 1)
            .line('', 1)
            .generate()
            .set_file_name('Ajax.php')
            .save_to(this.relative_path( 'Core' ) );


    }

    generate_enqueue(){

        const enqueue_manager = new Class_Generator('Enqueue');
        enqueue_manager
            .set_namespace( this.namespace )
            .set_extends( 'Core' )
            .set_type( 'class' )
            .add_comments([
                'Enqueue manager',
                '',
                'You can use $this->assets_version() to manage assets cache in plugin',
                '$this->assets_version() is documented in \'' + this.plugin_slug + '/Core/Core.php\'',
                'Note: You can use $this->assets_version() for other assets such as images'
            ])

            .line('use Functions;', 1)
            .line('', 1)

            .line('public function register(){', 1)
            . line( "add_action( 'wp_enqueue_scripts', [\$this, 'public_scripts'] );", 2 )
            . line( "add_action( 'admin_enqueue_scripts', [\$this, 'admin_scripts'] );", 2 )
            .line('}', 1)
            .line('', 1 );

        /**
         * Start public enqueue (styles and scripts)
         */
            enqueue_manager.line('public function public_scripts(){', 1)
                .line('', 2)
                .line('}', 1)
                .line('', 1);


        /**
         * Start Admin enqueue (styles and scripts)
         */
            enqueue_manager.line('public function admin_scripts(){', 1)
                .line('', 2)
                .line('}', 1)
                .line('', 1);

        /**
         * End Admin enqueue
         */

        enqueue_manager
            .line('', 1)
            .generate()
            .set_file_name('Enqueue.php')
            .save_to( this.relative_path( 'Core' ) );


    }

    init_headers(){

        this.set_header( 'Plugin Name', this.plugin_name );

        if( this.plugin_uri && this.plugin_uri.length ){
            this.set_header( 'Plugin URI', this.plugin_uri );
        }

        if( this.description && this.description.length ){
            this.set_header( 'Description', this.description );
        }

        if( this.version && this.version.length ){
            this.set_header( 'Version', this.version );
        }

        if( this.min_wp_version && this.min_wp_version.length ){
            this.set_header( 'Requires at least', this.min_wp_version );
        }

        if( this.min_php_version && this.min_php_version.length ){
            this.set_header( 'Requires PHP', this.min_php_version );
        }

        if( this.author && this.author.length ){
            this.set_header( 'Author', this.author );
        }

        if( this.author_uri && this.author_uri.length ){
            this.set_header( 'Author URI', this.author_uri );
        }

        if( this.license && this.license.length ){
            this.set_header( 'License', this.license );
        }

        if( this.text_domain && this.text_domain.length ){
            this.set_header( 'Text Domain', this.text_domain );
        }

        if( this.domain_path && this.domain_path.length ){
            this.set_header( 'Domain Path', this.domain_path );
        }

        if( this.update_uri && this.update_uri.length ){
            this.set_header( 'Update URI', this.update_uri );
        }

    }

}

