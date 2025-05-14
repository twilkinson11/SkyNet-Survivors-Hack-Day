#!/usr/bin/env node

/**
 * Deploy script for the project
 * This script handles the deployment process to production/staging environments
 */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

// Configuration
const config = {
  production: {
    bucket: 'your-production-bucket',
    cloudFrontId: 'YOUR_CLOUDFRONT_DISTRIBUTION_ID',
    region: 'us-east-1'
  },
  staging: {
    bucket: 'your-staging-bucket',
    cloudFrontId: 'YOUR_STAGING_CLOUDFRONT_DISTRIBUTION_ID',
    region: 'us-east-1'
  }
};

// Parse command line arguments
const args = process.argv.slice(2);
const environment = args[0] || 'staging';

if (!['production', 'staging'].includes(environment)) {
  console.error(chalk.red(`Invalid environment: ${environment}`));
  console.log(chalk.yellow('Usage: node deploy.js [environment]'));
  console.log(chalk.yellow('Available environments: production, staging'));
  process.exit(1);
}

const envConfig = config[environment];

// Check if build directory exists
const distDir = path.resolve(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  console.error(chalk.red('Build directory not found. Run "npm run build" first.'));
  process.exit(1);
}

// Deploy process
console.log(chalk.blue(`Deploying to ${environment}...`));

try {
  // Upload to S3
  console.log(chalk.blue(`Uploading to S3 bucket: ${envConfig.bucket}`));
  execSync(
    `aws s3 sync ${distDir} s3://${envConfig.bucket} --delete --region ${envConfig.region}`,
    { stdio: 'inherit' }
  );
  
  // Invalidate CloudFront cache if needed
  if (envConfig.cloudFrontId) {
    console.log(chalk.blue('Invalidating CloudFront cache...'));
    execSync(
      `aws cloudfront create-invalidation --distribution-id ${envConfig.cloudFrontId} --paths "/*"`,
      { stdio: 'inherit' }
    );
  }
  
  console.log(chalk.green(`Successfully deployed to ${environment}! 🚀`));
} catch (error) {
  console.error(chalk.red('Deployment failed:'));
  console.error(error);
  process.exit(1);
}