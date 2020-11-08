#!/usr/bin/env node
import * as VDF from '@node-steam/vdf';
const { exec } = require('child_process');
const APPID = '526870';
const APP_INFO_CMD = 'steamcmd +login anonymous +app_info_update 1 +app_info_print ' + APPID + ' +quit';
main();

async function main() {
	exec(APP_INFO_CMD, (err: Error, stdout: string[], stderr: string[]) => {
		if (err) {
			console.error('Something went wrong');
			return;
		}
		// console.log(`stdout: ${stdout}`);
		const start = stdout.indexOf("\"");
		const end = stdout.lastIndexOf("}") + 1;
		const vdf_string = (stdout.slice(start, end)).toString();
		const json_string = VDF.parse(vdf_string);
		// console.log(json_string);
		console.log(json_string[APPID]['depots']['branches']);
		// console.log(`stderr: ${stderr}`);
	})
}
