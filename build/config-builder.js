// eslint-disable-next-line import/no-extraneous-dependencies
import { terser } from 'rollup-plugin-terser';

import pkg from '../package.json';

const year = new Date().getFullYear();

function getBanner(name) {
  return `/*!
  * ${name} ${pkg.version} - https://photoswipe.com
  * (c) ${year} Dmytro Semenov
  */`;
}

function getMinifyPlugin() {
  return terser({
    output: {
      comments: /^\**!/i,
    },
    mangle: {
      properties: {
        // mangle properties and func names that start with underscore
        regex: /^_/,
      }
    }
  });
}

// UMD config
const umdBaseOutputDir = 'dist-umd/';

export const umdMinCoreJS = {
  input: 'photoswipe-dynamic-caption-plugin.esm.js',
  output: {
    name: 'PhotoSwipeDynamicCaption',
    banner: getBanner('PhotoSwipe'),
    file: umdBaseOutputDir + 'photoswipe-dynamic-caption-plugin.umd.min.js',
    format: 'umd',
  },
  plugins: [getMinifyPlugin()]
};
