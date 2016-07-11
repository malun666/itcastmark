// const electron = require('electron');
// const remote = electron.remote;
const mainProcess = require( './dialogHelper' );
const fs = require( 'fs' );
const generator = require( './MdToHtml' );
const path = require( 'path' );
const { shell } = require( 'electron' );

module.exports = function() {

  $ = window.$ = window.jQuery;

  $( function() {

    $( '.result' ).on( 'click', 'span', function() {
      var dir = $( this ).attr( 'path' );
      shell.showItemInFolder( dir );
    } );

    $( "#btnOpenDir" ).click( function() {

      mainProcess.selectDir( function( paths ) {
        $( '.result' ).append( '<tr><td><span path="' + paths[ 0 ] + '/preview/" class="btn btn-info">开始转换文件夹路径是：' + paths[ 0 ] + '  [点击打开文件夹]</span></td></tr>' );
        fs.readdir( paths[ 0 ], 'utf8', function( error, fileNames ) {
          fileNames.forEach( function( item ) {
            var ext = item.split( '.' ).pop();
            var file_name = item.split( '.' ).shift();
            if ( ext != 'md' ) {
              return;
            }
            // console.log("filename: " + file_name);

            generator( paths[ 0 ], path.join( paths[ 0 ], item ), path.join( paths[ 0 ], '/preview/', file_name + '.html' ) );

            $( '.result' ).append( '<tr><td><span class="btn btn-success" path="' + paths[ 0 ] + '/preview/">' + item + '  转换成功！[点击打开文件夹]</span></td></tr>' );
          } );
        } );
      } );
    } );

    $('#btnClear').click(function(){
      $('.result').html('');
    });
  } );
};
