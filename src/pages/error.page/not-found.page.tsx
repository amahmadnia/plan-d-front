import React from 'react';
import {Result} from "antd";


export default function NotFoundPage() {
    return <Result
        status="404"
        title="404"
        subTitle="متاسفانه صفحه مورد نظر پیدا نشد"
    />
}