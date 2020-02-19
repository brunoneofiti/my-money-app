const _ = require('lodash')

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle

    //Trato a var errors somente se ele estiver setada (true)
    if(bundle.errors) {
        const errors = parseErrors(bundle.errors)
        //objeto {errors} está referenciando a variavel errors declarada acima 
        res.status(500).json({errors})
    } else {
        // Se não chamar o next, este middleware vai interromper a requisição
        next()
    }
}

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    /**
    * Lodash facilita trabalhar com arrays, usado na iteração abaixo
    * Adiciona a string message do objeto error ao array errors
    */
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors 
}