import Models from '../database/models';

const { Contact } = Models;

/**
 * @class { ContactHelper }
 * @description { handle contact requests to db }
*/

class ContactHelper {
  static async post(data) {
    return Contact.create(data);
  }

  /**
   *
   *
   * @static
   * @param {*} data
   * @returns
   * @memberof ContactHelper
   */
  static async get(data) {
    return Contact.findOne({
      where: {
        ...data
      },
      attributes: ['id', 'name', 'phoneNumber']
    });
  }

  /**
   *
   *
   * @static
   * @param {*} data
   * @returns
   * @memberof ContactHelper
   */
  static async delete(data) {
    return Contact.destroy({
      where: {
        ...data
      },
    });
  }

  /**
   *
   *
   * @static
   * @param {*} data
   * @returns
   * @memberof ContactHelper
   */
  static async checkContact(data) {
    return Contact.findOne({
      where: {
        ...data
      },
      attributes: ['id', 'name', 'phoneNumber']
    });
  }

  static async postContact(data) {
    try {
      const { id, ...display } = await this.post(data);
      return display ? display.dataValues : null;
    } catch (error) {
      return { error: 500 };
    }
  }

  /**
   *
   *
   * @static
   * @param {object} data
   * @returns
   * @memberof ContactHelper
   */
  static async deleteContact(data) {
    try {
      await this.delete(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default ContactHelper;
