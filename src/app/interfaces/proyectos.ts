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
    duracion: string,
    valorProyecto: string,

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
    duracion: string,
    valorProyecto: string,
}