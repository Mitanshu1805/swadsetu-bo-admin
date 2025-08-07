import React from 'react';
import { useFormContext } from 'react-hook-form';
import './AddStaff.css';
import { AppColors } from '../../../../utils/Colors';

const StepOne: React.FC<{ step: number }> = ({ step }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const attendanceValue = watch('default_attendance_setting');

    return (
        <div className="form-container">
            {/* ✅ Back Button */}
            {/* <button style={{ background: 'none', border: 'none', fontSize: '20px' }}>←</button> */}

            {/* ✅ Step Indicator */}
            {/* <div className="step-indicator">
                <div className={`step-circle ${step === 1 ? 'active' : ''}`}>1</div>
                <div className="step-line"></div>
                <div className={`step-circle ${step === 2 ? 'active' : ''}`}>2</div>
            </div> */}

            {/* ✅ Form Fields */}
            <div>
                <div className="row">
                    <div className="col-6 mb-3">
                        <label>Staff Name*</label>
                        <input
                            type="text"
                            placeholder="Enter Staff Name"
                            {...register('staff_name', { required: 'Name is required' })}
                            className="form-control"
                        />
                        {errors.staff_name && <small className="text-danger">{errors.staff_name.message}</small>}
                    </div>

                    <div className="col-6 mb-3">
                        <label>Phone*</label>
                        <input
                            type="tel"
                            placeholder="Enter Phone"
                            maxLength={10}
                            {...register('phone', {
                                required: 'Phone is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone must be exactly 10 digits',
                                },
                            })}
                            className="form-control"
                        />
                        {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 mb-3">
                        <label>Email*</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            {...register('email', { required: 'Email is required' })}
                            className="form-control"
                        />
                        {errors.email && <small className="text-danger">{errors.email.message}</small>}
                    </div>

                    <div className="col-6 mb-3">
                        <label>Salary*</label>
                        <input
                            type="text"
                            placeholder="Enter Salary"
                            {...register('salary', { required: 'Salary is required' })}
                            className="form-control"
                        />
                        {errors.salary && <small className="text-danger">{errors.salary.message}</small>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 mb-3">
                        <label>Role*</label>
                        <input
                            type="text"
                            placeholder="Enter Role"
                            {...register('role', { required: 'Role is required' })}
                            className="form-control"
                        />
                        {errors.role && <small className="text-danger">{errors.role.message}</small>}
                    </div>

                    {/* ✅ Default Attendance */}
                    <div className="col-4 mb-3">
                        <label>Default Attendance*</label>
                        <div className="radio-group d-flex gap-2">
                            {['Manual', 'Absent', 'Present'].map((option) => {
                                const isSelected = attendanceValue === option;

                                return (
                                    <label
                                        key={option}
                                        className="radio-box px-3 py-2 border rounded text-center cursor-pointer"
                                        style={{
                                            backgroundColor: isSelected ? AppColors.primaryColor : '#f8f9fa',
                                            color: isSelected ? '#fff' : '#000',
                                            transition: '0.2s ease-in-out',
                                        }}>
                                        <input
                                            type="radio"
                                            value={option}
                                            {...register('default_attendance_setting', {
                                                required: 'Please select attendance',
                                            })}
                                            className="d-none"
                                        />
                                        {option}
                                    </label>
                                );
                            })}
                        </div>
                        {errors.default_attendance_setting && (
                            <small className="text-danger d-block mt-1">
                                {errors.default_attendance_setting.message}
                            </small>
                        )}
                    </div>

                    {/* ✅ Date of Joining */}
                    <div className="col-4 mb-3">
                        <label>Date of Joining</label>
                        <input
                            type="date"
                            {...register('date_of_joining', { required: 'Date is required' })}
                            className="form-control"
                        />
                        {errors.date_of_joining && (
                            <small className="text-danger">{errors.date_of_joining.message}</small>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ Bottom Continue Button */}
            {/* <button className="bottom-btn">Continue</button> */}
        </div>
    );
};

export default StepOne;
