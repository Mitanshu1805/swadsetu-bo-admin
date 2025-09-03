import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
// import StepOne from './StepOne';
// import StepTwo from './StepTwo';
// import StepThree from './StepThree';
// import { registerItem, updateItem, getItemDetails } from '../../../../redux/menu/actions';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import './style.css';
import { registerItem, updateItem } from '../../../../redux/actions';

type FormData = {
    item_name: {
        english: string;
        hindi: string;
        gujarati: string;
    };
    description: string;
    price: number;
    category_id: string;
    outlet_id: string[];
    images: string[];
    is_active: boolean;
    outlet_prices: [];
    available_order_type: [];
    online_display_name: string;
    dietary_type: string;
    item_order_type: string;
    gst_type: string;
    loose_quantity: boolean;
    quantity_value: string;
    quantity_type: string;
    quantity_params: string;
    volume_unit: string;
    is_loose: boolean;
};

interface Outlet {
    outlet_id: string;
    outlet_name: string;
}

const ItemModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const startStep = location?.state?.startStep || 1;
    const [step, setStep] = useState(startStep);

    const editMode = location?.state?.editMode || false;
    const itemId = location?.state?.item_id || null;
    const category_id = location?.state?.category_id;
    const outletId = location?.state?.outletId;
    console.log('outletId>>>', outletId);

    const itemData = useSelector((state: any) => state?.Menu?.categories);

    console.log(itemData);

    const [selectedOutlets, setSelectedOutlets] = useState<Outlet[]>([]);
    const methods = useForm<FormData>({
        defaultValues: {
            item_name: { english: '', hindi: '', gujarati: '' },
            description: '',
            price: 0,
            category_id: '',
            outlet_id: [],
            images: [],
            is_active: false,
        },
        mode: 'onBlur',
    });

    // Fetch item details if editing
    useEffect(() => {
        if (editMode && itemId) {
            // dispatch(getItemDetails(itemId));
        }
    }, [dispatch, editMode, itemId]);

    // Populate form when data arrives
    useEffect(() => {
        if (editMode && itemId && Array.isArray(itemData)) {
            console.log(editMode, itemId, itemData);

            let toEdit = null;

            for (const category of itemData) {
                console.log(category.items);

                if (Array.isArray(category.items)) {
                    const foundItem = category.items.find((item: any) => String(item.item_id) === String(itemId));
                    console.log(foundItem);

                    if (foundItem) {
                        toEdit = foundItem;
                        break;
                    }
                }
            }
            console.log(toEdit.outlets);

            if (toEdit) {
                methods.reset({
                    item_name: {
                        english: toEdit.item_names?.english || '',
                        hindi: toEdit.item_names?.hindi || '',
                        gujarati: toEdit.item_names?.gujarati || '',
                    },
                    description: toEdit.description || '',
                    price: toEdit.price || 0,
                    category_id: toEdit.category_id || '',
                    // outlet_id: toEdit.outlets || [],
                    outlet_id: toEdit.outlets?.map((o: any) => o.outlet_id) || [],
                    available_order_type: toEdit.available_order_type || [],
                    dietary_type: toEdit.dietary,
                    gst_type: toEdit.gst_type,
                    is_loose: !!toEdit.is_loose,
                    quantity_type: toEdit.quantity_type,
                    quantity_value: toEdit.quantity_value,
                    quantity_params: toEdit.quantity_params,
                    images: toEdit.images || [],
                    is_active: Boolean(toEdit.is_active),
                    online_display_name: toEdit.online_display_name,
                });
            }
            console.log(toEdit.outlets);
            if (Array.isArray(toEdit.outlets)) {
                const mapped = toEdit.outlets.map((o: any) => ({
                    outlet_id: o.outlet_id,
                    outlet_name: o.outlet_name, // make sure backend is giving this
                }));
                setSelectedOutlets(mapped);
            }
            console.log(selectedOutlets);
        }
    }, [editMode, itemId, itemData, methods]);

    const prevStep = () => setStep((prev: any) => prev - 1);
    const nextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];

        if (step === 1)
            fieldsToValidate = ['item_name', 'description', 'price', 'available_order_type', 'dietary_type'];
        if (step === 2) fieldsToValidate = ['category_id', 'outlet_id'];

        const isValid = await methods.trigger(fieldsToValidate as any);
        if (isValid) {
            if (step < 3) setStep(step + 1);
            else methods.handleSubmit(onSubmit)();
        }
    };

    const onSubmit = (data: any) => {
        console.log('data>>', data);

        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const businessId = business.business_id;
        if (!businessId) return;

        const formDataToSend = new window.FormData();
        formDataToSend.append('business_id', businessId);
        if (editMode) formDataToSend.append('item_id', itemId);

        formDataToSend.append('item_name', JSON.stringify(data.item_name));
        formDataToSend.append('category_id', category_id);
        formDataToSend.append('online_display_name', data.online_display_name ?? '');
        formDataToSend.append('available_order_type', JSON.stringify(data.available_order_type));
        formDataToSend.append('dietary', data.dietary_type);
        formDataToSend.append('description', data.description ?? '');
        formDataToSend.append('price', String(data.price));
        // formDataToSend.append('category_id', category_id);
        formDataToSend.append('outlet_prices', JSON.stringify(data.outlet_prices));
        formDataToSend.append('quantity_type', data.quantity_type ?? 'none');
        formDataToSend.append('quantity_params', data.quantity_params ?? 'none');
        formDataToSend.append('quantity_value', data.quantity_value ?? 'none');
        formDataToSend.append('is_loose', String(data.is_loose));
        formDataToSend.append('gst_type', data.gst_type ? data.gst_type : 'none');

        // formDataToSend.append('is_active', String(data.is_active));

        if (data.logo_image) formDataToSend.append('logo_image', data.logo_image);
        if (data.swiggy_image) formDataToSend.append('swiggy_image', data.swiggy_image);
        if (data.banner_image) formDataToSend.append('banner_image', data.banner_image);

        // data.images.forEach((img: any) => {
        //     if (img instanceof File) formDataToSend.append('images', img);
        // });

        console.log('formDataToSend>>>>>>>', formDataToSend);

        if (editMode) {
            dispatch(updateItem(formDataToSend));
        } else {
            dispatch(registerItem(formDataToSend));
        }

        navigate('/item-list', { state: { outletId } });
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && step < 3) e.preventDefault();
                }}
                className="add-item-container">
                {step > 1 && (
                    <button type="button" className="back-btn" onClick={prevStep}>
                        ←
                    </button>
                )}

                {/* Stepper */}
                <div className="step-indicator">
                    {/* Step 1 */}
                    <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>{step > 1 ? '✔' : '1'}</div>

                    {/* Line after step 1 */}
                    <div className={`step-line ${step > 1 ? 'completed' : ''}`}></div>

                    {/* Step 2 */}
                    <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>{step > 2 ? '✔' : '2'}</div>

                    {/* Line after step 2 */}
                    <div className={`step-line ${step > 2 ? 'completed' : ''}`}></div>

                    {/* Step 3 */}
                    <div className={`step-circle ${step === 3 ? 'active' : ''}`}>3</div>
                </div>

                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo selectedOutlets={selectedOutlets} setSelectedOutlets={setSelectedOutlets} />}
                {step === 3 && <StepThree selectedOutlets={selectedOutlets} />}

                <div className="bottom-btn-container">
                    <button type="button" className="bottom-btn" onClick={nextStep}>
                        {editMode ? (step < 3 ? 'Continue' : 'Update') : step < 3 ? 'Continue' : 'Submit'}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default ItemModal;
