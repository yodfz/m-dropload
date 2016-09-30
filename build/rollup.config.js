import babel from 'rollup-plugin-babel';
import es2015Rollup from 'babel-preset-es2015-rollup';

export default {
    entry: './src/index.js',
    // plugins: [babel({presets: [es2015Rollup]})],
    format: 'umd',
    dest: './dist/MDropload.rollup.js',
    moduleName: 'MDropload'
};