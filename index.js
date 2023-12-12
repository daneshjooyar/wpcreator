const path          = require('path');

const current_path  = process.cwd();

const File_Generator = require( path.join( current_path, 'inc', 'File_Generator.js' ) );

const file_generator = new File_Generator();

file_generator
    .line('<?php')
    .line('$name = \'Hamed Moodi\';')
    .line('echo $name;')
    .generate()
    .set_file_name('xyz.php')
    .save_to( current_path + '/xyz/' );

