import Button from "@components/commons/button";
import React from "react";

interface Props {
    title: string;
    message: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
    title,
    message,
    okText = "Ok",
    cancelText = "Cancel",
    onOk = () => {},
    onCancel = () => {},
}) => {
    return (
        <div className="flex flex-col shadow p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-1">{title}</h4>
            <div>
                <p>{message}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="w-1/2"/>
                <div className="flex items-center justify-between space-x-2">
                    <Button type="primary" onClick={onOk}>{okText}</Button>
                    <Button onClick={onCancel}>{cancelText}</Button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmationDialog;