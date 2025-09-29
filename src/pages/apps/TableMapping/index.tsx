import React, { useEffect, useState } from 'react';
import { areaCreate, areaTables, areaDelete, areaAdd } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { AppColors } from '../../../utils/Colors';
import { FaRegTrashAlt } from 'react-icons/fa';
// import { areaDelete } from '../../../helpers/api/auth';

type Props = {
    outletId: string;
};

const TableMapping: React.FC<Props> = ({ outletId }) => {
    const dispatch = useDispatch();
    const areaTablesData = useSelector((state: RootState) => state?.TableMappingReducer?.areas?.data);
    const areaTableInfo = useSelector((state: any) => state?.TableMappingReducer?.error);
    console.log(areaTableInfo);

    const [selectedArea, setSelectedArea] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableNumberInput, setTableNumberInput] = useState('');

    useEffect(() => {
        if (!outletId) return;
        dispatch(areaTables(outletId));
    }, [dispatch, outletId]);

    useEffect(() => {
        if (areaTablesData?.length) {
            // If current selectedArea no longer exists, select first area
            const exists = areaTablesData.some((area: any) => area.area_id === selectedArea);
            if (!exists) {
                setSelectedArea(areaTablesData[0].area_id);
            }
        } else {
            setSelectedArea(null); // no areas left
        }
    }, [areaTablesData]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available':
                return AppColors.primaryColor;
            case 'occupied':
                return '#f44336';
            case 'reserved':
                return '#ff9800';
            default:
                return '#9e9e9e';
        }
    };

    return (
        <div>
            {/* Header with Create Area buttons */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}>
                <h2>Areas</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        style={{
                            backgroundColor: AppColors.primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            const payload = {
                                area_name: 'Dining Hall',
                                area_status: 'available',
                                outlet_id: outletId,
                            };

                            dispatch(areaCreate(payload));
                            setTimeout(() => {
                                dispatch(areaTables(outletId));
                            }, 200);
                        }}>
                        D
                    </button>
                    <button
                        style={{
                            backgroundColor: AppColors.primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            const payload = {
                                area_name: 'Ground Floor',
                                area_status: 'available',
                                outlet_id: outletId,
                            };

                            dispatch(areaCreate(payload));
                            setTimeout(() => {
                                dispatch(areaTables(outletId));
                            }, 200);
                        }}>
                        G
                    </button>
                    <button
                        style={{
                            backgroundColor: AppColors.primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                        }}
                        disabled={!selectedArea}
                        onClick={async () => {
                            if (!selectedArea) return;
                            dispatch(areaDelete(selectedArea)); // pass selected area id

                            setTimeout(() => {
                                dispatch(areaTables(outletId));
                            }, 200);
                        }}>
                        <FaRegTrashAlt />
                    </button>
                </div>
            </div>

            {/* Area names horizontally */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                {areaTablesData?.map((area: any) => (
                    <span
                        key={area.area_id}
                        onClick={() => setSelectedArea(area.area_id)}
                        style={{
                            cursor: 'pointer',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            backgroundColor: selectedArea === area.area_id ? AppColors.primaryColor : '#f0f0f0',
                            color: selectedArea === area.area_id ? 'white' : 'black',
                        }}>
                        {area.area_name}
                    </span>
                ))}
            </div>

            {/* Show tables of selected area */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '1rem',
                }}>
                {selectedArea ? (
                    <>
                        {areaTablesData
                            .find((area: any) => area.area_id === selectedArea)
                            ?.tables?.map((table: any) => (
                                <div
                                    key={table.table_id}
                                    style={{
                                        background: '#fff',
                                        border: `2px solid ${getStatusColor(table.table_status)}`,
                                        borderRadius: '10px',
                                        padding: '1rem',
                                        textAlign: 'center',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                        cursor: 'pointer',
                                    }}>
                                    <h3 style={{ margin: 0 }}>Table {table.table_number}</h3>
                                    <p
                                        style={{
                                            margin: '0.5rem 0',
                                            fontSize: '0.9rem',
                                            color: getStatusColor(table.table_status),
                                        }}>
                                        {table.table_status.toUpperCase()}
                                    </p>
                                    {table.latest_order ? (
                                        <p style={{ fontSize: '0.8rem' }}>Order: #{table.latest_order.id}</p>
                                    ) : (
                                        <p style={{ fontSize: '0.8rem', color: '#888' }}>No Active Order</p>
                                    )}
                                </div>
                            ))}

                        {/* Add Table Card */}
                        {/* <div
                            onClick={() => {
                                if (!selectedArea) return;

                                // find the selected area
                                const area = areaTablesData.find((a: any) => a.area_id === selectedArea);
                                if (!area) return;

                                // get next table number
                                const nextTableNumber =
                                    area.tables.length > 0
                                        ? Math.max(...area.tables.map((t: any) => t.table_number)) + 1
                                        : 1;

                                const payload = {
                                    area_id: selectedArea,
                                    table_number: nextTableNumber,
                                };

                                dispatch(areaAdd(payload));

                                // optionally refetch tables after a small delay
                                setTimeout(() => {
                                    dispatch(areaTables(outletId));
                                }, 200);
                            }}
                            style={{
                                background: '#fff',
                                border: `2px dashed ${AppColors.primaryColor}`,
                                borderRadius: '10px',
                                padding: '1rem',
                                textAlign: 'center',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                color: AppColors.primaryColor,
                            }}>
                            +
                        </div> */}
                        {/* Add Table Card */}
                        <div
                            onClick={() => {
                                if (!selectedArea) return;
                                setIsModalOpen(true); // open modal instead of prompt
                            }}
                            style={{
                                background: '#fff',
                                border: `2px dashed ${AppColors.primaryColor}`,
                                borderRadius: '10px',
                                padding: '1rem',
                                textAlign: 'center',
                                boxShadow: `0 2px 6px rgba(0,0,0,0.1)`,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                color: AppColors.primaryColor,
                            }}>
                            +
                        </div>
                    </>
                ) : (
                    <p>Please select an area</p>
                )}
            </div>
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}>
                    <div
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '300px',
                            textAlign: 'center',
                        }}>
                        <h3>Add Table</h3>
                        <input
                            type="number"
                            value={tableNumberInput}
                            onChange={(e) => setTableNumberInput(e.target.value)}
                            placeholder="Enter table number"
                            style={{
                                width: '100%',
                                padding: '8px',
                                margin: '10px 0',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button
                                style={{
                                    background: AppColors.primaryColor,
                                    color: '#fff',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    if (!tableNumberInput || isNaN(Number(tableNumberInput))) {
                                        alert('Please enter a valid number');
                                        return;
                                    }

                                    const payload = {
                                        area_id: selectedArea,
                                        table_number: Number(tableNumberInput),
                                    };

                                    dispatch(areaAdd(payload));

                                    // setTimeout(() => {
                                    //     dispatch(areaTables(outletId));
                                    // }, 200);

                                    setTableNumberInput('');
                                    setIsModalOpen(false);
                                }}>
                                Add
                            </button>
                            <button
                                style={{
                                    background: '#ccc',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setTableNumberInput('');
                                    setIsModalOpen(false);
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableMapping;
