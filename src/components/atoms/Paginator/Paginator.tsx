import React, { FC, useState } from 'react';
import styles from './Paginator.module.scss';

type PaginatorPropsType = {
    totalCount: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (padeNumber: number) => void;
    portionSize?: number;
};

const Paginator: FC<PaginatorPropsType> = ({ totalCount, currentPage, pageSize, onPageChange }) => {
    const [portionNumber, setPortionNumber] = useState(1);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const pageNumbers = [];
    for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
    }

    const lastPage = pageNumbers[pageNumbers.length - 1];

    const portionCount = Math.ceil(pagesCount / 10);

    const leftPortionPageNumber = (portionNumber - 1) * 10 + 1;
    const rightPortionNumber = portionNumber * 10;

    const setNextPage = () => {
        onPageChange(currentPage + 1);
        if (currentPage === rightPortionNumber) {
            setPortionNumber(portionNumber + 1);
        }
    };
    const setPrevPage = () => {
        onPageChange(currentPage - 1);
        if (currentPage === leftPortionPageNumber) {
            setPortionNumber(portionNumber - 1);
        }
    };
    const setLastPage = () => {
        onPageChange(lastPage);
        setPortionNumber(portionCount);
    };
    const setFirstPage = () => {
        onPageChange(1);
        setPortionNumber(1);
    };

    return (
        <div className={styles.paginationWrapper}>
            <button className={`${styles.btn} ${styles.btnLeft}`} onClick={setPrevPage} disabled={currentPage === pageNumbers[0]}>
                {'<'}
            </button>
            <ul className={styles.paginationList}>
                {portionNumber > 1 && (
                    <li
                        className={`${currentPage === 1 ? styles.selectedPaginationItem : ''} ${styles.paginationItem}`}
                        onClick={setFirstPage}
                    >
                        {1}...
                    </li>
                )}
                {pageNumbers
                    .filter((p) => p >= leftPortionPageNumber && p <= rightPortionNumber)
                    .map((number) => (
                        <li
                            key={number}
                            onClick={() => onPageChange(number)}
                            className={`${currentPage === number ? styles.selectedPaginationItem : ''} ${styles.paginationItem}`}
                        >
                            {number}
                        </li>
                    ))}
                {portionNumber < portionCount && <span>...</span>}
                {portionNumber < portionCount && (
                    <li
                        className={`${currentPage === lastPage ? styles.selectedPaginationItem : styles.lastPage} ${
                            styles.paginationItem
                        }`}
                        onClick={setLastPage}
                    >
                        {lastPage}
                    </li>
                )}
            </ul>
            <button
                className={`${styles.btn} ${styles.btnRight}`}
                onClick={setNextPage}
                disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Paginator;
