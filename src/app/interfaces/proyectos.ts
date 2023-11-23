export interface Proyecto {
    id: string,
    codigo: string,
    nombreProyecto: string,
    objetivoGeneral: string,
    programa: string,
    anio: string,
    procedencia: string,
    investigadorUno: string,
    investigadorDos: string,
    investigadorTres: string,
    fechaInicio: string,
    fechaFin: string,
    estado: string,
    valorProyecto: string,
    cantidadProyectos: number
}

export interface GuardarProyecto {
    codigo: string,
    nombreProyecto: string,
    objetivoGeneral: string,
    programa: string,
    anio: string,
    procedencia: string,
    investigadorUno: string,
    investigadorDos: string,
    investigadorTres: string,
    fechaInicio: string,
    fechaFin: string,
    estado: string,
    valorProyecto: string,
    cantidadProyectos?: string,
}

export interface ListaProyectos {
    id: string,
    codigo: string,
    nombreProyecto: string,
    objetivoGeneral: string,
    programa: string,
    anio: string,
    procedencia: string,
    investigadorUno: string,
    investigadorDos: string,
    investigadorTres: string,
    fechaInicio: string,
    fechaFin: string,
    estado: string,
    valorProyecto: string,
    cantidadProyectos: number
    alerta: string
}