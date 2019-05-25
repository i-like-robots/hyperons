import Context from './context'

function useContext(context) {
  if (context instanceof Context) {
    return context.getValue()
  }
}

export default useContext
