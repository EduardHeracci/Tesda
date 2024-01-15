import { PassportSerializer } from '@nestjs/passport';
import { Trainer } from '@/trainer/entities/trainer.entity';

export class TrainerSerializer extends PassportSerializer {
  async serializeUser(
    trainer: Trainer,
    done: (err: Error, trainer: { sub: number; username: string; role: string }) => void,
  ): Promise<void> {
    done(null, {
      sub: trainer.id,
      username: trainer.username,
      role: trainer.role,
    });
  }

  async deserializeUser(
    payload: Trainer,
    done: (err: Error, trainer: Trainer) => void,
  ): Promise<void> {
    done(null, payload);
  }
}
