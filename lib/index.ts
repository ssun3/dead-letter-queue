import * as cdk from '@aws-cdk/core';

export interface DeadLetterQueueProps {
  // Define construct properties here
}

export class DeadLetterQueue extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: DeadLetterQueueProps = {}) {
    super(scope, id);

    // Define construct contents here
  }
}