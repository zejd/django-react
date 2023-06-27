import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, updateProduct} from "../../../../redux/actions/ProductActions";
import {selectProducts} from "../../../../redux/selectors/ProductSelector";
import {Input, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {SEARCH_VALUE} from "../../../../constants/APIConstants";

export function Home() {

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [selectedRecordKeys, setSelectedRecordKeys] = useState([]);
    const products = useSelector(selectProducts);

    const onSearchChange = (e) => {
        setSearchValue(e.target.value);
        dispatch(getProducts(e.target.value));
        localStorage.setItem(SEARCH_VALUE, e.target.value);
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            inputType: 'text',
            align: 'center',
            sorter: (a, b) => {
                return a.name && a.name.localeCompare(b.name)
            }
        },
        {
            title: "Description",
            dataIndex: "description",
            inputType: 'text',
            align: 'center',
            sorter: (a, b) => {
                return a.description && a.description.localeCompare(b.description)
            }
        },
        {
            title: "Price",
            dataIndex: "price",
            inputType: 'number',
            align: 'center',
            sorter: (a, b) => {
                return a.price > b.price
            }
        },
        {
            title: "Stock",
            dataIndex: "stock",
            inputType: 'text',
            align: 'center',
            sorter: (a, b) => {
                return a.stock && a.stock.localeCompare(b.stock)
            }
        },
    ]

    useEffect(() => {
        const searchValue = localStorage.getItem(SEARCH_VALUE);
        const prd = products.filter(product => product.selected)
        console.log(prd)
        if (searchValue) {
            setSearchValue(searchValue);
        }
        dispatch(getProducts(searchValue ? searchValue : ''));
    }, []);

    useEffect(() => {
        setSelectedRecordKeys(products.map((product, i) => product.selected ? i+1 : 0));
    }, [products])

    const rowSelection = {
        onSelect: (product, selected) => {
            product.selected = selected;
            dispatch(updateProduct(product));
            setSelectedRecordKeys(products.map((product, i) => product.selected ? i+1 : 0));
        }
    };

    return(
        <div>
            <h1>Products</h1>
            <div style={{maxWidth: 250, marginBottom: 20}}>
                <Input placeholder="Search by name and description" value={searchValue || ''}
                       onChange={onSearchChange} prefix={<SearchOutlined />} />
            </div>
            <Table
                bordered
                dataSource={products}
                columns={columns}
                rowClassName="editable-row"
                rowKey="id"
                rowSelection={{
                    type: 'checkbox',
                    hideSelectAll: true,
                    selectedRowKeys: selectedRecordKeys.filter(key => key !== 0),
                    ...rowSelection,
                }}
                scroll={{ x: 500 }}
            />
        </div>
    )
}
