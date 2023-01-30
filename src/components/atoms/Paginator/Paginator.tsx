import React, {FC} from 'react';
import styles from './Paginator.module.scss'
import {useAppDispatch} from "../../../store/store";
import {setCurrentPageAC} from "../../../store/pack-reducer";

type PaginatorPropsType = {
    totalCount: number,
    currentPage: number,
    pageSize: number,
    //onPageChange: (padeNumber: number) => void,
}


const Paginator: FC<PaginatorPropsType> = ({totalCount, currentPage, pageSize}) => {
    const dispatch = useAppDispatch();


    let pagesCount = Math.ceil(totalCount / pageSize);
    let pageNumbers = [];
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPageAC({currentPage: pageNumber}));
    }

    return (
        <div>
            <div className="pagination-container">
                <button className={`${styles.btn} ${styles.btnLeft}`}
                    //onClick={setPrevPage}
                        disabled={currentPage === pageNumbers[0]}>
                    {"<"}
                </button>
                <ul className={styles.paginationList}>
                    {pageNumbers.map((number) => (
                        <li key={number}
                            onClick={(e) => {
                                onPageChanged(number)
                            }}
                            className={`${currentPage === number && styles.selectedPaginationItem} ${styles.paginationItem}`}
                        >
                            {number}
                        </li>
                    ))}
                </ul>
                <button className={`${styles.btn} ${styles.btnRight}`}
                    //onClick={setNextPage}
                        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}>{">"}</button>
            </div>
        </div>
    );
};

export default Paginator;
