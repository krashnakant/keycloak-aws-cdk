require('dotenv').config()
import {KeyCloak, KeyCloakProps, KeycloakVersion} from './keycloak';
import * as cdk from 'aws-cdk-lib';
import {aws_ec2 as ec2} from 'aws-cdk-lib';

export class SmartPaxAuthStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const certificateArn = this.node.tryGetContext('ACM_CERT_ARN') ?? process.env.ACM_CERT_ARN;

        const mykeycloakprops: KeyCloakProps = {
            certificateArn,
            singleDbInstance: true,
            keycloakVersion: KeycloakVersion.of('0.0.2'),
            databaseInstanceType: new ec2.InstanceType('t3.medium'),
        };
        if (!certificateArn) {
            throw new Error('ERROR - ACM_CERT_ARN not found');
        }
        new KeyCloak(this, 'KeyCloak', mykeycloakprops);

    }
}
