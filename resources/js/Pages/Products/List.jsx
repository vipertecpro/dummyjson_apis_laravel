import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";

export default function ProductsList({ auth, mustVerifyEmail, status }){
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(null);
    const fetchData = (category) => {
        let fetchUrl = 'https://dummyjson.com/products/';
        if(category !== null){
            fetchUrl = `https://dummyjson.com/products/category/${category}`;
        }
        fetch(fetchUrl)
            .then((response) => response.json())
            .then((actualData) => {
                if(actualData !== null && actualData.products.length > 0){
                    setData(actualData.products);
                }else if(data.length > 0){
                    setData(data);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const handleButton = (e, category) => {
        e.preventDefault()
        setCategory(category)
    }
    const RenderTableData = ({data}) => {
        return (<>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.brand}</td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                    <td>
                        <button type={'button'} className={'bg-green-500'} onClick={(e) => handleButton(e,item.category)}>
                            {item.category}
                        </button>
                    </td>
                </tr>
            ))}
        </>)
    }
    useEffect(() => {
        fetchData(category);
    }, [category]);
    return (<>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Profile"/>

            <div className="App">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                        <RenderTableData data={data}/>
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    </>)
}
