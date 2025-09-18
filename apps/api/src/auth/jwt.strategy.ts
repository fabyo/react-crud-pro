import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'seu_segredo_super_secreto_aqui',
    });
  }

  async validate(payload: any) {
    // O que for retornado aqui será injetado no objeto `request.user`
    return { userId: payload.sub, email: payload.email };
  }
}
