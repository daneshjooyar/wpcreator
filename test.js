const path              = require('path');
const fs                = require('fs');

const current_path      = process.cwd() + '/';

const plugin_name       = process.argv.length >= 2 ? process.argv[2] : false;

if( ! plugin_name ){
    console.error('Error:', 'You must enter a plugin name');
    return;
}
const Plugin_Generator  = require( path.join( current_path, 'inc', 'Plugin_Generator.js' ) );

const plugin            = new Plugin_Generator( plugin_name );

//plugin.generate();
//plugin.silent_index_to('');
