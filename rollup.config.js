import buble from 'rollup-plugin-buble'
import pkg from './package.json'

const input = "src/index.js";

export default [
	{
		input,
		plugins: [buble({ objectAssign: "Object.assign", target: { node: 6 } })],
		output: {
			file: pkg.module,
			format: "es"
		}
	},
	{
		input,
		plugins: [buble({ objectAssign: "Object.assign" })],
		output: {
			file: pkg.main,
			format: "cjs"
		}
	}
];
