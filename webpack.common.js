const path = require('path')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const PATHS = {
    root: path.resolve(__dirname, '../../'),
    frontend: path.resolve(__dirname, '../'),
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../../js/mypage'),
}

const ALIASES = {
    '@': PATHS.src,
    '@context': `${PATHS.src}/theme/context`,
    '@globalActions': `${PATHS.src}/redux/globalActions`,
    'chart.js': 'chart.js/dist/Chart.min.js'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    context: PATHS.src,
    entry: {
        'student.profile.confirm': './pages/StudentProfileConfirm/index.ts',
        'student.profile': './pages/StudentProfile/index.ts',
        'base.of.students': './pages/BaseOfStudents/index.ts',
        'test.results': './pages/TestResults/index.ts',
        'header.menu': './components/MenuAndLegend/AppMenu/index.tsx',
        'table.legend': './components/MenuAndLegend/AppLegend/App/index.tsx',
        'cards.of.projects': './pages/ProjectsCard/index.ts',
        'fieb.activity': './pages/FiebActivity/index.ts',
        'fieb.work.groups': './pages/FiebWorkGroups/index.ts',
        'fieb.coupon.codes': './pages/FiebCouponCodes/index.ts',
        'statistic': './pages/Statistic/index.ts',
        'test.plan.control': './pages/TestPlanControl/index.ts',
        'pedan.fepo': './pages/PedanFepo/index.ts'
    },
    output: {
        path: PATHS.dist,
        filename: '[name].min.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]((?!(chart.js|moment|leaflet|react-leaflet|react-table)).*)[\\/]/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
        alias: ALIASES
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: '../node_modules/semantic-ui-css/semantic.min.css',
                    to: `${PATHS.root}/css/semantic`
                }, 
                {
                    from: '../node_modules/semantic-ui-css/themes',
                    to: `${PATHS.root}/css/semantic/themes`
                }
            ]
        }),
        new ReplaceInFileWebpackPlugin([{
            dir: `${PATHS.root}/css/semantic`,
            files: ['semantic.min.css'],
            rules: [{
                search: /(@import url).+(fonts.googleapis.com).+\;/,
                replace: ''
            }]
        }]),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: `${PATHS.frontend}/tsconfig.json`
            }
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['ru'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [/style\.css/]
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].ext'
                }
            },
            {
                test: /\.m?js$/,
                resolve: {
                  fullySpecified: false
                }
            }
        ]
    }
}
