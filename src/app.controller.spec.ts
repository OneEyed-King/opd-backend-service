import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';



describe('AppController', () => {
  let appController: AppController;
  const logger = new Logger(AppController.name)

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      logger.log('controller defined')
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
