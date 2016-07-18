// const electron = require('electron');
// const remote = electron.remote;
const mainProcess = require('./dialogHelper');
const fs = require('fs');
const open = require('open');
const generator = require('./MdToHtml');
const path = require('path');
const { shell } = require('electron');

module.exports = function () {

  $ = window.$ = window.jQuery;

  $(function () {

    $('.result').on('click', 'span', function () {
      var dir = $(this).attr('path');
      shell.showItemInFolder(dir);
    });

    $('.result').on('click', 'button.generate', function () {
      var dir = $(this).attr('path');
      generatePath([dir]);
    });

    $('.result').on('click', 'button.open', function () {
      var dir = $(this).attr('path');
      open(dir);
    });

    $("#btnOpenDir").click(function () {
      // 打开文件夹，然后生成目录
      mainProcess.selectDir(generatePath);
    });

    $('#btnClear').click(function () {
      $('.result').html('');
    });
  });

  
  /**
   * 
   * @param {array} paths  要生成html的md的路径的文件夹
   */
  function generatePath(paths) {
    // 拼接生成表格的字符串
    var tempFolder = '<tr>';
    tempFolder += '     <td>';
    tempFolder += '       <span path="' + paths[0] + '/preview/" class="btn">';
    tempFolder += '         路径转换成功：' + paths[0] + ' ';
    tempFolder += '       </span><br/>';
    tempFolder += '       <span path="' + paths[0] + '/preview/" class="btn btn-success">打开文件夹</span>';
    tempFolder += '       <button class="generate btn btn-success" path="' + paths[0] + '/">再次生成</button>';
    tempFolder += '     </td>';
    tempFolder += '  </tr>';
    $('.result').append(tempFolder);

    fs.readdir(paths[0], 'utf8', function (error, fileNames) {
      fileNames.forEach(function (item) {
        var ext = item.split('.').pop();
        var file_name = item.split('.').shift();
        if (ext != 'md') {
          return;
        }
        generator(paths[0], path.join(paths[0], item), path.join(paths[0], '/preview/', file_name + '.html'));
        var temp = '<tr>';
        temp += '       <td>';
        temp += '         <button class="open btn btn-success" path="' + paths[0] + '/preview/' + file_name + '.html">在浏览器中打开</button>';
        temp += '         <span class="btn" path="' + paths[0] + '/preview/">';
        temp += '           <small>转换文件成功！ 文件：' + item + '</small>';
        temp += '         </span>';
        temp += '       </td>';
        temp += '  <tr>';
        $('.result').append(temp);
      });// end of forEach
    });// end of fs.readdir
  }// end of function generatePath
};
