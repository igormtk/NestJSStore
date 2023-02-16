import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { v4 as uuid } from 'uuid';
import { ListaUsuariosDTO } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}
  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const usuario = new Usuario();
    usuario.email = dadosUsuario.email;
    usuario.senha = dadosUsuario.senha;
    usuario.nome = dadosUsuario.nome;
    usuario.id = uuid();

    this.usuarioRepository.salvar(usuario);
    return {
      usuario: new ListaUsuariosDTO(usuario.id, usuario.nome),
      messagem: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuariosDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id')
    id: string,
    @Body() dadosAtualizacao: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualizar(
      id,
      dadosAtualizacao,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletaUsuario(
    @Param('id')
    id: string,
  ) {
    const usuarioRemovido = await this.usuarioRepository.deletar(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com sucesso!',
    };
  }
}
