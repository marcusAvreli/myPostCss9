import sass from 'node-sass';
import { render } from "node-sass";

import mkdirp from 'mkdirp';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
export function buildSassFile(fileName) {
	console.log("buildSassFile:"+fileName);
  const srcIndex = fileName.indexOf('src');
  console.log("buildSassFile_1");
  const partFile = fileName.substring(srcIndex);
  console.log("buildSassFile_2");
  return partFile.replace('.js', '.scss');
}

export function buildHtmlFile(fileName) {
  const srcIndex = fileName.indexOf('src');
  const partFile = fileName.substring(srcIndex);
  return partFile.replace('.js', '.html');
}

export function buildOutputFile(fileName) {
  const srcIndex = fileName.lastIndexOf('\\');
  console.log("src_index:"+srcIndex);
  const partFile = fileName.substring(srcIndex);
  console.log("partFile:"+partFile);
  const directory = fileName.substring(fileName.indexOf('\\')).replace(partFile, '');
  console.log("directory:"+directory);
  mkDir(`dist${directory}`);
  return `dist${directory}${partFile}`;
}
export const renderSass = (options) => new Promise((resolve, reject) => render(options,(err, res) => {
    if (err)
        return reject(err);
    return resolve(res);
}));

export function run_postcss(css, id)
{
    const options = {
        from : id
    };

    const processor =  postcss([autoprefixer]);

    return new Promise((resolve, reject) =>{
        
        const lazy = processor.process(css, options);
        
        lazy.then( (result) => { 
            //debugger;
            resolve(result.css); 
        }).catch(error => { reject(error); });
    });
}
export function nodeSass(code,id) {	
  return sass.renderSync({
     file: id,
    outputStyle: 'compressed',
   data : code
  
 
  });
}

export function mkDir(dir) {
  return mkdirp.sync(dir);
}