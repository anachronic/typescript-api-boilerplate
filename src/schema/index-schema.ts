import { IsString } from 'class-validator'

export class Welcome {
  @IsString()
  app: string
}
