import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.mongodb_url),
    ProductModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    if (this.connection.readyState === 1) {
      this.logger.log('Application is running successfully!');
      this.logger.log('Connected to MongoDB successfully!');
    } else {
      this.logger.error('MongoDB connection failed!');
    }
  }
}
