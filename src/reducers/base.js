import { Map, List } from 'immutable';

import { applyCategorySettingsFromConfig } from '../util/settings_persister';

const setLoadingMessage = (state, action) => (
  state.set('loadingMessage', action.loadingMessage)
);

const hideLoadingMessage = (state, action) => (
  state.set('loadingMessage', null)
);

const setFontSize = (state, action) => (
  state.set('fontSize', action.newFontSize)
);

const setBulletStyle = (state, action) => (
  state.set('bulletStyle', action.newBulletStyle)
);

const setShouldTapTodoToAdvance = (state, action) => (
  state.set('shouldTapTodoToAdvance', action.newShouldTapTodoToAdvance)
);

const setShouldStoreSettingsInDropbox = (state, action) => (
  state.set('shouldStoreSettingsInDropbox', action.newShouldStoreSettingsInDropbox)
);

const setHasUnseenChangelog = (state, action) => (
  state.set('hasUnseenChangelog', action.newHasUnseenChangelog)
);

const setLastSeenChangelogHeader = (state, action) => (
  state.set('lastSeenChangelogHeader', action.newLastSeenChangelogHeader)
);

const setLastViewedFile = (state, action) => (
  state
    .set('lastViewedPath', action.lastViewedPath)
    .set('lastViewedContents', action.lastViewedContents)
);

const setCustomKeybinding = (state, action) => {
  if (!state.get('customKeybindings')) {
    state = state.set('customKeybindings', new Map());
  }

  return state.setIn(['customKeybindings', action.keybindingName], action.keybinding);
};

const restoreBaseSettings = (state, action) => {
  if (!action.newSettings) {
    return state;
  }

  return applyCategorySettingsFromConfig(state, action.newSettings, 'base');
};

const pushModalPage = (state, action) => (
  state.update('modalPageStack', stack => (
    !!stack ? (
      stack.push(action.modalPage)
    ) : (
      List([action.modalPage])
    )
  ))
);

const popModalPage = state => (
  state.update('modalPageStack', stack => (
    !!stack ? stack.pop() : stack
  ))
);

const clearModalStack = state => (
  state.set('modalPageStack', List())
);

const setDisplayingSyncConfirmationModal = (state, action) => (
  state
    .set('isDisplayingSyncConfirmationModal', action.isDisplaying)
    .set('lastServerModifiedAt', action.lastServerModifiedAt)
);

const setDisplayingTagsEditorModal = (state, action) => (
  state.set('isDisplayingTagsEditorModal', action.isDisplaying)
);

export default (state = new Map(), action) => {
  switch (action.type) {
  case 'SET_LOADING_MESSAGE':
    return setLoadingMessage(state, action);
  case 'HIDE_LOADING_MESSAGE':
    return hideLoadingMessage(state, action);
  case 'SET_FONT_SIZE':
    return setFontSize(state, action);
  case 'SET_BULLET_STYLE':
    return setBulletStyle(state, action);
  case 'SET_SHOULD_TAP_TODO_TO_ADVANCE':
    return setShouldTapTodoToAdvance(state, action);
  case 'SET_SHOULD_STORE_SETTINGS_IN_DROPBOX':
    return setShouldStoreSettingsInDropbox(state, action);
  case 'SET_HAS_UNSEEN_CHANGELOG':
    return setHasUnseenChangelog(state, action);
  case 'SET_LAST_SEEN_CHANGELOG_HEADER':
    return setLastSeenChangelogHeader(state, action);
  case 'SET_LAST_VIEWED_FILE':
    return setLastViewedFile(state, action);
  case 'SET_CUSTOM_KEYBINDING':
    return setCustomKeybinding(state, action);
  case 'RESTORE_BASE_SETTINGS':
    return restoreBaseSettings(state, action);
  case 'PUSH_MODAL_PAGE':
    return pushModalPage(state, action);
  case 'POP_MODAL_PAGE':
    return popModalPage(state, action);
  case 'CLEAR_MODAL_STACK':
    return clearModalStack(state, action);
  case 'SET_DISPLAY_SYNC_CONFIRMATION_MODAL':
    return setDisplayingSyncConfirmationModal(state, action);
  case 'SET_DISPLAYING_TAGS_EDITOR_MODAL':
    return setDisplayingTagsEditorModal(state, action);
  default:
    return state;
  }
};
