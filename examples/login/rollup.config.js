import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'bundle.js', // equivalent to --output
  plugins: [
    vue({
      htmlMinifier: {
        caseSensitive: true,
        keepClosingSlash: true
      }
    }),
    buble({
      objectAssign: true
    })
  ],
  external: [
    'blessed-vue',
    'blessed'
  ]
};
