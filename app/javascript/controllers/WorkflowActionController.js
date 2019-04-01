import {
  ACTIVATE_ACT_ID, EXPORT_ACT_ID,
  MOVE_ACT_ID, DELETE_ACT_ID, TABLE_RADIO_NAME,
} from '../config';
import {
  activateAct, deactivateAct, exportDraftAct, exportPublishedAct,
} from '../models/NWC';
import { updateActiveColumn } from '../views/WorkflowTableView';
import { toggleAlert } from '../views/AlertView';

const action = (fn) => {
  const radioElement = $(`input[name='${TABLE_RADIO_NAME}']:checked`);
  const workflowId = radioElement.val();
  const rowElement = radioElement.parent().parent()[0];
  if (workflowId) fn(workflowId, rowElement.childNodes[1].innerText, rowElement);
};

/**
 * Call the activate action if the current status is false
 * and call the deactivate action is the status is true.
 * will do nothing if the active is empty (Draft workflows).
 * Also will update the column to reflect the new active status.
 */
const toggleActivateAct = () => action((workflowId, tenant, rowElement) => {
  // console.log('activate ', workflowId, fetchNWCApis()[tenant]);
  const activeElement = rowElement.childNodes[6];
  if (activeElement.innerText !== '') {
    if (activeElement.innerText === 'false') activateAct(workflowId, tenant);
    else deactivateAct(workflowId, tenant);

    toggleAlert(`The workflow has been ${activeElement.innerText === 'false' ? 'activated' : 'deactivated'} successfully`);
    updateActiveColumn(activeElement);
  }
});

const exportAct = () => action((workflowId, tenant, rowElement) => {
  const statusElement = rowElement.childNodes[5];
  if (statusElement.innerText === 'Draft') exportDraftAct(workflowId, tenant);
  else exportPublishedAct(workflowId, tenant);
  toggleAlert('The workflow has been exported successfully');
});

const moveAct = () => action((workflowId, tenant) => console.log('move ', workflowId));
const deleteAct = () => action((workflowId, tenant) => console.log('delete ', workflowId));

export const initialActionBtns = () => {
  $(ACTIVATE_ACT_ID).on('click', toggleActivateAct);
  $(EXPORT_ACT_ID).on('click', exportAct);
  $(MOVE_ACT_ID).on('click', moveAct);
  $(DELETE_ACT_ID).on('click', deleteAct);
};
export default initialActionBtns;
