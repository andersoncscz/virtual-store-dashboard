import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import useToggle from '../../modules/hooks/useToggle';
import { getProducts, deleteProduct, deleteProductImagesFromUrls, saveUrlProductImages } from '../../modules/services/products';
import { Creators as UploadActions } from '../../modules/ducks/upload';
import { Creators as FormActions } from '../../modules/ducks/form';
import { Creators as TabActions } from '../../modules/ducks/tab';

import CustomBootstrapTable from '../../components/bootraptable/CustomBootstrapTable';
import TableActions from '../../components/bootraptable/TableActions';
import TableActionButton from '../../components/bootraptable/TableActionButton';
import { textFilter } from 'react-bootstrap-table2-filter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastSuccess, toastError } from '../../utils/customToast';

import ProductGalleryItem from "./ProductGalleryItem";
import ProductGallery from './ProductGallery';
import ConfirmModal from '../../components/modal/ConfirmModal';

const ProductsList = ({ categories }) => {

    const { isCollapsed, toggle } = useToggle()
    const [modalToShow, setModalToShow] = useState(null)
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState({})
    const [isFetching, setIsFetching] = useState(false)
    const [selectAll, setSelectAll] = useState(false);
    const dispatch = useDispatch()

    const toggleSelectAll = () => {
        
        const images = !selectAll 
            ? productSelected.images.map(image => ({...image, selected: true})) 
            : productSelected.images.map(image => ({...image, selected: false})) 
        
        const product = {...productSelected, images}
        setProductSelected(product)
        setSelectAll(!selectAll);
    };

    const fetchApi = useCallback(async () => {
        const onFetchFail = (error) => console.log(error)
        const onFetching = () => setIsFetching(true)
        const onFetchSuccess = (data) => {
            setProducts(data)
            setIsFetching(false)
        }                
        getProducts(categories, onFetching, onFetchSuccess, onFetchFail)
    },[categories])
    
    useEffect(() => {
        fetchApi()
        return () => {
            dispatch(FormActions.cleanFormData())
        }
    }, [dispatch, fetchApi])
    


    const productImagesRenderer = useCallback(({ index, left, top, key, photo: image }) => {

        const onImageClick = (isSelected, image) => {
            const images = productSelected.images.map(img => {
                if (img.src === image.src)
                    return {...img, selected: !isSelected}
                return img
            })
            const product = {...productSelected, images}
            setProductSelected(product)
        }
                
        return (
            <ProductGalleryItem
                selected={selectAll ? true : false}
                key={key}
                margin={"2px"}
                index={index}
                photo={image}
                left={left}
                top={top}
                onClick={onImageClick}
                imgSize={{
                    height: 150, 
                    width: 150                    
                }}
            />
        )
    },[productSelected, selectAll])    


    const doDelete = () => {
        const onSuccess = () => {
            setProducts(products.filter(p => p.productId !== productSelected.productId))
            toastSuccess({ message: 'Deletado com sucesso.' })
        }
        const onFail = () => toastError({ message: 'Erro ao deletar.' })

        toggle()
        deleteProduct(productSelected, onSuccess, onFail)          
    }    


    const tableActions = useCallback((cell, row, rowIndex, formatExtraData) => {

        const handleEdit = ({ row }) => {
            const productData = {
                ...row,
                sizes: row.sizes.map(size => ({ value: size, label: size }))
            }
            dispatch(UploadActions.cleanFileList())
            dispatch(FormActions.cleanFormData())
            dispatch(FormActions.pushFormData(productData))
            dispatch(TabActions.selectTab('save-tab-header'))
        }
    
    
        const handleDelete = ({ row: productData }) => {
            setModalToShow("DELETE_MODAL")
            setProductSelected(productData)
            toggle()
        }
    

        const handleShowImageList = ({ row: productData }) => {
            const images = row.images.map(url => ({
                src: url,
                width: 1,
                height: 1,
                selected: false
            }))
            const product = {...productData, images}
            setModalToShow("GALLERY_MODAL")
            setSelectAll(false);
            setProductSelected(product)
            toggle()
        }
                
        return (
            <TableActions className="d-flex justify-content-around">
                <TableActionButton onClick={() => handleEdit({ cell, row, rowIndex, formatExtraData })} className="btn btn-default" icon="edit" iconColor="text-dark" />
                <TableActionButton onClick={() => handleDelete({ cell, row, rowIndex, formatExtraData })} className="btn btn-default" icon="trash" iconColor="text-dark" />
                <TableActionButton onClick={() => handleShowImageList({ cell, row, rowIndex, formatExtraData })} className="btn btn-default" icon="images" iconColor="text-dark" />
            </TableActions>
        )
    },[dispatch, toggle])
    



    const handleDeleteImages = useCallback(() => {
        
        const images = productSelected.images.filter(image => image.selected === false)
        const imagesSelected = productSelected.images.filter(image => image.selected === true)
        
        const product = {...productSelected, images}
        const onSuccess = () => {
            const prods = products.map(p => {
                if (p.productId === productSelected.productId)
                    return {...productSelected, images: images.map(image => image.src) }
                return p
            })
            toggle()
            setProductSelected(product)
            setProducts(prods)
            toastSuccess({message: 'Imagens deletadas com sucesso!'})
        }
        const onFail = (error) => toastError({message: 'Erro ao deletar imagens!'})
        
        
        //Update product URLs
        saveUrlProductImages(
            product, 
            images.map(image => ({ url: image.src })),
            onSuccess, 
            onFail
        )
        //Delete images from storage
        !!imagesSelected && deleteProductImagesFromUrls( imagesSelected.map(image => ({ url: image.src })) )
    },[productSelected, products, toggle])


    

    const defaultSorted = [{
        dataField: 'title',
        order: 'desc'
    }];




    const columns = [{
        dataField: 'images[0]',
        text: '#',
        headerStyle: { outline: 'none' },
        formatter: (imageUrl) => <img alt="" style={{height: 30, width: 30}} className="d-flex flex-fill rounded-circle" src={imageUrl} />
    },{
        dataField: 'title',
        text: 'Título',
        headerStyle: { outline: 'none' },
        filter: textFilter({
            delay: 0,
            className: 'form-control-sm',
            placeholder: 'Pesq. Título',
        }),
        sort: true,
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<FontAwesomeIcon icon="sort" />&nbsp;&nbsp;</span>);
            else if (order === 'asc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-alpha-up-alt" />&nbsp;&nbsp;</span>);
            else if (order === 'desc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-alpha-down-alt" />&nbsp;&nbsp;</span>);
            return null;
        },
        headerFormatter: (column, colIndex, { sortElement, filterElement }) => {
            return (
                <div className="d-flex flex-column" >
                    { filterElement }
                    <div className="d-flex flex-row">
                        { column.text }
                        { sortElement }
                    </div>
                </div>
            );            
        }
    }, {
        dataField: 'description',
        text: 'Descrição',
        headerStyle: { outline: 'none' },
        sort: true,
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<FontAwesomeIcon icon="sort" /></span>);
            else if (order === 'asc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-alpha-up-alt" /></span>);
            else if (order === 'desc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-alpha-down-alt" /></span>);
            return null;
        }             
    }, {
        dataField: 'categoryTitle',
        text: 'Categoria',
        headerStyle: { outline: 'none' },
        filter: textFilter({
            delay: 0,
            className: 'form-control-sm',
            placeholder: 'Pesq. Categoria',
        }),
        sort: true,
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<FontAwesomeIcon icon="sort" /></span>);
            else if (order === 'asc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-alpha-up-alt" />&nbsp;&nbsp;</span>);
            else if (order === 'desc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-alpha-down-alt" />&nbsp;&nbsp;</span>);
            return null;
        },
        headerFormatter: (column, colIndex, { sortElement, filterElement }) => {
            return (
                <div className="d-flex flex-column" >
                    { filterElement }
                    <div className="d-flex flex-row">
                        { column.text }
                        { sortElement }
                    </div>
                </div>
            );            
        }        
    },                 
    {
        dataField: 'price',
        text: 'Preço',
        headerStyle: { outline: 'none' },
        sort: true,
        sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;<FontAwesomeIcon icon="sort" /></span>);
            else if (order === 'asc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-numeric-up-alt" /></span>);
            else if (order === 'desc') return (<span className="text-primary">&nbsp;&nbsp;<FontAwesomeIcon icon="sort-numeric-down-alt" /></span>);
            return null;
        },
    }, {
        dataField: 'action',
        text: 'Ações',
        headerStyle: { outline: 'none' },
        formatter: tableActions
    }];




    return (
        <>
            {
                isFetching 
                    ?   <div className="d-flex justify-content-center align-items-center text-primary"><FontAwesomeIcon icon="circle-notch" spin size="2x" /></div>
                    :   <div className="d-flex flex-column">
                            
                            <button className="btn btn-outline-light text-primary align-self-start mb-4" onClick={fetchApi}>
                                <FontAwesomeIcon icon="sync" className="mr-2" />
                                <span>Atualizar</span>
                            </button>

                            <CustomBootstrapTable 
                                keyField="productId" 
                                headerClassName="border"
                                className="table table-hover table-borderless"
                                data={products} 
                                columns={columns} 
                                defaultSorted={defaultSorted} />
                                
                            <ProductGallery 
                                open={isCollapsed && modalToShow==="GALLERY_MODAL"}
                                toggle={toggle}
                                showGallery={!!productSelected.images && productSelected.images.length > 0}
                                images={productSelected.images}
                                imageRenderer={productImagesRenderer}
                                toggleSelectAll={toggleSelectAll}
                                title={productSelected.title}
                                allSelected={selectAll}
                                onDeleteImages={handleDeleteImages} />

                            <ConfirmModal
                                className="modal-sm shadow-sm"
                                open={isCollapsed && modalToShow==="DELETE_MODAL"}
                                toggle={toggle}                            
                                onConfirmAction={doDelete}
                                confirmationQuestion="Confirma Exclusão ?" />
                        </div>
            }
        </>
    )
}

export default ProductsList
