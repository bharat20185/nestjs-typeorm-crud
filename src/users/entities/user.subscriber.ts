import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';
import * as argon2 from 'argon2';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const password = event.entity.password;
    event.entity.password = await argon2.hash(password);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    console.log("before update")
    const password = event.entity.password;
    event.entity.password = await argon2.hash(password);
  }
}
