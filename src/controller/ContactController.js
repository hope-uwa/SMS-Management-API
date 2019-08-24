import Helper from '../helpers';

const { responseHelper, contactHelper, messageHelper } = Helper;
const { goodResponse, badResponse } = responseHelper;

/**
 *
 *
 * @class ContactController
 */
class ContactController {
  /**
   *
   *
   * @static
   * @param {*} request
   * @param {*} response
   * @returns
   * @memberof ContactController
   */
  static async getContact(request, response) {
    const { phoneNumber } = request.params;
    const data = {};
    const checkContact = await contactHelper.checkContact({ phoneNumber: Number(phoneNumber) });
    if (!checkContact) return badResponse(response, 404, 'The contact does not exist');
    data.user = checkContact;
    data.messages = await messageHelper.getUsersMessages(checkContact.id);
    return goodResponse(response, 200, '', data);
  }

  /**
 *
 *
 * @static
 * @param {*} request
 * @param {*} response
 * @returns
 * @memberof ContactController
 */
  static async addContact(request, response) {
    const { phoneNumber, name } = request.body;

    const checkContact = await contactHelper.checkContact({ phoneNumber: Number(phoneNumber) });
    if (checkContact) return badResponse(response, 409, 'Contact already exiist');
    const postData = await contactHelper.postContact({ phoneNumber, name });
    return postData.error ? badResponse(response, 500, 'Server Error encountered')
      : goodResponse(response, 201, 'Contact has been added successfully', postData);
  }

  /**
 *
 *
 * @static
 * @param {*} request
 * @param {*} response
 * @returns
 * @memberof ContactController
 */
  static async deleteContact(request, response) {
    const { phoneNumber } = request.params;
    const deleting = await contactHelper.deleteContact({ phoneNumber });
    return deleting ? goodResponse(response, 200, 'contact has been deleted')
      : badResponse(response, 500, 'Server Error encountered');
  }
}

export default ContactController;
