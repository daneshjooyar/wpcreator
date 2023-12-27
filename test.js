const path              = require('path');

const current_path      = process.cwd() + '/';

const plugin_name       = process.argv.length >= 2 ? process.argv[2] : false;

if( ! plugin_name ){
    console.error( '\x1b[31m%s\x1b[0m', 'Error: You must enter a plugin name');
    return;
}
const Plugin_Generator  = require( path.join( current_path, 'inc', 'Plugin_Generator.js' ) );

const plugin            = new Plugin_Generator( plugin_name );


plugin.generate();
