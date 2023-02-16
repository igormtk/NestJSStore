import { Usuario } from './usuario.entity';

export class UsuarioRepository {
  private usuarios: Usuario[] = [];
  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }

  async salvar(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }

  async atualizar(id: string, dadosAtualizacao: Partial<Usuario>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      usuario[chave] = valor;

      return usuario;
    });
  }

  async deletar(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter(
      (usuarioSalvo) => usuarioSalvo.id !== id,
    );

    return usuario;
  }
}
