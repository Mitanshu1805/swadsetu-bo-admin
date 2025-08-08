import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { AppColors } from '../../../../utils/Colors';
import './style.css';

const StepOne = () => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [swiggyPreview, setSwiggyPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: string,
        setPreview: (url: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file); // store file in RHF state
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="form-container">
            <div>
                <div className="row">
                    <div className="col-4 mb-3">
                        <label>Upload Menu Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'logo_image', setLogoPreview)}
                            className="form-control"
                        />
                        {logoPreview && (
                            <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '100px', marginTop: '5px' }} />
                        )}
                        {errors.logo_image && <small className="text-danger">{errors.logo_image.message}</small>}
                    </div>

                    {/* Swiggy Image */}
                    <div className="col-4 mb-3">
                        <label>Upload Swiggy Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'swiggy_image', setSwiggyPreview)}
                            className="form-control"
                        />
                        {swiggyPreview && (
                            <img
                                src={swiggyPreview}
                                alt="Swiggy Preview"
                                style={{ maxWidth: '100px', marginTop: '5px' }}
                            />
                        )}
                        {/* {errors.swiggy_image && <small className="text-danger">{errors.swiggy_image.message}</small>} */}
                    </div>

                    {/* Banner Image */}
                    <div className="col-4 mb-3">
                        <label>Upload Banner Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'banner_image', setBannerPreview)}
                            className="form-control"
                        />
                        {bannerPreview && (
                            <img
                                src={bannerPreview}
                                alt="Banner Preview"
                                style={{ maxWidth: '100px', marginTop: '5px' }}
                            />
                        )}
                        {/* {errors.banner_image && <small className="text-danger">{errors.banner_image.message}</small>} */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 mb-3">
                        <label>Name in English</label>
                        <input
                            type="text"
                            placeholder="Enter Name in ENGLISH"
                            {...register('category_name.english', { required: 'Name in ENGLISH is required' })}
                            className="form-control"
                        />
                        {errors.category_name?.english && (
                            <small className="text-danger">{errors.category_name.english.message}</small>
                        )}
                    </div>

                    <div className="col-4 mb-3">
                        <label>Name in Hindi</label>
                        <input
                            type="text"
                            placeholder="Enter Name in HINDI"
                            {...register('category_name.hindi', { required: 'Name in HINDI is required' })}
                            className="form-control"
                        />
                        {/* {errors.category_name?.hindi && (
                            <small className="text-danger">{errors.category_name.hindi.message}</small>
                        )} */}
                    </div>

                    <div className="col-4 mb-3">
                        <label>Name in Gujarati</label>
                        <input
                            type="text"
                            placeholder="Enter Name in GUJARATI"
                            {...register('category_name.gujarati', { required: 'Name in GUJARATI is required' })}
                            className="form-control"
                        />
                        {/* {errors.category_name?.gujarati && (
                            <small className="text-danger">{errors.category_name.gujarati.message}</small>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepOne;
