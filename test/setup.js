/**
 * Created by AAB3605 on 27/02/2017.
 */
"use strict";
require('babel-polyfill');
require('isomorphic-fetch');

// const chai = require("chai");
const sinon = require('sinon');

// require('react-native-mock/mock.js');

global.sinon = sinon;
// global.expect = chai.expect;

import fs from 'fs';
import path from 'path';
import register from 'babel-core/register';
import chai from 'chai';
// import chaiEnzyme from 'chai-enzyme';

// Ignore all node_modules except these
const modulesToCompile = [
    'react-native',
    'apsl-react-native-button',
    'react-native-router-flux',
    'react-native-tabs',
    'react-native-vector-icons',
    'react-native-mock',
    'react-native-parallax-scroll-view',
    'react-native-simple-store',
    'react-native-action-button',
    'react-native-localization',
    'react-native-check-box'
].map((moduleName) => new RegExp(`/node_modules/${moduleName}`));

const rcPath = path.join(__dirname, '..', '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);
config.ignore = function(filename) {
    if (!(/\/node_modules\//).test(filename)) {
        return false;
    } else {
        const matches = modulesToCompile.filter((regex) => regex.test(filename));
        const shouldIgnore = matches.length === 0;
        return shouldIgnore;
    }
}
register(config);
// Setup globals / chai
global.__DEV__ = true;
global.expect = chai.expect;
// chai.use(chaiEnzyme());
// Setup mocks
require('react-native-mock/mock');
const React = require('react-native')
React.NavigationExperimental = {
    AnimatedView: React.View
};


//for image issue
const m = require('module');
const originalLoader = m._load;
m._load = function hookedLoader(request, parent, isMain) {
    if (request.match(/.jpeg|.jpg|.png$/)) {
        return { uri: request };
    }

    return originalLoader(request, parent, isMain);
};