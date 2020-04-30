const { override, fixBabelImports,addLessLoader } = require('customize-cra');
module.exports = override(
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@brand-primary':'#1cae82',
            '@brand-primary-tap':'#1DA57A'},
    }),
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            style: true,
        }),
);


