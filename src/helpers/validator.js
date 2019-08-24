/* eslint-disable array-callback-return */
import { body, validationResult } from 'express-validator';
import responseHelper from './responseHelper';

const { badResponse } = responseHelper;

export const invalid = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const displayedError = {};
    errors.array().map((error) => { displayedError[error.param] = error.msg; });
    return badResponse(response, 400, displayedError);
  }
  next();
};

export const validateContact = [
  body('name').exists().isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
  body('phoneNumber').exists().isMobilePhone().withMessage('must be a phone number')
];

export const validateMessage = [
  body('sender').exists().isMobilePhone().withMessage('must be a phone number'),
  body('receiver').exists().isMobilePhone().withMessage('must be a phone number'),
  body('message').isLength({ min: 4 }).withMessage('must be at least 4 chars long')
];
