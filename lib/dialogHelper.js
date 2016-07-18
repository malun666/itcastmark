const { dialog } = require( 'electron' ).remote;
const win = require( 'electron' ).remote.getCurrentWindow();

exports.selectDir = function( callback ) {
  console.log('开始选择文件！！');
  dialog.showOpenDialog( win, {
    properties: [ 'openDirectory' ]
  }, callback );
};

exports.saveDialog = function( opt, callback ) {
  opt = opt || {
    title: "保存文件",
    buttonLable: "保存"
  };
  dialog.showSaveDialog( win, opt, callback );
}
