import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  campoEsInvalido(formGroup: FormGroup, nombreCampo: string) {
    const campo = formGroup?.get(nombreCampo);
    return campo?.errors && campo.touched;
  }

  obtenerMensajeErrorCampo(
    formGroup: FormGroup,
    nombreCampo: string,
    mensajes: object
  ) {
    const errores = formGroup?.get(nombreCampo)?.errors;
    if (!errores) return '';

    const [errorKey] = Object.keys(errores);
    const mensaje: string = mensajes?.[nombreCampo]?.[errorKey];

    if (!mensaje) return '';

    const errorValues = errores[errorKey];
    if (errorValues instanceof Array) {
      return errorValues.reduce(
        (mensajeFinal, parteMensaje, indice) =>
          mensajeFinal.replace(`{#${indice}}`, parteMensaje),
        mensaje
      );
    }
    return mensaje;
  }
}
