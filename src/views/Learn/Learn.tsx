import React from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import styles from './Learn.module.scss';
import Arrow from '../../assets/Icons/Arrow.svg';
import { useNavigate } from 'react-router-dom';
import LearnCard from '../../components/LearnCard/LearnCard';
import CardBasisWrapper from '../../components/atoms/CardBasisWrapper/CardBasisWrapper';
import Container from '../../components/atoms/Container/Container';

const Learn = () => {
    /*const [showAnswer, setShowAnswer] = useState(false);*/
    const navigate = useNavigate();
    const onClickToBack = () => {
        navigate('/packList');
    };

    return (
        <CommonPageWrapper customStyles={styles.containerWrapper}>
            <Container>
                <div className={styles.itemWrapper}>
                    <div className={styles.backPackList} onClick={onClickToBack}>
                        <img src={Arrow} alt="" className={styles.imgWrapper} />
                        Back to Packs List
                    </div>
                    <div className={styles.titleWrapper}>
                        <span>Learn Pack Name</span>
                    </div>
                </div>
                <CardBasisWrapper>
                    <div className={styles.wrapper}>
                        <LearnCard />
                    </div>
                </CardBasisWrapper>
            </Container>
        </CommonPageWrapper>
    );
};

export default Learn;
