
/*
  Creates a simple mock object with id, or props
  The following are equivalent:
    mock.xType('DFGSKSA5DA4')
    mock.xType({ id: 'DFGSKSA5DA4' })

  mock.xType('DFGSKSA5DA4', { someProp: 'prop' })
*/

export default defaultProps => (...datas) => {
  const mock = { ...defaultProps }
  datas.forEach(data => Object.assign(
    mock,
    typeof data === 'string' || typeof data === 'number' ? { id: data } : data,
  ))
  return mock
}
