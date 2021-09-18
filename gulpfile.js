//Определяем константы Gulp
const { src, dest, watch, parallel, series } = require('gulp');
//подключаем Gulp-sass
const scss        = require('gulp-sass');

const concat      = require('gulp-concat');

const browserSync = require('browser-sync').create();

const uglify      = require('gulp-uglify-es'). default;

const autoprefixer = require('gulp-autoprefixer');
// Подключаем gulp-imagemin для работы с изображениями
const imagemin     = require('gulp-imagemin');

const del          = require('del');

const tildeImporter = require('node-sass-tilde-importer');


function browsersync(){
	browserSync.init({
		server: {
			baseDir: "app/"
		},
		online: true
	});

}

function cleanDist(){
	return del('dist')
}

function images() {

	return src('app/img/**/*')// Берём все изображения из папки источника
	// Сжимаем и оптимизируем изображеня
	.pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]
))
	.pipe(dest('dist/img'))// Выгружаем оптимизированные изображения в папку назначения
}

function scripts(){

	return src([//Берем файлы из источников
	'node_modules/jquery/dist/jquery.js',//Пример подключения библиотеки Jquery
	'node_modules/slick-carousel/slick/slick.min.js',//Подключение библиотеки слайдера
	'node_modules/wow.js/dist/wow.min.js',
	'app/js/main.js',//Пользовательские скрипты, использующие библиотеку,должны быть подключены в конце

	])
	.pipe(concat('main.min.js'))//Конкатенируем в один файл
	.pipe(uglify())//Сжимаем JavaScript
	.pipe(dest('app/js/'))//Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream())//Триггерим Browsersync для обновления страницы
}

function css(){
	return src([//Берем файлы из источников
		'node_modules/normalize.css/normalize.css',
		'node_modules/slick-carousel/slick/slick.css',
		'node_modules/animate.css/animate.css'
		])
	.pipe(concat('_libs.scss'))//конкатинируем в один файл
	.pipe(dest('app/scss'))//выгружаем в папку app
	.pipe(browserSync.stream())//Обновляем страницу

}
function styles() {
return src('app/scss/style.scss')// Выбираем источник: "app/scss/style.scss"
	.pipe(scss({outputStyle: 'compressed'}))//Сжимаем
	.pipe(concat('style.min.css'))// Конкатенируем в файл style.min.css 
	.pipe(autoprefixer({ // Создадим префиксы с помощью Autoprefixer
		overrideBrowserslist: ['last 10 version'],
		grid: true
	}))
	.pipe(dest('app/css'))// Выгрузим результат в папку "app/css/"
	.pipe(browserSync.stream())// Сделаем инъекцию в браузер

}

function build() {
	return src([
		'app/css/style.min.css',
		'app/fonts/**/*',
		'app/js/main.min.js',
		'app/*.html'

		], {base: 'app'})
	.pipe(dest('dist'))
}
 
function watching() {
	watch(['app/scss/**.scss'], styles);
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['app/js/**/*.js','!app/js/main.min.js'], scripts);
	// Мониторим файлы HTML на изменения
	watch(['app/*.html']).on('change', browserSync.reload);
	watch('app/img/**/*',images);
}
// Экспортируем функцию styles() в таск styles
exports.styles   = styles;
exports.watching = watching;
//Экспортируем функцию browsersync() как таск browsersync.Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist,images,build);
// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles,scripts, css, browsersync, watching);



