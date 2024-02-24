import fs from 'fs'
import path from 'path'
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass'
import commonjs from 'rollup-plugin-commonjs'
const packageJson = require('./package.json')
const replace = require('rollup-plugin-replace'); // use to setup project environment variables
const distDirectory = path.join(__dirname, './dist')
const srcDirectory = path.join(__dirname, './src')
//https://github.com/baloise/design-system/blob/b607f3db6c9fbb6656190202c7ac22e9d4da73cf/rollup.base.js#L8
// output: isIndex ? path.join( 
//https://github.com/LLLLLamHo/zzc-design-mobile/blob/5a7fcbae053846d8fe913311c80038157685e9f7/config/inputOption.js#L8
//https://github.com/keeev/tippyjs/tree/53ba41eaf8784c5928b10566415d7f1736218f42?tab=readme-ov-file
//https://github.com/GoogleChromeLabs/squoosh/blob/e217740e536c4ee30e5d0e013281d1c25663dcf3/lib/css-plugin.js#L111
//run_postcss
//https://github.com/mediagoom/chunk-upload/blob/1cecec552ca5c224282ca77726f8daa00e98e338/rollup.config.js#L47
const packagejson = require('./package.json');


import json from 'rollup-plugin-json';
//import html from '@rollup/plugin-html';



import scss from 'rollup-plugin-scss';

import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';
import { plugins } from './rollup-config/plugins.js';
import { getModules } from './rollup-config/getModules.js';
let dev = process.env.NODE_ENV == 'local';

const modules = !dev ? getModules() : [];


const cssPrefix = `.${packagejson.name.replace('@axa-ch/', '').replace(new RegExp('-', 'g'),'')}`;
  const sassOptions = {output:true};
  sassOptions.processor = css => postcss([cssnano]).process(css,{from:undefined}).then(result => 
	  {
		//  console.log("rrrrr:"+result.css);
		  result.css;});
		  
		  
		  function getSassOptions(minify = false) {
  const postcssPlugins = [
    autoprefixer({
      grid: false
    })
  ];

  if (minify) {
    postcssPlugins.push(cssnano());
  }
  return {
    output(styles, styleNodes) {
  /*    fs.mkdirSync('dist/css', { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
      });
*/
      styleNodes.forEach(({ id, content }) => {
        const scssName = id.substring(id.lastIndexOf('/') + 1, id.length);
        const [name] = scssName.split('.');
      
      });
    },
    processor: (css) => postcss(postcssPlugins)
      .process(css, {
        from: undefined
      })
      .then((result) => result.css)
  };
}
export default [
	{
		input: './src/index.js',
		 output: {
    format: 'umd',
	 file: packageJson.main,
	name : 'testzoo'
  },
		plugins: plugins
		
		/*[
		sass({
        options: {
          outputStyle: 'compressed'
        },
        output (styles, styleNodes) {
          styleNodes.forEach(obj => {
			  const fileName = path.parse(obj.id).base
         //   const name = obj.id.replace(/^.*[\\\/]/, '').replace('.scss', '.min.css')
			if(fileName === 'index.scss'){
				console.log("YES .scss");
			}
			if(fileName != 'index.scss'){
				console.log("no .scss:"+fileName);
			}
			if (code.indexOf('@injectHTML') > -1) { 
			}
         // console.log("obj.content:"+obj.content);
          })
        },
        processor: css =>
          postcss([autoprefixer])
            .process(css)
            .then(result => {
				console.log("PROCESSING PROCESSING");
			result.css})
      }),
		]
		*/
	},
	...modules
];