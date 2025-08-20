import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const StepOne = () => {
    const {
        register,
        getValues,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [swiggyPreview, setSwiggyPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    // Watching is_loose and quantity_type to control conditional UI
    const looseQuantity = watch('is_loose', false);
    const unitType = watch('quantity_type', 'piece');

    // When loose quantity is checked, default to piece
    useEffect(() => {
        if (looseQuantity && !unitType) {
            setValue('quantity_type', 'piece');
        }
    }, [looseQuantity, unitType, setValue]);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: string,
        setPreview: (url: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="form-container">
            {/* Images */}
            <div className="row">
                {/* Logo Image */}
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
                        <img src={swiggyPreview} alt="Swiggy Preview" style={{ maxWidth: '100px', marginTop: '5px' }} />
                    )}
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
                        <img src={bannerPreview} alt="Banner Preview" style={{ maxWidth: '100px', marginTop: '5px' }} />
                    )}
                </div>
            </div>

            {/* Item Names */}
            <div className="row">
                <div className="col-4 mb-3">
                    <label>Name in English</label>
                    <input
                        type="text"
                        placeholder="Enter Name in ENGLISH"
                        {...register('item_name.english', { required: 'Name in ENGLISH is required' })}
                        className="form-control"
                    />
                    {errors.item_name?.english && (
                        <small className="text-danger">{errors.item_name.english.message}</small>
                    )}
                </div>

                <div className="col-4 mb-3">
                    <label>Name in Hindi</label>
                    <input
                        type="text"
                        placeholder="Enter Name in HINDI"
                        {...register('item_name.hindi')}
                        className="form-control"
                    />
                </div>

                <div className="col-4 mb-3">
                    <label>Name in Gujarati</label>
                    <input
                        type="text"
                        placeholder="Enter Name in GUJARATI"
                        {...register('item_name.gujarati')}
                        className="form-control"
                    />
                </div>
            </div>

            {/* Loose Quantity Checkbox */}
            <div className="row mt-3">
                <div className="col-12 mb-3">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" {...register('is_loose')} id="is_loose" />
                        <label htmlFor="is_loose" className="form-check-label">
                            Loose Quantity
                        </label>
                    </div>
                </div>
            </div>

            {/* Unit Selection & Quantity */}
            {looseQuantity && (
                <div className="row">
                    {/* Unit Selection (Inline with label) */}
                    {/* Unit Selection + Quantity (Inline) */}
                    <div className="col-12 mb-3 d-flex align-items-center gap-3 flex-wrap">
                        {/* Label */}
                        <label className="mb-0 fw-bold">Select Unit:</label>

                        {/* Radio Buttons */}
                        <div className="d-flex align-items-center gap-3">
                            <label className="form-check-label d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="piece"
                                    {...register('quantity_type')}
                                    className="form-check-input"
                                />
                                Piece
                            </label>

                            <label className="form-check-label d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="weight"
                                    {...register('quantity_type')}
                                    className="form-check-input"
                                />
                                Weight
                            </label>

                            <label className="form-check-label d-flex align-items-center gap-1">
                                <input
                                    type="radio"
                                    value="volume"
                                    {...register('quantity_type')}
                                    className="form-check-input"
                                />
                                Volume
                            </label>
                        </div>

                        {/* Quantity Input */}
                        <label className="mb-0 fw-bold ms-4">Quantity:</label>
                        <input
                            type="number"
                            placeholder="Enter quantity"
                            {...register('quantity_value', { required: true })}
                            className="form-control"
                            style={{ width: '100px' }}
                        />

                        {/* Conditional Unit Dropdown */}
                        {watch('quantity_type') === 'weight' && (
                            <select {...register('quantity_params')} className="form-select" style={{ width: '90px' }}>
                                <option value="gm">GM</option>
                                <option value="kg">KG</option>
                            </select>
                        )}

                        {watch('quantity_type') === 'volume' && (
                            <select {...register('quantity_params')} className="form-select" style={{ width: '90px' }}>
                                <option value="ml">ML</option>
                                <option value="l">L</option>
                            </select>
                        )}
                    </div>
                </div>
            )}
            {/* Online Display Name + Description */}
            <div className="col-12 mb-3 d-flex align-items-center gap-3">
                {/* Online Display Name */}
                <div style={{ flex: 1 }}>
                    <label className="fw-bold">Online Display Name</label>
                    <input
                        type="text"
                        placeholder="Enter online display name"
                        {...register('online_display_name')}
                        className="form-control"
                    />
                </div>

                {/* Description */}
                <div style={{ flex: 2 }}>
                    <label className="fw-bold">Description</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        {...register('description')}
                        className="form-control"
                    />
                </div>

                {/* Dietary Type */}
                <div style={{ flex: 1 }}>
                    <label className="fw-bold">Dietary Type</label>
                    <select
                        {...register('dietary_type', { required: 'Please select a dietary type' })}
                        className="form-control"
                        defaultValue="">
                        <option value="" disabled>
                            -- Select Dietary Type --
                        </option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non Veg</option>
                    </select>

                    {/* Show error if exists */}
                    {errors.dietary_type && (
                        <span className="text-danger" style={{ fontSize: '0.9rem' }}>
                            {errors.dietary_type.message}
                        </span>
                    )}
                </div>
            </div>

            <div className="col-12 mb-3 d-flex align-items-center gap-3">
                {/* GST Type */}
                <div style={{ flex: 1 }}>
                    <label className="fw-bold">GST Type</label>
                    <select {...register('gst_type', { required: true })} className="form-control" defaultValue="">
                        <option value="" disabled>
                            -- Select GST Type --
                        </option>
                        <option value="services">Services</option>
                        <option value="goods">Goods</option>
                    </select>
                </div>

                {/* Item Order Type */}
                {/* Item Order Type */}
                <div style={{ flex: 2 }}>
                    <label className="fw-bold">Item Order Type</label>
                    <div className="d-flex flex-wrap gap-3">
                        {[
                            { value: 'dine_in', label: 'Dine-in' },
                            { value: 'pick_up', label: 'Pick-up' },
                            { value: 'delivery', label: 'Delivery' },
                            { value: 'online', label: 'Online' },
                        ].map(({ value, label }) => (
                            <div className="form-check" key={value}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={value}
                                    style={{
                                        accentColor: 'red',
                                    }}
                                    {...register('available_order_type', {
                                        validate: (val) => val?.length > 0 || 'Select at least one order type',
                                    })}
                                    id={`order-${value}`}
                                />
                                <label className="form-check-label" htmlFor={`order-${value}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>

                    {errors['available_order_type'] && (
                        <p className="text-danger">{errors.available_order_type.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepOne;
