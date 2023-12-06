import { PassportSerializer } from '@nestjs/passport';
import { Trainer } from '@/trainer/entities/trainer.entity';

export class TrainerSerializer extends PassportSerializer {
  serializeUser(
    trainer: Trainer,
    done: (err: Error, trainer: Record<string, any>) => void,
  ) {
    done(null, {
      sub: trainer.id,
      username: trainer.username,
      role: trainer.role,
    });
  }

  async deserializeUser(
    payload: Trainer,
    done: (err: Error, trainer: Trainer) => void,
  ) {
    done(null, payload);
  }
}
