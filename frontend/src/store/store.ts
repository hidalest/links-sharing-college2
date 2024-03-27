import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type UserLink = {
  name: string;
  userLink: string;
  linkId: string;
  placeholderLink: string;
  icon: string;
  isValid: boolean;
  backgroundColor: string;
  fontColor: string;
};

type AppState = {
  links: UserLink[];
};

type PayloadReplaceLink = {
  linkId: string;
  findPlatform: UserLink;
};

type updateUserLinkProps = {
  linkId: string;
  inputValue: string;
  isValid: boolean;
};

type updateColorProps = {
  linkId: string;
  attributeElement: string;
  elementValue: string;
};
const linkStoreInitialState: AppState = {
  links: [],
};

const linksStore = createSlice({
  name: 'links',
  initialState: linkStoreInitialState,
  reducers: {
    updateLinksFromFetch(state, action: PayloadAction<UserLink[]>) {
      state.links = action.payload;
    },
    addingNewLink(state) {
      state.links.push({
        name: 'Github',
        userLink: '',
        linkId: Math.random().toString(),
        placeholderLink: 'https://www.github.com/hidalest',
        icon: '/src/assets/images/icon-github.svg',
        isValid: false,
        backgroundColor: '#333333',
        fontColor: '#ffffff',
      });
    },

    removeLink(state, action: PayloadAction<string>) {
      state.links = state.links.filter(
        (link) => link.linkId !== action.payload
      );
    },

    updateTheLinkPlatform(state, action: PayloadAction<PayloadReplaceLink>) {
      const { linkId, findPlatform } = action.payload;
      const linkFound = state.links.find((link) => link.linkId === linkId);
      if (linkFound) {
        linkFound.name = findPlatform.name;
        linkFound.placeholderLink = findPlatform.placeholderLink;
        linkFound.icon = findPlatform.icon;
        linkFound.userLink = findPlatform.userLink;
      }
    },
    updateTheUserLink(state, action: PayloadAction<updateUserLinkProps>) {
      const { linkId, inputValue, isValid } = action.payload;
      const linkFound = state.links.find((link) => link.linkId === linkId);
      if (linkFound) {
        linkFound.userLink = inputValue;
        linkFound.isValid = isValid;
      }
    },

    updateWholeLinksOrder(state, action: PayloadAction<UserLink[]>) {
      state.links = action.payload;
    },

    updateLinkColor(state, action: PayloadAction<updateColorProps>) {
      const { linkId, attributeElement, elementValue } = action.payload;

      const foundLink = state.links.find((link) => link.linkId === linkId);

      if (foundLink) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (foundLink as any)[attributeElement] = elementValue;
      }
    },
  },
});

// APP General Store
interface appStoreInitialStateProps {
  theme: 'light' | 'dark';
  currentView: 'links' | 'profileDetails';
  currentAuthenticationView: 'login' | 'signup';
}

const appStoreInitialState: appStoreInitialStateProps = {
  theme: 'dark',
  currentView: 'links',
  currentAuthenticationView: 'login',
};

const appSlice = createSlice({
  name: 'app',
  initialState: appStoreInitialState,
  reducers: {
    changeView(state, action: PayloadAction<'links' | 'profileDetails'>) {
      state.currentView = action.payload;
    },
    changeAuthenticationView(state) {
      state.currentAuthenticationView =
        state.currentAuthenticationView === 'login' ? 'signup' : 'login';
    },
  },
});

// USER PROFILE SLICE
type profileImageType = File | null;

interface userProfileInitialStateProps {
  username: string;
  email: string;
  profileImgURL?: profileImageType;
}

const userProfileInitialState: userProfileInitialStateProps = {
  username: '',
  email: '',
  profileImgURL: null,
};

const userProfileSlice = createSlice({
  name: 'userProfileSlice',
  initialState: userProfileInitialState,
  reducers: {
    updateUserProfile(
      state,
      action: PayloadAction<userProfileInitialStateProps>
    ) {
      const { username: firstName, email } = action.payload;
      state.username = firstName;
      state.email = email;
    },
    updateUserImage(state, action: PayloadAction<profileImageType>) {
      state.profileImgURL = action.payload;
    },
  },
});

const userAuthenticationSliceInitialState = {
  view: 'login',
};

const userAuthentication = createSlice({
  name: 'authenticationSlice',
  initialState: userAuthenticationSliceInitialState,
  reducers: {},
});

const store = configureStore({
  reducer: {
    links: linksStore.reducer,
    app: appSlice.reducer,
    userProfile: userProfileSlice.reducer,
    authenticationSlice: userAuthentication.reducer,
    //anotherSlice: ....
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const linkActions = linksStore.actions;
export const appActions = appSlice.actions;
export const userProfileActions = userProfileSlice.actions;
export const authenticationActions = userAuthentication.actions;

export default store;
