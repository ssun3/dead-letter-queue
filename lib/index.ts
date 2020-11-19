import * as cdk from "@aws-cdk/core";
import * as subs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as sns from "@aws-cdk/aws-sns";
export interface DeadLetterQueueProps {
  // Define construct properties here
  visibilityTimeout?: cdk.Duration;
}

export class DeadLetterQueue extends cdk.Construct {
  public readonly queue: sqs.Queue;
  public readonly topic: sns.Topic;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: DeadLetterQueueProps = {}
  ) {
    super(scope, id);

    // Define construct contents here
    const queue = new sqs.Queue(this, "DeadLetterQueueQueue", {
      visibilityTimeout: props.visibilityTimeout || cdk.Duration.seconds(300),
    });

    const topic = new sns.Topic(this, "DeadLetterQueueTopic");

    topic.addSubscription(new subs.SqsSubscription(queue));

    this.queue = queue;
    this.topic = topic;
  }
}
