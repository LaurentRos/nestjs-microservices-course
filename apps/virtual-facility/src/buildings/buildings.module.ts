import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'apps/virtual-facility/src/buildings/entities/building.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKFLOWS_SERVICE } from 'apps/virtual-facility/src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
    ClientsModule.register([
      {
        name: WORKFLOWS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
