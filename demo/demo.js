window.onload = () => {

  /*******************************************************************************
   * Demo data for the Network tab
   *******************************************************************************/
  const request = new XMLHttpRequest();
  request.open('GET', 'https://dog.ceo/api/breeds/image/random');
  request.send();

  /*******************************************************************************
   * Demo data for the Console tab
   *******************************************************************************/

  // Use the console functions as usual and it will capture the output
  console.log('log msg');
  console.warn('warn msg');
  console.error('error msg');
  console.info('info msg');
  console.log({ 'one': 'two' });
  console.log('one', 'two', 3);
  console.log('an array in here', [[0, 1, 2], { 'obj': true, 'key': 1 }, { 'yes': false, no: true }]);
  console.warn({ 'one': '1', 'two': 2, 'three': true, 'four': 'IV', 'f': 'V', 'six': 6 }, { 'one': 'two' }, {
    'tickets': [{
      'impact': '0',
      'tenantId': '5ba2af2b0456dc5c3fdc9b02',
      'summary': '123',
      'description': 'this has "quotes" in it',
      'assignedGroupId': "this also has 'quotes' in it",
      'containsPhi': true,
      'firstName': 'Portal',
      'lastName': undefined,
      'userName': '4464007',
      'email': 'pgross41@gmail.com',
      'phoneNumber': '(281) 330-8004',
      'id': 1
    },
      {
        'impact': '1',
        'tenantId': 'NWJhMmFmMmIwNDU2ZGM1YzNmZGM5YjAy',
        'summary': '123',
        'description': '123',
        'assignedGroupId': '5ba3ddddc40a384ad1bd45c8',
        'containsPhi': true,
        'firstName': 'Portal',
        'lastName': 'Portal',
        'userName': '4464007',
        'email': 'pgross41@gmail.com',
        'phoneNumber': '(281) 330-8004',
        'id': 1
      }],
    'configuration': {
      'id': 'undefined',
      'tenantId': '0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca',
      'issueTypes': {
        'default': '5ba3ddddc40a384ad1bd45c8',
        'options': [{
          'value': '5ba3ddddc40a384ad1bd45c7',
          'text': 'Hardware'
        }, { 'value': '5ba3ddddc40a384ad1bd45c8', 'text': 'Software' }, {
          'value': '5ba3ddddc40a384ad1bd45c9',
          'text': 'Other'
        }]
      },
      'phoneNumber': '(866) 227-8877',
      'lookBackMinutes': 240,
      'impact': {
        'default': '0',
        'options': [{ 'value': '0', 'text': 'Minor/Localized' }, {
          'value': '1',
          'text': 'Moderate/Limited'
        }, { 'value': '2', 'text': 'Significant/Large' }, { 'value': '3', 'text': 'Extensive/Widespread' }]
      }
    }
  }, "followup words after a small object followed by a large object with lots of words it's really long vertically but not very long horizontally need to see what it will look like");
  iAmBadCode;

};
