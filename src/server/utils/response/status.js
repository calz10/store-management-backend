
const code = require('./code')

const defaultFormat = {
  success: false,
  status: null,
  message: null,
  errors: {},
  data: null
}


const response = {
  [code.NOT_FOUND]: {
    ...defaultFormat,
    message: 'Page not found',
    status: code.NOT_FOUND
  },
  [code.INTERNAL_SERVER]: {
    ...defaultFormat,
    status: code.NOT_FOUND,
    message: 'Internal Server Error',
  },
  [code.CREATED]: {
    ...defaultFormat,
    message: 'Document was successfully created',
    success: true,
    status: code.CREATED
  },
  [code.UNAUTHORIZED]: {
    ...defaultFormat,
    message: 'Unauthorized user!',
    status: code.CREATED,
  },
  [code.OK]: {
    ...defaultFormat,
    message: 'Ok!',
    status: code.OK,
    success: true
  }
}

module.exports = {
  code,
  response
}

