import Navbar from '../../components/NavBar/Navbar';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import { HomeLinksProps } from '../../interfaces';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';
import LinkForm from './LinkForm/LinkForm';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { linkActions } from '../../store/store';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';

import { StrictModeDroppable } from '../../components/StrictModeDroppableWrapper/StrictoModeDroppableWrapper';
import { PhoneMockup } from '../../components/PhoneMockup/PhoneMockup';

import styles from './HomeLinks.module.scss';
import { ProfileDetailsForm } from './ProfileDetailsForm/ProfileDetailsForm';

function HomeLinks(props: HomeLinksProps) {
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    const userLinksCopy = [...userLinks];
    const [newOrder] = userLinksCopy.splice(source.index, 1);
    userLinksCopy.splice(destination.index, 0, newOrder);
    dispatch(linkActions.updateWholeLinksOrder(userLinksCopy));
  };

  return (
    <>
      <Navbar navbarProps={navbarProps} {...props} />
      <section className={styles.mainContainer}>
        <PhoneMockup
          userLinks={userLinks}
          phoneMockupImage={phoneMockupImage}
          phoneMockupProps={phoneMockupProps}
        />
        <Card priority='white' className={styles.homeLinks}>
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
            <Button priority={'primary'}>{btnCopy}</Button>
          </Card>
        </Card>
      </section>
    </>
  );
}

export default HomeLinks;
