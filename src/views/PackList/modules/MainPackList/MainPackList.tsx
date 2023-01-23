import React from 'react';
import styles from "./MainPackList.module.scss";
import RectangleButton from "../../../../components/atoms/RectangleButton/RectangleButton";
import Button from "../../../../components/atoms/Button/Button";

type TableListProps = {
    name: string,
    cards: number,
    lastUpdated: string,
    createdBy: string,
    actions: ActionType[]
}

type ActionType = {
    name: string,
    action: () => void
}

type HeadType = {
    name: string,
    action?: () => void,
};

const headRow: HeadType[] = [
    {
        name: 'Name'
    }, {
        name: 'Cards'
    }, {
        name: 'Last Updated',
        action: () => {
        },
    }, {
        name: 'Created By'
    }, {
        name: 'Actions'
    }
]


const data: TableListProps[] = [
    {
        name: "Pack Name",
        cards: 4,
        lastUpdated: '18.03.2021',
        createdBy: 'Ivan Ivanov',
        actions: [
            {
                name: 'Delete', action: () => {
                    console.log('Delete')
                }
            },
            {name: 'Edit', action: () => console.log('Edit')},
            {name: 'Learn', action: () => console.log('Learn')},
        ]
    },
    {
        name: "Pack Name",
        cards: 4,
        lastUpdated: '18.03.2021',
        createdBy: 'Ivan Ivanov',
        actions: [
            {
                name: 'Learn',
                action: () => console.log('Learn')
            },]
    },
    {
        name: "Pack Name",
        cards: 4,
        lastUpdated: '18.03.2021',
        createdBy: 'Ivan Ivanov',
        actions: [{name: 'Delete', action: () => console.log('Delete')},
            {name: 'Edit', action: () => console.log('Edit')},
            {
                name: 'Learn',
                action: () => console.log('Learn')
            },]
    }
]

const MainPackList = () => {

    return (
        <div>
            <div className={styles.titleWrapper}>
                <span>Pack list</span>
            </div>

            <div className={styles.searchWrapper}>
                <div className={styles.searchItem}>
                    <input type="search" placeholder={'Search'} className={styles.inputWrapper}/>
                </div>

                <div className={styles.buttonWrapper}>
                    <Button isDisabled={false} name={'Add new pack'}
                            onClick={() => {
                            }}
                    />
                </div>
            </div>
            <div>
                <table className={styles.tableWrapper}>
                    <thead className={styles.packListWrapper}>
                    <tr>
                        {headRow.map((val, key) => {
                            return (
                                <th key={key} className={` ${val.action ? styles.headTableItem : ''} `}>
                                    {val.name}
                                </th>
                            )
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={key} className={styles.tableRowItem}>
                                <td>{val.name}</td>
                                <td>{val.cards}</td>
                                <td>{val.lastUpdated}</td>
                                <td>{val.createdBy}</td>
                                <td>{val.actions.map((el, index) => {
                                    return <div className={styles.btns}>
                                        <RectangleButton key={el.name} onClick={el.action} name={el.name}
                                                         isDisabled={false}
                                                         type={index === 0 ? 'primary' : 'secondary'}/>
                                    </div>
                                })}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>

    )
        ;
};

export default MainPackList;