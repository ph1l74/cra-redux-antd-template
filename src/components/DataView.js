import { Button, Table, Tag } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalEdit from './ModalEdit';

const DataView = ({ data }) => {

    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [editData, setEditData] = useState({});
    const isLoading = useSelector(state => state.isLoading);
    const dispatch = useDispatch();

    const dataColumns = Object.keys(data[0]).map(key => {
        return ({
            title: key,
            dataIndex: key,
            render: (value) => {
                if (typeof value === 'boolean') {
                    return value ?  <Tag color="geekblue">ACTUAL</Tag> : <Tag color="volcano">NOT ACTUAL</Tag>
                }
                else {
                    return (value)
                }
            },
            key
        })
    }) || null

    const onEditOpen = (data) => {
        setEditData(data);
        setModalEditVisible(true);
    }

    const onEditSave = (data) => {
        console.log(data);
    }

    const onEditCancel = () => {
        setModalEditVisible(false);
    }

    const columns = [...dataColumns, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (<Button type="primary" onClick={() => { onEditOpen(record) }}>Edit</Button>),
    }]


    return (
        <>
            <Table dataSource={data} columns={columns} style={{width: '100%'}} />
            <ModalEdit values={editData} visible={modalEditVisible} onSave={onEditSave} onCancel={onEditCancel} isLoading={isLoading} />
        </>
    )
}

export default DataView;