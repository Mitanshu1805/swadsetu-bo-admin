import React from 'react';

type props = {
    outletId: string;
};

const TableMapping: React.FC<props> = ({ outletId }) => {
    return <div>TableMapping loaded. {outletId}</div>;
};

export default TableMapping;
