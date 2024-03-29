'use strict';
const fs        = require('fs');
const config    = require('../Config.js');

module.exports = class File_Generator {

    code        = "";

    body_code   = "";

    file_name   = "";

    line( line = '', tab_count = 0 ){
        this.body_code+= "\t".repeat( tab_count ) + line + "\n";
        return this;
    }

    star_comment( comment, tab_count = 0 ){
        let comments = Array.isArray( comment ) ? comment : [comment];
        this.line( '/**', tab_count );
        for( let comment of comments ){
            this.line( ' * ' + comment, tab_count );
        }
        this.line( ' */', tab_count );
        return this;
    }

    file_content( file_path, replacements = {} ){
        try{
            let file_contents = fs.readFileSync( config.path.raw_code + file_path, 'utf8' );
            for (const [key, value] of Object.entries( replacements )) {
                const regex = new RegExp(`{{${key}}}`, 'g');
                file_contents = file_contents.replace(regex, value);
            }
            this.body_code+= file_contents;
        }catch ( err ){
            console.log( err );
        }
        return this;
    }

    plugin_header_line( key, value ){
        if( value ){
            this.line( ' * ' + key + ': ' + value );
        }
        return this;
    }

    set_file_name( file_name ){
        this.file_name = file_name;
        return this;
    }

    generate(){
        this.code = this.body_code;
        return this;
    }

    get_code(){
        return this.code;
    }

    save_to( path ){
        if( ! fs.existsSync( path ) ){
            fs.mkdirSync( path, {recursive: true} )
        }
        const file_path = path + this.file_name;
        fs.writeFileSync( file_path, this.code );
        console.log('Generated ' + file_path );
    }

    get_body(){
        return this.body_code;
    }

}

