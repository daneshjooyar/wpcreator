module.exports = class PluginOption {

    args = []

    plugin_name;

    plugin_slug;

    plugin_directory;

    plugin_author;

    plugin_description;

    plugin_version;

    plugin_license;

    plugin_author_uri;

    namespace;

    constant_prefix;

    core_function;

    constructor() {

    }

    set_args( arr ) {

        this.args               = arr;

        this.plugin_name        = this.args.length >= 2 ? this.args[2] : false;
        this.plugin_slug        = this.plugin_name.toLowerCase().replace( /\s+/g, '-' );
        this.namespace          = this.plugin_name.split( ' ' ).map( word => word.charAt(0).toUpperCase() + word.slice(1) ).join( '' );
        this.constant_prefix    = this.plugin_name.toUpperCase().replace(/\s+/g, '_' );
        this.core_function      = this.plugin_name.toLowerCase().replace(/\s+/g, '_' );

    }

    get_plugin_name() {
        return this.plugin_name;
    }

    get_plugin_slug() {
        return this.plugin_slug;
    }

    get_plugin_namespace() {
        return this.namespace;
    }

    get_plugin_constant_prefix() {
        return this.constant_prefix;
    }

    get_plugin_core_function() {
        return this.core_function;
    }

}