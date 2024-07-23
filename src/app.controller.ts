import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return {
      data: {
        title: 'Chattings',
        copyright: '프론트앤드드드',
      },
    };
  }
}
