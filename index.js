#! /usr/bin/env node

//documentation: https://www.npmjs.com/package/commander
const { program }       = require('commander');

const path              = require('path');

var pjson               = require('../package.json');


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

        plugin.generate();

    })

program.parse();