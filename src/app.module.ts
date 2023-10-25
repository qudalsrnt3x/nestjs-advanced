import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'fastcampus',
      password: '1234',
      database: 'nestadvan',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    UserModule,
    VideoModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
