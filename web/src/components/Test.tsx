import React from 'react';
import {TestDto} from "@skill-test/data/dto/test/TestDto";
import "./Test.css";
import {Link} from "react-router-dom";
import {Card} from "primereact/card";
import {Button} from "primereact/button";

type Props = {
    test: TestDto
}

const Test: React.FC<Props> = ({test}) => {
    const header = (
        <img alt="Card" src={test.previewImg || ""} onError={(e: any) => {
            console.error(e);
            e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }} />
    );
    const footer = (
        <span>
            <Link to={'/' + test.id}>
                <Button label="Show" icon="pi pi-check" />
            </Link>
            {/*<Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />*/}
        </span>
    );
    return (
        <div>
            <Card title={test.name} subTitle={test.categories.map(value => value.name).join()} className="Test" footer={footer} header={header}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>asdom asdsadd</p>
            </Card>
        </div>
    );
}

export default Test;