const bundle = require('../../components/dist/bundle')
const companies = require('../../data/companies.json')
const navigation = require('../../data/navigation.json')

module.exports = (fn) => {
  const { App } = bundle(fn)
  return App({ navigation, companies })
}
