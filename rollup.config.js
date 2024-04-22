import terser from '@rollup/plugin-terser'
import progress from 'rollup-plugin-progress';
import pkg from './package.json' assert {type: "json"};
import fs from 'node:fs'

const production = process.env.NODE_ENV === 'production',
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
    'src/modules/helpers.js',

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
    'src/modules/state.js',
    'src/modules/init.js',
];

let lib = ``, index = ``

;[...source_files, 'src/modules/populate.js'].forEach(file => {
    lib += fs.readFileSync(file, 'utf8').toString() + "\n\n";
})

;[...source_files, 'src/modules/export.js'].forEach(file => {
    index += fs.readFileSync(file, 'utf8').toString() + "\n\n";
})

lib = lib.replace('@@VERSION', pkg.version)
lib = lib.replace('@@BUILD_TIME', new Date().toLocaleString())
index = index.replace('@@VERSION', pkg.version)
index = index.replace('@@BUILD_TIME', new Date().toLocaleString())

fs.writeFileSync('src/lib.js', lib, {encoding: 'utf8', flag: 'w+'});
fs.writeFileSync('src/index.js', index, {encoding: 'utf8', flag: 'w+'});

const plugins = [
    progress({clearLine: true})
]

const watch = {
    clearScreen: false
}

export default [
    {
        input: 'src/lib.js',
        watch,
        plugins,
        output: {
            file: 'lib/m4q.js',
            format: 'iife',
            name: 'm4q',
            sourcemap: false,
            banner,
            plugins: [
            ]
        }
    },
    {
        input: 'src/lib.js',
        watch,
        plugins,
        output: {
            file: 'lib/m4q.min.js',
            format: 'iife',
            name: 'm4q',
            sourcemap,
            banner,
            plugins: [
                terser({
                    keep_classnames: true,
                    keep_fnames: true,
                })
            ]
        }
    },
    {
        input: 'src/index.js',
        watch,
        plugins,
        output: {
            file: 'dist/m4q.cjs.js',
            format: 'cjs',
            banner,
        }
    },
    {
        input: 'src/index.js',
        watch,
        plugins,
        output: {
            file: 'dist/m4q.esm.js',
            format: 'esm',
            banner,
        }
    },
]