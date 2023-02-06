import React, { FC } from 'react';

type HeaderPopUpType = {
    title: string;
    onClose: () => void;
};

const HeaderPopUp: FC<HeaderPopUpType> = ({ title, onClose }) => {
    return (
        <div>
            <div onClick={onClose} />
            {title}
        </div>
    );
};

export default HeaderPopUp;
