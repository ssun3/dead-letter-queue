import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as sqs from '@aws-cdk/aws-sqs';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
export interface DeadLetterQueueProps {
  visibilityTimeout?: cdk.Duration;
}

export class DeadLetterQueue extends cdk.Construct {
  public readonly queueArn:  string;
  constructor(scope: cdk.Construct, id: string, props: DeadLetterQueueProps = {}) {
    super(scope, id);

    const queue = new sqs.Queue(this, 'DeadLetterQueueQueue', {
      visibilityTimeout: props.visibilityTimeout || cdk.Duration.seconds(300)
    })
    
    const topic = new sns.Topic(this, 'DeadLetterQueueTopic'); 

    topic.addSubscription(new subs.SqsSubscription(queue))

    this.queueArn = queue.queueArn;
  }
}
