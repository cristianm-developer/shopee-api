import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

const external = ["axios"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "es",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs",
        format: 'cjs',
        sourcemap: true,
      }
    ],
    external,
    plugins: [
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            declaration: false,
            declarationMap: false
        }),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.d.ts',
        format: 'es',
    },
    external,
    plugins: [dts()]
  }
];
