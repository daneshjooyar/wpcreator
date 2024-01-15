# WPCreator: a package for speed up plugin development

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/daneshjooyar/wpcreator/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/daneshjooyar/wpcreator/?branch=master)
[![Node Version](http://img.shields.io/node/v/commander.svg?style=flat)](https://www.npmjs.org/package/wpcreator)
[![Download Count](https://img.shields.io/npm/dt/wpcreator.svg)](https://www.npmjs.org/package/wpcreator)

You can generate boilerplate WordPress plugin with simple commands

## install

use below command for install ``wpcreator`` globally:

```
npm install -g wpcreator
```

## Generate Boilerplate Plugin

###1. Create plugin base
Go to directory that must contain your plugin such as ``/wp-content/plugins/`` and generate your base plugin:
```
cd {wordpress_dir}/wp-content/plugins/

wpcreator plugin "Daneshjooyar Course Shop"
```
Or use ``npx`` tool:

```
npx wpcreator plugin "Mypluygin"
```

### 2. Install plugin composer for active namespace

Go to new plugin directory and install composer:
```
cd daneshjooyar-course-shop
composer install
```
### 3. Install Vue panel dependencies

For install VueJs panel for to ``Panel`` directory and run below command:
```
cd Panel
npm install
```
**Note:** For dev mode VueJs panel define ``PANEL_DEBUG`` in ``wp-config.php`` file:
```php
define( 'PANEL_DEBUG', true );
```
