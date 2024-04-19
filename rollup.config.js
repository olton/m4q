import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress';
import pkg from './package.json' assert {type: "json"};
import fs from 'node:fs'

const production = !(process.env.ROLLUP_WATCH),
    sourcemap = !production

const banner = `
/*!
 * Module For Query (m4q, https://metroui.org.ua)
 * Copyright 2012-${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

const source_files = [
    'src/modules/mode.js',
    'src/modules/func.js',

    'src/modules/setimmediate.js',
    'src/modules/promise.js',

    'src/modules/core.js',
    'src/modules/interval.js',
    'src/modules/contains.js',
    'src/modules/script.js',
    'src/modules/prop.js',
    'src/modules/each.js',
    'src/modules/data.js',
    'src/modules/utils.js',
    'src/modules/events.js',
    'src/modules/ajax.js',
    'src/modules/css.js',
    'src/modules/classes.js',
    'src/modules/parser.js',
    'src/modules/size.js',
    'src/modules/position.js',
    'src/modules/attr.js',
    'src/modules/proxy.js',
    'src/modules/manipulation.js',
    'src/modules/animation.js',
    'src/modules/visibility.js',
    'src/modules/effects.js',
    'src/modules/init.js',
    'src/modules/populate.js'
];

let index = ``

source_files.forEach(file => {
    index += fs.readFileSync(file, 'utf8').toString() + "\n\n";
})

index = index.replace('@@VERSION', "v"+pkg.version)

fs.writeFileSync('src/index.js', index, {flag: 'w+'});

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
            sourcemap: false,
            banner,
            plugins: [
            ]
        }
    },
    {
        input: 'src/index.js',
        plugins: [
            progress({clearLine: true})
        ],
        output: {
            file: 'build/m4q.min.js',
            format: 'iife',
            name: 'm4q',
            sourcemap: false,
            banner,
            plugins: [
                terser({
                    keep_classnames: true,
                    keep_fnames: true,
                })
            ]
        }
    },
]