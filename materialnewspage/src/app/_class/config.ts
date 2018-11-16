export class Config {
    constructor(
        public rutTrabajador: string,
        public evaluacionesPorPagina: number,
        public fichaEvaluacion: number,
        public ordenDeTrabajo: number,
        public tipo: string,
        public nombreTrabajador: string,
        public apellidoPaternoTrabajador: string,
        public apellidoMaternoTrabajador: string,
        public evaluacionTipo: number,
        public contratista: number,
        public isValid: boolean,
    ) { }

    createObject() {
        const obj = {
            traRut: this.rutTrabajador,
            traNombre: this.nombreTrabajador,
            ficId: this.fichaEvaluacion,
            traMaterno: this.apellidoMaternoTrabajador,
            conId: this.contratista,
            traPaterno: this.apellidoPaternoTrabajador,
            evaId: this.evaluacionTipo,
        };
        return obj;
    }
}
