#!/usr/bin/env node

/**
 * Build script for the project
 * This script handles the build process, including bundling, minification, and optimization
 */

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

// Clean the dist directory
console.log(chalk.blue('Cleaning output directory...'));
fs.emptyDirSync(path.resolve(__dirname, '../dist'));

// Run webpack
console.log(chalk.blue('Building project...'));
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(chalk.red('Build failed with errors.'));
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    process.exit(1);
  }

  // Output webpack stats
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }));

  if (stats.hasErrors()) {
    console.log(chalk.red('Build failed with errors.'));
    process.exit(1);
  }

  // Copy static assets if needed
  const staticDir = path.resolve(__dirname, '../public');
  if (fs.existsSync(staticDir)) {
    console.log(chalk.blue('Copying static assets...'));
    fs.copySync(staticDir, path.resolve(__dirname, '../dist'), {
      dereference: true,
      filter: file => file !== path.resolve(staticDir, 'index.html')
    });
  }
  
  console.log(chalk.green('Build complete! 🎉'));
});