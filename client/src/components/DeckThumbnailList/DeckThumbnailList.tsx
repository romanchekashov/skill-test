import React, { useEffect, useState } from 'react';
import { DeckDto } from '@skill-test/data/dto/learn/DeckDto';
import { getDecks } from '../../api/deckApi';
import DeckThumbnail from '../DeckThumbnail/DeckThumbnail';
import styles from "./DeckThumbnailList.module.css";

type Props = {
}

const DeckThumbnailList: React.FC<Props> = ({}) => {
    const [decks, setDecks] = useState<DeckDto[]>([]);

    useEffect(() => {
        getDecks()
            .then(setDecks)
            .catch(reason => console.error(reason));
    }, []);

    return (
        <div className={styles.TestList}>
            {
                decks.map(deck => (
                    <React.Fragment key={deck.id}>
                        <DeckThumbnail test={deck}/>
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default DeckThumbnailList;