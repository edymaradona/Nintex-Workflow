import {
  NWC_ID, RM_ALERT_ID, RM_BTN_CLASS, ADD_NWC_API_ID, ADD_NWC_CONFIRM_BTN_ID, NWC_DOMAIN_NAME,
} from '../config';
import styles from '../../css/ApiView.module.css';

const getBadgeHtml = key => `<a href="https://${key}${NWC_DOMAIN_NAME}" target="_blank"><span class="${styles.badge}" id="nwc_${key}">
                              ${key}<span data-key=${key} class="btn ml-2 ${styles.removeBtn} ${RM_BTN_CLASS}">X</span>
                            </span></a>`;

export const initialNWCApiView = (apiKeys) => {
  const viewArr = Object.keys(apiKeys).map(getBadgeHtml);
  $(NWC_ID).html(viewArr.join(''));
};

export const appendBadge = key => $(NWC_ID).append(getBadgeHtml(key));

export const toggleRemoveAlert = () => $(RM_ALERT_ID).modal('toggle');

export const toggleAddModal = () => $(ADD_NWC_API_ID).modal('toggle');

export const disableSaveBtn = () => $(ADD_NWC_CONFIRM_BTN_ID).prop('disabled', true);

export const enableSaveBtn = () => $(ADD_NWC_CONFIRM_BTN_ID).prop('disabled', false);
