const isProd = process.env.NODE_ENV == 'production';
const url = isProd ? '/54-novel/' : '';

module.exports = {
    assetPrefix: url
};