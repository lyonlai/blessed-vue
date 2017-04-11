import vue from 'rollup-plugin-vue2';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'bundle.js', // equivalent to --output
  plugins: [
    vue(),
    buble({
      objectAssign: true
    })
  ],
  external: [
    'blessed-vue',
    'blessed'
  ]
};
