const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const glob = require("glob");
// 多页面通用的配置
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"))
    // console.log(entryFiles)
    entryFiles.map((item, index)=>{
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js$/)
        // console.log(match)
        const pageName = match && match[1]
        // 生成entry
        entry[pageName]= entryFile
        // 生成htmlplugins
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `./src/${pageName}/index.html`),
                title: pageName,
                filename: `${pageName}.html`,
                chunks: [pageName]
            }),
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const {entry, htmlWebpackPlugins} = setMPA()

// console.log(entry)
// console.log(htmlWebpackPlugins)

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules:[]
    },
    plugins:[
        ...htmlWebpackPlugins
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',
        //     title: "首页",
        //     filename: 'index.html',
        //     chunks: ['index']
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/list.html',
        //     title: "首页",
        //     filename: 'list.html',
        //     chunks: ['list']
        // }),
        // new HtmlWebpackPlugin({
        //     template: './src/detail.html',
        //     title: "首页",
        //     filename: 'detail.html',
        //     chunks: ['detail']
        // }),
    ]
}

// hash
// Chunkhash
// contentHash
