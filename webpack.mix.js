let mix = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/js')
	.js('resources/assets/js/pages/tasks/index.js', 'public/js/pages/tasks')

   .sass('resources/assets/sass/app.scss', 'public/css')

   .version();
