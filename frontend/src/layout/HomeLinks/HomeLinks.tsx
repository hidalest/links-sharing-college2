import Navbar from '../../components/NavBar/Navbar';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import { FindUserInterface, HomeLinksProps } from '../../interfaces';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';
import LinkForm from './LinkForm/LinkForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { linkActions } from '../../store/store';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { StrictModeDroppable } from '../../components/StrictModeDroppableWrapper/StrictoModeDroppableWrapper';
import { PhoneMockup } from '../../components/PhoneMockup/PhoneMockup';

import styles from './HomeLinks.module.scss';
import { ProfileDetailsForm } from './ProfileDetailsForm/ProfileDetailsForm';
import axios from 'axios';
import { SERVER_URL } from '../../config/apiConfig';
import { useEffect, useState } from 'react';

function HomeLinks(props: HomeLinksProps) {
  const [allUsers, setAllUsers] = useState([]);
  const {
    mainHeader,
    mainInstructions,
    addNewLinkButtonCopy,
    welcomeMessage,
    phoneMockupImage,
    saveButton,
    navbarProps,
    linkFormProps,
    phoneMockupProps,
    profileDetailsProps,
  } = props.homeLinksData;

  const userLinks = useAppSelector((state) => state.links.links);
  const userProfileState = useAppSelector((state) => state.userProfile);
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.app.currentView);

  const { secondaryHeader, secondaryMainImage, secondaryInstructions } =
    welcomeMessage;

  const { btnCopy } = saveButton;

  const areUserLinksEmpty = userLinks.length === 0;
  const defaultLink = userLinks[0];

  const onAddNewLinkHandler = () => dispatch(linkActions.addingNewLink());

  const showLinksForm = view === 'links';
  const showProfileForm = view === 'profileDetails';
  const showAdmin = view === 'admin';

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    const userLinksCopy = [...userLinks];
    const [newOrder] = userLinksCopy.splice(source.index, 1);
    userLinksCopy.splice(destination.index, 0, newOrder);
    dispatch(linkActions.updateWholeLinksOrder(userLinksCopy));
  };

  const adminClass = showAdmin ? 'adminClass' : '';

  const gettingAllUsers = async () => {
    const data = await axios.get(SERVER_URL).then((res) => res.data.data);
    setAllUsers(data);
  };

  const onSaveToDatabase = async () => {
    console.log('Button clicked');
    const updateUser = allUsers.map((user: FindUserInterface) => {
      if (user.email === userProfileState.email) {
        user.links = [...userLinks];
      }
      return user;
    });

    console.log(updateUser);

    try {
      console.log('getting here');
      const response = await axios.post(SERVER_URL, updateUser, {
        timeout: 10000, // Timeout in milliseconds (adjust as needed)
      });
      console.log(response);
      alert('Account created successfully!');
      console.log(updateUser);
    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'ECONNABORTED') {
        console.log('Request timed out');
        alert('Request timed out. Please try again later.');
      } else {
        console.log('Something went wrong:', error.message);
        alert(`Something went wrong: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    gettingAllUsers();
  }, []);
  return (
    <>
      <Navbar navbarProps={navbarProps} {...props} />
      <section className={styles.mainContainer}>
        {showAdmin && (
          <Card
            priority='white'
            className={`${styles.homeLinks} ${styles[adminClass]}`}
          >
            <h1>List of all Users</h1>
            {allUsers.map((user: FindUserInterface) => (
              <>
                <Card priority='grey'>
                  <p>
                    User:
                    <span>{user.username}</span>
                  </p>
                  <p>
                    Number of Links:
                    <span>{user.links.length}</span>
                  </p>
                  <Button priority='primary'>Delete User</Button>
                </Card>
              </>
            ))}
          </Card>
        )}
        {!showAdmin && (
          <PhoneMockup
            userLinks={userLinks}
            phoneMockupImage={phoneMockupImage}
            phoneMockupProps={phoneMockupProps}
          />
        )}
        {!showAdmin && (
          <Card
            priority='white'
            className={`${styles.homeLinks} ${styles[adminClass]}`}
          >
            {showLinksForm && (
              <>
                <header>
                  <h1>{mainHeader}</h1>
                  <p className={styles['homeLinks-mainInstructions']}>
                    {mainInstructions}
                  </p>
                </header>

                <Button
                  priority='secondary'
                  className={styles['homeLinks-buttonAdd']}
                  onClick={onAddNewLinkHandler}
                >
                  {addNewLinkButtonCopy}
                </Button>

                {areUserLinksEmpty && (
                  <WelcomeMessage
                    secondaryHeader={secondaryHeader}
                    secondaryInstructions={secondaryInstructions}
                    secondaryMainImage={secondaryMainImage}
                  />
                )}
                <DragDropContext onDragEnd={onDragEnd}>
                  <StrictModeDroppable droppableId='userLinks'>
                    {(provided) => (
                      <div
                        className={styles.linksContainer}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {userLinks.map((link, index) => {
                          return (
                            <Draggable
                              draggableId={link.linkId}
                              key={link.linkId}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <LinkForm
                                      linkFormProps={linkFormProps}
                                      linkId={link.linkId}
                                      linkName={link.name}
                                      linkUserLink={link.userLink}
                                      linkPlaceholder={link.placeholderLink}
                                      linkIcon={link.icon}
                                      enumeration={index + 1}
                                      defaultLink={defaultLink}
                                      isDragging={snapshot.isDragging}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </div>
                    )}
                  </StrictModeDroppable>
                </DragDropContext>
              </>
            )}

            {showProfileForm && <ProfileDetailsForm {...profileDetailsProps} />}

            <Card priority='white' className={styles['buttonSave--container']}>
              <Button onClick={onSaveToDatabase} priority={'primary'}>
                {btnCopy}
              </Button>
            </Card>
          </Card>
        )}
      </section>
    </>
  );
}

export default HomeLinks;
