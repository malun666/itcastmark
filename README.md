itcastmark
==========

itcastmark 是一个将markdown文件转换成html网站的可以用Electron打包成全平台的app工具.

## Install

### 命令行安装使用
1. 创建存放app的文件夹，例如  `mkdir /home/malun/itcastmark`
2. 打开终端到 上面创建的目录。 `cd /home/malun/itcastmark`
3. `git clone git@github.com:malun666/itcastmark.git`
4. 确认已经安装electron-prebuilt `npm install -g electron-prebuilt`
5. `electron itcastmark`

### 下载Electron安装包使用
1. 下载Electron包,[淘宝的镜像](https://npm.taobao.org/mirrors/electron)   下个最新版本就行。

2. `mkdir 存放app的目录  &&  cd 存放app的目录`

3. `git clone git@github.com:malun666/itcastmark.git`

4. 把itcastmark目录改名为app，并且 拷贝到Electron的 resources目录下。目录的结构为：    

On macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```
On Windows and Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```
## Usage
1. 点击 选择文件夹按钮
2. 选取 md文件所在的目录
3. 打开目录查看是否有preview目录，ok

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request



## 欢迎fork和反馈

- write by  malun666@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](./license).
