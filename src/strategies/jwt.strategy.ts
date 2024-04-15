import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "24@adslfj",
    }); // Add options here
  }

  validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      username: payload.username,
      email: payload.email,
    };
  }
}
