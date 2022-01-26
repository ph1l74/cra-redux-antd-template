import { Layout } from 'antd';
import { useSelector } from 'react-redux';



const MainPage = () => {

    const data = useSelector(state => state.data);

    console.log(data);

    return (
        <div className='main-page'>
            <Layout style={{ minHeight: "100vh" }}>
                <Layout.Header></Layout.Header>
                <Layout.Content style={{ margin: '2em', background: '#fff' }}></Layout.Content>
                <Layout.Footer></Layout.Footer>
            </Layout>
        </div>
    )
}

export default MainPage;