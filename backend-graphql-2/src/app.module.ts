import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ContactsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      // subscriptions: {
      //   'graphql-ws': {
      //     path: '/graphql',
      //   },
      // },
    }),
    AuthModule,
  ],
})
export class AppModule {}
