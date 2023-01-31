/**
 * Polyfills
 */
require('es6-promise').polyfill();

/**
 * Plugins
 */
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const fs = require('fs');
const gulp = require('gulp');
const log = require('fancy-log');
const mqpacker = require('css-mqpacker');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');

/**
 * Load Config Files
 */
const paths = require('./sdg-build/paths.json');
// const scripts = require('./sdg-build/scripts.json');
const sprites = require('./sdg-build/sprites.json');
const stylesheets = require('./sdg-build/stylesheets.json');

/**
 * Log error
 */
function logError(err) {
    log.error(err.toString());
}

/**
 * Clean sprites
 */
gulp.task('cleanSprites', () => {
    const fileName = `${paths.pub}sprite-icon-*.svg`;

    return gulp.src(fileName, {read: false})
        .pipe(clean());
});

/**
 * Create svg sprites
 */
function spriteTask(key) {
    const taskName = `${key}Svg`;
    const taskDir = `${sprites.dir + key}/*`;
    const taskSassDest = `${sprites.scss}_${key}.scss`;
    const taskFileName = `sprite-${key}.svg`;

    gulp.task(taskName, () => {
        return gulp.src(taskDir)
            .pipe(svgSprite({
                shape: {
                    dimension: {
                        precision: 0,
                        attributes: true
                    },
                    spacing: {
                        padding: '1',
                        box: 'content'
                    }
                },
                mode: {
                    css: {
                        dest: '',
                        layout: 'vertical',
                        bust: true,
                        sprite: taskFileName,
                        render: {
                            scss: {
                                dest: taskSassDest,
                                template: sprites.tpl
                            }
                        },
                        prefix: `${key}--%s`,
                        recursive: true,
                        example: false,
                        common: key,
                        mixin: `${key}-svg`
                    }
                }
            }))
            .on('error', logError)
            .pipe(gulp.dest(paths.pub));
    });
}

/**
 * Register sprite tasks
 */
const spriteTasks = [];
const spritesList = sprites.list;

spritesList.forEach((val) => {
    spriteTask(val);
    spriteTasks.push(`${val}Svg`);
});

/**
 * Task to generate all sprites
 */
gulp.task('sprites', gulp.series('cleanSprites', ...spriteTasks));

/**
 * Sass task
 */
function sassTask(key) {
    const taskName = `${key}Sass`;
    const taskDir = `${paths.scss + key}.scss`;

    gulp.task(taskName, () => {
        return gulp.src(taskDir)
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'expanded',
            }))
            .on('error', sass.logError)
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('./sourcemaps'))
            .pipe(gulp.dest(paths.css));
    });
}

/**
 * Combine media queries
 * @param {String} key name of css file
 */
function sassMqPackTask(key) {
    const taskName = `${key}MqPack`;
    const taskDir = `${paths.css + key}.css`;
    const pattern = /^\s*\.q\s*\{[^}]*\}/gm;

    gulp.task(taskName, gulp.series(`${key}Sass`, () => {
        const css = fs.readFileSync(taskDir, 'utf8');
        const result = mqpacker.pack(css, {
            from: taskDir,
            to: taskDir
        });

        fs.writeFileSync(taskDir, result.css);

        return gulp.src(taskDir, {
            base: taskDir,
        })
            .pipe(replace('"{{', '{{'))
            .pipe(replace('}}"', '}}'))
            .pipe(replace(pattern, ''))
            .pipe(gulp.dest(taskDir))
            .pipe(gulp.dest(`${paths.pub + key}.scss.liquid`));
    }));
}

/**
 * Register sass tasks
 */
const sassTasks = [];
const mqPackTasks = [];
const stylesheetList = stylesheets.list;

stylesheetList.forEach((val) => {
    sassTask(val);
    sassMqPackTask(val);
    sassTasks.push(`${val}Sass`);
    mqPackTasks.push(`${val}MqPack`);
});

/**
 * Task to build css
 */
gulp.task('sass', gulp.series(...mqPackTasks));

/**
 * Watch task
 */
gulp.task('watch', () => {
    const allMqPackTasks = [];

    /**
     * Sprites - register a watch task for each files in the sprites array
     */
    Object.keys(sprites.list).forEach((key) => {

        let val = '';

        if (sprites.list.hasOwnProperty(key)) {
            val = sprites.list[key];
        }

        const dir = `${sprites.dir + val}/*`;

        gulp.watch(dir, gulp.series(`${val}Svg`)).on('error', logError);
    });

    /**
     * Styles - register a watch task for each files in the styles array
     */
    stylesheets.list.forEach((styleSheet) => {

        const file = `${paths.scss + styleSheet}.scss`;
        const dir = `${paths.scss + styleSheet}/**/*`;

        gulp.watch([file, dir], gulp.series(`${styleSheet}MqPack`)).on('error', logError);

        // push MqPack tasks to array
        allMqPackTasks.push(`${styleSheet}MqPack`);
    });

    /**
     * Core styles - watch core sass files and rebuild all css if there's a change.
     */
    gulp.watch([`${paths.scss}core/**/*.scss`], gulp.series(allMqPackTasks))
        .on('error', logError);
});

// Default Task
gulp.task('default', gulp.series('sprites', 'sass'));
