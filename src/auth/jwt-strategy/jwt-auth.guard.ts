// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
<<<<<<< HEAD
export class JwtAuthGuard extends AuthGuard('jwt') {}
=======
export class JwtAuthGuard extends AuthGuard('jwt') {}
>>>>>>> DavidMendoza
