import { PassportSerializer } from '@nestjs/passport';
import { Trainer } from 'src/trainer/entities/trainer.entity';

export class TrainerSerializer extends PassportSerializer {
  serializeUser(
    trainer: Trainer,
    done: (err: Error, trainer: Record<string, any>) => void,
  ) {
    done(null, {
      sub: trainer.id,
      username: trainer.userName,
      role: trainer.role,
    });
  }

  async deserializeUser(
    payload: Record<string, any>,
    done: (err: Error, trainer: Record<string, any>) => void,
  ) {
    done(null, payload);
  }
}
