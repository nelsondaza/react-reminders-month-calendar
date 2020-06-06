
/*
  Creates a simple mock object with id, or props
  The following are equivalent:
    mock.xType({ id: 'DFGSKSA5DA4' })
    mock.xType('DFGSKSA5DA4')
*/
export default (data = {}, defaultProps) => (
  typeof data === 'string' || typeof data === 'number'
    ? { ...defaultProps, id: data }
    : { ...defaultProps, ...data }
)
