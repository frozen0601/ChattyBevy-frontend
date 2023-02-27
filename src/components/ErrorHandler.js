export function handleError(response) {
  response.json().then((errorData) => {
    let details = errorData.error.details;
    let errorMessages = [];

    const searchForErrors = (obj) => {
      for (let key in obj) {
        if (Array.isArray(obj[key])) {
          errorMessages = errorMessages.concat(obj[key]);
        } else if (typeof obj[key] === 'object') {
          searchForErrors(obj[key]);
        }
      }
    };

    searchForErrors(details);

    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
    } else {
      console.error('No error messages found in response.');
    }
  });
}
