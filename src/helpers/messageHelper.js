import Models from '../database/models';

const { Message } = Models;

/**
 * @class { MessageHelper }
 * @description { handle contact requests to db }
*/

class MessageHelper {
  static async postMessage(data) {
    return Message.create(data);
  }

  static async getMessage(id) {
    const message = await Message.findOne({
      where: {
        id
      },
    });
    return message ? message.dataValues : null;
  }

  static async getSent(id) {
    return Message.findAll({
      where: {
        senderId: id
      },
    });
  }

  static async getReceived(id) {
    return Message.findAll({
      where: {
        receiverId: id
      },
    });
  }

  /**
   *
   *
   * @static
   * @param {object} entry
   * @param {object} entity
   * @returns
   * @memberof MessageHelper
   */

  static async update(entry, entity) {
    return Message.update({ ...entry }, {
      where: {
        ...entity
      }
    });
  }

  static async getUsersMessages(id) {
    const data = {};
    const received = await MessageHelper.getReceived(id);
    const sent = await MessageHelper.getSent(id);
    data.received = received.length;
    data.sent = sent.length;
    return data;
  }
}

export default MessageHelper;
