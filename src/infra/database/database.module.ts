import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@application/notification/repositories/notifications-repository';
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/prisma-notifications-repository';

import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersRepository } from '@application/user/repositories/users.respository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { CompanysRepository } from '@application/company/repositories/company.respository';
import { PrismaCompanysRepository } from './prisma/repositories/prisma-company-repository';
import { CategoriesRepository } from '@application/categorie/repositories/categories.respository';
import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categorie-repository';
import { HttpModule } from '@nestjs/axios';
import { UploadRepository } from '@application/upload/repositories/upload.respository';
import { PrismaUploadRepository } from './prisma/repositories/prisma-upload-repository';
import { JwtService } from '@nestjs/jwt';
import { GoogleMapsModule } from '@infra/google-maps/google-maps.module';
import { ServicesRepository } from '@application/service/repositories/service.respository';
import { PrismaServicesRepository } from './prisma/repositories/prisma-service-repository';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GoogleMapsModule,
  ],
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CompanysRepository,
      useClass: PrismaCompanysRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: UploadRepository,
      useClass: PrismaUploadRepository,
    },
    {
      provide: ServicesRepository,
      useClass: PrismaServicesRepository,
    },
    JwtService,
  ],
  exports: [
    NotificationsRepository,
    UsersRepository,
    CompanysRepository,
    CategoriesRepository,
    UploadRepository,
    ServicesRepository,
  ],
})
export class DatabaseModule {}