// /* eslint-disable no-unused-vars */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable array-callback-return */
// /* eslint-disable guard-for-in */
// /* eslint-disable no-undef */
// /*  eslint global-require: 0 */
// const express = require('express');
// const URL = require('url');
// const QueryString = require('querystring');

// const router = express.Router();

// const loginSuccess = require('../stub/nbs/Account/Login/default.json');
// const unAuthorized = require('../stub/nbs/Account/Login/unAuthorised.json');
// const notRegistered = require('../stub/nbs/Account/Login/notRegistered.json');
// const nbsMockServerBase = require('../stub/nbs/nbsMockServerBase.json');
// const productConfigData = require('../../../../../DigitalApplicationServices/ReferenceDataAPI/config/nbs/selfservice/ProductConfig.json');
// const referenceData = require('../stub/ReferenceData.json');
// const metaDataSequence = require('../../config/MetaDataFileReadSequence/nbs.json');

// const TRANSACTION_STATUS_PENDING = 'Pending';
// const TRANSACTION_STATUS_COMMITTED = 'Committed';
// const TRANSACTION_TYPE_ENDORSE = 'Endorse';
// const TRANSACTION_TYPE_MTA = 'MTA';
// const CHANNEL_ONLINE = 'Online';
// const GET_POLICY_BY_NUMBER = 'GetPolicyByNumber';
// const POLICIES = 'Policies';
// const COMMIT_MTA = 'CommitMta';
// const FETCH_MTA_COMMIT_INITIATE = 'InitiateCommitMta';
// const RATE_MTA = 'RateMta';
// const GET_POLICY_LAST_TRANSACTIONS_DATA = 'GetPolicyLastTransactionsData';

// const API = {
//   PRODUCT_CONFIG_DATA: '/ReferenceData/ProductConfigData',
//   REFERENCE_DATA: '/ReferenceData/ReferenceData',
//   META_DATA: '/ReferenceData/Metadata',
//   GET_FEATUE_FLAG: '/Feature/GetFeatureFlag',
//   LOGIN: '/Account/Login',
//   VALIDATE_USER: '/Account/ValidateUser',
//   REGISTER: '/Account/Register',
//   FORGOT_EMAIL: '/Account/ForgotEmail',
//   CHANGE_PASSWORD: '/Account/ChangePassword',
//   FORGOT_PASSWORD: '/Account/ForgotPassword',
//   LOGOUT: '/Account/Logout',
//   EXTENDED_TIMEOUT: '/Account/ExtendedTimeOut',
//   INITIATE_MTA: '/MidTermAdjustment/InitiateMta',
//   SAVE_MTA: '/MidTermAdjustment/SaveMta',
//   SAVE_MTA_RESPONSE: '/MidTermAdjustment/SaveMta',
//   UPDATE_MTA: '/MidTermAdjustment/UpdateRate',
//   UPDATE_RATE_MTA: '/MidTermAdjustment/UpdateRateMta',
//   FETCH_MTA_COMMIT_INITIATE: '/MidTermAdjustment/InitiateCommitMta',
//   RATE_MTA: '/MidTermAdjustment/RateMta',
//   SAVE_RATE_MTA: '/MidTermAdjustment/SaveRateMta',
//   COMMIT_MTA: '/MidTermAdjustment/CommitMta',
//   SET_CREDIT_CARD_BILLING_FOR_RENEWAL: '/Payment/SetCreditCardBillingForRenewal',
//   SET_CREDIT_CARD_BILLING_FOR_MTA: '/Payment/SetCreditCardBillingForMta',
//   RESET_MOCK: '/resetMock',
//   GET_MOCK: '/getMock',
//   INITIATE_MOCK: '/getInitialMock'
// };

// const selectedCovers = nbsMockServerBase.pageDecorator.covers.filter(cover => cover.selected).map(cover => cover.coverageCode);

// const mtaType = code => nbsMockServerBase.pageDecorator.journeys.filter(item => item.value === code)[0].label;

// const resetMtaDetails = () => ({
//   mtaHistoryId: 0, basePremiumAnnual: 0, basePremiumMonthly: 0, policyId: 0, mtaEffectiveDate: null
// });

// let updatedMockData = nbsMockServerBase;

// const getNewBusiness = (index) => {
//   const policy = updatedMockData.policies[index];
//   const covers = policy.policyViews[0] ? policy.policyViews[0].selectedCovers : selectedCovers;
//   policy.mtaDetails = resetMtaDetails();
//   return {
//     transactionType: 'New Business',
//     processingDate: policy.policyStartDate,
//     mtaEffectiveDate: policy.policyStartDate,
//     annualPremium: covers.length * 100,
//     transactionPremium: 0,
//     transactionStatus: TRANSACTION_STATUS_COMMITTED,
//     selectedCovers: covers
//   };
// };

// updatedMockData.policies[0].policyViews = [getNewBusiness(0)];
// // updatedMockData.policies[1].policyViews = [getNewBusiness(1)];

// const selfService = '/self-service/api';

// const getIndex = policyNumber => updatedMockData.policies.findIndex(policy => policy.policyReference === policyNumber);

// // Utils methods
// const getDefaultPath = (originalUrl) => {
//   const uri = `../stub${originalUrl.replace(selfService, '')}`;
//   const parsedUrl = URL.parse(uri);
//   const parsedQs = QueryString.parse(parsedUrl.query);
//   return { url: `${parsedUrl.pathname}/default.json`, queryParams: parsedQs };
// };

// const getPolicies = (data) => {
//   const policies = [];
//   updatedMockData.policies.forEach(policy => policies.push({ ...data[0], ...policy }));
//   return policies;
// };

// const getPolicyByNumberData = (data, policyNumber) => {
//   const index = getIndex(policyNumber);
//   data.checkYourDetails.hasendorsement = updatedMockData.policies[index].hasendorsement;
//   data.checkYourDetails.mainCoverType = updatedMockData.policies[index].coverType;
//   data.yourCover.coverType = updatedMockData.policies[index].coverType;
//   data.checkYourDetails.policyEndDate = updatedMockData.policies[index].policyEndDate;
//   data.checkYourDetails.policyStartDate = updatedMockData.policies[index].policyStartDate;
//   return data;
// };

// const setPolicyLastTransactionsData = (data, policyNumber) => {
//   const index = getIndex(policyNumber);
//   const lastCommited = updatedMockData.policies[index].policyViews.length - 1;
//   const lastSelectedCovers = updatedMockData.policies[index].policyViews[lastCommited].selectedCovers;
//   data.yourCover.coverType = updatedMockData.policies[index].coverType;
//   data.quoteReferenceNumber = updatedMockData.policies[index].policyReference;
//   if (lastSelectedCovers) {
//     data.quoteSummary.coverages.forEach((coverage) => {
//       coverage.selected = lastSelectedCovers.indexOf(coverage.coverageCode) !== -1 ? 'Y' : 'N';
//     });
//   }
//   return data;
// };

// const getRateMta = (response, request) => {
//   const policy = updatedMockData.policies[getIndex(request.policyNumber)];
//   const mtaHistoryId = policy.mtaDetails.mtaHistoryId;
//   const policyViewIndex = policy.policyViews.findIndex(view => view.mtaHistoryId === mtaHistoryId);
//   policy.policyViews[policyViewIndex].selectedCovers = request.coverageCodes;
//   response.quoteSummary.coverages.forEach((coverage) => {
//     coverage.selected = request.coverageCodes.indexOf(coverage.coverageCode) !== -1 ? 'Y' : 'N';
//   });
//   return response;
// };

// const commitMTA = (data, policyNumber) => {
//   const policy = updatedMockData.policies[getIndex(policyNumber)];
//   const mtaHistoryId = policy.mtaDetails.mtaHistoryId;
//   const policyViewIndex = policy.policyViews.findIndex(view => view.mtaHistoryId === mtaHistoryId);
//   policy.isMtaInitiated = false;
//   policy.policyViews[policyViewIndex].transactionStatus = TRANSACTION_STATUS_COMMITTED;
//   policy.policyViews[policyViewIndex].transactionType = TRANSACTION_TYPE_MTA;
//   return data;
// };

// const getData = (req, res, type) => {
//   res.header('Content-Type', 'application/json');
//   const path = getDefaultPath(req.originalUrl);
//   const data = require(path.url);
//   switch (type) {
//     case POLICIES:
//       return getPolicies(data);
//     case GET_POLICY_BY_NUMBER:
//       return getPolicyByNumberData(data, path.queryParams.policyNumber);
//     case COMMIT_MTA:
//       return commitMTA(data, path.queryParams.policyNumber);
//     case RATE_MTA:
//       return getRateMta(data, req.body);
//     case FETCH_MTA_COMMIT_INITIATE:
//       return commitMTA(data, path.queryParams.policyNumber);
//     case GET_POLICY_LAST_TRANSACTIONS_DATA:
//       return setPolicyLastTransactionsData(data, path.queryParams.policyNumber);
//     default:
//       return data;
//   }
// };


// // NBS Self Service apis

// // ---------------------------------------------> post request
// router.post(API.LOGIN, (req, res) => {
//   const user = updatedMockData.user;
//   const userValid = user.email === req.body.email && user.password === req.body.password;
//   const wrongPassword = user.email === req.body.email && user.password !== req.body.password;
//   if (userValid) {
//     res.send(loginSuccess);
//   } else {
//     res.status(500).send(wrongPassword ? unAuthorized : notRegistered);
//   }
// });

// router.post(API.VALIDATE_USER, (req, res) => {
//   res.send(true)
// });

// router.post(API.REGISTER, (req, res) => {
//   res.send(true)
// });

// router.post(API.FORGOT_EMAIL, (req, res) => {
//   res.send(true)
// });

// router.post(API.CHANGE_PASSWORD, (req, res) => {
//   res.send(true)
// });

// router.post(API.FORGOT_PASSWORD, (req, res) => {
//   res.send(true)
// });

// router.post(API.LOGOUT, (req, res) => res.send());

// // MTA
// router.post(API.INITIATE_MTA, (req, res) => {
//   const index = getIndex(req.body.policyNumber);
//   const policy = updatedMockData.policies[index];
//   const isMTACommited = policy.mtaDetails.transactionStatus === TRANSACTION_STATUS_COMMITTED;
//   const mtaDetails = isMTACommited ? resetMtaDetails() : policy.mtaDetails;
//   const policyViewIndex = policy.policyViews.length - 1;
//   const lastComittedCovers = policy.policyViews[policyViewIndex].selectedCovers;
//   mtaDetails.transactionStatus = TRANSACTION_STATUS_PENDING;
//   mtaDetails.channel = CHANNEL_ONLINE;
//   mtaDetails.reasonCode = req.body.reasonCode;
//   mtaDetails.mtaType = mtaType(req.body.reasonCode);
//   mtaDetails.mtaEffectiveDate = req.body.mtaEffectiveDate;
//   mtaDetails.mtaHistoryId = Math.floor(10000 + Math.random() * 90000);
//   mtaDetails.transactionType = TRANSACTION_TYPE_MTA;
//   policy.policyViews.push(mtaDetails);
//   policy.mtaDetails = mtaDetails;
//   policy.policyViews[policyViewIndex + 1].selectedCovers = lastComittedCovers;
//   res.send(getData(req, res));
// });

// router.post(API.FETCH_MTA_COMMIT_INITIATE, (req, res) => {
//   const index = getIndex(req.body.policyNumber);
//   const policy = updatedMockData.policies[index];
//   const isMTACommited = policy.mtaDetails.transactionStatus === TRANSACTION_STATUS_COMMITTED;
//   const mtaDetails = isMTACommited ? resetMtaDetails() : policy.mtaDetails;
//   const policyViewIndex = policy.policyViews.length - 1;
//   const lastComittedCovers = policy.policyViews[policyViewIndex].selectedCovers;
//   mtaDetails.transactionStatus = TRANSACTION_STATUS_PENDING;
//   mtaDetails.channel = CHANNEL_ONLINE;
//   mtaDetails.reasonCode = req.body.reasonCode;
//   mtaDetails.mtaEffectiveDate = req.body.mtaEffectiveDate;
//   mtaDetails.mtaHistoryId = Math.floor(10000 + Math.random() * 90000);
//   mtaDetails.transactionType = TRANSACTION_TYPE_MTA;
//   policy.policyViews.push(mtaDetails);
//   policy.mtaDetails = mtaDetails;
//   policy.policyViews[policyViewIndex + 1].selectedCovers = lastComittedCovers;
//   res.send(getData(req, res));
// });

// router.post(API.RATE_MTA, (req, res) => res.send(getData(req, res, RATE_MTA)));

// router.post(API.SAVE_RATE_MTA, (req, res) => {
//   const mtaPolicyDetails = req.body.mtaPolicyDetails;
//   const index = getIndex(mtaPolicyDetails.PolicyNumber);
//   const policy = updatedMockData.policies[index];
//   const isMTACommited = policy.mtaDetails.transactionStatus === TRANSACTION_STATUS_COMMITTED;
//   const mtaDetails = isMTACommited ? resetMtaDetails() : policy.mtaDetails;
//   const policyViewIndex = policy.policyViews.length - 1;
//   const lastComittedCovers = policy.policyViews[policyViewIndex].selectedCovers;
//   mtaDetails.transactionStatus = TRANSACTION_STATUS_PENDING;
//   mtaDetails.channel = CHANNEL_ONLINE;
//   mtaDetails.reasonCode = mtaPolicyDetails.ReasonCode;
//   mtaDetails.mtaType = mtaType(mtaPolicyDetails.ReasonCode);
//   mtaDetails.mtaEffectiveDate = mtaPolicyDetails.MTAEffectiveDate;
//   mtaDetails.mtaHistoryId = Math.floor(10000 + Math.random() * 90000);
//   mtaDetails.transactionType = TRANSACTION_TYPE_MTA;
//   policy.policyViews.push(mtaDetails);
//   policy.mtaDetails = mtaDetails;
//   policy.policyViews[policyViewIndex].selectedCovers = lastComittedCovers;
//   res.send(getData(req, res));
// });

// router.post(API.SAVE_MTA, (req, res) => res.send(getData(req, res)));

// router.post(API.SAVE_MTA_RESPONSE, (req , res) => res.send(getData(req, res)));

// router.post(API.UPDATE_MTA, (req, res) => res.send(getData(req, res)));

// router.post(API.UPDATE_RATE_MTA, (req, res) => res.send(getData(req, res)));

// router.post(API.SAVE_RATE_MTA, (req, res) => res.send(getData(req, res)));

// router.post(API.COMMIT_MTA, (req, res) => res.send(getData(req, res, COMMIT_MTA)));

// router.post(API.EXTENDED_TIMEOUT, (req, res) => res.send());

// router.post(API.SET_CREDIT_CARD_BILLING_FOR_RENEWAL, (req, res) => {
//   const quoteReferenceNumber = req.body.quoteReferenceNumber;
//   const index = updatedMockData.policies.findIndex(policy => policy.policyReference === quoteReferenceNumber);
//   updatedMockData.policies[index].isRenewalInitiated = true;
//   updatedMockData.policies[index].dueForRenewal = false;
//   res.send();
// });

// router.post(API.SET_CREDIT_CARD_BILLING_FOR_MTA, (req, res) => res.send());


// // ---------------------------------------------> get request

// router.get(API.PRODUCT_CONFIG_DATA, (req, res) => res.send(productConfigData.nbsselfservice));

// router.get(API.META_DATA, (req, res) => {
//   const pageFlow = {};
//   res.header('Content-Type', 'application/json');
//   Object.entries(metaDataSequence).map(([prop]) => {
//     const path = `../../config/metaData/nbs/${prop}.json`;
//     const data = require(path);
//     Object.assign(pageFlow, data.pageFlow);
//     return true;
//   });
//   const metaData = {
//     defaultpage: 'login',
//     pageFlow
//   };
//   res.send(metaData);
// });


// router.get(API.REFERENCE_DATA, (req, res) => {
//   const sysDate = new Date();
//   const month = sysDate.getMonth() > 8 ? sysDate.getMonth() + 1 : `0${sysDate.getMonth() + 1}`;
//   const date = sysDate.getDate() > 9 ? sysDate.getDate() : `0${sysDate.getDate()}`;
//   referenceData.SysDate = `${date}${month}${sysDate.getFullYear()}`;
//   res.send(referenceData);
// });

// router.get(API.GET_FEATUE_FLAG, (req, res) => {
//   const featureFlag = {};
//   for (const flag of updatedMockData.featureFlags) {
//     featureFlag[flag.label] = flag.value;
//   }
//   res.send(featureFlag);
// });

// router.get('/:module/:type', (req, res) => res.send(getData(req, res, req.params.type)));

// // NBS Mockserver apis
// router.post(API.RESET_MOCK, (req, res) => {
//   const index = req.body.data.index;
//   updatedMockData = req.body.data.appData;
//   updatedMockData.policies[index].policyViews = [getNewBusiness(index)];
//   res.send(updatedMockData);
// });

// router.post(API.GET_MOCK, (req, res) => res.send(updatedMockData));

// router.get(API.INITIATE_MOCK, (req, res) => {
//   res.send(updatedMockData || mockBaseData);
// });
// module.exports = router;
