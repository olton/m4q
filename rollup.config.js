import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress';

const production = !(process.env.ROLLUP_WATCH),
    sourcemap = !production

const banner = `
/*!
 * Module For Query (m4q, https://metroui.org.ua)
 * Copyright 2012-${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

export default [
    {
        input: 'src/index.js',
        plugins: [
            progress({clearLine: true})
        ],
        output: {
            file: 'build/m4q.js',
            format: 'iife',
            name: 'm4q',
            sourcemap,
            banner,
            plugins: [
                production && terser({
                    keep_classnames: true,
                    keep_fnames: true,
                })
            ]
        }
    },
]