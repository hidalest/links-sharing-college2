import Card from '../../../components/UI/Card/Card';
import styles from './WelcomeMessage.module.scss';

interface WelcomeMessageProps {
  secondaryHeader: string;
  secondaryMainImage: string;
  secondaryInstructions: string;
}

function WelcomeMessage(props: WelcomeMessageProps) {
  const { secondaryHeader, secondaryMainImage, secondaryInstructions } = props;
  return (
    <Card className={styles.welcomeMessage} priority='grey'>
      <img src={secondaryMainImage} alt='start creating links' />
      <h2>{secondaryHeader}</h2>
      <p>{secondaryInstructions}</p>
    </Card>
  );
}

export default WelcomeMessage;
