import fs from 'fs';
var path = require('path');
import CleanCSS from 'clean-css';
import postcss from 'postcss';
import minifyHTML from 'html-minifier';
import { Options } from "node-sass";
import cssnano from 'cssnano';
import { buildSassFile, buildHtmlFile, buildOutputFile, nodeSass, mkDir,run_postcss ,renderSass} from './fileUtils';
export default function injectInnerHTML() {
	return {
		name: 'injectInnerHTML',

		async transform(code, id) {		
			const fileName = path.parse(id).base;			
			if(fileName === 'index.scss'){
				//required part, even though returns empty string
				var options = {
					outputStyle: 'compressed',
					data : code,
					includePaths: [
						'./src/scss'
					]
				};

				const { css, map } = await renderSass(options)        
				const cssText = css.toString().trim();			
				const minifiedCss = new CleanCSS({ level: { 2: { all: true } } }).minify(cssText);
				code = minifiedCss.styles;			
				return {
					code: '',
					map: null
				}
				
			}
			if (code.indexOf('@injectHTML') > -1) {				
				const htmlFile = id.replace('.js', '.html');				
				const scssFile = id.replace('.js', '.scss');				
				const scss = fs.readFileSync(scssFile, 'utf8');
				
				var options = {
					outputStyle: 'compressed',
					data : scss,
					includePaths: [
					'./src/scss'
					]
				};

				const { css, map } = await renderSass(options)
				const cssText = css.toString().trim();
				
				const minifiedCss = new CleanCSS({ level: { 2: { all: true } } }).minify(cssText);
				code = code.replace('super();', `super();this.attachShadow({mode:'open'}).innerHTML=\`<style>${minifiedCss.styles}</style>\`;`);
			}
			if(fileName ==="button.scss"){				
				return {
					code: '',
					map: null
				}
			}
			return {
				code: code,
				map: null
			};
		}
	};
}