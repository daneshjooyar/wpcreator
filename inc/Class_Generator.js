'use strict';
const fs                = require('fs');
const File_Generator    = require('./File_Generator.js');
const config            = require('../Config.js');

module.exports = class ClassGenerator extends File_Generator {
    constructor(class_name) {
        super();
        this.namespace = '';
        this.classname = class_name;
        this.classtype = '';
        this.final = '';
        this.data = {};
        this.uses = [];
        this.comments = [];
    }

    set_type(type) {
        this.classtype = type;
        return this;
    }

    set_final() {
        this.final = 'final';
        return this;
    }

    add_comments(arr) {
        this.comments = [...this.comments, ...arr];
        return this;
    }

    set(key, value) {
        this.data[key] = value;
        return this;
    }

    use(use) {
        this.uses.push(use);
        return this;
    }

    get(key) {
        return this.data[key] || '';
    }

    set_extends(class_name) {
        this.extends = `extends ${class_name}`;
        return this;
    }

    set_namespace(namespace) {
        this.namespace = namespace;
        return this;
    }

    generateHeader() {
        this.code = '';
        this.code += '<?php\n';
        if (this.namespace) {
            this.code += `namespace ${this.namespace};\n\n`;
        }
        this.code += 'defined( \'ABSPATH\' ) || exit;\n\n';
        if (this.uses.length > 0) {
            for (const use of this.uses) {
                this.code += `use ${use};\n`;
            }
            this.code += '\n';
        }
        if (this.comments.length > 0) {
            this.code += '/**\n';
            for (const comment of this.comments) {
                this.code += ` * ${comment}\n`;
            }
            this.code += ' */\n';
        }
        if (this.final) {
            this.code += 'final ';
        }
        this.code += `${this.classtype} ${this.classname} `;

        if ( this.extends ) {
            this.code += this.extends;
        }
        this.code += '{\n\n';
    }

    generateFooter() {
        this.code += '\n}';
    }

    generate() {
        this.generateHeader();
        this.code += this.body_code;
        this.generateFooter();
        return this;
    }
}

