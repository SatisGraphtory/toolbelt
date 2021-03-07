#!/usr/bin/env node
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const NEWS_OTHER = 'http://ingamenews.satisfactorygame.com/other.news';
const NEWS_EXPERIMENTAL = 'http://ingamenews.satisfactorygame.com/experimental.news';
const NEWS_MAIN = 'http://ingamenews.satisfactorygame.com/main.news';

main();

async function fetchVersions(url: string) {
    const response = await fetch(url);
    const body = await response.text();

    const root = parse(body).querySelector('body');
    if (root.firstChild.rawText === '\n') {
        const titleString = root.childNodes[1].rawText.split('</>')[0].replace(/\u2013|\u2014/g, "-");

        const versions = titleString.split('-').map(item => item.trim());

        let semanticVersion = ''
        if (versions[1].charAt(0) == 'v') {
            semanticVersion = versions[1].substring(1);
        }

        let buildNumber = 0;
        if (versions[2].includes('Build ')) {
            buildNumber = parseInt(versions[2].split('Build ')[1]);
        }

        if (semanticVersion !== '' && buildNumber != 0) {
            var json: any = {};
            json.semanticVersion = semanticVersion;
            json.buildNumber = buildNumber;
            return json;
        }
    }
}

async function main() {

    var mainVersion = await fetchVersions(NEWS_MAIN);
    var experimentalVersion = await fetchVersions(NEWS_EXPERIMENTAL);

    var json: any = {};
    json.main = mainVersion;
    json.experimental = experimentalVersion;

    console.log(json)
}