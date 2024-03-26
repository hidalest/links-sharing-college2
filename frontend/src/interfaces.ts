// Main HomeLinks

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

export type commonProps = {
  className?: string;
  id?: string;
  name?: string;
};

export type LinkType = {
  icon: string;
  name: string;
  placeholderLink: string;
  userLink?: string;
  isValid?: boolean;
  backgroundColor?: string;
  fontColor?: string;
};
export interface HomeLinksProps {
  mainLogoDesktop: string;
  mainLogoSmall: string;
  homeLinksData: {
    phoneMockupImage: string;
    mainHeader: string;
    mainInstructions: string;
    addNewLinkButtonCopy: string;
    welcomeMessage: {
      secondaryHeader: string;
      secondaryMainImage: string;
      secondaryInstructions: string;
    };
    navbarProps: {
      logoLinkPage: string;
      logoProfilePage: string;
      linkPageCopy: string;
      profileDetailsPageCopy: string;
      buttonPreviewCopy: string;
      buttonPreviewIcon: string;
    };

    saveButton: {
      btnCopy: string;
    };
    defaultLink: LinkType;

    linkFormProps: {
      heading: string;
      removeButton: string;
      platformHeading: string;
      linkSubheading: string;
      inputLinkIcon: string;
      sources: LinkType[];
      dragAndDropIcon: string;
      addButton: string;
    };
    phoneMockupProps: {
      arrowIconLinks: string;
    };
    profileDetailsProps: profileDetailsProps;
  };
}
export interface profileDetailsProps {
  heading: string;
  headingInstructions: string;
  profilePictureImageLabel: string;
  profilePictureImageInstructions: string;
  profilePictureImageIcon: string;
  profilePictureImagePlaceholder: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  firstNameErrorMessage: string;
  secondLastNameLabel: string;
  secondLastNamePlaceholder: string;
  secondNameErrorMessage: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailErrorMessage: string;
}
// Navigation Bar Props

export interface NavBarProps {
  mainLogoDesktop: string;
  mainLogoSmall: string;
  navbarProps: {
    logoLinkPage: string;
    logoProfilePage: string;
    linkPageCopy: string;
    profileDetailsPageCopy: string;
    buttonPreviewCopy: string;
    buttonPreviewIcon: string;
  };
}

export type UserLink = {
  name: string;
  userLink: string;
  linkId: string;
};

// Link form interface
export interface LinkFormProps {
  linkFormProps: {
    removeButton: string;
    heading: string;
    platformHeading: string;
    linkSubheading: string;
    inputLinkIcon: string;
    sources: LinkType[];
    dragAndDropIcon: string;
    addButton: string;
  };
  linkId: string;
  linkName: string;
  linkUserLink: string;
  linkPlaceholder: string;
  linkIcon: string;
  enumeration: number;
  defaultLink: LinkType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging: boolean;
}

// preview page props
export interface PreviewPageProps {
  previewPageProps: {
    navbarProps: {
      goBackBtn: string;
      shareLinkBtn: string;
    };
  };
}
// authentication page props
export interface AuthenticationPageProps {
  className?: string;
  mainLogoDesktop: string;
  authenticationPhaseProps: {
    loginPhase: {
      loginHeader: string;
      loginInstructions: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      loginButton: string;
      registerInstructionsBtn: string;
      registerBtn: string;
    };
    signupPhase: {
      loginHeader: string;
      loginInstructions: string;
      emailLabel: string;
      emailPlaceholder: string;
      usernameLabel: string;
      usernameIcon: string;
      usernamePlaceholder: string;
      inputPasswordIcon: string;
      inputPasswordEmailIcon: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      confirmPasswordLabel: string;
      confirmPasswordPlaceholder: string;
      passwordInstructions: string;
      loginButton: string;
      registerInstructionsBtn: string;
      registerBtn: string;
    };
  };
}

export interface LoginProps {
  className?: string;
  loginPhase: {
    loginHeader: string;
    inputPasswordIcon: string;
    usernameIcon: string;
    loginInstructions: string;
    emailIcon: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    passwordIcon: string;
    loginButton: string;
    registerInstructionsBtn: string;
    registerBtn: string;
  };
}
export interface SignupProps {
  className?: string;
  signupPhase: {
    loginHeader: string;
    loginInstructions: string;
    emailLabel: string;
    inputPasswordIcon: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    loginButton: string;
    registerInstructionsBtn: string;
    registerBtn: string;
    inputPasswordEmailIcon: string;
    usernameIcon: string;
    usernamePlaceholder: string;
    usernameLabel: string;
    passwordInstructions: string;
  };
}
