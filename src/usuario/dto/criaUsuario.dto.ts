import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/emailUnico.validator';

export class CriaUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  nome: string;
  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio!' })
  @EmailUnico({ message: 'Já existe um usuário com esse e-mail' })
  email: string;
  @MinLength(6, { message: 'A senha precisa ter 6 digitos!' })
  @IsNotEmpty()
  senha: string;
}
