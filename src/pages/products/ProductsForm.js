import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Formik, Form as FormikForm, Field } from 'formik';
import { setLocale, number, string, object, array } from 'yup';
import { validationMessages } from '../../utils/yupValidationMessages';


import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CustomReactSelect from '../../components/forms/CustomReactSelect';

import { toastSuccess, toastError } from '../../utils/customToast';
import { Creators as UploadActions } from '../../modules/ducks/upload';
import { Creators as FormActions } from '../../modules/ducks/form';

import { saveProduct } from '../../modules/services/products';



setLocale(validationMessages);
const validationSchema = object().shape({
    title: string().max(15).required(),
    description: string().min(5).max(20).required(),
    category: string().required(),
    sizes: array().required().min(1).nullable(),
    price: number().required().positive(),
});


const ProductsForm = ({ initialValues, categories, sizes, action }) => {
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [productSaved, setProductSaved] = useState({})
    
    const dispatch = useDispatch()
    const { files, success } = useSelector(state => state.upload);

    useEffect(() => {
        if (success) {
            toastSuccess({ message: 'Salvo com sucesso!' })
            setIsSubmitting(false)
        }
    }, [success])

    const handleReset = useCallback(() => {
        dispatch(FormActions.cleanFormData())
        dispatch(UploadActions.cleanFileList())
        setProductSaved({})
        setIsSubmitting(false)
    },[dispatch])

    useEffect(() => {
        return () => {
            dispatch(UploadActions.cleanFileList())
        };
    }, [dispatch])

    const handleSubmit = useCallback(async (formValues) => {
        
        let { productId } = productSaved
        if (action === 'Alterar') {
            productId = initialValues.productId
        }
        
        const { category, title, description, price, sizes } = formValues
        const product = {
            action,
            category,
            productId,
            data: {
                description,
                price,
                sizes: sizes.map(size => size.value),
                title
            }
        }
        
        const onSuccess = (product) => {
            const storageRef = `${category}/${product.productId}`;
            setProductSaved(product)
            if (action === 'Incluir') {
                dispatch(UploadActions.allowUpload(storageRef, product))
            }
            else {
                setIsSubmitting(false)
                toastSuccess({ message: 'Alterado com sucesso!' })
            }
        }

        const onFail = (error) => toastError({ message: error.message })
        setIsSubmitting(true)
        saveProduct(product, onSuccess, onFail)

    },[action, dispatch, initialValues.productId, productSaved])
    
    const toggleSubmitButton = () => {
        if (isSubmitting || (files.length === 0 && action === 'Incluir')) {
            return true
        }
        return false
    }

    return (
        <>
            <Formik 
                enableReinitialize={true}
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={validationSchema} >
                    {
                        ({ values, touched, errors, setValues, setFieldValue, setFieldTouched, resetForm }) => {
                            return (
                                <FormikForm>
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label className="font-weight-bold text-dark" htmlFor="title">Titulo</label>
                                            <Field type="text" name="title" className="form-control" aria-describedby="titleHelp" placeholder="" />
                                            {
                                                errors.title && touched.title && 
                                                <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                                    <span className="font-weight-bold text-danger" style={styles.formError}>{errors.title}</span>
                                                </Animated>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <label className="font-weight-bold text-dark" htmlFor="description">Descrição</label>
                                            <Field component="textarea" rows="3" type="text" name="description" className="form-control" aria-describedby="descriptionHelp" placeholder="..." />
                                            {
                                                errors.description && touched.description && 
                                                <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                                    <span className="font-weight-bold text-danger" style={styles.formError}>{errors.description}</span>
                                                </Animated>
                                            }
                                        </div>   
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="font-weight-bold text-dark" htmlFor="category">Categoria</label>
                                                <Field className="custom-select" component="select" name="category">
                                                    <option key="defaultCategory" value="" label="Selecione a Categoria" />
                                                    {categories.map(category => {
                                                        return <option key={category.id} value={category.id} label={category.title} />
                                                    })}
                                                </Field>
                                                {
                                                    errors.category && touched.category && 
                                                    <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                                        <span className="font-weight-bold text-danger" style={styles.formError}>{errors.category}</span>
                                                    </Animated>
                                                }                            
                                            </div>                        
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="font-weight-bold text-dark" htmlFor="sizes">Tamanho</label>
                                                <Field 
                                                    name="sizes"
                                                    isMulti={true}
                                                    component={CustomReactSelect}
                                                    options={sizes}
                                                    value={values.sizes}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                    error={errors.sizes}
                                                    touched={touched.sizes} />
                                                {
                                                    errors.sizes && touched.sizes && 
                                                    <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                                        <span className="font-weight-bold text-danger" style={styles.formError}>{errors.sizes}</span>
                                                    </Animated>
                                                }                            
                                            </div>                        
                                        </div>  
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="font-weight-bold text-dark" htmlFor="price">Preço</label>
                                                <Field type="number" name="price" className="form-control" aria-describedby="priceHelp" placeholder="0,00" />
                                                {
                                                    errors.price && touched.price && 
                                                    <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                                        <span className="font-weight-bold text-danger" style={styles.formError}>{errors.price}</span>
                                                    </Animated>
                                                }
                                            </div>
                                        </div>                         
                                    </div>
                                    <div className="d-flex flex-start mb-4">
                                        <button disabled={isSubmitting} type="reset" onClick={handleReset} className="btn btn-outline-light text-primary">
                                            <span><FontAwesomeIcon icon="trash" className="mr-2" /> Limpar</span>
                                        </button>
                                        <div className="ml-2 mr-2"></div>
                                        <button disabled={toggleSubmitButton()} type="submit" className="btn btn-outline-light text-primary">
                                            <span>
                                                {
                                                    isSubmitting 
                                                        ? <span><FontAwesomeIcon icon="circle-notch" className="mr-2" spin />Salvando...</span> 
                                                        : <span><FontAwesomeIcon icon="save" className="mr-2" /> Salvar</span>
                                                }
                                            </span>
                                        </button>
                                    </div>
                                </FormikForm>                                
                            )
                        }
                    }
            </Formik>
        </>
    )
}



const styles = {
    formError: {
        fontSize: 12
    }
}


export default ProductsForm