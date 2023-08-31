import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {ArrowDownTrayIcon} from "@heroicons/react/20/solid/index.js";
import {Input} from "postcss";

export default function ProductsList({auth, mustVerifyEmail, status}) {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState(null);
    const fetchData = (category) => {
        let fetchUrl = 'https://dummyjson.com/products/';
        if (category !== null) {
            fetchUrl = `https://dummyjson.com/products/category/${category}`;
        }
        fetch(fetchUrl)
            .then((response) => response.json())
            .then((actualData) => {
                if (actualData !== null && actualData.products.length > 0) {
                    setData(actualData.products);
                } else if (data.length > 0) {
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
    const RenderProductsTableData = ({data}) => {
        return (<>
            {data.map((item, index) => (
                <tr key={index}>
                    <td className={'p-4 border-b border-blue-gray-50'}>
                        <div className="flex items-center gap-3">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold">
                                {item.title}
                            </Typography>
                        </div>
                    </td>
                    <td className={'p-4 border-b border-blue-gray-50'}>{item.brand}</td>
                    <td className={'p-4 border-b border-blue-gray-50'}>{item.price}</td>
                    <td className={'p-4 border-b border-blue-gray-50'}>{item.rating}</td>
                    <td className={'p-4 border-b border-blue-gray-50'}>
                        <Button color="blue" onClick={(e) => handleButton(e, item.category)}>
                            {item.category}
                        </Button>
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Profile"/>

            <div className="p-10">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Products List
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button variant="outlined" size="sm" onClick={(e) => setCategory(null)}>
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                            <tr>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">Name</th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">Brand</th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">Price</th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">Rating</th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">Category</th>
                            </tr>
                            </thead>
                            <tbody>
                            <RenderProductsTableData data={data}/>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </AuthenticatedLayout>
    </>)
}
