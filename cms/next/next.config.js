const isProd = process.env.NODE_ENV == 'production';
const url = isProd ? 'https://ujiqn.github.io/54-novel/' : '';

module.exports = {
    assetPrefix: url
};