'use strict';
require('shelljs/global');
let assign = require('object-assign');
let fs = require('fs');
let BufferHelper = require('bufferhelper');
let Handlebars = require('handlebars');
// let open = require("open");
let copyDir = require('./copy');

function generator(pwd, source_file_name, dest_file_path, is_open) {
	//拿到文件名：   /user/demo/readme.md  →  readme.md
	var file_name = source_file_name.split('/').pop();;
	// readme.md →  readme
	var _file_name = file_name.split('.')[0];
	
	var is_debug = false;
	function log(str){
		if(is_debug == true)
			console.log(str);
	}
  
	// 点号表示当前文件所在路径  
	var str = fs.realpathSync('.');  
	log(str);  
	
	//函数可以返回当前正在执行的项目路径
	var pwd = pwd
	//:属性返回的是  nodejs 的安装路径 
	// processor.execPath 
	
	var preview_path = pwd + '/preview';
	
	var source_file_path = source_file_name;
	
	var dest_file_path = dest_file_path;
	
	if (test('-d', preview_path)) { 
		/* do something with dir */ 
		mkdir('-p', preview_path);
	};
	
	//当前根目录
	var curDir = __dirname.substr(0,__dirname.length - 3 );
	console.log('curDir: ' + curDir);

	cp_template_dir(curDir, preview_path);
	// _toc_config(curDir, preview_path);
	
	function cp_template_dir(_cur_dir,_dest_dir){
		var i = _cur_dir;
		log(i);
	
		// cp('-R', _cur_dir +'/vendor/toc', _dest_dir+'/');
		copyDir(_cur_dir +'/vendor/', _dest_dir+'/');
	}
	
  function _toc_config(_cur_dir,_dest_dir){
		if (test('-d', _dest_dir + "/toc_conf.js")) { 
			log('toc_conf file exist')
		}else{
     // cp('-R', _cur_dir +'/vendor/toc_conf.js', _dest_dir+'/');
     copyDir(_cur_dir +'/vendor/toc_conf.js', _dest_dir+'/');
		}
  }
	
	// var template_path = __dirname + '/vendor/template.html';
	var template_path = curDir + '/template.html';

	log('template_path = ' + template_path);
	
	fs.readFile(source_file_path, function (err, data) {
	  if (err) throw err;
	  log(data);
		
    // var rs = fs.createReadStream(template_path, {encoding: 'utf-8', bufferSize: 11});
    var rs = fs.createReadStream(template_path, {bufferSize: 11}); 
		var bufferHelper = new BufferHelper();

		rs.on("data", function (trunk){
				bufferHelper.concat(trunk);
		});
	
		rs.on("end", function () {
			var source = bufferHelper.toBuffer().toString('utf8');
			var template = Handlebars.compile(source);
		
			log(template);
		
			var	marked = require('marked');	
			// marked = require('gulp-markdown-livereload');
			marked(data.toString(),{}, function (err, data) {
				if (err) {
					log('err ' + err);
					return;
				}
				log(data);
			
				var css_link = "ddsds";
				var data1 = {
					"title":"itcastmark:" + _file_name,
					"parse_markdown": data
				};
		
				var final_html_content = new Buffer( template(data1) );
				fs.writeFile(dest_file_path, final_html_content , function (err) {
				  if (err) throw err;
				  log('It\'s saved!');
					
					if(is_open == true){
						// 如果想要在生成完之后，打开生成的html，可以放开下面的代码，还要保证open的包要装行
						// 
						// 
						// open(dest_file_path);
					}
				});
			});
		});
	});
};

module.exports = generator


