const { src, watch, dest } = require('gulp'), sass = require('gulp-sass'), notify = require('gulp-notify'), plumber = require('gulp-plumber'), glob = require('gulp-sass-glob');
const paths = { sass: '../website/public/resources/sass/**/*.scss', css: '../website/public/assets/css' }

function compile()
{
    return src(paths.sass)
        .pipe(glob())
        .pipe(
            plumber({
                errorHandler: function(err)
                {
                    notify.onError({ title: 'SASS / Gulp', message: err.message})(err);
                    this.emit('end');
                }
            })
        )
        .pipe(
            sass({
                outputStyle: 'compressed',
                includePaths: [
                    '/Library/Ruby/Gems/2.3.0/gems/bourbon-4.3.4/app/assets/stylesheets',
                    '/Library/Ruby/Gems/2.3.0/gems/neat-1.9.1/app/assets/stylesheets'
                ]
            })
        )
        .pipe(dest(paths.css));
}

exports.compile = compile;
exports.default = compile;

watch(paths.sass, compile);