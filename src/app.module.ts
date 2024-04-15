import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TodosModule } from './todos/todos.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './albums/photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './posts/comments/comments.module';
import { PostCheckModule } from './post-check/post-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    TodosModule,
    AlbumsModule,
    PhotosModule,
    PostsModule,
    CommentsModule,
    PostCheckModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
