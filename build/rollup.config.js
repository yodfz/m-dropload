import babel from 'rollup-plugin-babel';
import es2015Rollup from 'babel-preset-es2015-rollup';

export default {
    entry: './src/core/index.js',
    plugins: [babel({presets: [es2015Rollup]})],
    format: 'umd',
    dest: './dist/Mdropload.rollup.js',
    moduleName: 'Mdropload'
};