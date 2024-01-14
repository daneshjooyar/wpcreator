#! /usr/bin/env node

//documentation: https://www.npmjs.com/package/commander
const { program }       = require('commander');

const path              = require('path');

var pjson               = require('../package.json');

const config            = require( '../Config' );

const current_path      = process.cwd() + '/';

const plugin_name       = process.argv.length >= 2 ? process.argv[2] : false;

const Plugin_Generator  = require(
    path.join( __dirname, '/../inc', 'Plugin_Generator.js' )
);

program.version( pjson.version );

program.command('plugin')
    .description('Generate wordpress plugin')
    .argument('<name>', 'Plugin name example "Daneshjooyar Course Shop"')

    .option('--description <description>', 'Plugin description header')
    .option('--uri <uri>', 'Plugin URI header')
    .option('--plugin-version <version>', 'Plugin version')
    .option('--min-wp-version <min_wp_version>', 'Minimum WordPress version header')
    .option('--min-php-version <min_php_version>', 'Minimum PHP version header')
    .option('--author <author>', 'Author header')
    .option('--author-uri <author_uri>', 'Author URI header')
    .option('--license <license>', 'License header')
    .option('--text-domain <text_domain>', 'Text Domain header')
    .option('--update-uri <update_uri>', 'Update URI header')

    .option('--core-function <core_function>', 'Core function name')

    .option('--ajax-prefix <ajax_prefix>', 'Ajax prefix action for wp_ajax_{prefix}_{action_method}')
    .option('--namespace <namespace>', 'Plugin Namespace')
    .option('--ajax-soft-error', 'Ajax soft error')
    .action( (plugin_name, options) => {

        const plugin            = new Plugin_Generator( plugin_name );

        plugin.set_config( config );

        plugin.init( options );

        plugin.generate();

    })

program.parse();