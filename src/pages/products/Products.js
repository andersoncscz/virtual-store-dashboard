import React, { useState, useEffect } from 'react';
import PageWrapper from '../wrappers/PageWrapper';
import ProductsForm from './ProductsForm';
import Tabs from '../../components/tabs/Tabs';
import TabsHeader from '../../components/tabs/TabsHeader';
import TabsContent from '../../components/tabs/TabsContent';
import TabHeaderItem from '../../components/tabs/TabHeaderItem';
import TabContentItem from '../../components/tabs/TabContentItem';
import ProductsList from './ProductsList';
import UploadRedux from '../../components/upload/UploadRedux';

import { useSelector } from 'react-redux';
import { getCategories, getProductsSizes } from '../../modules/services/products'

const initialValues = { 
    title: '', 
    description: '', 
    category: '', 
    sizes: [], 
    price: '',
}

const Products = ({ history }) => {
    
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([])

    const { form: formData } = useSelector(state => state);
    const { isUploading } = useSelector(state => state.upload);
    
    useEffect(() => {
        const onSizesSuccess = (data) => {
            const sizes = data.map(size => ({ value: size, label: size }))
            setSizes(sizes)
        }
        getProductsSizes(onSizesSuccess)
        getCategories(setCategories)
    },[])    

    const renderDragAndDrop = () => (
        <>
            <div className="form-group">
                <label className="font-weight-bold text-dark" htmlFor="images">Imagens</label>
            </div>
            <div className="row pt-1">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <UploadRedux
                        accept={'image/*'}
                        disabled={isUploading}
                        dragAcceptedMessage="Solte os arquivos aqui."
                        dragRejectedMessage="Tipo de arquivo nao permitido."
                        dragDisabledMessage="Upload em andamento..."
                        dragDefaultMessage="Arraste e solte os arquivos aqui, ou clique para selecionar." />
                </div>
            </div>
        </>
    )

    return (
        <PageWrapper history={history}>
            <div className="container mt-4">
                <div className="row m-2 d-flex justify-content-between">
                    <div className="col-md-12 p-4 bg-white shadow-sm rounded">
                        <Tabs>
                            <TabsHeader>
                                <TabHeaderItem label={formData ? 'Alterar' : 'Incluir'} icon="plus" id="save-tab-header" />
                                <TabHeaderItem label="Listar" icon="list" id="list-tab-header" />
                            </TabsHeader>
                            <TabsContent>
                                <TabContentItem label={formData ? 'Alterar' : 'Incluir'} id="save-tab-content" tabId="save-tab-header">
                                    <ProductsForm categories={categories} sizes={sizes} initialValues={formData ? formData : initialValues} action={formData ? 'Alterar' : 'Incluir'} />
                                    {!formData && renderDragAndDrop()}
                                </TabContentItem>
                                <TabContentItem label="Listar" id="list-tab-content" tabId="list-tab-header">
                                    <ProductsList categories={categories} />
                                </TabContentItem>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Products