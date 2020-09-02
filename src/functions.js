/**
 * Take first name and initials of last name
*/
export const takeNameInitials = function (fullName) {
  let firstName = fullName.split(' ')[0];
  let nameArr = fullName.split(' ');
  let lastName = nameArr[nameArr.length - 1];
  return `${firstName} ${lastName.charAt(0)}`
}

/**
 * Format the phone number in the US phone format
*/
export const formatPhone = function (phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})/)
  if (match) {
    return `(${match[1]}) ${match[2]} - ${match[3]}`
  }
  return null
}

export const pagination = function (currentPage, itemPerPage, data) {
  // Logic for displaying cases
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  let currentUsers = data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return { currentUsers, pageNumbers }
}