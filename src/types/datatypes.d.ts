export type ICategoriaComunicado = "aviso" | "comunicado" | "administrativo";

export type ITipoActividad = "actividad" | "noticia";

export interface IInstitucion {
  nombre: string;
  nombreCorto: string;
  lema: string;
  descripcion: string;
  direccion: string;
  departamento: string;
  pais: string;
  atencion: string;
  horario: string;
  tutor: string;
  gestion: string;
}

export interface IReunion {
  id: string;
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  motivo: string;
  dirigidoA: string;
}

export interface IComunicado {
  id: string;
  titulo: string;
  fecha: string;
  categoria: ICategoriaComunicado;
  resumen: string;
  contenido: string;
  destacado?: boolean;
}

export interface IActividad {
  id: string;
  titulo: string;
  fecha: string;
  tipo: ITipoActividad;
  lugar?: string;
  descripcion: string;
}

export interface ISugerencia {
  nombre?: string;
  rol: string;
  mensaje: string;
}
