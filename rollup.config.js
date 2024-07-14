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
    'src/modules/bind.js',
    'src/modules/manipulation.js',
    'src/modules/animation.js',
    'src/modules/visibility.js',
    'src/modules/effects.js',
    'src/modules/init.js',
];

let lib = ``, ind = ``

;[...source_files, 'src/modules/populate.js'].forEach(file => {
    lib += fs.readFileSync(file, 'utf8').toString() + "\n\n";
})

;[...source_files, 'src/modules/export.js'].forEach(file => {
    ind += fs.readFileSync(file, 'utf8').toString() + "\n\n";
})

lib = lib.replace(/version = ".+"/g, `version = "${pkg.version}"`)
lib = lib.replace(/build_time = ".+"/g, `build_time = "${new Date().toLocaleString()}"`)
ind = ind.replace(/version = ".+"/g, `version = "${pkg.version}"`)
ind = ind.replace(/build_time = ".+"/g, `build_time = "${new Date().toLocaleString()}"`)

fs.writeFileSync('src/lib.js', lib, {encoding: 'utf8', flag: 'w+'});
fs.writeFileSync('src/index.js', ind, {encoding: 'utf8', flag: 'w+'});

const plugins = [
    progress({clearLine: true})
]

const watch = {
    clearScreen: false,
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
        output: [
            {
                file: 'dist/m4q.cjs.js',
                format: 'cjs',
                banner,
            },
            {
                file: 'dist/m4q.esm.js',
                format: 'esm',
                banner,
            },
        ]
    },
]