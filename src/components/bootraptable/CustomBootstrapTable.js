import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import filterFactory from 'react-bootstrap-table2-filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomBootstrapTable = ({ data, columns, defaultSorted, keyField, className, headerClassName }) => {
    
    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total ml-2">
          Exibindo { from } em { to } de { size } resultados
        </span>
    );

    const options = {
        paginationSize: 4,
        pageStartIndex: 0,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'Primeiro',
        prePageText: <FontAwesomeIcon icon="caret-left" />,
        nextPageText: <FontAwesomeIcon icon="caret-right" />,
        lastPageText: 'Último',
        nextPageTitle: 'Primeira',
        prePageTitle: 'Prévia',
        firstPageTitle: 'Próxima',
        lastPageTitle: 'Última',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [{
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'Todos', value: data.length
        }] // A numeric array is also available. the purpose of above example is custom the text
    };    
    return (
        <BootstrapTable 
            classes={className}
            headerClasses={headerClassName}
            bootstrap4={true} 
            keyField={ keyField }
            data={ data } 
            columns={ columns } 
            filter={filterFactory()} 
            defaultSorted={defaultSorted} 
            pagination={ paginationFactory(options) } />
    )
}

export default CustomBootstrapTable
