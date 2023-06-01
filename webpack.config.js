const path = require('path')
const  HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



// Ця змінна допомагає зрозуміти в якому режимі зборкі  ми знаходимся  
const isDev = process.env.NODE_ENV === 'development'// якщо вона рівняється до девелопмент то тоді змінна isDev буде знаходитись в значені ТРУ, якщо продакшн то фолс
const isProt = !isDev // якщо продакшн будемо предавати 

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProt) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
 const loaders = [
        {
            loader: MiniCssExtractPlugin.loader
                // hot: true
                // Тут на пряму вказуємо що це лоадер 
            // use: cssLoaders()
        },
        'css-loader'
 ]
    if (extra) {
        loaders.push(extra) // Якщо параметр визначений то тоді в масив Лоадерс за допомогою методу пуш додаємо екстра 
    }
    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ],
        plugins: [
            '@babel/plugin-proposal-class-proporties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)// Якщо у нас preset то тоді opts.presets ми додаємо новий preset// Це робиться для того щоб прибрати дублікацію
    }
    return {
        opts
    }
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.pusj('eslint-loader')
    }

    return loaders

}
const plugins = () => {
    const base = [
        [
            new HTMLWebpackPlugin({
                template: './index.html',
                minify: {
                    collapseWhitespace: isProt //Додаємо оптимізацію якщо у нас буде продакшн
                }
            }),
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns:[
                {
                    from: path.join(__dirname, 'src/favicon.ico'),
                    to: path.join(__dirname, 'dist')
                }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
        ]
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }
    return base 
}

module.exports = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index/jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js','.json','.png']
    },
    optimization: optimization(), //Викликаємо функцію, буде повертати згенерований об'єкт
    devServer: {
        port: 4200,
        hot: true
    },
    devtool: isDev ? 'source-map' : '', // якщо ? ми знаходимся в режимі розробки то тоді будемо добавляти SourceMap а інакше будемо добавляти '' пусту строчку  // Вихідні карти нам потрібні бдуть якщо ми будемо розробляти 
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader') // Компактнули код
            },
            {
                test: /\.(sass|scss)$/,
                use: cssLoaders('sass-loader') // Компактнули код
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource' // Дозволяє вебпаку розуміти формати 
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,// Нам з пошуку потрібно прибрати node-module папку де зберігаються вихідні файли бібліотек які нам потрібно пропустити при обробці 
                use: jsLoaders()
            
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,// Нам з пошуку потрібно прибрати node-module папку де зберігаються вихідні файли бібліотек які нам потрібно пропустити при обробці 
            use: {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,// Нам з пошуку потрібно прибрати node-module папку де зберігаються вихідні файли бібліотек які нам потрібно пропустити при обробці 
        use: {
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-react')
    }
  }
        ]
    }
}
