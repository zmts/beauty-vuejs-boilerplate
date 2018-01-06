export default {
  methods: {
    /**
     * @param currentModel (current model)
     * @param fetchedModel (fetched model data)
     * @return {{}}
     */
    setModelMixin (currentModel, fetchedModel) {
      if (arguments.length !== 2) throw new Error('setModelMixin requires two arguments(\'currentModel\' and \'fetchedModel\')')
      if (!currentModel) throw new Error('setModelMixin requires \'currentModel\' argument')
      if (!fetchedModel) throw new Error('setModelMixin requires \'fetchedModel\' argument')

      let result = {}
      Object.keys(currentModel).forEach(propName => {
        if (propName in fetchedModel) {
          if (![null, undefined].includes(fetchedModel[propName])) {
            result[propName] = fetchedModel[propName]
          }
        }
      })
      return result
    }
  }
}
