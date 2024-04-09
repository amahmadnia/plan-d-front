const CracoLessPlugin = require('craco-less');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars:
                            {
                                '@primary-color': '#1d3557',
                                '@link-color': '#d1d5d9',
                                '@warning-color': '#fdff79',
                                '@error-color': '#e63946',
                                '@success-color': '#52c41a',
                                '@heading-color': '#1b1f29',
                                '@text-color': '#9299a0',
                                '@text-color-secondary': '#2a3240',
                                '@border-color-base': '#000000',

                            },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};