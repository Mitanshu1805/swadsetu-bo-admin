import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useRedux } from '../../../../hooks';
import { staffAllocationUpdate, staffRegister, staffUpdate } from '../../../../redux/actions';
import './AddStaff.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { staffDetails } from '../../../../redux/actions';

type FormData = {
    staff_name: string;
    role: string;
    email: string;
    phone: string;
    salary: string;
    default_attendance_setting: string;
    date_of_joining: string;
    // is_active: boolean;
    outlet_ids: string[]; // Changed to array for multiple outlet selection
};

const AddStaff: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editMode = location?.state?.editMode || false;
    const staffId = location?.state?.staff_id || null;
    const staff = useSelector((state: any) => state?.Staff?.staffDetails);
    console.log('staffff>>>', staff);

    const { dispatch } = useRedux();
    const startStep = location?.state?.startStep || 1;
    const [step, setStep] = useState(startStep);

    useEffect(() => {
        if (editMode && staffId) {
            const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
            dispatch(staffDetails({ staff_id: staffId, business_id: business.business_id }));
        }
    }, [editMode, staffId, dispatch]);

    const methods = useForm<FormData>({
        defaultValues: {
            staff_name: '',
            role: '',
            email: '',
            phone: '',
            salary: '',
            default_attendance_setting: '',
            date_of_joining: '',
            outlet_ids: [],
        },
        mode: 'onBlur',
    });

    useEffect(() => {
        if (editMode && staff) {
            const baseData = {
                staff_name: staff.staff_name,
                role: staff.role,
                email: staff.email,
                phone: staff.phone,
                salary: staff.salary,
                default_attendance_setting: staff.default_attendance_setting,
                date_of_joining: staff.date_of_joining,
            };

            const outletData =
                startStep === 2
                    ? {
                          outlet_ids: staff.allocated_outlets?.map((outlet: any) => outlet.outlet_id) || [],
                      }
                    : {};

            methods.reset({
                ...baseData,
                ...outletData,
            });
        }
    }, [staff, editMode, methods, startStep]);

    // const [step, setStep] = useState(1);

    // ✅ Validate fields before moving to next step
    const nextStep = async () => {
        if (step === 1) {
            const isValid = await methods.trigger([
                'staff_name',
                'phone',
                'email',
                'salary',
                'role',
                'default_attendance_setting',
                'date_of_joining',
            ]);
            if (!isValid) return;

            if (editMode) {
                methods.handleSubmit(onSubmit)(); // Direct submit from Step 1
            } else {
                setStep(2); // Move to Step 2
            }
        } else if (step === 2) {
            // ✅ Submit from Step 2 if in edit mode
            methods.handleSubmit(onSubmit)();
        }
    };

    const prevStep = () => setStep((prev: any) => prev - 1);

    const outlet_name = location?.state?.outletName;
    const outlet_id = location?.state?.outletId;
    console.log('outlet_id checker', outlet_id);
    console.log('outlet_name checker', outlet_name);

    const onSubmit = (data: FormData) => {
        console.log('welcome');

        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const businessId = business.business_id;

        const module = 'staff';

        if (editMode && startStep == 1) {
            const payload = {
                business_id: businessId,
                staff_id: staffId,
                ...data,
            };
            dispatch(staffUpdate(payload));
        } else if (editMode && startStep == 2) {
            const payload = {
                business_id: businessId,
                staff_id: staffId,
                outlet_ids: data.outlet_ids, // ✅ Only include what Step 2 needs
            };
            dispatch(staffAllocationUpdate(payload));
        } else {
            const payload = {
                business_id: businessId,
                ...data,
            };
            dispatch(staffRegister(payload));
        }

        navigate(`/${module}/outlets/${outlet_id}`, {
            state: {
                outlet_name: outlet_name,
            },
        });
    };

    return (
        <FormProvider {...methods}>
            {/* <form onSubmit={methods.handleSubmit(onSubmit)} className="add-staff-container"> */}
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && step < 2) {
                        e.preventDefault();
                    }
                }}
                className="add-staff-container">
                {/* ✅ Back Button */}
                {step > 1 && (
                    <button type="button" className="back-btn" onClick={prevStep}>
                        ←
                    </button>
                )}

                {/* ✅ Step Indicator */}
                <div className="step-indicator">
                    <div className={`step-circle ${step === 1 ? 'active' : ''}`}>1</div>
                    <div className="step-line"></div>
                    <div className={`step-circle ${step === 2 ? 'active' : ''}`}>2</div>
                </div>

                {/* ✅ Steps */}
                {step === 1 && <StepOne step={step} />}
                {/* {!editMode && step === 2 && <StepTwo />} */}
                {(step === 2 || startStep === 2) && <StepTwo />}

                {/* ✅ Bottom Continue / Submit Button */}
                {/* <div className="bottom-btn-container">
                    {step < 3 ? (
                        <button type="button" className="bottom-btn" onClick={nextStep}>
                            Continue
                        </button>
                    ) : (
                        <button type="submit" className="bottom-btn">
                            Submit
                        </button>
                    )}
                </div> */}
                <div className="bottom-btn-container">
                    <button type="button" className="bottom-btn" onClick={nextStep}>
                        {editMode ? 'Update' : step < 2 ? 'Continue' : 'Submit'}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddStaff;
