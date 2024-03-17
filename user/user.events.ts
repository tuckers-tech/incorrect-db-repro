import { Topic } from 'encore.dev/pubsub'
import { UserEvent } from './user.types'

export const UserSignUp = new Topic<UserEvent>('user.sign-up', {
  deliveryGuarantee: 'at-least-once',
})
