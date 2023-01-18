export class Evento {
    id: number;
    nombre: string;
    deporte: string;
    tipo: any;
    abierto: boolean;
    usuario: number;
    competidores: Array<Competidor>;
    apuestas: Array<Apuesta>

    constructor(
        id: number,
        nombre: string,
        deporte: string,
        tipo: any,
        abierto: boolean,
        usuario: number,
        competidores: Array<Competidor>,
        apuestas: Array<Apuesta>
    ) {
        this.id = id,
            this.nombre = nombre,
            this.deporte = deporte,
            this.tipo = tipo,
            this.abierto = abierto,
            this.usuario = usuario,
            this.competidores = competidores,
            this.apuestas = apuestas
    }
}

export class Apuesta {
    id: number;
    valor_apostado: number;
    ganancia: number;
    nombre_apostador: string;
    id_competidor: number;
    id_evento: number;

    constructor(
        id: number,
        valor_apostado: number,
        ganancia: number,
        nombre_apostador: string,
        id_competidor: number,
        id_evento: number
    ) {
        this.id = id,
            this.valor_apostado = valor_apostado,
            this.ganancia = ganancia,
            this.nombre_apostador = nombre_apostador,
            this.id_competidor = id_competidor,
            this.id_evento = id_evento
    }
}

export class Competidor {
    id: number;
    nombre_competidor: string;
    probabilidad: number;

    constructor(
        id: number,
        nombre_competidor: string,
        probabilidad: number
    ) {
        this.id = id,
            this.nombre_competidor = nombre_competidor,
            this.probabilidad = probabilidad
    }
}
