import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
// import your category actions
import { categoryItemList, registerCategory, updateCategory } from '../../../../redux/menu/actions';

type FormData = {
    category_name: {
        english: string;
        hindi: string;
        gujarati: string;
    };
    business_id: string;
    outlet_id: string[];
    logo_image: string;
    swiggy_image: string;
    banner_image: string;
    is_active: boolean;
};

const CategoryModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const startStep = location?.state?.startStep || 1;
    const [step, setStep] = useState(startStep);
    const editMode = location?.state?.editMode || false;
    const categoryId = location?.state?.category_id || null;
    const outletId = location?.state?.outletId;
    const categoryData = useSelector((state: any) => state?.Menu?.categories);
    console.log('categoryData>>', categoryData);
    console.log('categoryID>>>', categoryId);

    useEffect(() => {
        if (editMode && categoryId) {
            const business = JSON.parse(localStorage.getItem('selected_business') || '{}');

            const payload = {
                business_id: business.business_id,
                outlet_id: outletId,
            };
            if (payload.outlet_id === 'master') {
                delete payload.outlet_id;
            }
            dispatch(categoryItemList(payload));
        }
    }, [dispatch]);

    const methods = useForm<FormData>({
        defaultValues: {
            category_name: {
                english: '',
                hindi: '',
                gujarati: '',
            },
            business_id: '',
            outlet_id: [],
            logo_image: '',
            swiggy_image: '',
            banner_image: '',
            is_active: true,
        },
        mode: 'onBlur',
    });
    useEffect(() => {
        if (editMode && categoryId && categoryData) {
            // Adjust according to your actual API shape
            const categoriesArray = Array.isArray(categoryData) ? categoryData : categoryData?.data || [];

            const categoryToEdit = categoriesArray.find((cat: any) => String(cat.category_id) === String(categoryId));

            console.log(categoryToEdit);

            if (categoryToEdit) {
                methods.reset({
                    category_name: {
                        english: categoryToEdit.category_names?.english || '',
                        hindi: categoryToEdit.category_names?.hindi || '',
                        gujarati: categoryToEdit.category_names?.gujarati || '',
                    },
                    // business_id: categoryToEdit.business_id || '',
                    outlet_id: categoryToEdit.outlets || [],
                    logo_image: categoryToEdit.logo_image || '',
                    swiggy_image: categoryToEdit.swiggy_image || '',
                    banner_image: categoryToEdit.banner_image || '',
                    is_active: Boolean(categoryToEdit.is_active),
                });
            }
        }
    }, [editMode, categoryId, categoryData, methods]);

    const prevStep = () => setStep((prev: any) => prev - 1);
    const nextStep = async () => {
        if (step < 2) {
            const isStepValid = await methods.trigger(['category_name.english', 'logo_image']);
            if (isStepValid) {
                setStep(step + 1);
            }
        } else {
            methods.handleSubmit(onSubmit)();
        }
    };

    const onSubmit = (data: FormData) => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const businessId = business.business_id;

        if (!businessId) {
            console.error('No business selected');
            return;
        }

        const formDataToSend = new window.FormData();
        formDataToSend.append('business_id', businessId);
        formDataToSend.append('category_name', JSON.stringify(data.category_name));
        formDataToSend.append('is_active', String(data.is_active));

        formDataToSend.append('outlet_id', JSON.stringify(data.outlet_id));

        if (data.logo_image) formDataToSend.append('logo_image', data.logo_image);
        if (data.swiggy_image) formDataToSend.append('swiggy_image', data.swiggy_image);
        if (data.banner_image) formDataToSend.append('banner_image', data.banner_image);

        console.log(formDataToSend);

        if (editMode) {
            formDataToSend.append('category_id', categoryId);
            dispatch(updateCategory(formDataToSend)); // must match your API
        } else {
            dispatch(registerCategory(formDataToSend));
        }

        setTimeout(() => {
            navigate('/category-list', { state: { outletId } });
        }, 500);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && step < 2) {
                        e.preventDefault();
                    }
                }}
                className="add-category-container">
                {step > 1 && (
                    <button type="button" className="back-btn" onClick={prevStep}>
                        ←
                    </button>
                )}

                {/* Step Indicator */}
                <div className="step-indicator">
                    {/* Step 1 */}
                    <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>{step > 1 ? '✔' : '1'}</div>

                    {/* Line after Step 1 */}
                    <div className={`step-line ${step > 1 ? 'completed' : ''}`}></div>

                    {/* Step 2 */}
                    <div className={`step-circle ${step === 2 ? 'active' : ''}`}>2</div>
                </div>

                {step === 1 && <StepOne />}
                {step === 2 && <StepTwo />}

                <div className="bottom-btn-container">
                    <button type="button" className="bottom-btn" onClick={nextStep}>
                        {editMode ? (step < 2 ? 'Continue' : 'Update') : step < 2 ? 'Continue' : 'Submit'}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CategoryModal;
