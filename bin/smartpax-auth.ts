#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import {SmartPaxAuthStack} from '../lib/smart-pax-auth-stack';

const app = new cdk.App();
new SmartPaxAuthStack(app, 'SmartPaxAuthStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});
