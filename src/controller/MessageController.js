import Helper from '../helpers';

const { responseHelper, contactHelper, messageHelper } = Helper;
const { goodResponse, badResponse } = responseHelper;

/**
 *
 *
 * @class MessageController
 */
class MessageController {
  /**
   *
   *
   * @static
   * @param {*} request
   * @param {*} response
   * @returns
   * @memberof MessageController
   */
  static async receivedMessage(request, response) {
    const { phoneNumber } = request.params;
    const checkContact = await contactHelper.checkContact({ phoneNumber: Number(phoneNumber) });
    if (!checkContact) return badResponse(response, 404, 'The contact does not exist');
    const received = await messageHelper.getReceived(checkContact.id);
    const info = received.length > 0 ? 'Message\'s fetched successfully' : 'Inbox is empty';
    return received ? goodResponse(response, 200, info, { received })
      : badResponse(response, 404, 'The contact does not exist');
  }

  /**
 *
 *
 * @static
 * @param {*} request
 * @param {*} response
 * @returns
 * @memberof MessageController
 */
  static async sentMessage(request, response) {
    const { phoneNumber } = request.params;
    const checkContact = await contactHelper.checkContact({ phoneNumber: Number(phoneNumber) });
    if (!checkContact) return badResponse(response, 404, 'The contact does not exist');
    const sent = await messageHelper.getSent(checkContact.id);
    const info = sent.length > 0 ? 'Message\'s fetched successfully' : 'Outbox is empty';
    return sent ? goodResponse(response, 200, info, { sent })
      : badResponse(response, 404, 'The contact does not exist');
  }

  /**
   *
   *
   * @static
   * @param {*} request
   * @param {*} response
   * @returns
   * @memberof MessageController
   */
  static async addMessage(request, response) {
    const { sender, receiver, message } = request.body;
    if (sender === receiver) return badResponse(response, 422, 'The phone numbers are the same');
    const checkSender = await contactHelper.checkContact({ phoneNumber: Number(sender) });
    const checkReceiver = await contactHelper.checkContact({ phoneNumber: Number(receiver) });
    if (!checkSender) return badResponse(response, 404, 'The sender\'s phone number does not exist');
    if (!checkReceiver) return badResponse(response, 404, 'The recipient\'s phone number does not exist');
    const data = {
      senderId: checkSender.id, receiverId: checkReceiver.id, message, read: false
    };
    const postMessage = await messageHelper.postMessage(data);
    return postMessage ? goodResponse(response, 201, `message to sent ${checkReceiver.name} successfully`,
      {
        sender: checkSender.name,
        receiver: checkReceiver.name,
        message

      })
      : badResponse(response, 600, 'Server Error Occurred');
  }

  /**
 *
 *
 * @static
 * @param {*} request
 * @param {*} response
 * @returns
 * @memberof MessageController
 */
  static async getAMessage(request, response) {
    const { messageId } = request.params;
    const fetchMessage = await messageHelper.getMessage(messageId);
    const read = true;
    if (!fetchMessage) return badResponse(response, 404, 'The message does not exist');
    if (!fetchMessage.read) await messageHelper.update({ read }, { id: messageId, });

    return goodResponse(response, 200, { ...fetchMessage, read });
  }
}

export default MessageController;
