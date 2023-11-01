import { Button, Layout, Menu, Typography, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData, setDocData } from '../store/thunks';
import { PlusCircleOutlined } from '@ant-design/icons'
import ModalEdit from './ModalEdit';
import Loader from './Loader';
import DataView from './DataView';



const MainPage = () => {

    const data = useSelector(state => state.data);
    const isLoading = useSelector(state => state.isLoading);
    const [currentDoc, setCurrentDoc] = useState(null);
    const [modalEdit, setModalEdit] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [defaultDocValues, setDefaultDocValues] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (firstLoad) {
            dispatch(getAllData());
            setFirstLoad(false);
        }


    }, [data, firstLoad, dispatch]);


    const onAddItemOpen = () => {

        const arrayItem = data[currentDoc].items[0];
        const arrayItemKeys = Object.keys(data[currentDoc].items[0]) || [];
        if (arrayItemKeys.length > 0) {
            let values = {};
            for (const key of arrayItemKeys) {
                values = { ...values, [key]: `${typeof arrayItem[key]}` }
            }
            setDefaultDocValues(values);
        }

        setModalEdit(true)
    }

    const onAddItemSave = (itemData) => {
        dispatch(setDocData(currentDoc, { items: [...data[currentDoc].items, itemData] }))
        setModalEdit(false)
    }

    const onAddItemCancel = () => {
        setModalEdit(false)
    }


    const menuClickHandler = (e) => {
        setCurrentDoc(e.key);
    }


    return (
        <div className='main-page'>
            <Layout style={{ minHeight: "100vh" }}>
                <Layout.Header>
                    <Typography.Title level={3} style={{ color: '#fff' }}>2022-Goals Admin Dashboard</Typography.Title>
                </Layout.Header>
                <Layout>
                    <Layout.Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            onClick={menuClickHandler}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {data && Object.keys(data).length > 0 ?
                                <> {
                                    Object.keys(data).map((key) => {
                                        return (<Menu.Item key={key}>{key}</Menu.Item>)
                                    }
                                    )
                                }
                                </> : null}
                        </Menu>
                    </Layout.Sider>
                    <Layout.Content style={{ margin: '2em', background: '#fff' }}>
                        <>
                            <Space size={20} direction='vertical' style={{ margin: '2em', width: '95%' }}>
                                <Button type='primary' onClick={onAddItemOpen} icon={<PlusCircleOutlined />} style={{ float: 'right' }}>Add Item</Button>
                                {isLoading ?
                                    <Loader />
                                    :
                                    data && currentDoc && data[currentDoc].items ?
                                        <DataView data={data[currentDoc].items} />
                                        : null
                                }
                            </Space>
                        </>
                    </Layout.Content>
                </Layout>

            </Layout>
            <ModalEdit values={defaultDocValues} visible={modalEdit} onSave={onAddItemSave} onCancel={onAddItemCancel} isLoading={isLoading} type='add' />
        </div>
    )
}

export default MainPage;