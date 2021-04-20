import React from 'react';
import {DeckDto} from "@skill-test/data/dto/learn/DeckDto";
import Link from 'next/link'
import {Card} from "primereact/card";
import {Button} from "primereact/button";

import styles from "./DeckThumbnail.module.css";

type Props = {
    test: DeckDto
}

const DeckThumbnail: React.FC<Props> = ({test}) => {
    const header = (
        <img alt="Card" src={test.previewImg || ""} onError={(e: any) => {
            console.error(e);
            e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }} />
    );
    const footer = (
        <span>
            <Link href={'/' + test.id}>
                <Button label="Show" icon="pi pi-check" />
            </Link>
            {/*<Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />*/}
        </span>
    );
    return (
        <div>
            <Card title={test.name} 
                  subTitle={test.categories?.map(value => value.name).join()} 
                  className={styles.Test} 
                  footer={footer} 
                  header={header}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>asdom asdsadd</p>
            </Card>
        </div>
    );
}

export default DeckThumbnail;