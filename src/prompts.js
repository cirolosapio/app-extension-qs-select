module.exports = function () {
  return [
    {
      name: 'api_type',
      type: 'list',
      message: 'Which of these you want to use to make requests?',
      choices: [
        {
          name: 'Fetch API',
          value: 'fetch'
        },
        {
          name: 'Axios',
          value: 'axios'
        }
      ]
    },
    {
      name: 'axios_key',
      type: 'input',
      required: true,
      when: answers => answers.api_type === 'axios',
      message: 'Enter the prototype property that contain the axios instance',
      default: () => '$axios'
    }
  ]
}
