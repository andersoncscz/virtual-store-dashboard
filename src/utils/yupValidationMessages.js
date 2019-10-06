/* eslint-disable no-template-curly-in-string */

export const validationMessages = {
    mixed: {
        required: 'Campo obrigatório',
        default: 'Não é válido',
    },
    string: {
        min: 'Deve ter ao menos ${min} caracteres.',
        max: 'Deve ter no máximo ${min} caracteres.',
    },
    number: {
        positive: 'Deve ser um valor positivo.'
    },
    array: {
        min: 'Selecione ao menos ${min} opção.',
    }
}