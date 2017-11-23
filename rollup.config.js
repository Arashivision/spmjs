import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/tracker.js',
    format: 'iife',
    globals: {
      // jquery: '$',
    },
  },
  plugins: [
    commonjs({
      include: 'node_modules/**', // Default: undefined
    }),
    serve(),
    livereload({ watch: 'dist' }),
    resolve(),
    babel({ exclude: 'node_modules/**' }), // 只编译我们的源代码
    production && uglify(),
  ],
  sourceMap: true,
};
