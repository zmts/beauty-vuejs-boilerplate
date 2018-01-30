export default {
  methods: {
    /**
     * @param currentModel (current model)
     * @param fetchedModel (fetched model data)
     * @return {{}}
     */
    setModelMixin (currentModel, fetchedModel) {
      if (!currentModel) throw new Error('requires \'currentModel\' param')
      if (!fetchedModel) throw new Error('requires \'fetchedModel\' param')

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
